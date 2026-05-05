import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarLockBanner } from '../../src/components/SidebarLockBanner';

function setup(overrides = {}) {
  const props = {
    lockedByName: 'Red Bear',
    lastEditedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    onSteal: vi.fn(),
    ...overrides,
  };
  render(<SidebarLockBanner {...props} />);
  return props;
}

describe('SidebarLockBanner', () => {
  it('renders the name of who is editing', () => {
    setup();
    expect(screen.getByText(/Red Bear/)).toBeInTheDocument();
  });

  it('shows last edited time', () => {
    setup();
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  it('has a Steal edit button', () => {
    setup();
    expect(screen.getByRole('button', { name: /steal edit/i })).toBeInTheDocument();
  });

  it('calls onSteal when Steal edit is clicked', () => {
    const { onSteal } = setup();
    fireEvent.click(screen.getByRole('button', { name: /steal edit/i }));
    expect(onSteal).toHaveBeenCalledOnce();
  });
});
