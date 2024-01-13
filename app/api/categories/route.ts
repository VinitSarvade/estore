import { API } from '@api/api';
import { API_PATHS } from '@api/api-paths';

import { APICategory } from '@estore/types/category';

import { normalizeCategoryKeys } from './utils';

export const GET = async () => {
  const response = await API.get<APICategory[]>(API_PATHS.CATEGORIES);
  return Response.json(normalizeCategoryKeys(response));
};
