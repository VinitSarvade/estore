import { describe, expect, it } from 'bun:test';

import { getDiscountPercentage } from './discount';

describe('getDiscountPercentage', () => {
  it('should calculate the correct discount percentage', () => {
    const fullPrice = 100;
    const discountedPrice = 80;
    const expectedPercentage = '20% off';

    const result = getDiscountPercentage(fullPrice, discountedPrice);

    expect(result).toEqual(expectedPercentage);
  });

  it('should handle zero discounted price', () => {
    const fullPrice = 100;
    const discountedPrice = 0;
    const expectedPercentage = '100% off';

    const result = getDiscountPercentage(fullPrice, discountedPrice);

    expect(result).toEqual(expectedPercentage);
  });

  it('should handle full price equal to discounted price', () => {
    const fullPrice = 100;
    const discountedPrice = 100;
    const expectedPercentage = '0% off';

    const result = getDiscountPercentage(fullPrice, discountedPrice);

    expect(result).toEqual(expectedPercentage);
  });
});
