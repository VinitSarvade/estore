import { ProductSizes } from '@prisma/client';

import { Button } from '@/components/button';
import { ShoppingBagIcon } from 'lucide-react';

interface ProductSizesProps {
  sizes: ProductSizes[];
}

export default function ProductSizes({ sizes }: ProductSizesProps) {
  return (
    <>
      <div className="grid grid-cols-[repeat(5,minmax(1px,1fr))] gap-3">
        {sizes.map(({ id, name }) => (
          <Button key={id} variant="outline" className="rounded-none">
            {name}
          </Button>
        ))}
      </div>

      <Button size="lg" className="mt-8 w-full rounded-none font-semibold">
        <ShoppingBagIcon size={18} />
        &ensp; Add to Cart
      </Button>
    </>
  );
}
