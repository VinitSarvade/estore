import Image from 'next/image';
import Link from 'next/link';

import { buildNestedCategories } from '@/lib/utils/categories/categories.util';
import { prisma } from '@estore/prisma';

import babyIllustration from './assets/baby.svg';
import beautyIllustration from './assets/beauty.svg';
import dividedIllustration from './assets/divided.svg';
import homeIllustration from './assets/home.svg';
import kidsIllustration from './assets/kids.svg';
import ladiesIllustration from './assets/ladies.svg';
import menIllustration from './assets/men.svg';
import sportIllustration from './assets/sports.svg';

const CategoryIllustrations: Record<number, any> = {
  1: ladiesIllustration,
  342: dividedIllustration,
  374: menIllustration,
  504: babyIllustration,
  682: kidsIllustration,
  981: homeIllustration,
  1120: beautyIllustration,
  1171: sportIllustration,
};

async function getCategories() {
  const categories = await prisma.category.findMany({
    where: {
      path: {
        not: {
          contains: '/',
        },
      },
      tagCodes: {
        isEmpty: false,
      },
    },
    orderBy: { id: 'asc' },
  });
  return buildNestedCategories(categories);
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="px-3 pt-5 grid grid-cols-2 gap-x-5 gap-y-1">
      {categories.map((category, idx) => (
        <Link href={`/products/${category.value}`} key={category.id}>
          <div className="relative h-40">
            <Image
              src={CategoryIllustrations[category.id]}
              alt={category.name}
              className="object-contain object-bottom"
              priority={idx < 6}
              unoptimized
              fill
            />
          </div>
          <h2 className="mt-2 text-lg text-center">{category.name}</h2>
        </Link>
      ))}
    </div>
  );
}
