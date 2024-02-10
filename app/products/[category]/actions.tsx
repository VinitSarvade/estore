'use server';

import { prisma } from '@estore/prisma';

const PAGE_SIZE = 20;

export async function getPaginatedProductsByCategoryValue(
  categoryValue: string,
  page: number = 1,
) {
  const categoryPromise = prisma.category.findFirst({
    select: { name: true, value: true },
    where: {
      value: categoryValue,
    },
  });

  const productsPromise = prisma.productGroup.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      Products: {
        select: {
          code: true,
          price: true,
          salePrice: true,
          ProductImages: {
            select: {
              id: true,
              thumbnail: true,
              image: true,
            },
            take: 1,
          },
          ProductAttributes: {
            select: { id: true, name: true, value: true },
            where: {
              name: 'Concepts',
            },
            take: 1,
          },
        },
        where: {
          isDefaultProduct: true,
          Category: {
            path: {
              startsWith: categoryValue,
            },
          },
        },
      },
    },
    where: {
      Products: {
        some: {
          isDefaultProduct: true,
          Category: {
            path: {
              startsWith: categoryValue,
            },
          },
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const [category, products] = await Promise.all([
    categoryPromise,
    productsPromise,
  ]);

  return { category, products };
}
