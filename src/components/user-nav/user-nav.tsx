import { cookies } from 'next/headers';

import { LogIn } from 'lucide-react';

import { createClient } from '@/lib/supabase/server-client';
import { AuthModal } from '@/modules/auth/components/auth.modal';

import UserCart from './user-cart';
import UserDropDown from './user-dropdown';

export default async function UserNav() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  const isUserLoggedIn = !(error || !data?.user);

  if (!isUserLoggedIn) {
    return (
      <div className="px-5">
        <AuthModal triggerClass="flex place-items-center gap-2 text-nowrap">
          <LogIn size={18} className="stroke-foreground" />
          Sign In
        </AuthModal>
      </div>
    );
  }

  return (
    <div className="px-5 flex place-items-center gap-5">
      <UserCart />
      <UserDropDown user={data.user} />
    </div>
  );
}
