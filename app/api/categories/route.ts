import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
