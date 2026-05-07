import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, nameToInitials, nameToColor } from '../../src/components/Avatar';

describe('nameToInitials', () => {
  it('returns first letter of each word, uppercased', () => {
    expect(nameToInitials('Happy Penguin')).toBe('HP');
  });

  it('handles single-word names', () => {
    expect(nameToInitials('Tobias')).toBe('T');
  });

  it('handles three-word names — takes first two', () => {
    expect(nameToInitials('Brave Red Fox')).toBe('BR');
  });

  it('handles empty string gracefully', () => {
    expect(nameToInitials('')).toBe('?');
  });
});

describe('nameToColor', () => {
  it('returns a hex color string', () => {
    expect(nameToColor('Happy Penguin')).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('is deterministic — same name gives same color', () => {
    expect(nameToColor('Happy Penguin')).toBe(nameToColor('Happy Penguin'));
  });

  it('different names can produce different colors', () => {
    const colors = new Set(
      ['Alpha Bear', 'Bold Cat', 'Calm Dog', 'Dark Elk', 'Easy Fox',
       'Fast Gnu', 'Gray Hen', 'Icy Ibis'].map(nameToColor)
    );
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe('Avatar', () => {
  it('renders a container with data-testid="avatar"', () => {
    render(<Avatar name="Happy Penguin" />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('displays the initials', () => {
    render(<Avatar name="Happy Penguin" />);
    expect(screen.getByTestId('avatar')).toHaveTextContent('HP');
  });

  it('applies a background color style', () => {
    render(<Avatar name="Happy Penguin" />);
    const el = screen.getByTestId('avatar');
    expect(el.getAttribute('style')).toMatch(/background/);
  });

  it('accepts an optional size prop', () => {
    render(<Avatar name="Happy Penguin" size={24} />);
    const el = screen.getByTestId('avatar');
    expect(el.getAttribute('style')).toMatch(/24px/);
  });
});
