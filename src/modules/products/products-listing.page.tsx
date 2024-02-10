import { notFound } from 'next/navigation';

import { getPaginatedProductsByCategoryValue } from '@app/products/[category]/actions';

import Products from './components/products';

export default async function ProductsListingPage({
  params: { category: categoryValue },
}: {
  params: { category: string };
}) {
  const { category, products } =
    await getPaginatedProductsByCategoryValue(categoryValue);

  if (!category) {
    notFound();
  }

  return (
    <div className="mt-5">
      <h1 className="px-3 text-2xl font-bold uppercase md:px-5">
        {category.name}
      </h1>

      <Products initialProducts={products} categoryValue={categoryValue} />
    </div>
  );
}
