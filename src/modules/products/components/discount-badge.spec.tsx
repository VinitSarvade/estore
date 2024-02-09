import { render } from '@testing-library/react';
import { describe, expect, it } from 'bun:test';

import { getDiscountPercentage } from '@/lib/utils/discount/discount';

import DiscountBadge from './discount-badge';

describe('DiscountBadge', () => {
  it('should render the correct discount percentage', () => {
    const fullPrice = 100;
    const discountPrice = 80;

    const { getByText } = render(
      <DiscountBadge fullPrice={fullPrice} discountPrice={discountPrice} />,
    );

    const discountPercentageElement = getByText('20% off');
    expect(discountPercentageElement).toBeTruthy();
  });

  it('should round the discount percentage to the nearest whole number', () => {
    const fullPrice = 99;
    const discountPrice = 49;

    const { getByText } = render(
      <DiscountBadge fullPrice={fullPrice} discountPrice={discountPrice} />,
    );

    const discountPercentageElement = getByText(
      getDiscountPercentage(fullPrice, discountPrice),
    );
    expect(discountPercentageElement).toBeTruthy();
  });
});
