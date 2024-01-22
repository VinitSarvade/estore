import { ResolvingMetadata } from 'next';

import { prisma } from '@estore/prisma';

export { default } from '@/modules/products/products-listing.page';

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata,
) {
  const category = await prisma.category.findFirst({
    where: {
      value: {
        equals: params.category,
      },
    },
  });

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
  const categories = await prisma.category.findMany({
    where: {
      path: {
        not: {
          contains: '/',
        },
      },
      tagCodes: {
        isEmpty: false,
      },
    },
    orderBy: { id: 'asc' },
  });

  return categories.map((category) => ({
    category: category.value,
  }));
}
