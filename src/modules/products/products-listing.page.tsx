import { notFound } from 'next/navigation';

import type { Category } from '@prisma/client';

import { API } from '@estore/utils/api';

import Products from './components/products';
import type { ProductListing } from './types';

async function getCategoryAndProducts(categoryValue: string) {
  const [category, products] = await Promise.all([
    API.get<Category>(`/categories/${categoryValue}`),
    API.get<ProductListing.Products>(`/products/${categoryValue}`),
  ]);

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
