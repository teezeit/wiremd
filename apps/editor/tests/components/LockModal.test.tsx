import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LockModal } from '../../src/components/LockModal';

function setup(overrides = {}) {
  const props = {
    isOpen: true,
    lockedByName: 'Red Bear',
    lastEditorName: 'Red Bear',
    lastEditedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    onSteal: vi.fn().mockResolvedValue(undefined),
    onClose: vi.fn(),
    ...overrides,
  };
  render(<LockModal {...props} />);
  return props;
}

describe('LockModal', () => {
  it('renders nothing when closed', () => {
    setup({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows who is editing', () => {
    setup();
    expect(screen.getAllByText(/Red Bear/).length).toBeGreaterThan(0);
  });

  it('shows an avatar in the title for the person editing', () => {
    setup();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('avatar initials match lockedByName', () => {
    setup({ lockedByName: 'Red Bear' });
    expect(screen.getByTestId('avatar')).toHaveTextContent('RB');
  });

  it('shows last edited time', () => {
    setup();
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  it('has a Steal edit button', () => {
    setup();
    expect(screen.getByRole('button', { name: /steal edit/i })).toBeInTheDocument();
  });

  it('has a View only button', () => {
    setup();
    expect(screen.getByRole('button', { name: /view only/i })).toBeInTheDocument();
  });

  it('calls onSteal when Steal edit is clicked', async () => {
    const { onSteal } = setup();
    fireEvent.click(screen.getByRole('button', { name: /steal edit/i }));
    expect(onSteal).toHaveBeenCalledOnce();
  });

  it('calls onClose when View only is clicked', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: /view only/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose on Escape', () => {
    const { onClose } = setup();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes after steal', async () => {
    const onClose = vi.fn();
    const onSteal = vi.fn().mockResolvedValue(undefined);
    render(<LockModal isOpen={true} lockedByName="Red Bear" lastEditorName="Red Bear" lastEditedAt={new Date().toISOString()} onSteal={onSteal} onClose={onClose} />);
    await vi.waitFor(async () => {
      fireEvent.click(screen.getByRole('button', { name: /steal edit/i }));
    });
    await vi.waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
