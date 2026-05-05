import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ShareModal } from '../../src/components/ShareModal';

const onClose = vi.fn();
const onGetLink = vi.fn(() => 'https://wiremd.com/editor/#code=ABC123');
const onCopyLink = vi.fn().mockResolvedValue(undefined);

function setup(overrides = {}) {
  const props = { isOpen: true, onClose, onGetLink, onCopyLink, ...overrides };
  render(<ShareModal {...props} />);
  return props;
}

beforeEach(() => {
  vi.useFakeTimers();
  onClose.mockClear();
  onGetLink.mockClear();
  onCopyLink.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

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
    setup();
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside the modal', () => {
    setup();
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', () => {
    setup();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('has a close button that calls onClose', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows Live Collaboration section', () => {
    setup();
    expect(screen.getByText(/live collaboration/i)).toBeInTheDocument();
  });

  it('Start Live Session is disabled (stub)', () => {
    setup();
    expect(screen.getByRole('button', { name: /start live session/i })).toBeDisabled();
  });
});

describe('ShareModal — shareable link flow', () => {
  // Story 1: initial state
  it('shows Export to link button initially', () => {
    setup();
    expect(screen.getByRole('button', { name: /export to link/i })).toBeInTheDocument();
  });

  it('does not show URL field before Export is clicked', () => {
    setup();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('does not show Copy link button before Export is clicked', () => {
    setup();
    expect(screen.queryByRole('button', { name: /copy link/i })).not.toBeInTheDocument();
  });

  // Story 2: generating state
  it('shows Generating… immediately after clicking Export to link', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
  });

  it('calls onGetLink when Export to link is clicked', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(onGetLink).toHaveBeenCalledOnce();
  });

  // Story 3 & 4: ready state
  it('shows URL field after generating', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('URL field contains the generated URL', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(screen.getByRole('textbox')).toHaveValue('https://wiremd.com/editor/#code=ABC123');
  });

  it('URL field is read-only', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('shows Copy link button after generating', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
  });

  // Story 5: copy confirmation
  it('calls onCopyLink with the generated URL when Copy link is clicked', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    });
    expect(onCopyLink).toHaveBeenCalledWith('https://wiremd.com/editor/#code=ABC123');
  });

  it('shows copied confirmation after Copy link is clicked', async () => {
    setup();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    });
    expect(screen.getByText(/copied/i)).toBeInTheDocument();
  });

  // Story 6: reset on close/reopen
  it('resets to idle state when modal is closed and reopened', async () => {
    const { rerender } = render(
      <ShareModal isOpen={true} onClose={onClose} onGetLink={onGetLink} onCopyLink={onCopyLink} />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<ShareModal isOpen={false} onClose={onClose} onGetLink={onGetLink} onCopyLink={onCopyLink} />);
    rerender(<ShareModal isOpen={true} onClose={onClose} onGetLink={onGetLink} onCopyLink={onCopyLink} />);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export to link/i })).toBeInTheDocument();
  });
});

describe('ShareModal — live session', () => {
  it('Start Live Session is disabled when no onStartSession prop', () => {
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} />);
    expect(screen.getByRole('button', { name: /start live session/i })).toBeDisabled();
  });

  it('Start Live Session is enabled when onStartSession is provided', () => {
    render(
      <ShareModal
        isOpen={true}
        onClose={vi.fn()}
        onGetLink={vi.fn(() => '')}
        onCopyLink={vi.fn()}
        onStartSession={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(screen.getByRole('button', { name: /start live session/i })).not.toBeDisabled();
  });

  it('calls onStartSession when button is clicked', async () => {
    const onStartSession = vi.fn().mockResolvedValue(undefined);
    render(
      <ShareModal
        isOpen={true}
        onClose={vi.fn()}
        onGetLink={vi.fn(() => '')}
        onCopyLink={vi.fn()}
        onStartSession={onStartSession}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    });
    expect(onStartSession).toHaveBeenCalledOnce();
  });

  it('shows loading state while starting session', async () => {
    let resolve!: () => void;
    const onStartSession = vi.fn(
      () => new Promise<void>((r) => { resolve = r; }),
    );
    render(
      <ShareModal
        isOpen={true}
        onClose={vi.fn()}
        onGetLink={vi.fn(() => '')}
        onCopyLink={vi.fn()}
        onStartSession={onStartSession}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    expect(screen.getByRole('button', { name: /starting/i })).toBeDisabled();
    resolve();
  });
});

describe('ShareModal — live session error state', () => {
  it('shows error message when onStartSession throws', async () => {
    const onStartSession = vi.fn().mockRejectedValue(new Error('Network error'));
    render(
      <ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    });
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it('re-enables the button after failure so user can retry', async () => {
    const onStartSession = vi.fn().mockRejectedValue(new Error('Network error'));
    render(
      <ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    });
    expect(screen.getByRole('button', { name: /start live session/i })).not.toBeDisabled();
  });

  it('clears error when modal is closed and reopened', async () => {
    const onStartSession = vi.fn().mockRejectedValue(new Error('Network error'));
    const { rerender } = render(
      <ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    });
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
    rerender(<ShareModal isOpen={false} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />);
    rerender(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />);
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
  });
});

describe('ShareModal — active session view', () => {
  const sessionUrl = 'http://localhost:5176/?p=abc123';

  it('shows the session URL when sessionUrl is provided', () => {
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} sessionUrl={sessionUrl} onStopSession={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue(sessionUrl);
  });

  it('hides Start Live Session when sessionUrl is set', () => {
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} sessionUrl={sessionUrl} onStopSession={vi.fn()} />);
    expect(screen.queryByRole('button', { name: /start live session/i })).not.toBeInTheDocument();
  });

  it('shows Copy button for the session URL', () => {
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} sessionUrl={sessionUrl} onStopSession={vi.fn()} />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('calls onCopyLink with sessionUrl when Copy is clicked', async () => {
    const onCopyLink = vi.fn().mockResolvedValue(undefined);
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={onCopyLink} sessionUrl={sessionUrl} onStopSession={vi.fn()} />);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /copy/i })); });
    expect(onCopyLink).toHaveBeenCalledWith(sessionUrl);
  });

  it('shows Stop Session button', () => {
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} sessionUrl={sessionUrl} onStopSession={vi.fn()} />);
    expect(screen.getByRole('button', { name: /stop session/i })).toBeInTheDocument();
  });

  it('calls onStopSession when Stop Session is clicked', async () => {
    const onStopSession = vi.fn().mockResolvedValue(undefined);
    render(<ShareModal isOpen={true} onClose={vi.fn()} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} sessionUrl={sessionUrl} onStopSession={onStopSession} />);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /stop session/i })); });
    expect(onStopSession).toHaveBeenCalledOnce();
  });
});

describe('ShareModal — modal stays open after starting session', () => {
  it('modal remains open after onStartSession resolves', async () => {
    const onClose = vi.fn();
    const onStartSession = vi.fn().mockResolvedValue(undefined);
    render(<ShareModal isOpen={true} onClose={onClose} onGetLink={vi.fn(() => '')} onCopyLink={vi.fn()} onStartSession={onStartSession} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start live session/i }));
    });
    // onClose should NOT be called — modal stays open
    expect(onClose).not.toHaveBeenCalled();
  });
});
