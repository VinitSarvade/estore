import Image from 'next/image';
import Link from 'next/link';

import { Product, ProductImage } from '@prisma/client';

import { cn } from '@/lib/utils/cn';

interface ProductColors extends Pick<Product, 'id' | 'name' | 'code'> {
  ProductImages: Pick<ProductImage, 'id' | 'thumbnail' | 'image'>[];
}

interface ProductColorsProps {
  currentCode: string;
  colorVariants: ProductColors[];
}

export default function ProductColors({
  currentCode,
  colorVariants,
}: ProductColorsProps) {
  return (
    <div className="no-scrollbar">
      <div className="scrollable flex flex-nowrap overflow-x-auto md:grid md:justify-between md:grid-cols-7 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-9">
        {colorVariants.map(({ id, name, code, ProductImages: [image] }) => (
          <Link href={`/products/details/${code}`} key={id}>
            <div
              className={cn(
                'relative h-20 w-14 overflow-hidden border-2 border-transparent md:h-32 md:w-24 lg:h-28 lg:w-20',
                code === currentCode && 'border-ring',
              )}
            >
              <Image
                alt={name}
                src={`https:${image.thumbnail}`}
                className="border-2 border-white object-cover object-top"
                sizes="(min-width: 768px) 6rem, (min-width: 1024px) 5rem, 3.5rem"
                fill
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
