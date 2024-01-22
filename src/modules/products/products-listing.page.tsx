import { notFound } from 'next/navigation';

import type { Category } from '@prisma/client';

import { prisma } from '@estore/prisma';

import Products from './components/products';
import type { ProductListing } from './types';

async function getCategoryAndProducts(categoryValue: string) {
  const category = await prisma.category.findFirst({
    where: {
      value: categoryValue,
    },
  });

  if (!category) {
    notFound();
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

  if (!category) {
    notFound();
  }

  return { category, products };
}

export default async function ProductsListingPage({
  params: { category: categoryValue },
}: {
  params: { category: string };
}) {
  const { category, products } = await getCategoryAndProducts(categoryValue);

  return (
    <div className="container">
      <h1 className="text-2xl uppercase font-bold px-3 md:px-5">
        {category.name}
      </h1>

      <Products products={products} />
    </div>
  );
}
