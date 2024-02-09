import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, mock } from 'bun:test';

import BottomNav from './bottom-nav';

mock.module('next/navigation', () => {
  const original = import('next/navigation');
  return {
    ...original,
    usePathname: () => '/categories',
  };
});

describe('BottomNav', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<BottomNav />);
    const bottomNavElement = getByTestId('bottom-nav');
    expect(bottomNavElement).toBeTruthy();
  });

  it('should highlight the active menu item', () => {
    const { getByTestId, getAllByTestId } = render(<BottomNav />);
    const menuItems = getAllByTestId('menu-item');
    const indicator = getByTestId('indicator');

    fireEvent.click(menuItems[1]);

    expect([...menuItems[1].classList.values()]).toContain('active');
  });
});
