import { ProductAttributes } from '@prisma/client';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'bun:test';

import { default as ProductAttributesComponent } from './product-attributes';

const mockAttributes = [
  { id: 1, name: 'Clothing style', value: ['Casual'] },
  { id: 2, name: 'Material', value: ['Cotton'] },
] as ProductAttributes[];

describe('ProductAttributesComponent', () => {
  it.skip('should render correctly with attributes', () => {
    const { getAllByRole, getAllByTestId, getByText } = render(
      <ProductAttributesComponent attributes={mockAttributes} />,
    );

    // Assert that the accordion items are rendered
    const accordionItems = getAllByRole('button');
    expect(accordionItems).toHaveLength(2);

    const attributeNames = getAllByTestId('attribute-name');
    const attributeValues = getAllByTestId('attribute-value');

    expect(attributeNames).toHaveLength(2);
    expect(attributeValues).toHaveLength(2);

    expect(getByText('Clothing style')).toBeTruthy();
    expect(getByText('Casual')).toBeTruthy();
    expect(getByText('Material')).toBeTruthy();
    expect(getByText('Cotton')).toBeTruthy();
  });

  it('should render correctly without attributes', () => {
    const { queryAllByRole, queryAllByTestId } = render(
      <ProductAttributesComponent attributes={[]} />,
    );

    // Assert that no accordion items are rendered
    const accordionItems = queryAllByRole('button');
    expect(accordionItems).toHaveLength(0);

    // Assert that no attribute names and values are rendered
    const attributeNames = queryAllByTestId('attribute-name');
    const attributeValues = queryAllByTestId('attribute-value');
    expect(attributeNames).toHaveLength(0);
    expect(attributeValues).toHaveLength(0);
  });
});
