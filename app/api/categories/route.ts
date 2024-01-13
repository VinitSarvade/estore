import { APICategory } from '@estore/types/category';

import { API } from '../api';
import { API_PATHS } from '../api-paths';
import { normalizeCategoryKeys } from './utils';

export const GET = async () => {
  const response = await API.get<APICategory[]>(API_PATHS.CATEGORIES);
  return Response.json(normalizeCategoryKeys(response));
};
