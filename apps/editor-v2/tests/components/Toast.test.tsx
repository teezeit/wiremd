import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Toast } from '../../src/components/Toast';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('Toast', () => {
  it('renders with the given message', () => {
    render(<Toast message="Copied!" visible={true} />);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('applies visible class when visible=true', () => {
    const { container } = render(<Toast message="Hi" visible={true} />);
    expect(container.firstChild).toHaveClass('ed-toast--visible');
  });

  it('does not apply visible class when visible=false', () => {
    const { container } = render(<Toast message="Hi" visible={false} />);
    expect(container.firstChild).not.toHaveClass('ed-toast--visible');
  });
});
