'use client';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

const blockLinks = 'flex flex-1 items-center h-full justify-center';

interface NavbarLinkProps {
  name: string;
  value: string;
}

export default function NavbarLink({ name, value }: NavbarLinkProps) {
  const currentRoute = usePathname();
  const link = `/products/${value}`;
  const isActive = currentRoute === link;

  return (
    <div className={cn('menu-item ', blockLinks, isActive && 'active')}>
      <Link href={link as Route} className={cn(blockLinks, 'px-5')}>
        {name.toLowerCase()}
      </Link>
    </div>
  );
}
