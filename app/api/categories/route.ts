import { Category } from '@prisma/client';

import { prisma } from '@estore/prisma';

export const GET = async () => {
  const response: Category[] = await prisma.category.findMany({
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
  return Response.json(response ?? []);
};
