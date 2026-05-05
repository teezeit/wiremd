import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HamburgerMenu } from '../../src/components/HamburgerMenu';

function setup(overrides = {}) {
  const props = {
    style: 'sketch' as const,
    onStyleChange: vi.fn(),
    onReset: vi.fn(),
    onOpenFile: vi.fn(),
    onSaveAs: vi.fn(),
    fileSupported: true,
    name: 'Blue Fox',
    ...overrides,
  };
  render(<HamburgerMenu {...props} />);
  return props;
}

describe('HamburgerMenu', () => {
  it('renders the toggle button', () => {
    setup();
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('menu is closed by default', () => {
    setup();
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('opens on button click', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('closes on second click', () => {
    setup();
    const btn = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('calls onReset and closes when Reset is clicked', () => {
    const { onReset } = setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalledOnce();
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('calls onStyleChange but keeps menu open when a style is selected', () => {
    const { onStyleChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Clean'));
    expect(onStyleChange).toHaveBeenCalledWith('clean');
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('marks the active style button', () => {
    setup({ style: 'clean' });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    const cleanBtn = screen.getByText('Clean');
    expect(cleanBtn).toHaveClass('ed-menu__style-btn--active');
  });

  it('closes on outside mousedown', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });
});

describe('HamburgerMenu — Reset with lock', () => {
  it('Reset is enabled when canReset=true (user is the editor)', () => {
    setup({ canReset: true });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /^reset$/i })).not.toBeDisabled();
  });

  it('Reset is disabled when canReset=false (user is not the editor)', () => {
    setup({ canReset: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /^reset$/i })).toBeDisabled();
  });

  it('disabled Reset has a tooltip explaining why', () => {
    setup({ canReset: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /^reset$/i })).toHaveAttribute('title');
  });

  it('does not call onReset when disabled', () => {
    const { onReset } = setup({ canReset: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    expect(onReset).not.toHaveBeenCalled();
  });
});

describe('HamburgerMenu — Live Collaboration item', () => {
  it('shows "Live Collaboration" item when no session is active', () => {
    setup({ onLiveCollab: vi.fn(), hasActiveSession: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /live collaboration/i })).toBeInTheDocument();
  });

  it('"Live Collaboration" item is enabled', () => {
    setup({ onLiveCollab: vi.fn(), hasActiveSession: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /live collaboration/i })).not.toBeDisabled();
  });

  it('calls onLiveCollab and closes menu when item is clicked', () => {
    const onLiveCollab = vi.fn();
    setup({ onLiveCollab, hasActiveSession: false });
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /live collaboration/i }));
    expect(onLiveCollab).toHaveBeenCalledOnce();
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('shows "Live Session" item with green dot when session is active', () => {
    const { container } = render(<HamburgerMenu
      style="sketch" onStyleChange={vi.fn()} onReset={vi.fn()} onOpenFile={vi.fn()}
      onSaveAs={vi.fn()} fileSupported={true} name="Blue Fox"
      onLiveCollab={vi.fn()} hasActiveSession={true}
    />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('button', { name: /live session/i })).toBeInTheDocument();
    expect(container.querySelector('.ed-menu__live-dot')).toBeInTheDocument();
  });

  it('shows users icon when session is active', () => {
    const { container } = render(<HamburgerMenu
      style="sketch" onStyleChange={vi.fn()} onReset={vi.fn()} onOpenFile={vi.fn()}
      onSaveAs={vi.fn()} fileSupported={true} name="Blue Fox"
      onLiveCollab={vi.fn()} hasActiveSession={true}
    />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(container.querySelector('[data-testid="users-icon"]')).toBeInTheDocument();
  });
});
