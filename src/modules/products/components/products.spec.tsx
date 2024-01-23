import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Products from './products';

const products = [
  {
    id: 1,
    name: 'Sample Product Group 1',
    code: 'sample-group-code-1',
    Products: [
      {
        id: 1,
        code: 'sample-code',
        name: 'Sample Product',
        ProductImages: [
          { id: 1, image: '/sample-image-url', thumbnail: '/sample-image-url' },
        ],
        price: 19.9,
        salePrice: 9.9,
        ProductAttributes: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Sample Product Group 2',
    code: 'sample-group-code-2',
    Products: [
      {
        id: 1,
        code: 'sample-code',
        name: 'Sample Product',
        ProductImages: [
          { id: 1, image: '/sample-image-url', thumbnail: '/sample-image-url' },
        ],
        price: 19.9,
        salePrice: 9.9,
        ProductAttributes: [],
      },
    ],
  },
];

describe('Products', () => {
  const { baseElement, getAllByTestId } = render(
    <Products products={products} />,
  );
  it('should render successfully', () => {
    expect(baseElement).toBeTruthy();
  });

  it('should render the correct number of products', () => {
    const productItems = getAllByTestId('product-item');
    expect(productItems.length).toBe(products.length);
  });
});
