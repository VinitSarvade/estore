import Image from 'next/image';

import { LogIn } from 'lucide-react';

import { AuthModal } from '@/modules/auth/components/auth.modal';

import authenticate from './authenticate.svg';

export default function CartAuthenticate() {
  return (
    <div className="flex flex-col gap-4 place-content-center place-items-center my-20 px-5">
      <Image
        src={authenticate}
        alt=""
        unoptimized
        className="w-full lg:w-2/3"
      />

      <h2 className="text-2xl text-balance text-center">
        Please sign in to view your cart!
      </h2>

      <AuthModal triggerClass="flex place-items-center gap-2 text-nowrap border px-4 py-2 rounded-md">
        <LogIn size={18} className="stroke-foreground" />
        Sign In
      </AuthModal>
    </div>
  );
}
