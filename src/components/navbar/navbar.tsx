'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

import { Category } from '@estore/types/category';

import './navbar.scss';

interface NavbarTabletProps {
  categories: Category[];
}

const blockLinks = 'flex flex-1 items-center h-full justify-center';

// const homeLink = { key: 'navbar-home', name: 'Home', tags: undefined };

export default function Navbar({ categories }: NavbarTabletProps) {
  const currentRoute = usePathname();
  const categoriesWithHome = [/* homeLink, */ ...categories];

  return (
    <div className="navbar py-1">
      {categoriesWithHome.map(({ key, name, tags }) => {
        // const link = key === homeLink.key ? '/' : `/products/${tags?.at(0)}`;
        const link = `/products/${tags?.at(0)}`;
        const isActive = currentRoute === link;

        return (
          <div
            key={key}
            className={cn('menu-item ', blockLinks, isActive && 'active')}
          >
            <Link href={link} className={blockLinks}>
              {name.toLowerCase()}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
