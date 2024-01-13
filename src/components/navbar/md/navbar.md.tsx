import Link from 'next/link';

import { Category } from '@estore/types/category';

interface NavbarTabletProps {
  categories: Category[];
}

export default function NavbarMD({ categories }: NavbarTabletProps) {
  return (
    <div className="flex gap-3 h-14 items-center px-3 max-w-full overflow-x-auto">
      <div
        key="home"
        className="capitalize whitespace-nowrap flex flex-1 shrink-0 px-2 justify-center border border-gray-400 rounded-sm"
      >
        <Link href="/">Home</Link>
      </div>
      {categories.map((category) => (
        <div
          key={category.key}
          className="capitalize whitespace-nowrap flex flex-1 shrink-0 px-2 justify-center border border-gray-400 rounded-sm"
        >
          <Link href={`/products/${category.tags?.at(0)}`}>
            {category.name.toLowerCase()}
          </Link>
        </div>
      ))}
    </div>
  );
}
