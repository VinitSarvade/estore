import { ResolvedMetadata, ResolvingMetadata } from 'next';

import cloudflareLoader from '@/lib/utils/cf-image';
import { normalizeUrl } from '@/lib/utils/url';
import { prisma } from '@estore/prisma';

export { default } from '@/modules/products/product-details.page';

export async function generateMetadata(
  { params }: { params: { productCode: string } },
  parent: ResolvingMetadata,
): Promise<ResolvedMetadata | null> {
  const product = await prisma.product.findFirst({
    where: {
      code: params.productCode,
    },
    include: {
      ProductGroup: true,
      ProductImages: true,
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
        select: { code: true },
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
    tpl.map(({ code }) => ({ productCode: code })),
  );
}
