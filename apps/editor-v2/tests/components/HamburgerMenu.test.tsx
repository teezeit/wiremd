import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HamburgerMenu } from '../../src/components/HamburgerMenu';

function setup(overrides = {}) {
  const props = {
    style: 'sketch' as const,
    onStyleChange: vi.fn(),
    onReset: vi.fn(),
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

  it('calls onStyleChange and closes when a style is selected', () => {
    const { onStyleChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Clean'));
    expect(onStyleChange).toHaveBeenCalledWith('clean');
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
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
