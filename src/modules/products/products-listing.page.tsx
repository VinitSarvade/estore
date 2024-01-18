import type { Category } from '@prisma/client';

import { API } from '@estore/utils/api';

import Products from './components/products';
import { ProductsResponse } from './types';

async function getCategoryAndProducts(categoryValue: string) {
  const [category, productsResponse] = await Promise.all([
    API.get<Category>(`/categories/${categoryValue}`),
    API.get<ProductsResponse>(`/products/${categoryValue}`),
  ]);

  return { category: category, productsResponse };
}

export default async function ProductsListingPage({
  params: { category: categoryValue },
}: {
  params: { category: string };
}) {
  const { category, productsResponse } =
    await getCategoryAndProducts(categoryValue);

  return (
    <div className="container">
      <h1 className="text-2xl uppercase font-bold px-3 md:px-5">
        {category.name}
      </h1>
      <Products products={productsResponse.results} />
    </div>
  );
}
