import React from 'react';

import type { Category } from '@estore/types/category';
import { API } from '@estore/utils/api';
import { QueryParams } from '@estore/utils/query-params/query-params';

import Products from './components/products';
import { ProductsResponse } from './types';

export async function generateStaticParams() {
  const categories = await API.get<Category[]>('/categories');

  return categories.map((category) => ({
    category: category.key,
  }));
}

export const dynamic = true;

export default async function ProductsPage({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams?: QueryParams;
}) {
  const response = await API.get<ProductsResponse>(`/products/${category}`);

  return (
    <>
      <div className="text-lg font-bold px-3 md:px-5">
        Products {response.results.length}
      </div>
      <Products products={response.results} />
    </>
  );
}
