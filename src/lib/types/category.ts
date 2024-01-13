export interface Category {
  name: string;
  key: string;
  tags: string[];
  subCategories?: Category[];
}

export interface APICategory {
  CatName: string;
  CategoryValue: string;
  tagCodes: string[];
  CategoriesArray?: APICategory[];
}
