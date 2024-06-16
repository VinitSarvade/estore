import { describe, expect, it } from 'bun:test';

import { getProductCodeAndNameFromSlug, getSlugFromCodeAndName } from './url';

describe('getProductCodeAndNameFromSlug', () => {
  it('should return the correct code and name from a valid slug', () => {
    const slug = 'product-name-123456';
    const [code, name] = getProductCodeAndNameFromSlug(slug);
    expect(code).toBe('123456');
    expect(name).toBe('product name');
  });

  it('should throw an error for an invalid slug', () => {
    const slug = 'invalid_slug';
    expect(() => getProductCodeAndNameFromSlug(slug)).toThrow('Invalid slug');
  });

  it('should handle slugs with multiple hyphens in the name', () => {
    const slug = 'product-name-with-hyphens-123456';
    const [code, name] = getProductCodeAndNameFromSlug(slug);
    expect(code).toBe('123456');
    expect(name).toBe('product name with hyphens');
  });

  it('should handle slugs with numbers in the name', () => {
    const slug = 'product-name-123-456789';
    const [code, name] = getProductCodeAndNameFromSlug(slug);
    expect(code).toBe('456789');
    expect(name).toBe('product name 123');
  });
});

describe('getSlugFromCodeAndName', () => {
  it('should return the correct slug for valid input', () => {
    const code = '123456';
    const name = 'Product Name';
    const expectedSlug = 'product-name-123456';
    const slug = getSlugFromCodeAndName(code, name);
    expect(slug).toBe(expectedSlug);
  });

  it('should handle names with spaces and convert to lowercase', () => {
    const code = 'abc123';
    const name = 'Product With Spaces';
    const expectedSlug = 'product-with-spaces-abc123';
    const slug = getSlugFromCodeAndName(code, name);
    expect(slug).toBe(expectedSlug);
  });

  it('should handle names with special characters', () => {
    const code = 'xyz789';
    const name = 'Product!@#$%^&*()';
    const expectedSlug = 'product-xyz789';
    const slug = getSlugFromCodeAndName(code, name);
    expect(slug).toBe(expectedSlug);
  });

  it('should handle empty code', () => {
    const code = '';
    const name = 'Product Name';
    const expectedSlug = 'product-name-';
    const slug = getSlugFromCodeAndName(code, name);
    expect(slug).toBe(expectedSlug);
  });

  it('should handle empty name', () => {
    const code = '123456';
    const name = '';
    const expectedSlug = '-123456';
    const slug = getSlugFromCodeAndName(code, name);
    expect(slug).toBe(expectedSlug);
  });
});
