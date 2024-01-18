import { NextRequest } from 'next/server';

import { prisma } from '@estore/prisma';
import { Product } from '@estore/types/product';
import { getQueryParamsFromSearchParams } from '@estore/utils/query-params/query-params';

import { API } from '../../api';
import { API_PATHS } from '../../api-paths';

interface RequestParams {
  category: string;
}

export const GET = async (
  _: NextRequest,
  { params: { category: categoryValue } }: { params: RequestParams },
) => {
  const category = await prisma.category.findFirst({
    where: {
      value: categoryValue,
    },
  });

  if (!category) {
    return Response.json([]);
  }

  const query = getQueryParamsFromSearchParams(
    new URLSearchParams({ categories: category.tagCodes[0] }),
  );
  const response = await API.get<Product[]>(API_PATHS.PRODUCTS, query);
  return Response.json(response);
};
