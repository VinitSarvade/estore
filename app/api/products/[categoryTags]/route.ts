import { NextRequest } from 'next/server';

import { Product } from '@estore/types/product';
import { getQueryParamsFromSearchParams } from '@estore/utils/query-params/query-params';

import { API } from '../../api';
import { API_PATHS } from '../../api-paths';

interface RequestParams {
  categoryTags: string;
}

export const GET = async (
  req: NextRequest,
  { params: { categoryTags } }: { params: RequestParams },
) => {
  const query = getQueryParamsFromSearchParams(
    new URLSearchParams({ categories: categoryTags }),
  );
  const response = await API.get<Product[]>(API_PATHS.PRODUCTS, query);
  return Response.json(response);
};
