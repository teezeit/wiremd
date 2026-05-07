import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IdentityTag } from '../../src/components/IdentityTag';

describe('IdentityTag', () => {
  it('renders the name', () => {
    render(<IdentityTag name="Blue Fox" />);
    expect(screen.getByText('Blue Fox')).toBeInTheDocument();
  });

  it('renders the "You are" label', () => {
    render(<IdentityTag name="Blue Fox" />);
    expect(screen.getByText('You are')).toBeInTheDocument();
  });

  it('renders an avatar with the correct initials', () => {
    render(<IdentityTag name="Blue Fox" />);
    expect(screen.getByTestId('avatar')).toHaveTextContent('BF');
  });

  it('accepts a custom avatarSize', () => {
    render(<IdentityTag name="Blue Fox" avatarSize={22} />);
    expect(screen.getByTestId('avatar').getAttribute('style')).toMatch(/22px/);
  });
});
