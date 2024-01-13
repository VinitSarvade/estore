import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Navbar } from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navbar categories={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
