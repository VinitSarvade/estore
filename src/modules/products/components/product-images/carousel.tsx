import Image from 'next/image';

import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { ProductImage } from '@prisma/client';

interface ProductImagesCarouselProps {
  images: ProductImage[];
}

export default function ProductImagesCarousel({
  images,
}: ProductImagesCarouselProps) {
  return (
    <Flicking align="prev" circular>
      {images.map((media, idx) => (
        <div key={media.id} className="panel relative h-[75dvh] w-full">
          <Image
            src={`https:${media.image}`}
            className="object-cover"
            alt=""
            sizes="(min-width: 768px) 100vw, 768px"
            priority={idx < 2}
            fill
          />
        </div>
      ))}
    </Flicking>
  );
}
