import Image from 'next/image';

import { ProductListing } from '../types';
import DiscountBadge from './discount-badge';
import ProductPrice from './product-price';

interface ProductListItemProps {
  productGroup: ProductListing.ProductGroup;
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
  productGroup,
  priorityImage,
}: ProductListItemProps) {
  // const { base64, src } = await getImage(product.images.at(0)!.baseUrl);
  const product = productGroup.Products[0];

  const imgUrl = product.ProductImages.at(0)!.image!;
  const thumbUrl = product.ProductImages.at(0)!.thumbnail!;

  const imageSrc = imgUrl.startsWith('http') ? imgUrl : `https://${imgUrl}`;
  const thumbnailSrc = imgUrl.startsWith('http')
    ? imgUrl
    : `https://${thumbUrl}`;

  return (
    <div
      className="product-list-item group flex flex-col bg-white rounded-2xl overflow-clip transition-all duration-500 hover:shadow-xl"
      data-testid="product-item"
    >
      <div className="relative h-[60vw] md:h-[50vw] landscape:md:h-[25vw] lg:h-[38vw] landscape:lg:h-[38vw] xl:h-[calc(1440px*0.28)] landscape:xl:h-[calc(1440px*0.28)]">
        <Image
          src={imageSrc}
          blurDataURL={thumbnailSrc}
          placeholder="blur"
          className="bg-blend-multiply rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-1 duration-700 object-cover object-center"
          alt={productGroup.name}
          priority={priorityImage}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          fill
        />

        {!!product.salePrice && (
          <DiscountBadge
            fullPrice={product.price}
            discountPrice={product.salePrice}
          />
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1 z-10 backdrop-blur-md">
        <h2 className="line-clamp-2 flex-1">{productGroup.name}</h2>

        <ProductPrice
          sellingPrice={product.price}
          fullPrice={product.price}
          isDiscounted={!!product.salePrice}
        />
      </div>
    </div>
  );
}
