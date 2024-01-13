'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

const blockLinks = 'flex flex-1 items-center h-full justify-center';

interface NavbarLinkProps {
  name: string;
  tags: string[];
}

export default function NavbarLink({ name, tags }: NavbarLinkProps) {
  const currentRoute = usePathname();
  const link = `/products/${tags?.at(0)}`;
  const isActive = currentRoute === link;
  return (
    <div className={cn('menu-item ', blockLinks, isActive && 'active')}>
      <Link href={link} className={blockLinks}>
        {name.toLowerCase()}
      </Link>
    </div>
  );
}
