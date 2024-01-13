import { Product } from '@estore/types/product';

import ProductListItem from './product-list-item';

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="grid lg:grid-cols-[1fr_4fr] gap-4">
      <div className="hidden lg:block">sidebar</div>
      <div className="product-grid gap-3 md:grid-4 p-3 md:p-5">
        {products.map((product: Product, idx) => (
          <ProductListItem
            key={product.code}
            product={product}
            priorityImage={idx < 6}
          />
        ))}
      </div>
    </div>
  );
}
