import { notFound } from 'next/navigation';

import { prisma } from '@estore/prisma';

import ProductAttributes from './components/product-attributes';
import ProductColors from './components/product-colors';
import ProductImages from './components/product-images';
import ProductPrice from './components/product-price';
import ProductSize from './components/product-size';
import { getProduct } from './data';

export default async function ProductDetailsPage({
  params: { productSlug },
}: {
  params: { productSlug: string };
}) {
  const product = await getProduct(productSlug);

  if (!product) {
    notFound();
  }

  return (
    <div className="lg:grid lg:grid-cols-[3fr_2fr] xl:grid-cols-[2fr_1fr]">
      <div>
        <ProductImages images={product.ProductImages} />
      </div>

      <div className="px-6 py-10 lg:sticky lg:top-20 self-start">
        <h1 className="mb-3 text-3xl font-light">
          {product.ProductGroup.name}
        </h1>

        <ProductPrice
          fullPrice={product.price}
          sellingPrice={product.salePrice}
          className="text-foreground text-2xl font-light"
        />

        <div className="mt-8">
          <div className="mb-2">{product.name}</div>
          <ProductColors
            currentCode={product.code}
            colorVariants={product.ProductGroup.Products}
          />
        </div>

        <div className="mt-8">
          <div className="mb-2">Sizes</div>
          <ProductSize sizes={product.ProductSizes} productId={product.id} />
        </div>

        <div className="mt-8">
          <p>{product.description}</p>
          <ProductAttributes attributes={product.ProductAttributes} />
        </div>
      </div>
    </div>
  );
}
