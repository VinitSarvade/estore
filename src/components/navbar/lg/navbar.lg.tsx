'use client';

import Link from 'next/link';

import { Category } from '@estore/types/category';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

interface NavbarProps {
  categories: Category[];
}

export default function NavbarLG({ categories }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="justify-center">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {categories.map((category) => (
          <NavigationMenuItem key={category.key}>
            {category.subCategories && (
              <>
                <NavigationMenuTrigger>
                  {category?.name?.toLowerCase()}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-wrap justify-center w-screen max-h-[calc(100vh-5rem)] p-4 overflow-x-auto">
                    {category.subCategories.map((subCategoryL1) => (
                      <NavigationMenuListItem
                        className="flex-1"
                        key={subCategoryL1.key}
                        title={subCategoryL1.name}
                        href={`/products/${subCategoryL1.key}`}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}

            {!category.subCategories && (
              <Link
                key={category.key}
                href={`/products/${category.key}`}
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  {category?.name?.toLowerCase()}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
