import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { encodeShareHash } from '../src/url-share.js';
import { FakeDocument, FakeElement, FakeWindow } from './helpers/fake-dom.js';
import type { WireFileHandle } from '../src/local-file.js';

function makeHandle(name: string): WireFileHandle {
  return {
    name,
    getFile: vi.fn(async () => ({ text: async () => '# content', lastModified: Date.now() })),
    createWritable: async () => ({ write: async () => {}, close: async () => {} }),
  };
}

const mainMocks = vi.hoisted(() => ({
  initEditor: vi.fn(),
  createPreview: vi.fn(),
  initToolbar: vi.fn(),
  showToast: vi.fn(),
  showFileHintModal: vi.fn(),
  openLocalFile: vi.fn(() => Promise.resolve(null)),
  getRecentFiles: vi.fn(() => Promise.resolve([])),
  addToHistory: vi.fn(() => Promise.resolve()),
  removeFromHistory: vi.fn(() => Promise.resolve()),
  _resetDbForTesting: vi.fn(),
}));

vi.mock('../src/editor.js', () => ({
  initEditor: mainMocks.initEditor,
}));

vi.mock('../src/preview.js', () => ({
  createPreview: mainMocks.createPreview,
}));

vi.mock('../src/toolbar.js', () => ({
  initToolbar: mainMocks.initToolbar,
  showToast: mainMocks.showToast,
}));

vi.mock('../src/file-hint-modal.js', () => ({
  showFileHintModal: mainMocks.showFileHintModal,
}));

vi.mock('../src/local-file.js', () => ({
  isFileSystemAccessSupported: vi.fn(() => false),
  openLocalFile: mainMocks.openLocalFile,
  saveAsLocalFile: vi.fn(() => Promise.resolve(null)),
  watchFile: vi.fn(() => ({ stop: vi.fn(), setLastSeen: vi.fn() })),
  writeFile: vi.fn(() => Promise.resolve()),
}));

vi.mock('../src/file-history.js', () => ({
  getRecentFiles: mainMocks.getRecentFiles,
  addToHistory: mainMocks.addToHistory,
  removeFromHistory: mainMocks.removeFromHistory,
  _resetDbForTesting: mainMocks._resetDbForTesting,
  _clearHandleCacheForTesting: vi.fn(),
}));

vi.mock('../src/styles/editor.css', () => ({}));

