import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareModal } from '../../src/components/ShareModal';

function setup(overrides = {}) {
  const props = {
    isOpen: true,
    onClose: vi.fn(),
    onCopyLink: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
  render(<ShareModal {...props} />);
  return props;
}

describe('ShareModal', () => {
  it('renders nothing when closed', () => {
    setup({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside the modal', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', () => {
    const { onClose } = setup();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('has a close button that calls onClose', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders Copy Link button', () => {
    setup();
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
  });

  it('calls onCopyLink when Copy Link is clicked', async () => {
    const { onCopyLink } = setup();
    fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    expect(onCopyLink).toHaveBeenCalledOnce();
  });

  it('shows Live Collaboration section', () => {
    setup();
    expect(screen.getByText(/live collaboration/i)).toBeInTheDocument();
  });

  it('Start Live Session is disabled (v2 stub)', () => {
    setup();
    expect(screen.getByRole('button', { name: /start live session/i })).toBeDisabled();
  });
});
