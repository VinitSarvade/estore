'use client';

import { useRouter } from 'next/navigation';

import { LogOutIcon } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export default function Signout() {
  const router = useRouter();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex place-items-center" onClick={handleSignout}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </div>
  );
}
