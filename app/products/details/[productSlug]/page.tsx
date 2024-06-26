import { ResolvedMetadata, ResolvingMetadata } from 'next';

import cloudflareLoader from '@/lib/utils/cf-image';
import {
  getProductCodeAndNameFromSlug,
  getSlugFromCodeAndName,
  normalizeUrl,
} from '@/lib/utils/url';
import { prisma } from '@estore/prisma';

export { default } from '@/modules/products/product-details.page';

export async function generateMetadata(
  { params }: { params: { productSlug: string } },
  parent: ResolvingMetadata,
): Promise<ResolvedMetadata | null> {
  const [productCode] = getProductCodeAndNameFromSlug(params.productSlug);
  const product = await prisma.product.findFirst({
    select: {
      name: true,
      description: true,
      ProductGroup: { select: { name: true } },
      ProductImages: { select: { image: true } },
    },
    where: {
      code: productCode,
    },
  });

  if (!product) {
    return null;
  }

  return {
    ...parent,
    title: `Estore - ${product.ProductGroup.name}, ${product.name}`,
    description: product.description,
    images: product.ProductImages.map(({ image }) =>
      cloudflareLoader({
        src: normalizeUrl(image),
        width: 1200,
        quality: null,
      }),
    ),
    openGraph: {
      ...(await parent).openGraph,
      title: `Estore - ${product.ProductGroup.name}, ${product.name}`,
      description: product.description,
      images: product.ProductImages.map(({ image }) =>
        cloudflareLoader({
          src: normalizeUrl(image),
          width: 1200,
          quality: null,
        }),
      ),
    },
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      path: true,
    },
    where: {
      path: {
        not: {
          contains: '/',
        },
      },
      tagCodes: {
        isEmpty: false,
      },
    },
    orderBy: { id: 'asc' },
  });

  const productTuples = await prisma.$transaction(
    categories.map((category) =>
      prisma.product.findMany({
        select: { code: true, ProductGroup: { select: { name: true } } },
        where: {
          Category: {
            path: {
              startsWith: category.path,
            },
          },
        },
        take: 30,
      }),
    ),
  );

  return productTuples.flatMap((tpl) =>
    tpl.map(({ code, ProductGroup: { name } }) => ({
      productSlug: getSlugFromCodeAndName(code, name),
    })),
  );
}
