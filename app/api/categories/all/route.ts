import { Prisma } from '@prisma/client';

import { prisma } from '@estore/prisma';

import { buildNestedStructure } from '../utils';

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    const nestedCategories = buildNestedStructure(categories);
    return Response.json(nestedCategories);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        { error: error.message, code: error.code, meta: error.meta },
        { status: 400 },
      );
    }

    return Response.json(
      { error: 'Error fetching categories' },
      { status: 500 },
    );
  }
};
