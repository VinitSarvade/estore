'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { Prisma } from '@prisma/client';

import { createClient } from '@/lib/supabase/server-client';

export async function addToCart(productId: number, sizeId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.auth.getUser();

  if (error) {
    return { error };
  }

  const { user } = data;

  try {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        Product: {
          connect: { id: productId },
        },
        ProductSize: {
          connect: { id: sizeId },
        },
        Cart: {
          connectOrCreate: {
            where: { userId: user.id },
            create: { userId: user.id },
          },
        },
      },
    });
    revalidatePath('/cart', 'page');
    return revalidatePath('/products/details/[productCode]', 'page');
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const cart = await prisma.cart.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!cart) {
        return { error: 'Cart not found' };
      }

      await prisma.cartItem.update({
        data: {
          quantity: {
            increment: 1,
          },
        },
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
      });
      revalidatePath('/cart', 'page');
      return revalidatePath('/products/details/[productCode]', 'page');
    }

    return { error };
  }
}
