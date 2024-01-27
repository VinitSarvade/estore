'use client';

import Link from 'next/link';
import { useState } from 'react';

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
  { title: 'categories', href: '/', icon: StretchHorizontalIcon } as const,
  { title: 'Wishlist', href: '/', icon: HeartIcon } as const,
  { title: 'Card', href: '/', icon: ShoppingCartIcon } as const,
  { title: 'Account', href: '/', icon: UserRoundIcon } as const,
];

function BottomNav(props: NavbarProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="bottom-nav" data-testid="bottom-nav">
      <div className="h-12 xs:h-16 flex justify-around bg-gray-800 rounded-full p-1 relative">
        {MenuItems.map((item, idx) => (
          <Link
            className={cn(
              'menu-item flex flex-1 justify-center items-center text-gray-400 rounded-full z-10',
              active === idx && 'active',
            )}
            key={item.title}
            href={item.href}
            onClick={() => setActive(idx)}
            data-testid="menu-item"
          >
            {
              <item.icon
                strokeWidth={active === idx ? 2.5 : 1.75}
                fill={active === idx ? 'white' : 'none'}
              />
            }
          </Link>
        ))}
        <div
          className="indicator rounded-full bg-primary"
          data-testid="indicator"
          data-active={active}
        />
      </div>
    </div>
  );
}

export default BottomNav;
