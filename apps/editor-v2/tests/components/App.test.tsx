import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { App } from '../../src/App';
import { encodeShareHash } from '../../src/lib/urlShare';
import type { LocalFileResult } from '../../src/lib/localFile';

// Capture Preview props to assert on style/showComments changes
let lastPreviewProps: Record<string, unknown> = {};
let lastEditorProps: {
  value: string;
  onChange: (v: string) => void;
  onSelectionChange?: (range: { from: number; to: number }) => void;
  readOnly?: boolean;
} | null = null;

vi.mock('../../src/components/Editor', () => ({
  Editor: (props: {
    value: string;
    onChange: (v: string) => void;
    onSelectionChange?: (range: { from: number; to: number }) => void;
    readOnly?: boolean;
  }) => {
    lastEditorProps = props;
    return <div data-testid="editor" data-readonly={props.readOnly || undefined}>{props.value}</div>;
  },
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

const FIXED_SESSION_ID = 'fixed-test-session-id';
vi.mock('../../src/hooks/useSessionIdentity', () => ({
  useSessionIdentity: () => ({ sessionId: FIXED_SESSION_ID, name: 'Blue Fox' }),
}));

vi.mock('../../src/lib/projectApi', () => ({
  getProjectLockInfo: vi.fn().mockResolvedValue({ lockedBy: null, lockedName: null, lastEditorName: null, updatedAt: new Date().toISOString(), content: '' }),
  lockProject: vi.fn().mockResolvedValue(undefined),
  unlockProject: vi.fn().mockResolvedValue(undefined),
  createProject: vi.fn().mockResolvedValue({ id: 'test-proj', updatedAt: new Date().toISOString() }),
  updateProject: vi.fn().mockResolvedValue(undefined),
}));

import * as localFile from '../../src/lib/localFile';
import * as projectApi from '../../src/lib/projectApi';

const clipboardWriteText = vi.fn().mockResolvedValue(undefined);

async function flushProjectLockPoll() {
  await act(async () => {
    await Promise.resolve();
  });
}

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
  lastEditorProps = null;
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
  vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({ lockedBy: null, lockedName: null, lastEditorName: null, updatedAt: new Date().toISOString(), content: '' });
  vi.mocked(projectApi.createProject).mockResolvedValue({ id: 'test-proj', updatedAt: new Date().toISOString() });
  vi.mocked(projectApi.lockProject).mockResolvedValue(undefined);
  vi.mocked(projectApi.unlockProject).mockResolvedValue(undefined);
  vi.mocked(projectApi.updateProject).mockResolvedValue(undefined);
});

afterEach(() => {
  window.location.hash = '';
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
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
      updatedAt: new Date().toISOString(), content: '',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    await flushProjectLockPoll();
    fireEvent.click(screen.getByTitle('Hide editor'));
    expect(container.querySelector('.ed-main')).toHaveClass('ed-main--preview');
    vi.unstubAllGlobals();
  });

  it('shows sidebar lock banner when someone else has the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(), content: '',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    render(<App />);
    await flushProjectLockPoll();
    expect(screen.queryByRole('button', { name: /steal edit/i })).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('does not show sidebar lock banner when no lock is held', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: /steal edit/i })).not.toBeInTheDocument();
  });

  it('first-time user story: shows both accordions with Start from Scratch loaded by default', () => {
    render(<App />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
    expect(screen.getByText('Start from Scratch')).toBeInTheDocument();
    expect(lastPreviewProps.markdown).toContain('Anything is possible');
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('shows Components accordion with template cards by default', () => {
    render(<App />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^add$/i }).length).toBeGreaterThan(0);
  });

  it('shows a plus icon in template Add buttons', () => {
    render(<App />);
    const addButton = screen.getAllByRole('button', { name: /^add$/i })[0]!;
    expect(addButton.querySelector('svg')).toBeInTheDocument();
    expect(addButton.querySelector('path[d="M12 5v14"]')).toBeInTheDocument();
  });

  it('collapses Components accordion when header is clicked', () => {
    render(<App />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^components$/i }));
    expect(screen.queryByText('Template Gallery')).not.toBeInTheDocument();
  });

  it('collapses Markdown accordion when header is clicked', () => {
    render(<App />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^markdown$/i }));
    expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
  });

  it('adds a template to the document and keeps both accordions open', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /^add$/i })[1]!);
    expect(lastPreviewProps.markdown).toContain('Design UI with Markdown');
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('adds a component to the current document and keeps both accordions open', () => {
    render(<App />);
    fireEvent.click(within(screen.getByTestId('component-gallery')).getAllByRole('button', { name: /^add$/i })[0]!);
    expect(lastPreviewProps.markdown).toContain('Launch faster with wiremd');
    expect(screen.getByText('Component Library')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('adds a component at the last known markdown cursor', () => {
    localStorage.setItem('wiremd-content', '# Hello\n\nGoodbye');
    render(<App />);
    act(() => {
      lastEditorProps?.onSelectionChange?.({ from: 7, to: 7 });
    });

    fireEvent.click(within(screen.getByTestId('component-gallery')).getAllByRole('button', { name: /^add$/i })[0]!);

    const markdown = String(lastPreviewProps.markdown);
    expect(markdown.indexOf('Launch faster with wiremd')).toBeGreaterThan(markdown.indexOf('# Hello'));
    expect(markdown.indexOf('Launch faster with wiremd')).toBeLessThan(markdown.indexOf('Goodbye'));
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

  it('shows Live Session button instead of Share when a session is active', async () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    render(<App />);
    await flushProjectLockPoll();
    expect(screen.getByRole('button', { name: /live session/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^share$/i })).not.toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('Live Session button has a green corner badge', async () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    await flushProjectLockPoll();
    expect(container.querySelector('.ed-btn__live-dot')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('leaves an active session without force-unlocking the project', async () => {
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const replaceState = vi.spyOn(window.history, 'replaceState');
    render(<App />);
    await flushProjectLockPoll();

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
    const initialContent = lastPreviewProps.markdown;
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    await act(async () => {
      fireEvent.click(screen.getByText('Open from file'));
    });
    expect(lastPreviewProps.markdown).toBe(initialContent);
  });

  // URL hash
  it('loads initial content from URL hash', () => {
    window.location.hash = encodeShareHash('# From hash');
    render(<App />);
    expect(screen.getByTestId('editor').textContent).toBe('# From hash');
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
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
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
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

describe('App — live session content sync', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('pushes content to API after 1s debounce when holding the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: FIXED_SESSION_ID, lockedName: 'Blue Fox', lastEditorName: 'Blue Fox',
      updatedAt: new Date().toISOString(), content: '',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=proj1' });
    render(<App />);
    await flushProjectLockPoll();

    // Simulate typing and flush state before advancing timer
    await act(async () => { lastEditorProps?.onChange?.('# Updated content'); });
    vi.mocked(projectApi.updateProject).mockClear();

    await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
    expect(projectApi.updateProject).toHaveBeenCalledWith('proj1', '# Updated content', expect.any(String));
    vi.unstubAllGlobals();
  });

  it('does not push content when not holding the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(), content: '# Remote',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=proj1' });
    render(<App />);
    await flushProjectLockPoll();
    vi.mocked(projectApi.updateProject).mockClear();

    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(projectApi.updateProject).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('applies remote content to the editor when someone else holds the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(), content: '# Live update from writer',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=proj1' });
    render(<App />);
    await flushProjectLockPoll();
    expect(lastPreviewProps.markdown).toBe('# Live update from writer');
    vi.unstubAllGlobals();
  });
});

describe('App — editor read-only in live session when not lock holder', () => {
  it('editor is read-only when someone else holds the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue({
      lockedBy: 'other-session', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
      updatedAt: new Date().toISOString(), content: '',
    });
    vi.stubGlobal('location', { ...window.location, search: '?p=abc123' });
    const { container } = render(<App />);
    await flushProjectLockPoll();
    expect(container.querySelector('[data-readonly="true"]')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('editor is not read-only in solo mode', () => {
    const { container } = render(<App />);
    expect(container.querySelector('[data-readonly="true"]')).not.toBeInTheDocument();
  });
});
