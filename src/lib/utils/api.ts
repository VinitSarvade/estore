import {
  QueryParams,
  appendQueryParams,
} from '@/lib/utils/query-params/query-params';

const API_URL = process.env.API_URL || 'http://localhost:4200/api';

export const API = {
  get: async <T>(path: `/${string}`, query: QueryParams = {}): Promise<T> => {
    const url = appendQueryParams(new URL(`${API_URL}${path}`), query);
    return (await fetch(url.toString())).json();
  },
};
