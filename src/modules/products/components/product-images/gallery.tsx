import Image from 'next/image';

import { ProductImage } from '@prisma/client';

import { cn } from '@/lib/utils/cn';

interface ProductImagesGalleryProps {
  images: ProductImage[];
}

/**
 * @deprecated Use `ProductImages` directly
 */

export default function ProductImagesGallery({
  images,
}: ProductImagesGalleryProps) {
  const total = images.length;
  const isOddNumberOfImages = total % 2 !== 0;

  return (
    <div className="flex flex-nowrap overflow-auto snap-x snap-mandatory xl:snap-none xl:grid xl:grid-cols-2">
      {images.map((media, idx) => {
        const isLastSingleImage = isOddNumberOfImages && idx === total - 1;
        return (
          <div
            key={media.id}
            className={cn(
              'relative w-full h-[65dvh] xl:h-[calc(100dvh-81px)]',
              isLastSingleImage && 'col-span-2',
              'flex-shrink-0 snap-center snap-always',
            )}
          >
            <Image
              src={`https:${media.image}`}
              className={cn(
                'object-cover',
                isLastSingleImage && 'xl:object-contain',
              )}
              alt=""
              sizes="(min-width: 768px) 100vw, 768px"
              priority={idx < 2}
              fill
            />
          </div>
        );
      })}
    </div>
  );
}
