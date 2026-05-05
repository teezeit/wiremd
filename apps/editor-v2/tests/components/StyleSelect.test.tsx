import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyleSelect } from '../../src/components/StyleSelect';

const STYLE_NAMES = ['sketch', 'clean', 'wireframe', 'material', 'tailwind', 'brutal', 'none'];

describe('StyleSelect', () => {
  it('renders a select element', () => {
    render(<StyleSelect value="sketch" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all 7 style options', () => {
    render(<StyleSelect value="sketch" onChange={vi.fn()} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(7);
    const values = options.map((o) => (o as HTMLOptionElement).value);
    expect(values).toEqual(expect.arrayContaining(STYLE_NAMES));
  });

  it('reflects the current value', () => {
    render(<StyleSelect value="clean" onChange={vi.fn()} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('clean');
  });

  it('calls onChange with new style when changed', () => {
    const onChange = vi.fn();
    render(<StyleSelect value="sketch" onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'brutal' } });
    expect(onChange).toHaveBeenCalledWith('brutal');
  });
});
