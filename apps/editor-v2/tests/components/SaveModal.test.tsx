import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SaveModal } from '../../src/components/SaveModal';

function setup(overrides = {}) {
  const props = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
  render(<SaveModal {...props} />);
  return props;
}

describe('SaveModal', () => {
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

  it('calls onClose on Escape', () => {
    const { onClose } = setup();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancel is clicked', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('defaults to markdown format', () => {
    setup();
    expect(screen.getByRole('combobox')).toHaveValue('markdown');
  });

  it('shows all 5 format options', () => {
    setup();
    const options = screen.getAllByRole('option');
    const values = options.map((o) => (o as HTMLOptionElement).value);
    expect(values).toEqual(
      expect.arrayContaining(['markdown', 'html', 'react', 'tailwind', 'json']),
    );
  });

  it('calls onSave with selected format when Save is clicked', () => {
    const { onSave } = setup();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'html' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));
    expect(onSave).toHaveBeenCalledWith('html');
  });

  it('calls onSave with default markdown format without changing selector', () => {
    const { onSave } = setup();
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));
    expect(onSave).toHaveBeenCalledWith('markdown');
  });

  it('calls onClose after saving', async () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));
    await vi.waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
