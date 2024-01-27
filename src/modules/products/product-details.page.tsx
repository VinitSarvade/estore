import { notFound } from 'next/navigation';

import { prisma } from '@estore/prisma';

import ProductAttributesComponent from './components/product-attributes';
import ProductColors from './components/product-colors';
import ProductImages from './components/product-images';
import ProductPrice from './components/product-price';
import ProductSizes from './components/product-sizes';

async function getProduct(code: string) {
  return prisma.product.findFirst({
    where: {
      code: code,
    },
    include: {
      ProductGroup: {
        select: {
          name: true,
          Products: {
            select: {
              id: true,
              code: true,
              name: true,
              ProductImages: {
                select: { id: true, thumbnail: true, image: true },
                take: 1,
              },
            },
          },
        },
      },
      ProductImages: true,
      ProductAttributes: true,
      ProductSizes: true,
    },
  });
}

export default async function ProductDetailsPage({
  params: { productCode },
}: {
  params: { productCode: string };
}) {
  const product = await getProduct(productCode);

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
          <ProductSizes sizes={product.ProductSizes} />
        </div>

        <div className="mt-8">
          <p>{product.description}</p>
          <ProductAttributesComponent attributes={product.ProductAttributes} />
        </div>
      </div>
    </div>
  );
}
