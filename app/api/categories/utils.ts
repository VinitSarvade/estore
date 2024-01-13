import { APICategory, Category } from '@estore/types/category';

const renameMap = {
  CatName: 'name',
  CategoryValue: 'key',
  tagCodes: 'tags',
  CategoriesArray: 'subCategories',
} as const;

export const normalizeCategoryKeys = (
  categories: APICategory[],
): Category[] => {
  return categories.reduce(
    (normalizedCategories: Category[], category: APICategory) => {
      if (category.tagCodes.length > 0) {
        normalizedCategories.push({
          [renameMap.CatName]: category.CatName,
          [renameMap.CategoryValue]: category.CategoryValue,
          [renameMap.tagCodes]: [...new Set(category.tagCodes)],
          [renameMap.CategoriesArray]: category.CategoriesArray
            ? normalizeCategoryKeys(category.CategoriesArray)
            : undefined,
        });
      }
      return normalizedCategories;
    },
    [],
  );
};
