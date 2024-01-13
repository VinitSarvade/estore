import Image from 'next/image';

import { Product } from '@estore/types/product';

import DiscountBadge from './discount-badge';
import ProductPrice from './product-price';

interface ProductListItemProps {
  product: Product;
  priorityImage?: boolean;
}

export default function ProductListItem({
  product,
  priorityImage,
}: ProductListItemProps) {
  return (
    <div className="product-list-item group flex flex-col bg-white rounded-2xl overflow-clip transition-all duration-500 hover:shadow-xl">
      <div className="relative h-[60vw] md:h-[50vw] xl:h-[28vw] 2xl:h-[22vw]">
        <Image
          className="bg-blend-multiply rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-1 duration-700 object-cover object-center"
          src={product.images.at(0)!.baseUrl}
          alt={product.name}
          fill
          priority={priorityImage}
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
