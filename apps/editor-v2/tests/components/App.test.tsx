import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from '../../src/App';
import { encodeShareHash } from '../../src/lib/urlShare';
import type { LocalFileResult } from '../../src/lib/localFile';

// Capture Preview props to assert on style/showComments changes
let lastPreviewProps: Record<string, unknown> = {};

vi.mock('../../src/components/Editor', () => ({
  Editor: ({ value }: { value: string; onChange: (v: string) => void }) => (
    <div data-testid="editor">{value}</div>
  ),
}));

vi.mock('../../src/components/Preview', () => ({
  Preview: (props: Record<string, unknown>) => {
    lastPreviewProps = props;
    return <div data-testid="preview" />;
  },
}));

vi.mock('../../src/lib/localFile', () => ({
  isFileSystemAccessSupported: () => true,
  openLocalFile: vi.fn(),
  saveAsLocalFile: vi.fn(),
}));

import * as localFile from '../../src/lib/localFile';

const clipboardWriteText = vi.fn().mockResolvedValue(undefined);

function fakeFileResult(name: string, content: string): LocalFileResult {
  return {
    handle: {
      name,
      getFile: async () => ({ text: async () => content, lastModified: 0 }),
      createWritable: async () => ({ write: async () => {}, close: async () => {} }),
    },
    content,
    lastModified: 0,
  };
}

beforeEach(() => {
  lastPreviewProps = {};
  window.location.hash = '';
  window.history.replaceState(null, '', '/');
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: clipboardWriteText },
    configurable: true,
  });
  clipboardWriteText.mockClear();
  vi.mocked(localFile.openLocalFile).mockReset();
  vi.mocked(localFile.saveAsLocalFile).mockReset();
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

  it('comments toggle reflects active state', () => {
    render(<App />);
    expect(screen.getByTitle('Hide comments')).toHaveClass('ed-btn--icon-active');
    fireEvent.click(screen.getByTitle('Hide comments'));
    expect(screen.getByTitle('Show comments')).not.toHaveClass('ed-btn--icon-active');
  });

  it('comments toggle updates showComments prop on Preview', () => {
    render(<App />);
    expect(lastPreviewProps.showComments).toBe(true);
    fireEvent.click(screen.getByTitle('Hide comments'));
    expect(lastPreviewProps.showComments).toBe(false);
  });

  // Share modal
  it('share button opens the share modal', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('copy link copies URL to clipboard', async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    });
    expect(clipboardWriteText).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('copy link shows "Link copied!" toast', async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /export to link/i }));
      vi.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }));
    });
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    vi.useRealTimers();
  });

  // Style switcher
  it('selecting a style in the hamburger updates the preview style prop', () => {
    render(<App />);
    expect(lastPreviewProps.style).toBe('sketch');
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Clean'));
    expect(lastPreviewProps.style).toBe('clean');
  });

  // File operations
  it('opening a file loads its content into the editor', async () => {
    vi.mocked(localFile.openLocalFile).mockResolvedValueOnce(
      fakeFileResult('notes.md', '# Notes'),
    );
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    await act(async () => {
      fireEvent.click(screen.getByText('Open from file'));
    });
    expect(screen.getByTestId('editor').textContent).toBe('# Notes');
  });

  it('opening a file shows a toast with the filename', async () => {
    vi.mocked(localFile.openLocalFile).mockResolvedValueOnce(
      fakeFileResult('notes.md', '# Notes'),
    );
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    await act(async () => {
      fireEvent.click(screen.getByText('Open from file'));
    });
    expect(screen.getByText('Opened notes.md')).toBeInTheDocument();
  });

  it('save as shows a toast with the filename', async () => {
    vi.mocked(localFile.saveAsLocalFile).mockResolvedValueOnce(
      fakeFileResult('export.md', '# Hello'),
    );
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    await act(async () => {
      fireEvent.click(screen.getByText('Save to…'));
    });
    expect(screen.getByText('Saved as export.md')).toBeInTheDocument();
  });

  it('cancelling file open (abort) does not change editor content', async () => {
    vi.mocked(localFile.openLocalFile).mockResolvedValueOnce(null);
    render(<App />);
    const initialContent = screen.getByTestId('editor').textContent;
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    await act(async () => {
      fireEvent.click(screen.getByText('Open from file'));
    });
    expect(screen.getByTestId('editor').textContent).toBe(initialContent);
  });

  // URL hash
  it('loads initial content from URL hash', () => {
    window.location.hash = encodeShareHash('# From hash');
    render(<App />);
    expect(screen.getByTestId('editor').textContent).toBe('# From hash');
  });

  it('clears the hash from URL after loading', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState');
    window.location.hash = encodeShareHash('# From hash');
    render(<App />);
    expect(replaceState).toHaveBeenCalledWith(null, '', window.location.pathname);
    replaceState.mockRestore();
  });
});
