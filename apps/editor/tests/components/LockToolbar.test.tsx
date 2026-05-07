import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LockToolbar } from '../../src/components/LockToolbar';

const baseProps = {
  myName: 'Blue Fox',
  onLock: vi.fn(),
  onUnlock: vi.fn(),
  onSteal: vi.fn(),
};

describe('LockToolbar — unlocked', () => {
  it('shows Edit button when no one holds the lock', () => {
    render(<LockToolbar {...baseProps} lockState="unlocked" />);
    expect(screen.getByRole('button', { name: /^edit$/i })).toBeInTheDocument();
  });

  it('calls onLock when Edit is clicked', () => {
    const onLock = vi.fn();
    render(<LockToolbar {...baseProps} onLock={onLock} lockState="unlocked" />);
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    expect(onLock).toHaveBeenCalledOnce();
  });

  it('shows last editor name and time when available', () => {
    render(
      <LockToolbar
        {...baseProps}
        lockState="unlocked"
        lastEditorName="Red Bear"
        lastEditedAt={new Date(Date.now() - 5 * 60 * 1000).toISOString()}
      />,
    );
    expect(screen.getByText(/Red Bear/)).toBeInTheDocument();
  });
});

describe('LockToolbar — I am editing', () => {
  it('shows Stop editing button', () => {
    render(<LockToolbar {...baseProps} lockState="mine" />);
    expect(screen.getByRole('button', { name: /stop editing/i })).toBeInTheDocument();
  });

  it('shows my name', () => {
    render(<LockToolbar {...baseProps} lockState="mine" />);
    expect(screen.getByText(/Blue Fox/)).toBeInTheDocument();
  });

  it('calls onUnlock when Stop editing is clicked', () => {
    const onUnlock = vi.fn();
    render(<LockToolbar {...baseProps} onUnlock={onUnlock} lockState="mine" />);
    fireEvent.click(screen.getByRole('button', { name: /stop editing/i }));
    expect(onUnlock).toHaveBeenCalledOnce();
  });
});

describe('LockToolbar — someone else is editing', () => {
  it('shows the other editor name', () => {
    render(<LockToolbar {...baseProps} lockState="taken" lockedByName="Red Bear" />);
    expect(screen.getByText(/Red Bear/)).toBeInTheDocument();
  });

  it('shows Steal edit button', () => {
    render(<LockToolbar {...baseProps} lockState="taken" lockedByName="Red Bear" />);
    expect(screen.getByRole('button', { name: /steal edit/i })).toBeInTheDocument();
  });

  it('calls onSteal when Steal edit is clicked', () => {
    const onSteal = vi.fn();
    render(
      <LockToolbar {...baseProps} onSteal={onSteal} lockState="taken" lockedByName="Red Bear" />,
    );
    fireEvent.click(screen.getByRole('button', { name: /steal edit/i }));
    expect(onSteal).toHaveBeenCalledOnce();
  });
});
