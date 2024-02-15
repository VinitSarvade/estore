import { PropsWithChildren } from 'react';

import { updateCartItem } from '../../actions';

export default function QuantityChangerForm({
  cartId,
  productId,
  quantity,
  children,
}: {
  cartId: number;
  productId: number;
  quantity: number;
} & PropsWithChildren) {
  return (
    <form action={updateCartItem}>
      <input type="hidden" name="cartId" value={cartId} />
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantity} />
      {children}
    </form>
  );
}
