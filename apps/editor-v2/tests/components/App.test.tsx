import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../../src/App';
import { encodeShareHash } from '../../src/lib/urlShare';

// Mock heavy DOM components
vi.mock('../../src/components/Editor', () => ({
  Editor: ({ value }: { value: string; onChange: (v: string) => void }) => (
    <div data-testid="editor">{value}</div>
  ),
}));
vi.mock('../../src/components/Preview', () => ({
  Preview: () => <div data-testid="preview" />,
}));

const clipboardWriteText = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  window.location.hash = '';
  window.history.replaceState(null, '', '/');
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: clipboardWriteText },
    configurable: true,
  });
  clipboardWriteText.mockClear();
});

afterEach(() => {
  window.location.hash = '';
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByTestId('preview')).toBeInTheDocument();
  });

  it('starts in edit mode — main does not have preview class', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.ed-main')).not.toHaveClass('ed-main--preview');
  });

  it('edit toggle switches to preview mode', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByTitle('Hide editor'));
    expect(container.querySelector('.ed-main')).toHaveClass('ed-main--preview');
  });

  it('edit toggle switches back to edit mode', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByTitle('Hide editor'));
    fireEvent.click(screen.getByTitle('Show editor'));
    expect(container.querySelector('.ed-main')).not.toHaveClass('ed-main--preview');
  });

  it('sidebar defaults to Markdown tab', () => {
    render(<App />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.queryByText('Component library')).not.toBeInTheDocument();
  });

  it('switches to Insert tab', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /insert/i }));
    expect(screen.getByText('Component library')).toBeInTheDocument();
    expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
  });

  it('switches back to Markdown tab', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /insert/i }));
    fireEvent.click(screen.getByRole('button', { name: /markdown/i }));
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('comments toggle button reflects active state', () => {
    render(<App />);
    const btn = screen.getByTitle('Hide comments');
    expect(btn).toHaveClass('ed-btn--icon-active');
    fireEvent.click(btn);
    expect(screen.getByTitle('Show comments')).not.toHaveClass('ed-btn--icon-active');
  });

  it('share button opens the share modal', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('copy link in share modal copies URL to clipboard', async () => {
    const { act } = await import('@testing-library/react');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    });
    expect(clipboardWriteText).toHaveBeenCalledOnce();
  });

  it('loads initial content from URL hash', () => {
    window.location.hash = encodeShareHash('# From hash');
    render(<App />);
    expect(screen.getByTestId('editor').textContent).toBe('# From hash');
  });
});
