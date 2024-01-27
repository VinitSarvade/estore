import { ProductAttributes } from '@prisma/client';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductAttributesComponent from './product-attributes';

const mockAttributes = [
  { id: 1, name: 'Clothing style', value: ['Casual'] },
  { id: 2, name: 'Material', value: ['Cotton'] },
] as ProductAttributes[];

describe('ProductAttributesComponent', () => {
  it.skip('should render correctly with attributes', () => {
    const { debug } = render(
      <ProductAttributesComponent attributes={mockAttributes} />,
    );

    // Assert that the accordion items are rendered
    const accordionItems = screen.getAllByRole('button');
    expect(accordionItems).toHaveLength(2);

    const attributeNames = screen.getAllByTestId('attribute-name');
    const attributeValues = screen.getAllByTestId('attribute-value');

    expect(attributeNames).toHaveLength(2);
    expect(attributeValues).toHaveLength(2);

    expect(screen.getByText('Clothing style')).toBeTruthy();
    expect(screen.getByText('Casual')).toBeTruthy();
    expect(screen.getByText('Material')).toBeTruthy();
    expect(screen.getByText('Cotton')).toBeTruthy();
  });

  it('should render correctly without attributes', () => {
    render(<ProductAttributesComponent attributes={[]} />);

    // Assert that no accordion items are rendered
    const accordionItems = screen.queryAllByRole('button');
    expect(accordionItems).toHaveLength(0);

    // Assert that no attribute names and values are rendered
    const attributeNames = screen.queryAllByTestId('attribute-name');
    const attributeValues = screen.queryAllByTestId('attribute-value');
    expect(attributeNames).toHaveLength(0);
    expect(attributeValues).toHaveLength(0);
  });
});
