import { API_PATHS } from './api-paths';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

if (!API_URL || !API_KEY) {
  throw new Error('API_URL and API_KEY must be defined');
}

const commonHeaders = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_URL,
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
  get: (
    path: API_PATHS,
    query: Record<string, string> = {},
    headers: HeadersInit = {},
  ) => {
    const url = new URL(`https://${API_URL}${path}`);

    const queryParams: Record<string, string> = {
      ...commonQueryParams,
      ...query,
    };

    Object.keys(queryParams).forEach((key) => {
      url.searchParams.append(key, queryParams[key]);
    });

    return fetcher(url, { method: 'GET', headers });
  },
};
