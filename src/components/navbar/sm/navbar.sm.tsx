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

import './navbar.mobile.scss';

export interface NavbarProps {}

const MenuItems = [
  { title: 'Home', href: '/', icon: HomeIcon } as const,
  { title: 'categories', href: '/', icon: StretchHorizontalIcon } as const,
  { title: 'Wishlist', href: '/', icon: HeartIcon } as const,
  { title: 'Card', href: '/', icon: ShoppingCartIcon } as const,
  { title: 'Account', href: '/', icon: UserRoundIcon } as const,
];

function NavbarSM(props: NavbarProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="fixed bottom-0 px-2 pb-3 pt-8 w-full bg-gradient-to-b from-transparent to-white z-20">
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
          data-active={active}
        />
      </div>
    </div>
  );
}

export default NavbarSM;
