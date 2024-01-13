import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductPrice from './product-price';

describe('ProductPrice', () => {
  it('should render the selling price', () => {
    const sellingPrice = '19.99';
    const { getByText } = render(
      <ProductPrice
        isDiscounted={false}
        sellingPrice={sellingPrice}
        fullPrice="29.99"
      />,
    );
    const sellingPriceElement = getByText(sellingPrice);

    expect(sellingPriceElement).toBeTruthy();
  });

  it('should render the full price with a line-through when discounted', () => {
    const fullPrice = '29.99';
    const { getByText } = render(
      <ProductPrice
        isDiscounted={true}
        sellingPrice="19.99"
        fullPrice={fullPrice}
      />,
    );
    const fullPriceElement = getByText(fullPrice);

    expect(fullPriceElement).toBeTruthy();
    expect(fullPriceElement.classList).toContain('line-through');
  });
});
