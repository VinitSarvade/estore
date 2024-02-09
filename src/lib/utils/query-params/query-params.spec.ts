import { describe, expect, it } from 'bun:test';

import {
  appendQueryParams,
  getQueryParamsFromSearchParams,
} from './query-params';

describe('appendQueryParams', () => {
  it('should append query param to url', () => {
    const url = new URL('https://example.com');
    const queryParams = { foo: 'bar' };

    const result = appendQueryParams(url, queryParams);

    expect(result.searchParams.get('foo')).toEqual('bar');
  });

  it('should append multiple query params to url', () => {
    const url = new URL('https://example.com');
    const queryParams = { foo: 'bar', baz: 'qux' };

    const result = appendQueryParams(url, queryParams);

    expect(result.searchParams.get('foo')).toEqual('bar');
    expect(result.searchParams.get('baz')).toEqual('qux');
  });

  it('should append array query params to url', () => {
    const url = new URL('https://example.com');
    const queryParams = { fruits: ['apple', 'banana', 'orange'] };

    const result = appendQueryParams(url, queryParams);

    expect(result.search).toContain('fruits=apple');
    expect(result.search).toContain('fruits=banana');
    expect(result.search).toContain('fruits=orange');
  });
});

describe('getQueryParamsFromSearchParams', () => {
  it('should return an empty object if searchParams is empty', () => {
    const searchParams = new URLSearchParams('');
    const result = getQueryParamsFromSearchParams(searchParams);
    expect(result).toEqual({});
  });

  it('should return an object with single query param', () => {
    const searchParams = new URLSearchParams('foo=bar');
    const result = getQueryParamsFromSearchParams(searchParams);
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should return an object with multiple query params', () => {
    const searchParams = new URLSearchParams('foo=bar&baz=qux');
    const result = getQueryParamsFromSearchParams(searchParams);
    expect(result).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should return an object with array query params', () => {
    const searchParams = new URLSearchParams(
      'fruits=apple&fruits=banana&fruits=orange',
    );
    const result = getQueryParamsFromSearchParams(searchParams);
    expect(result).toEqual({ fruits: ['apple', 'banana', 'orange'] });
  });
});
