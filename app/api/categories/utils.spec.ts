import { describe, expect, it } from 'vitest';

import { normalizeCategoryKeys } from './utils';

describe('normalizeCategoryKeys', () => {
  it('should normalize category keys', () => {
    const categories = [
      {
        CatName: 'Category 1',
        CategoryValue: 'Value 1',
        tagCodes: ['tag1', 'tag2'],
        CategoriesArray: [
          {
            CatName: 'Subcategory 1',
            CategoryValue: 'Subvalue 1',
            tagCodes: ['subtag1', 'subtag2'],
            CategoriesArray: [],
          },
        ],
      },
      {
        CatName: 'Category 2',
        CategoryValue: 'Value 2',
        tagCodes: [],
        CategoriesArray: [],
      },
    ];

    const normalizedCategories = normalizeCategoryKeys(categories);

    expect(normalizedCategories).toEqual([
      {
        name: 'Category 1',
        key: 'Value 1',
        tags: ['tag1', 'tag2'],
        subCategories: [
          {
            name: 'Subcategory 1',
            key: 'Subvalue 1',
            tags: ['subtag1', 'subtag2'],
            subCategories: [],
          },
        ],
      },
    ]);
  });

  it('should remove duplicate tags', () => {
    const categories = [
      {
        CatName: 'Category 1',
        CategoryValue: 'Value 1',
        tagCodes: ['tag1', 'tag2', 'tag1'],
        CategoriesArray: [],
      },
      {
        CatName: 'Category 2',
        CategoryValue: 'Value 2',
        tagCodes: ['tag2', 'tag3', 'tag3'],
        CategoriesArray: [],
      },
    ];

    const normalizedCategories = normalizeCategoryKeys(categories);

    expect(normalizedCategories).toEqual([
      {
        name: 'Category 1',
        key: 'Value 1',
        tags: ['tag1', 'tag2'],
        subCategories: [],
      },
      {
        name: 'Category 2',
        key: 'Value 2',
        tags: ['tag2', 'tag3'],
        subCategories: [],
      },
    ]);
  });
});
