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
      <div className="product-grid gap-3 md:grid-4 p-3">
        {products.map((productGroup, idx) => (
          <ProductListItem
            key={productGroup.code}
            productGroup={productGroup}
            priorityImage={idx < 6}
          />
        ))}
      </div>
    </div>
  );
}
