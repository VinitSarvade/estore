import { render } from '@testing-library/react';
import { afterEach } from 'node:test';
import { describe, expect, it } from 'vitest';

import { Product } from '@estore/types/product';

import Products from './products';

const products = [
  {
    name: 'Sample Product',
    images: [{ baseUrl: '/sample-image-url', url: '/sample-image-url' }],
    price: {
      formattedValue: '19.99',
      currencyIso: '',
      value: 19.99,
      priceType: '',
      type: 'RED',
    },
    whitePrice: {
      formattedValue: '29.99',
      currencyIso: '',
      value: 29.99,
      priceType: '',
      type: 'WHITE',
    },
    redPrice: {
      formattedValue: '19.99',
      currencyIso: '',
      value: 19.99,
      priceType: '',
      type: 'RED',
    },
    concept: ['Concept 1', 'Concept 2'],
  },
  {
    name: 'Sample Product',
    images: [{ baseUrl: '/sample-image-url', url: '/sample-image-url' }],
    price: {
      formattedValue: '19.99',
      currencyIso: '',
      value: 19.99,
      priceType: '',
      type: 'RED',
    },
    whitePrice: {
      formattedValue: '29.99',
      currencyIso: '',
      value: 29.99,
      priceType: '',
      type: 'WHITE',
    },
    redPrice: {
      formattedValue: '19.99',
      currencyIso: '',
      value: 19.99,
      priceType: '',
      type: 'RED',
    },
    concept: ['Concept 1', 'Concept 2'],
  },
];

describe('Products', () => {
  const { baseElement, getAllByTestId } = render(
    <Products products={products as Product[]} />,
  );
  it('should render successfully', () => {
    expect(baseElement).toBeTruthy();
  });

  it('should render the correct number of products', () => {
    const productItems = getAllByTestId('product-item');
    expect(productItems.length).toBe(products.length);
  });
});
