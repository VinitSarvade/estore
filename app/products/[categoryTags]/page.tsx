import { ResolvingMetadata } from 'next';

import { Category } from '@/lib/types/category';
import { API } from '@/lib/utils/api';

export { default } from '@/modules/products/products-listing.page';

export async function generateMetadata(
  { params }: { params: { categoryTags: string } },
  parent: ResolvingMetadata,
) {
  const categories = await API.get<Category[]>('/categories');
  const category = categories.find((categoryObj) =>
    categoryObj.tags.includes(params.categoryTags),
  );

  return {
    ...parent,
    title: `Estore - ${category?.name}`,
  };
}

export async function generateStaticParams() {
  const categories = await API.get<Category[]>('/categories');

  return categories.map((category) => ({
    category: category.key,
  }));
}
