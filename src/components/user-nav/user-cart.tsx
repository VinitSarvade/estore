import { cookies } from 'next/headers';

import { ShoppingCart } from 'lucide-react';

import { createClient } from '@/lib/supabase/server-client';
import { prisma } from '@estore/prisma';

export default async function UserCart() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let count = 0;
  const { data, error } = await supabase.auth.getUser();

  if (!error) {
    const { user } = data;
    count = await prisma.cartItem.count({
      where: {
        Cart: {
          userId: user.id,
        },
      },
    });
  }

  return (
    <div className="relative">
      <ShoppingCart
        size={28}
        strokeWidth={1.25}
        className="cursor-pointer stroke-muted-foreground"
      />
      {count > 0 && (
        <span className="absolute top-0 right-0 translate-x-2 w-4 h-4 text-xs leading-normal rounded-full bg-destructive text-destructive-foreground flex place-items-center place-content-center">
          {count}
        </span>
      )}
    </div>
  );
}
