import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createFileSyncIndicator } from '../src/file-sync-indicator.js';
import { FakeDocument, FakeElement } from './helpers/fake-dom.js';

let document: FakeDocument;

beforeEach(() => {
  document = new FakeDocument();
  vi.stubGlobal('document', document);
});

function makeContainer() {
  return document.createElement('div') as unknown as HTMLElement;
}

function findByClass(container: FakeElement, cls: string): FakeElement | undefined {
  const results = container.querySelectorAll<FakeElement>(`.${cls}`);
  return results[0];
}

// --- unsupported state ---

describe('unsupported browser', () => {
  it('renders a disabled File button when supported is false', () => {
    const container = makeContainer() as unknown as FakeElement;
    createFileSyncIndicator(container as unknown as HTMLElement, {
      supported: false,
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    const btn = findByClass(container, 'ed-file-btn');
    expect(btn).toBeDefined();
    expect(btn?.classList.contains('ed-file-btn--unsupported')).toBe(true);
  });

  it('does not call onOpen when the disabled button is clicked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onOpen = vi.fn();
    createFileSyncIndicator(container as unknown as HTMLElement, {
      supported: false,
      onOpen,
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    const btn = findByClass(container, 'ed-file-btn');
    btn!.click();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('does not render a dropdown menu when unsupported', () => {
    const container = makeContainer() as unknown as FakeElement;
    createFileSyncIndicator(container as unknown as HTMLElement, {
      supported: false,
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    expect(findByClass(container, 'ed-file-menu__open')).toBeUndefined();
    expect(findByClass(container, 'ed-file-menu__save-as')).toBeUndefined();
  });
});

// --- idle state (default) ---

describe('idle state', () => {
  it('renders a File dropdown button', () => {
    const container = makeContainer() as unknown as FakeElement;
    createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    const btn = findByClass(container, 'ed-file-btn');
    expect(btn).toBeDefined();
  });

  it('calls onOpen when Open item is clicked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onOpen = vi.fn();
    createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen,
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    const openItem = findByClass(container, 'ed-file-menu__open');
    expect(openItem).toBeDefined();
    openItem!.click();

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('calls onSaveAs when Save as item is clicked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onSaveAs = vi.fn();
    createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs,
      onUnlink: vi.fn(),
    });

    const saveItem = findByClass(container, 'ed-file-menu__save-as');
    expect(saveItem).toBeDefined();
    saveItem!.click();

    expect(onSaveAs).toHaveBeenCalledOnce();
  });
});

// --- synced state ---

describe('synced state', () => {
  it('shows the filename', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('synced', 'wireframe.md');

    const name = findByClass(container, 'ed-file-linked__name');
    expect(name?.textContent).toBe('wireframe.md');
  });

  it('shows the sync icon, not the error icon', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('synced', 'wireframe.md');

    const linked = findByClass(container, 'ed-file-linked');
    expect(linked?.classList.contains('ed-file-linked--error')).toBe(false);
  });

  it('calls onUnlink when × is clicked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onUnlink = vi.fn();
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink,
    });

    indicator.setState('synced', 'wireframe.md');

    const closeBtn = findByClass(container, 'ed-file-linked__close');
    closeBtn!.click();

    expect(onUnlink).toHaveBeenCalledOnce();
  });

  it('does not render the File dropdown button while linked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('synced', 'wireframe.md');

    const btn = findByClass(container, 'ed-file-btn');
    expect(btn).toBeUndefined();
  });
});

// --- error state ---

describe('error state', () => {
  it('shows the filename with error styling', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('error', 'wireframe.md');

    const linked = findByClass(container, 'ed-file-linked');
    expect(linked?.classList.contains('ed-file-linked--error')).toBe(true);
  });

  it('still calls onUnlink when × is clicked in error state', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onUnlink = vi.fn();
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink,
    });

    indicator.setState('error', 'wireframe.md');

    const closeBtn = findByClass(container, 'ed-file-linked__close');
    closeBtn!.click();

    expect(onUnlink).toHaveBeenCalledOnce();
  });
});

// --- suggested state ---

describe('suggested state', () => {
  it('renders an open-prompt button with the filename', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('suggested', 'wireframe.md');

    const btn = findByClass(container, 'ed-file-suggested');
    expect(btn).toBeDefined();
    const name = findByClass(container, 'ed-file-suggested__name');
    expect(name?.textContent).toBe('wireframe.md');
  });

  it('calls onOpen when the suggested prompt is clicked', () => {
    const container = makeContainer() as unknown as FakeElement;
    const onOpen = vi.fn();
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen,
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('suggested', 'wireframe.md');

    const btn = findByClass(container, 'ed-file-suggested');
    btn!.click();

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('does not render the File dropdown while in suggested state', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('suggested', 'wireframe.md');

    expect(findByClass(container, 'ed-file-btn')).toBeUndefined();
  });

  it('transitions from suggested to synced after file is opened', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('suggested', 'wireframe.md');
    indicator.setState('synced', 'wireframe.md');

    expect(findByClass(container, 'ed-file-suggested')).toBeUndefined();
    expect(findByClass(container, 'ed-file-linked')).toBeDefined();
  });
});

// --- transitions ---

describe('state transitions', () => {
  it('returns to idle (File button) after setState("idle")', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('synced', 'wireframe.md');
    indicator.setState('idle');

    expect(findByClass(container, 'ed-file-btn')).toBeDefined();
    expect(findByClass(container, 'ed-file-linked')).toBeUndefined();
  });

  it('can switch from error back to synced', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('error', 'wireframe.md');
    indicator.setState('synced', 'wireframe.md');

    const linked = findByClass(container, 'ed-file-linked');
    expect(linked?.classList.contains('ed-file-linked--error')).toBe(false);
  });

  it('updates filename when setState is called again with new name', () => {
    const container = makeContainer() as unknown as FakeElement;
    const indicator = createFileSyncIndicator(container as unknown as HTMLElement, {
      onOpen: vi.fn(),
      onSaveAs: vi.fn(),
      onUnlink: vi.fn(),
    });

    indicator.setState('synced', 'first.md');
    indicator.setState('synced', 'second.md');

    const name = findByClass(container, 'ed-file-linked__name');
    expect(name?.textContent).toBe('second.md');
  });
});