describe('editor main bootstrap', () => {
  beforeEach(() => {
    vi.resetModules();
    mainMocks.initEditor.mockReset();
    mainMocks.createPreview.mockReset();
    mainMocks.initToolbar.mockReset();
    mainMocks.showToast.mockReset();
    mainMocks.showFileHintModal.mockReset();
    mainMocks.openLocalFile.mockReset().mockResolvedValue(null);
    mainMocks.getRecentFiles.mockReset().mockResolvedValue([]);
    mainMocks.addToHistory.mockReset().mockResolvedValue(undefined);
    mainMocks.removeFromHistory.mockReset().mockResolvedValue(undefined);
  });

  function setupDom() {
    const document = new FakeDocument();
    const window = new FakeWindow();

    const requiredIds = [
      'brand-link',
      'file-sync-indicator',
      'monaco-container',
      'preview-iframe',
      'html-output',
      'error-bar',
      'error-message',
      'style-select',
      'preview-tabs',
      'copy-html-btn',
      'copy-link-btn',
      'examples-dropdown',
      'toast',
      'divider',
      'editor-panel',
      'show-comments-check',
      'comment-count-badge',
      'comment-toggle-label',
    ] as const;

    const elements = Object.fromEntries(
      requiredIds.map((id) => [id, document.registerElement(id, document.createElement('div'))]),
    ) as Record<(typeof requiredIds)[number], FakeElement>;

    const mainContainer = document.createElement('main');
    mainContainer.setBoundingClientRect({ left: 0, top: 0, width: 1000, height: 800 });
    mainContainer.appendChild(elements['editor-panel']);
    mainContainer.appendChild(elements['divider']);
    elements['editor-panel'].parentElement = mainContainer;

    elements['preview-tabs'].appendChild(document.createElement('button'));
    elements['copy-html-btn'].tagName;

    document.body.appendChild(mainContainer);
    vi.stubGlobal('document', document);
    vi.stubGlobal('window', window);
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    return { document, window, elements };
  }

  it('boots the editor and wires toolbar callbacks', async () => {
    const { document, window, elements } = setupDom();
    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'Current markdown'),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };

    mainMocks.initEditor.mockReturnValue(editor);
    mainMocks.createPreview.mockReturnValue(preview);

    await import('../src/main.js');

    expect(mainMocks.createPreview).toHaveBeenCalledTimes(1);
    expect(mainMocks.initEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        container: elements['monaco-container'],
      }),
    );
    expect(mainMocks.initToolbar).toHaveBeenCalledTimes(1);
    expect(editor.layout).toHaveBeenCalledTimes(1);
    expect(elements['editor-panel'].style.width).toBe('50%');
    expect(elements['copy-html-btn'].disabled).toBe(true);
    expect(editor.setValue).toHaveBeenCalledTimes(1);

    const toolbarOptions = mainMocks.initToolbar.mock.calls[0][0];
    toolbarOptions.onStyleChange('clean');
    expect(preview.setStyle).toHaveBeenCalledWith('clean');
    expect(preview.render).toHaveBeenCalledWith('Current markdown');

    toolbarOptions.onTabChange('html');
    expect(preview.setTab).toHaveBeenCalledWith('html');

    await toolbarOptions.onCopy();
    expect(editor.flushPendingChange).toHaveBeenCalledTimes(1);
    expect(mainMocks.showToast).toHaveBeenCalledWith(elements['toast'], 'Nothing to copy');

    preview.getHTML.mockReturnValue('<div>copied</div>');
    await toolbarOptions.onCopy();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('<div>copied</div>');
    expect(mainMocks.showToast).toHaveBeenCalledWith(elements['toast'], 'Copied to clipboard!');

    elements['divider'].dispatchEvent('pointerdown', { pointerId: 1 });
    document.dispatchEvent('pointermove', { pointerId: 1, clientX: 700, clientY: 0 });
    document.dispatchEvent('pointerup', { pointerId: 1 });

    expect(elements['editor-panel'].style.width).toBe('70%');
    expect(editor.layout).toHaveBeenCalledTimes(2);
    expect(elements['divider'].classList.contains('ed-divider--active')).toBe(false);

    window.innerWidth = 600;
    window.dispatchEvent('resize');
    expect(elements['editor-panel'].style.width).toBe('100%');
    expect(elements['editor-panel'].style.height).toBe('50%');
  });

  it('loads content from the URL hash when present', async () => {
    const { window } = setupDom();
    const sharedMd = '# Shared from URL\n\n[Click me]*';
    window.location.hash = encodeShareHash(sharedMd);

    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => sharedMd),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };

    mainMocks.initEditor.mockReturnValue(editor);
    mainMocks.createPreview.mockReturnValue(preview);

    await import('../src/main.js');

    expect(editor.setValue).toHaveBeenCalledTimes(1);
    expect(editor.setValue).toHaveBeenCalledWith(sharedMd);
    expect(mainMocks.showToast).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining('Could not load'),
    );
  });

  it('falls back to the default example and warns when the hash is malformed', async () => {
    const { window, elements } = setupDom();
    window.location.hash = '#code=!!garbage!!';

    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => ''),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };

    mainMocks.initEditor.mockReturnValue(editor);
    mainMocks.createPreview.mockReturnValue(preview);

    await import('../src/main.js');

    expect(editor.setValue).toHaveBeenCalledTimes(1);
    expect(editor.setValue.mock.calls[0][0]).not.toBe('');
    expect(mainMocks.showToast).toHaveBeenCalledWith(
      elements['toast'],
      'Could not load shared link — opening default',
    );
  });

  it('syncs the URL hash when the buffer changes after boot', async () => {
    const { window } = setupDom();

    let onChange: (value: string) => void = () => {};
    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => ''),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };

    mainMocks.initEditor.mockImplementation((opts: { onChange: (v: string) => void }) => {
      onChange = opts.onChange;
      return editor;
    });
    mainMocks.createPreview.mockReturnValue(preview);

    await import('../src/main.js');

    // Boot-time setValue → onChange fires but should NOT write hash (isInitializing).
    expect(window.history.calls.length).toBe(0);

    // Simulate a user edit after boot.
    onChange('# Typed after boot');
    expect(window.history.calls.length).toBe(1);
    expect(window.history.calls[0].url).toContain('#code=');

    // Clearing the buffer should clear the hash.
    onChange('');
    expect(window.history.calls.length).toBe(2);
    expect(window.history.calls[1].url).not.toContain('#');
  });

  function makeEditorPreview() {
    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => ''),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };
    mainMocks.initEditor.mockReturnValue(editor);
    mainMocks.createPreview.mockReturnValue(preview);
    return { editor, preview };
  }

  it('strips ?file= from URL when Skip is clicked in the modal', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';
    makeEditorPreview();

    let capturedOnDismiss: (() => void) | undefined;
    mainMocks.showFileHintModal.mockImplementation((opts: { onDismiss: () => void }) => {
      capturedOnDismiss = opts.onDismiss;
      return { close: vi.fn() };
    });

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe('?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md');

    capturedOnDismiss!();

    expect(window.location.search).toBe('');
  });

  it('strips ?file= from URL when Open File is clicked in the modal', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';
    makeEditorPreview();

    let capturedOnOpen: (() => Promise<void>) | undefined;
    mainMocks.showFileHintModal.mockImplementation((opts: { onOpen: () => Promise<void> }) => {
      capturedOnOpen = opts.onOpen;
      return { close: vi.fn() };
    });

    await import('../src/main.js');
    await capturedOnOpen!();

    expect(window.location.search).toBe('');
  });

  it('preserves other query params when stripping ?file=', async () => {
    const { window } = setupDom();
    window.location.search = '?style=clean&file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';
    makeEditorPreview();

    let capturedOnDismiss: (() => void) | undefined;
    mainMocks.showFileHintModal.mockImplementation((opts: { onDismiss: () => void }) => {
      capturedOnDismiss = opts.onDismiss;
      return { close: vi.fn() };
    });

    await import('../src/main.js');
    capturedOnDismiss!();

    expect(window.location.search).toBe('?style=clean');
  });

  it('silently reopens when ?file= path matches a recent handle', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';

    const handle = makeHandle('wireframe.md');
    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'wireframe.md', path: '/Users/tobias/Desktop/wireframe.md', handle },
    ]);
    makeEditorPreview();

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).not.toHaveBeenCalled();
    expect(mainMocks.showToast).toHaveBeenCalledWith(expect.anything(), 'Reopened wireframe.md');
    expect(window.location.search).toBe('');
  });

  it('passes recent files to the modal when ?file= has no match in history', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';

    const recentFiles = [
      { name: 'login.md', path: '/path/login.md', handle: makeHandle('login.md') },
    ];
    mainMocks.getRecentFiles.mockResolvedValue(recentFiles);
    makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).toHaveBeenCalledTimes(1);
    const opts = mainMocks.showFileHintModal.mock.calls[0][0];
    expect(opts.recentFiles).toEqual(recentFiles);
  });

  it('shows reopen-prompt modal when no ?file= but recent files exist', async () => {
    const { window } = setupDom();

    const recentFiles = [
      { name: 'wireframe.md', path: '/path/wireframe.md', handle: makeHandle('wireframe.md') },
    ];
    mainMocks.getRecentFiles.mockResolvedValue(recentFiles);
    const { editor } = makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).toHaveBeenCalledTimes(1);
    const opts = mainMocks.showFileHintModal.mock.calls[0][0];
    expect(opts.fullPath).toBeUndefined();
    expect(opts.recentFiles).toEqual(recentFiles);
    expect(editor.setValue).not.toHaveBeenCalled();
  });

  it('adds the opened file to history after a successful open', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';

    const handle = makeHandle('wireframe.md');
    mainMocks.getRecentFiles.mockResolvedValue([]);
    makeEditorPreview();

    let capturedOnOpen: (() => Promise<void>) | undefined;
    mainMocks.showFileHintModal.mockImplementation((opts: { onOpen: () => Promise<void> }) => {
      capturedOnOpen = opts.onOpen;
      return { close: vi.fn() };
    });
    mainMocks.openLocalFile.mockResolvedValue({
      handle,
      content: '# Hello',
      lastModified: 123,
    });

    await import('../src/main.js');
    await capturedOnOpen!();

    expect(mainMocks.addToHistory).toHaveBeenCalledWith(handle, '/Users/tobias/Desktop/wireframe.md');
  });

  it('onRecentOpen calls requestPermission before opening a cross-session handle', async () => {
    const { window } = setupDom();

    const requestPermission = vi.fn().mockResolvedValue('granted');
    const handle = { ...makeHandle('doc.md'), requestPermission };

    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'doc.md', path: '/path/doc.md', handle },
    ]);
    makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    const opts = mainMocks.showFileHintModal.mock.calls[0][0];
    await opts.onRecentOpen(handle, '/path/doc.md');

    expect(requestPermission).toHaveBeenCalledWith({ mode: 'readwrite' });
    expect(handle.getFile).toHaveBeenCalled();
  });

  it('onRecentOpen falls back to picker when requestPermission returns denied', async () => {
    const { window } = setupDom();

    const requestPermission = vi.fn().mockResolvedValue('denied');
    const handle = { ...makeHandle('doc.md'), requestPermission };

    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'doc.md', path: '/path/doc.md', handle },
    ]);
    makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    const opts = mainMocks.showFileHintModal.mock.calls[0][0];
    await opts.onRecentOpen(handle, '/path/doc.md');

    expect(requestPermission).toHaveBeenCalledWith({ mode: 'readwrite' });
    expect(mainMocks.openLocalFile).toHaveBeenCalled();
    expect(handle.getFile).not.toHaveBeenCalled();
  });

  it('onRecentOpen shows reconnect toast and opens picker when handle is null', async () => {
    const { window, elements } = setupDom();

    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'lost.md', path: '/path/lost.md', handle: null },
    ]);
    makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    const opts = mainMocks.showFileHintModal.mock.calls[0][0];
    await opts.onRecentOpen(null, '/path/lost.md');

    expect(mainMocks.showToast).toHaveBeenCalledWith(
      elements['toast'],
      'Please reselect lost.md to reconnect',
    );
    expect(mainMocks.openLocalFile).toHaveBeenCalled();
  });

  it('shows modal instead of silent reopen when queryPermission is not granted', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';

    const queryPermission = vi.fn().mockResolvedValue('prompt');
    const handle = { ...makeHandle('wireframe.md'), queryPermission };
    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'wireframe.md', path: '/Users/tobias/Desktop/wireframe.md', handle },
    ]);
    makeEditorPreview();
    mainMocks.showFileHintModal.mockImplementation(() => ({ close: vi.fn() }));

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).toHaveBeenCalledTimes(1);
    expect(mainMocks.showToast).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining('Reopened'),
    );
  });

  it('still silently reopens when queryPermission returns granted', async () => {
    const { window } = setupDom();
    window.location.search = '?file=%2FUsers%2Ftobias%2FDesktop%2Fwireframe.md';

    const queryPermission = vi.fn().mockResolvedValue('granted');
    const handle = { ...makeHandle('wireframe.md'), queryPermission };
    mainMocks.getRecentFiles.mockResolvedValue([
      { name: 'wireframe.md', path: '/Users/tobias/Desktop/wireframe.md', handle },
    ]);
    makeEditorPreview();

    await import('../src/main.js');

    expect(mainMocks.showFileHintModal).not.toHaveBeenCalled();
    expect(mainMocks.showToast).toHaveBeenCalledWith(expect.anything(), 'Reopened wireframe.md');
    expect(window.location.search).toBe('');
  });

  it('onCopyLink flushes pending changes, syncs URL and copies location.href', async () => {
    const { window, elements } = setupDom();

    const editor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => '# Title'),
      layout: vi.fn(),
      flushPendingChange: vi.fn(),
    };
    const preview = {
      render: vi.fn(),
      setStyle: vi.fn(),
      setTab: vi.fn(),
      getHTML: vi.fn(() => ''),
      state: {},
    };

    mainMocks.initEditor.mockReturnValue(editor);
    mainMocks.createPreview.mockReturnValue(preview);

    await import('../src/main.js');

    const toolbarOptions = mainMocks.initToolbar.mock.calls[0][0];
    expect(typeof toolbarOptions.onCopyLink).toBe('function');
    expect(toolbarOptions.copyLinkBtn).toBe(elements['copy-link-btn']);

    await toolbarOptions.onCopyLink();

    expect(editor.flushPendingChange).toHaveBeenCalledTimes(1);
    expect(window.history.calls.length).toBe(1);
    expect(window.history.calls[0].url).toContain('#code=');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
    expect(mainMocks.showToast).toHaveBeenCalledWith(elements['toast'], 'Link copied!');
  });
});
