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
