import Image from 'next/image';

import { formatCurrency } from '@/lib/utils/format';

import { CartItem } from '../types';
import CartQuantityChanger from './cart-quantity-changer/cart-quantity-changer';

interface CartItemsProps {
  cartItems: CartItem[];
  cartId: number;
}

export default function CartItems({ cartItems, cartId }: CartItemsProps) {
  return cartItems.map((item) => (
    <div
      className="flex gap-4 lg:gap-8 border-b lg:shadow-md lg:rounded overflow-clip"
      key={item.id}
    >
      <Image
        src={`https:${item.product.image}`}
        alt={item.product.name}
        width={120}
        height={180}
        className="object-cover"
      />

      <div className="lg:flex flex-1 justify-between">
        <div className="flex flex-col gap-2 flex-1 py-2 lg:py-4">
          <h3 className="text-lg lg:text-xl lg:mb-2 font-medium">
            {item.product.productGroup.name}
          </h3>
          <h3 className="">{item.product.name}</h3>
          <p>Size: {item.product.size.name}</p>
        </div>

        <div className="flex lg:flex-col gap-2 py-2 lg:py-4 pr-4 lg:px-8 justify-between">
          <p className="text-lg lg:text-xl font-medium lg:mb-2 text-right">
            {formatCurrency(item.itemTotal)}
          </p>

          <p className="text-md text-right hidden lg:block">
            {item.quantity} x {item.product.price}
          </p>

          <div className="flex place-items-center mt-auto">
            <CartQuantityChanger item={item} cartId={cartId} />
          </div>
        </div>
      </div>
    </div>
  ));
}
