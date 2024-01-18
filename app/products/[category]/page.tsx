import { ResolvingMetadata } from 'next';

import { API } from '@/lib/utils/api';
import { Category } from '@prisma/client';

export { default } from '@/modules/products/products-listing.page';

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata,
) {
  const category = await API.get<Category>(`/categories/${params.category}`);

  return {
    ...parent,
    title: `Estore - ${category.name}`,
  };
}

export async function generateStaticParams() {
  const categories = await API.get<Category[]>('/categories');

  return categories.map((category) => ({
    category: category.value,
  }));
}
