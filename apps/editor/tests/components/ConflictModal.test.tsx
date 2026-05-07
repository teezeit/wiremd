import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConflictModal } from '../../src/components/ConflictModal';

function setup(overrides = {}) {
  const props = {
    isOpen: true,
    onLoadShared: vi.fn(),
    onKeepLocal: vi.fn(),
    ...overrides,
  };
  render(<ConflictModal {...props} />);
  return props;
}

describe('ConflictModal', () => {
  it('renders nothing when closed', () => {
    setup({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows Load shared link button', () => {
    setup();
    expect(screen.getByRole('button', { name: /load shared/i })).toBeInTheDocument();
  });

  it('shows Keep my work button', () => {
    setup();
    expect(screen.getByRole('button', { name: /keep my work/i })).toBeInTheDocument();
  });

  it('calls onLoadShared when Load shared is clicked', () => {
    const { onLoadShared } = setup();
    fireEvent.click(screen.getByRole('button', { name: /load shared/i }));
    expect(onLoadShared).toHaveBeenCalledOnce();
  });

  it('calls onKeepLocal when Keep my work is clicked', () => {
    const { onKeepLocal } = setup();
    fireEvent.click(screen.getByRole('button', { name: /keep my work/i }));
    expect(onKeepLocal).toHaveBeenCalledOnce();
  });

  it('calls onKeepLocal on Escape (safe default)', () => {
    const { onKeepLocal } = setup();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onKeepLocal).toHaveBeenCalledOnce();
  });

  it('does not have a backdrop dismiss (user must choose)', () => {
    const { onLoadShared, onKeepLocal } = setup();
    // No backdrop testid — user can't dismiss without choosing
    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();
    expect(onLoadShared).not.toHaveBeenCalled();
    expect(onKeepLocal).not.toHaveBeenCalled();
  });
});
