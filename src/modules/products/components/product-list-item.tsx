import Image from 'next/image';

import { Product } from '@estore/types/product';

import DiscountBadge from './discount-badge';
import ProductPrice from './product-price';

interface ProductListItemProps {
  product: Product;
  priorityImage?: boolean;
}

// async function getImage(src: string) {
//   const buffer = await fetch(src).then(async (res) =>
//     Buffer.from(await res.arrayBuffer()),
//   );

//   const {
//     metadata,
//     ...plaiceholder
//   } = await getPlaiceholder(buffer, { size: 10 });

//   return {
//     ...plaiceholder,
//     src,
//   };
// }

export default async function ProductListItem({
  product,
  priorityImage,
}: ProductListItemProps) {
  // const { base64, src } = await getImage(product.images.at(0)!.baseUrl);

  const src = product.images.at(0)!.baseUrl;

  return (
    <div
      className="product-list-item group flex flex-col bg-white rounded-2xl overflow-clip transition-all duration-500 hover:shadow-xl"
      data-testid="product-item"
    >
      <div className="relative h-[60vw] md:h-[50vw] landscape:md:h-[25vw] lg:h-[38vw] landscape:lg:h-[38vw] xl:h-[calc(1440px*0.28)] landscape:xl:h-[calc(1440px*0.28)]">
        <Image
          src={src}
          // blurDataURL={base64}
          // placeholder="blur"
          className="bg-blend-multiply rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-1 duration-700 object-cover object-center"
          alt={product.name}
          priority={priorityImage}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          fill
        />

        {!!product.redPrice && (
          <DiscountBadge
            fullPrice={product.whitePrice.value}
            discountPrice={product.redPrice.value}
          />
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1 z-10 backdrop-blur-md">
        <h2 className="line-clamp-2 flex-1">{product.name}</h2>

        {!!product.concept && product.concept.length > 0 && (
          <p className="text-sm text-muted-foreground mb-1">
            {product.concept?.join(', ')}
          </p>
        )}

        <ProductPrice
          sellingPrice={product.price.formattedValue}
          fullPrice={product.whitePrice.formattedValue}
          isDiscounted={!!product.redPrice}
        />
      </div>
    </div>
  );
}
