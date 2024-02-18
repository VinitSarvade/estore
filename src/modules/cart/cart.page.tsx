import { cookies } from 'next/headers';

import { AuthError } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server-client';
import { prisma } from '@estore/prisma';

import CartAuthenticate from './components/cart-authenticate';
import CartEmpty from './components/cart-empty';
import CartItems from './components/cart-items';
import CartSummary from './components/cart-summary';
import { UserCart } from './types';

const getUserCart = async (): Promise<
  | {
      cart: UserCart;
      error: null;
    }
  | {
      cart: null;
      error: AuthError;
    }
> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.auth.getUser();

  if (error) {
    return { error, cart: null };
  }

  const rawQuery = `
    SELECT
      c.id,
      c."userId",
      json_agg (
        json_build_object (
          'id', ci.id,
          'productId', ci."productId",
          'quantity', ci.quantity,
          'product', json_build_object (
            'id', p.id,
            'name', p.name,
            'price', COALESCE(p."salePrice", p.price),
            'image', (SELECT pi.image FROM product_images pi WHERE pi."productId" = p.id LIMIT 1),
            'productGroup', json_build_object(
              'name', pg.name
            ),
            'size', json_build_object (
              'id', ps.id,
              'sizeCode', ps."sizeCode",
              'size', ps.size,
              'name', ps.name
            )
          ),
          'itemTotal', (ci.quantity * COALESCE(p."salePrice", p.price))
        )
      ) AS items,
      SUM(ci.quantity * COALESCE(p."salePrice", p.price)) AS subtotal
    FROM carts c
      JOIN cart_items ci ON c.id = ci."cartId"
      JOIN products p ON ci."productId" = p.id
      JOIN product_groups pg ON p."productGroupId" = pg.id
      JOIN product_sizes ps ON ci."productId" = ps."productId" and ci."sizeId" = ps.id
    WHERE c."userId" = $1
    GROUP BY c.id, c."userId";
  `;

  const [queryRes]: UserCart[] = await prisma.$queryRawUnsafe(
    rawQuery,
    data.user.id,
  );

  return { cart: queryRes, error: null };
};

export default async function Cart() {
  const { cart, error } = await getUserCart();

  if (error) {
    return <CartAuthenticate />;
  }

  if (!cart) {
    return <CartEmpty />;
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] items-start lg:gap-20 mt-4 lg:mt-20 relative">
        <div className="flex flex-col lg:gap-4 lg:mb-10">
          <CartItems cartItems={cart.items} cartId={cart.id} />
        </div>

        <div className="bg-gray-100 p-5 lg:sticky lg:top-32 self-start">
          <CartSummary total={cart.subtotal} />
        </div>
      </div>
    </div>
  );
}
