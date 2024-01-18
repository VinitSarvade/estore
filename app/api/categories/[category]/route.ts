import { NextRequest } from 'next/server';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        path: {
          equals: categoryValue,
        },
      },
    });
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
