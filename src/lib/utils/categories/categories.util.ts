import { Category } from '@prisma/client';

interface CategoryWithSubCategories extends Category {
  subCategories?: CategoryWithSubCategories[];
}

export function buildNestedStructure(categories: Category[]) {
  let categoryMap = new Map<string, CategoryWithSubCategories>();

  // Create a unique key for each category based on path and value
  categories.forEach((cat) => {
    const uniqueKey = `${cat.path}-${cat.value}`;
    categoryMap.set(uniqueKey, { ...cat, subCategories: [] });
  });

  const rootCategories: CategoryWithSubCategories[] = [];
  const delimiter = '/';

  categories.forEach((cat) => {
    const uniqueKey = `${cat.path}-${cat.value}`;
    const currentCat = categoryMap.get(uniqueKey);

    if (cat.path !== cat.value) {
      // Not a root category
      const parentPath = cat.path.substring(0, cat.path.lastIndexOf(delimiter));
      const parentKey = `${parentPath}-${parentPath.split(delimiter).pop()}`;
      const parentCat = categoryMap.get(parentKey);
      if (parentCat && currentCat) {
        parentCat.subCategories!.push(currentCat);
      }
    } else {
      // Root category
      rootCategories.push(currentCat!);
    }
  });

  return rootCategories;
}
