import { NextRequest } from 'next/server';

import { Prisma } from '@prisma/client';

import { prisma } from '@estore/prisma';

interface RequestParams {
  category: string;
}

export const GET = async (
  _: NextRequest,
  { params: { category: categoryValue } }: { params: RequestParams },
) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        value: {
          equals: categoryValue,
        },
      },
    });

    if (category === null) {
      Response.json(null, { status: 404 });
    }

    return Response.json(category);
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
