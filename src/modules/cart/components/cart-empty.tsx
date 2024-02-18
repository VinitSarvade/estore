import Image from 'next/image';

import emptyCart from './empty-cart.svg';

export default function CartEmpty() {
  return (
    <div className="flex flex-col gap-4 place-content-center place-items-center my-20 px-5">
      <Image src={emptyCart} alt="" unoptimized className="w-full lg:w-1/3" />

      <h2 className="text-2xl text-balance text-center">Your cart is empty!</h2>
    </div>
  );
}
