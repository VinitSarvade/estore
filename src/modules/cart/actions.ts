'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import * as v from 'valibot';

import { createClient } from '@/lib/supabase/server-client';
import { prisma } from '@estore/prisma';

const updateCartItemSchema = v.object({
  cartId: v.number(),
  productId: v.number(),
  quantity: v.pipe(v.number(), v.integer(), v.minValue(0)),
});

export async function updateCartItem(formData: FormData) {
  const result = v.safeParse(updateCartItemSchema, {
    productId: parseInt(formData.get('productId')!.toString()),
    quantity: parseInt(formData.get('quantity')!.toString()),
    cartId: parseInt(formData.get('cartId')!.toString()),
  });

  if (!result.success) {
    return { error: result.issues };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.getUser();
  if (error) {
    return { error };
  }

  const { cartId, productId, quantity } = result.output;

  if (quantity === 0) {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    return revalidatePath('/cart', 'page');
  }

  await prisma.cartItem.update({
    where: {
      cartId_productId: { cartId, productId },
    },
    data: {
      quantity: quantity,
    },
  });

  return revalidatePath('/cart', 'page');
}

export async function placeOrder() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) {
    return { error };
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      Items: {
        include: {
          Product: {
            include: {
              ProductSizes: true,
              Category: true,
              ProductGroup: true,
              ProductImages: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return { error: 'Cart not found' };
  }

  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: {
        userId: user.id,
        OrderItems: {
          createMany: {
            data: cart.Items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.Product.price,
              sizeId: item.sizeId,
              subtotal: item.Product.price * item.quantity,
              productSnapshot: item.Product,
            })),
          },
        },
      },
      include: {
        OrderItems: true,
      },
    }),
    prisma.cart.delete({
      where: {
        id: cart.id,
      },
    }),
  ]);

  revalidatePath('/', 'layout');
  return order;
}
