'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

import { ProductImage } from '@prisma/client';

const ProductImagesGallery = dynamic(() => import('./gallery'));
const ProductImagesCarousel = dynamic(() => import('./carousel'));

interface CarouselProps {
  images: ProductImage[];
}

enum ImageDisplayType {
  Gallery = 'gallery',
  Carousel = 'carousel',
}

export default function ProductImages({ images }: CarouselProps) {
  const [ImagesDisplayType, setImagesDisplayType] =
    useState<ImageDisplayType>();

  useLayoutEffect(() => {
    if (window && window.innerWidth < 1024) {
      setImagesDisplayType(ImageDisplayType.Carousel);
    } else {
      setImagesDisplayType(ImageDisplayType.Gallery);
    }
  }, []);

  if (!ImagesDisplayType) {
    return (
      <div className="relative h-[70dvh] w-full lg:h-[calc(100dvh-81px)] xl:w-1/2">
        <Image
          alt=""
          src={`https://${images[0].image}`}
          className="object-contain"
          fill
          priority
        />
      </div>
    );
  }

  if (ImagesDisplayType === ImageDisplayType.Carousel) {
    return <ProductImagesCarousel images={images} />;
  }

  return <ProductImagesGallery images={images} />;
}
