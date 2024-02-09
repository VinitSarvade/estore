import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'bun:test';

import { getDiscountPercentage } from '@/lib/utils/discount/discount';

import ProductListItem from './product-list-item';

describe('ProductListItem', () => {
  const productGrp = {
    id: 1,
    name: 'Sample Product Group',
    code: 'sample-group-code',
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
  };

  afterEach(cleanup);

  it('should render the product name', () => {
    const { getByText } = render(<ProductListItem productGroup={productGrp} />);
    const productNameElement = getByText(productGrp.name);

    expect(productNameElement).toBeTruthy();
  });

  it('should render the product image', () => {
    const { getByAltText } = render(
      <ProductListItem productGroup={productGrp} />,
    );
    const productImageElement = getByAltText(productGrp.name);

    expect(productImageElement).toBeTruthy();
    expect(productImageElement.getAttribute('src')).toContain(
      encodeURIComponent(productGrp.Products[0].ProductImages[0].image),
    );
  });

  it('should render the product price', () => {
    const { getByText } = render(<ProductListItem productGroup={productGrp} />);
    const productPriceElement = getByText(productGrp.Products[0].price);

    expect(productPriceElement).toBeTruthy();
  });

  it('should render the discount badge if sale price is available', () => {
    const { getByText } = render(<ProductListItem productGroup={productGrp} />);
    const discountPer = getDiscountPercentage(
      productGrp.Products[0].price,
      productGrp.Products[0].salePrice,
    );
    const discountBadgeElement = getByText(discountPer);

    expect(discountBadgeElement).toBeTruthy();
  });
});
