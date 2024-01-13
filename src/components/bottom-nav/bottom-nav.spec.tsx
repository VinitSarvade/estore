import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BottomNav from './bottom-nav';

describe('BottomNav', () => {
  render(<BottomNav />);
  it('should render successfully', () => {
    const bottomNavElement = screen.getByTestId('bottom-nav');
    expect(bottomNavElement).toBeTruthy();
  });

  it('should highlight the active menu item', () => {
    const menuItems = screen.getAllByTestId('menu-item');
    const indicator = screen.getByTestId('indicator');

    fireEvent.click(menuItems[1]);

    expect(menuItems[1].classList).toContain('active');
    expect(indicator.attributes.getNamedItem('data-active')?.value).toEqual(
      '1',
    );
  });
});
