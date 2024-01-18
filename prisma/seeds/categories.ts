import { Category, PrismaClient, PrismaPromise } from '@prisma/client';

const prisma = new PrismaClient();

const DATA_API_URL = process.env.DATA_API_URL;
const DATA_API_KEY = process.env.DATA_API_KEY;

if (!DATA_API_URL || !DATA_API_KEY) {
  throw new Error('DATA_API_URL and DATA_API_KEY must be defined');
}

export interface APICategory {
  CatName: string;
  CategoryValue: string;
  tagCodes: string[];
  CategoriesArray?: APICategory[];
}

const headers = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': DATA_API_KEY,
  'X-RapidAPI-Host': DATA_API_URL,
};

async function main() {
  const response = await fetch(`https://${DATA_API_URL}/categories/list`, {
    headers,
  });
  const categories = await response.json();

  const createOperations = formatCategories(categories, '');

  return prisma.$transaction(createOperations);
}

function formatCategories(
  categories: APICategory[],
  parentPath: string,
): PrismaPromise<Category>[] {
  let operations: PrismaPromise<Category>[] = [];

  for (const category of categories) {
    let path = parentPath
      ? `${parentPath}/${category.CategoryValue}`
      : category.CategoryValue;
    let categoryData = {
      name: category.CatName,
      value: category.CategoryValue,
      path: path,
      tagCodes: category.tagCodes ? [...new Set(category.tagCodes)] : [],
    };

    operations.push(prisma.category.create({ data: categoryData }));

    if (category.CategoriesArray && category.CategoriesArray.length > 0) {
      // Recursively handle subcategories
      const childOperations = formatCategories(category.CategoriesArray, path);
      operations = operations.concat(childOperations);
    }
  }

  return operations;
}

main()
  .then(() => {
    console.log('Categories seeded');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
