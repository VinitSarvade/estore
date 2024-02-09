'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  HeartIcon,
  HomeIcon,
  ShoppingCartIcon,
  StretchHorizontalIcon,
  UserRoundIcon,
} from 'lucide-react';

import { cn } from '@estore/utils/cn';

import './bottom-nav.scss';

interface NavbarProps {}

const MenuItems = [
  { title: 'Home', href: '/', icon: HomeIcon } as const,
  {
    title: 'categories',
    href: '/categories',
    icon: StretchHorizontalIcon,
    isActiveAlternateCheck: (path: string) => path.startsWith('/products'),
  } as const,
  { title: 'Wishlist', href: '/wishlist', icon: HeartIcon } as const,
  { title: 'Cart', href: '/cart', icon: ShoppingCartIcon } as const,
  { title: 'Account', href: '/account', icon: UserRoundIcon } as const,
];

function BottomNav(props: NavbarProps) {
  const path = usePathname();

  return (
    <div className="bottom-nav" data-testid="bottom-nav">
      <div className="h-12 xs:h-16 flex justify-around bg-gray-800 rounded-full p-1 relative">
        {MenuItems.map((item, idx) => {
          const activeItem =
            path === item.href || item.isActiveAlternateCheck?.(path);
          return (
            <Link
              className={cn(
                'menu-item flex flex-1 justify-center items-center text-gray-400 rounded-full z-10',
                activeItem && 'active',
              )}
              key={item.title}
              href={item.href}
              data-testid="menu-item"
            >
              {
                <item.icon
                  strokeWidth={activeItem ? 2.5 : 1.75}
                  fill={activeItem ? 'white' : 'none'}
                />
              }
            </Link>
          );
        })}
        <div
          className="indicator rounded-full bg-primary"
          data-testid="indicator"
        />
      </div>
    </div>
  );
}

export default BottomNav;
