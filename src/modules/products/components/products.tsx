import Link from 'next/link';

import { ProductListing } from '../types';
import ProductListItem from './product-list-item';

interface ProductsProps {
  products: ProductListing.Products;
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="grid gap-4">
      {/* lg:grid-cols-[1fr_4fr] */}
      {/* <div className="hidden lg:block">sidebar</div> */}
      <div className="product-grid md:grid-4 gap-3 p-3">
        {products.map((productGroup, idx) => (
          <Link
            key={productGroup.code}
            href={`/products/details/${productGroup.Products[0].code}`}
          >
            <ProductListItem
              productGroup={productGroup}
              priorityImage={idx < 6}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
