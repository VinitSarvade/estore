import type { Category } from '@estore/types/category';
import { API } from '@estore/utils/api';

import Products from './components/products';
import { ProductsResponse } from './types';

async function getCategoryAndProducts(categoryTag: string) {
  const [categoriesResponse, productsResponse] = await Promise.all([
    API.get<Category[]>(`/categories`),
    API.get<ProductsResponse>(`/products/${categoryTag}`),
  ]);

  const category = categoriesResponse.find((categoryObj) =>
    categoryObj.tags.includes(categoryTag),
  );

  return { category, productsResponse };
}

export default async function ProductsListingPage({
  params: { categoryTags },
}: {
  params: { categoryTags: string };
}) {
  const { category, productsResponse } =
    await getCategoryAndProducts(categoryTags);

  return (
    <div className="container">
      <h1 className="text-2xl uppercase font-bold px-3 md:px-5">
        {category?.name}
      </h1>
      <Products products={productsResponse.results} />
    </div>
  );
}
