import { NextRequest } from 'next/server';

import { prisma } from '@estore/prisma';

interface RequestParams {
  category: string;
}

export const GET = async (
  _: NextRequest,
  { params: { category: categoryValue } }: { params: RequestParams },
) => {
  const category = await prisma.category.findFirst({
    where: {
      value: categoryValue,
    },
  });

  if (!category) {
    return Response.json(null, { status: 404 });
  }

  const products = await prisma.productGroup.findMany({
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
              startsWith: category.value,
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
              startsWith: category.value,
            },
          },
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
    take: 30,
  });

  return Response.json(products);
};
