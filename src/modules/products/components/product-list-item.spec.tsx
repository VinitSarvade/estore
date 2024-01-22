import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { getDiscountPercentage } from '@/lib/utils/discount/discount';
import { Product } from '@estore/types/product';

import ProductListItem from './product-list-item';

describe('ProductListItem', () => {
  const product = {
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
  };

  afterEach(cleanup);

  it('should render the product name', () => {
    const { getByText } = render(
      <ProductListItem productGroup={product as Product} />,
    );
    const productNameElement = getByText(product.name);

    expect(productNameElement).toBeTruthy();
  });

  it('should render the product image', () => {
    const { getByAltText } = render(
      <ProductListItem productGroup={product as Product} />,
    );
    const productImageElement = getByAltText(product.name);

    expect(productImageElement).toBeTruthy();
    expect(productImageElement.getAttribute('src')).toContain(
      encodeURIComponent(product.images[0].baseUrl),
    );
  });

  it('should render the product concept', () => {
    const { getByText } = render(
      <ProductListItem productGroup={product as Product} />,
    );
    const productConceptElement = getByText(product.concept.join(', '));

    expect(productConceptElement).toBeTruthy();
  });

  it('should render the product price', () => {
    const { getByText } = render(
      <ProductListItem productGroup={product as Product} />,
    );
    const productPriceElement = getByText(product.price.formattedValue);

    expect(productPriceElement).toBeTruthy();
  });

  it('should render the discount badge if red price is available', () => {
    const { getByText } = render(
      <ProductListItem productGroup={product as Product} />,
    );
    const discountPer = getDiscountPercentage(
      product.whitePrice.value,
      product.redPrice.value,
    );
    const discountBadgeElement = getByText(discountPer);

    expect(discountBadgeElement).toBeTruthy();
  });
});
