export type QueryParams = Record<string, string | string[]>;

export const appendQueryParams = (url: URL, queryParams: QueryParams) => {
  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        url.searchParams.append(key, item);
      });
      return;
    }

    url.searchParams.append(key, value);
  });

  return url;
};

export const getQueryParamsFromSearchParams = (
  searchParams: URLSearchParams,
) => {
  const queryParams: QueryParams = {};

  searchParams.forEach((value, key) => {
    if (queryParams[key]) {
      const existingValue = queryParams[key];
      if (Array.isArray(existingValue)) {
        queryParams[key] = existingValue.concat(value);
      } else {
        queryParams[key] = [existingValue, value];
      }
    } else {
      queryParams[key] = value;
    }
  });

  return queryParams;
};
