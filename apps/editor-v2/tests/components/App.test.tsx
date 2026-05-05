import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from '../../src/App';
import { encodeShareHash } from '../../src/lib/urlShare';
import type { LocalFileResult } from '../../src/lib/localFile';

// Capture Preview props to assert on style/showComments changes
let lastPreviewProps: Record<string, unknown> = {};

vi.mock('../../src/components/Editor', () => ({
  Editor: ({ value, readOnly }: { value: string; onChange: (v: string) => void; readOnly?: boolean }) => (
    <div data-testid="editor" data-readonly={readOnly || undefined}>{value}</div>
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

vi.mock('../../src/lib/projectApi', () => ({
  getProjectLockInfo: vi.fn().mockResolvedValue({ lockedBy: null, lockedName: null, lastEditorName: null, updatedAt: new Date().toISOString() }),
  lockProject: vi.fn().mockResolvedValue(undefined),
  unlockProject: vi.fn().mockResolvedValue(undefined),
  createProject: vi.fn().mockResolvedValue({ id: 'test-proj', updatedAt: new Date().toISOString() }),
}));

import * as localFile from '../../src/lib/localFile';
import * as projectApi from '../../src/lib/projectApi';

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
  localStorage.clear();
  window.location.hash = '';
  window.history.replaceState(null, '', '/');
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: clipboardWriteText },
    configurable: true,
  });
  clipboardWriteText.mockClear();
  vi.mocked(localFile.openLocalFile).mockReset();
  vi.mocked(localFile.saveAsLocalFile).mockReset();
  vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({ lockedBy: null, lockedName: null, lastEditorName: null, updatedAt: new Date().toISOString() });
  vi.mocked(projectApi.createProject).mockResolvedValue({ id: 'test-proj', updatedAt: new Date().toISOString() });
  vi.mocked(projectApi.lockProject).mockResolvedValue(undefined);
  vi.mocked(projectApi.unlockProject).mockResolvedValue(undefined);
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

  it('edit toggle always toggles mode even when lock is taken', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(),
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    // Give polling time to run
    await vi.waitFor(() => {});
    fireEvent.click(screen.getByTitle('Hide editor'));
    expect(container.querySelector('.ed-main')).toHaveClass('ed-main--preview');
    vi.unstubAllGlobals();
  });

  it('shows sidebar lock banner when someone else has the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(),
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    render(<App />);
    await vi.waitFor(() => {
      expect(screen.queryByRole('button', { name: /steal edit/i })).toBeInTheDocument();
    });
    vi.unstubAllGlobals();
  });

  it('does not show sidebar lock banner when no lock is held', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: /steal edit/i })).not.toBeInTheDocument();
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

  it('comment button is disabled with "No comments yet" tooltip when there are no comments', () => {
    localStorage.setItem('wiremd-content', '# Hello\n[Button]*');
    render(<App />);
    expect(screen.getByTitle('No comments yet')).toBeDisabled();
  });

  it('comments toggle reflects active state when comments exist', () => {
    localStorage.setItem('wiremd-content', '# Hello\n<!-- a comment -->');
    render(<App />);
    expect(screen.getByTitle('Hide comments')).toHaveClass('ed-btn--icon-active');
    fireEvent.click(screen.getByTitle('Hide comments'));
    expect(screen.getByTitle('Show comments')).not.toHaveClass('ed-btn--icon-active');
  });

  it('comments toggle updates showComments prop on Preview when comments exist', () => {
    localStorage.setItem('wiremd-content', '# Hello\n<!-- a comment -->');
    render(<App />);
    expect(lastPreviewProps.showComments).toBe(true);
    fireEvent.click(screen.getByTitle('Hide comments'));
    expect(lastPreviewProps.showComments).toBe(false);
  });

  it('shows Share button in solo mode', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /^share$/i })).toBeInTheDocument();
  });

  it('shows Live Session button instead of Share when a session is active', () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    render(<App />);
    expect(screen.getByRole('button', { name: /live session/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^share$/i })).not.toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('Live Session button has a green corner badge', () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    expect(container.querySelector('.ed-btn__live-dot')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('leaves an active session without force-unlocking the project', async () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const replaceState = vi.spyOn(window.history, 'replaceState');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /live session/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /leave session/i }));
    });

    expect(projectApi.unlockProject).toHaveBeenCalledOnce();
    expect(vi.mocked(projectApi.unlockProject).mock.calls[0]).toEqual(['abc123', expect.any(String)]);
    expect(replaceState).toHaveBeenCalledWith(null, '', window.location.pathname);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^share$/i })).toBeInTheDocument();
    replaceState.mockRestore();
    vi.unstubAllGlobals();
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
      vi.advanceTimersByTime(1);
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
      vi.advanceTimersByTime(1);
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

  it('save as opens the save modal', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Save to…'));
    expect(screen.getByRole('dialog', { name: /save as/i })).toBeInTheDocument();
  });

  it('save as shows a toast with the filename after confirming format', async () => {
    vi.mocked(localFile.saveAsLocalFile).mockResolvedValueOnce(
      fakeFileResult('wireframe.md', '# Hello'),
    );
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    fireEvent.click(screen.getByText('Save to…'));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^save$/i }));
    });
    expect(screen.getByText('Saved as wireframe.md')).toBeInTheDocument();
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

  // localStorage auto-save
  it('restores content from localStorage when no hash is present', () => {
    localStorage.setItem('wiremd-content', '# From local storage');
    render(<App />);
    expect(screen.getByTestId('editor').textContent).toBe('# From local storage');
  });

  // conflict modal: hash + localStorage
  it('shows conflict modal when hash and localStorage both have different content', () => {
    localStorage.setItem('wiremd-content', '# My local work');
    window.location.hash = encodeShareHash('# Shared content');
    render(<App />);
    expect(screen.getByRole('dialog', { name: /conflict/i })).toBeInTheDocument();
  });

  it('conflict modal: Keep my work loads localStorage content', () => {
    localStorage.setItem('wiremd-content', '# My local work');
    window.location.hash = encodeShareHash('# Shared content');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /keep my work/i }));
    expect(screen.getByTestId('editor').textContent).toBe('# My local work');
    expect(screen.queryByRole('dialog', { name: /conflict/i })).not.toBeInTheDocument();
  });

  it('conflict modal: Load shared replaces with hash content', () => {
    localStorage.setItem('wiremd-content', '# My local work');
    window.location.hash = encodeShareHash('# Shared content');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /load shared/i }));
    expect(screen.getByTestId('editor').textContent).toBe('# Shared content');
    expect(screen.queryByRole('dialog', { name: /conflict/i })).not.toBeInTheDocument();
  });

  it('no conflict when hash matches localStorage content', () => {
    const content = '# Same content';
    localStorage.setItem('wiremd-content', content);
    window.location.hash = encodeShareHash(content);
    render(<App />);
    expect(screen.queryByRole('dialog', { name: /conflict/i })).not.toBeInTheDocument();
  });
});

describe('App — editor read-only in live session when not lock holder', () => {
  it('editor is read-only when someone else holds the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(),
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    await vi.waitFor(() => {
      expect(container.querySelector('[data-readonly="true"]')).toBeInTheDocument();
    });
    vi.unstubAllGlobals();
  });

  it('editor is not read-only in solo mode', () => {
    const { container } = render(<App />);
    expect(container.querySelector('[data-readonly="true"]')).not.toBeInTheDocument();
  });
});
