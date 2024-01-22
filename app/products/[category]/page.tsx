import { ResolvingMetadata } from 'next';

import { Category } from '@prisma/client';

import { API } from '@/lib/utils/api';

export { default } from '@/modules/products/products-listing.page';

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata,
) {
  const category = await API.get<Category | null>(
    `/categories/${params.category}`,
  );

  if (!category) {
    return null;
  }

  return {
    ...parent,
    title: `Estore - ${category.name}`,
  };
}

export const dynamicParams = false; // all categories are pre-generated, anything else is a 404

export async function generateStaticParams() {
  const categories = await API.get<Category[]>('/categories');

  return categories.map((category) => ({
    category: category.value,
  }));
}
