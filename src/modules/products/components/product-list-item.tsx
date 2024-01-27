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

export default function ProductListItem(props: ProductListItemProps) {
  const { productGroup, priorityImage } = props;
  // const { base64, src } = await getImage(product.images.at(0)!.baseUrl);
  const product = productGroup.Products[0];

  const imgUrl = product.ProductImages.at(0)!.image!;
  const thumbUrl = product.ProductImages.at(0)!.thumbnail!;

  const imageSrc = encodeURI(
    imgUrl.startsWith('http')
      ? decodeURIComponent(imgUrl)
      : `https:${decodeURIComponent(imgUrl)}`,
  );
  const thumbnailSrc = encodeURI(
    thumbUrl.startsWith('http')
      ? decodeURIComponent(thumbUrl)
      : `https:${decodeURIComponent(thumbUrl)}`,
  );

  return (
    <div
      className="product-list-item group flex flex-col overflow-clip rounded-2xl bg-white transition-all duration-500 hover:shadow-xl"
      data-testid="product-item"
    >
      <div className="relative h-[60vw] md:h-[50vw] lg:h-[38vw] xl:h-[calc(1440px*0.42)] landscape:md:h-[25vw] landscape:lg:h-[38vw] landscape:xl:h-[calc(1440px*0.4)]">
        <Image
          src={imageSrc}
          blurDataURL={thumbnailSrc}
          placeholder="blur"
          className="rounded-2xl object-cover object-center bg-blend-multiply transition-all duration-700 group-hover:rotate-1 group-hover:scale-110"
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

      <div className="z-10 flex flex-1 flex-col justify-between p-3 backdrop-blur-md">
        <h2 className="line-clamp-2 flex-1">{productGroup.name}</h2>

        <ProductPrice
          sellingPrice={product.salePrice}
          fullPrice={product.price}
        />
      </div>
    </div>
  );
}
