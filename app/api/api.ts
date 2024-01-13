import {
  type QueryParams,
  appendQueryParams,
} from '@estore/utils/query-params/query-params';

import { API_PATHS } from './api-paths';

const DATA_API_URL = process.env.DATA_API_URL;
const DATA_API_KEY = process.env.DATA_API_KEY;

if (!DATA_API_URL || !DATA_API_KEY) {
  throw new Error('DATA_API_URL and DATA_API_KEY must be defined');
}

const commonHeaders = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': DATA_API_KEY,
  'X-RapidAPI-Host': DATA_API_URL,
};

const commonQueryParams = {
  lang: 'en',
  country: 'us',
};

const fetcher = async (url: URL, options: RequestInit = {}) => {
  return (
    await fetch(url, {
      ...options,
      headers: { ...options.headers, ...commonHeaders },
    })
  ).json();
};

export const API = {
  get: <T>(
    path: API_PATHS,
    query: QueryParams = {},
    headers: HeadersInit = {},
  ): Promise<T> => {
    let url = new URL(`https://${DATA_API_URL}${path}`);

    url = appendQueryParams(url, {
      ...commonQueryParams,
      ...query,
    });

    return fetcher(url, { method: 'GET', headers });
  },
};
