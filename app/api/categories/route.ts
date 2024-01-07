import { API } from '../api';
import { API_PATHS } from '../api-paths';

export const GET = async () => {
  const response = await API.get(API_PATHS.CATEGORIES);
  return Response.json(response);
};
