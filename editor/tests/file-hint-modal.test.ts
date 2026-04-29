import { beforeEach, describe, expect, it, vi } from 'vitest';
import { showFileHintModal } from '../src/file-hint-modal.js';
import { FakeDocument, FakeElement } from './helpers/fake-dom.js';

let document: FakeDocument;

beforeEach(() => {
  document = new FakeDocument();
  vi.stubGlobal('document', document);
});

function findByClass(root: FakeElement, cls: string): FakeElement | undefined {
  return root.querySelectorAll<FakeElement>(`.${cls}`)[0];
}

const BASE_OPTS = {
  fullPath: '/Users/tobias/Desktop/wireframe.md',
  onOpen: vi.fn(),
  onDismiss: vi.fn(),
};

describe('showFileHintModal — supported browser', () => {
  it('appends the modal to document.body', () => {
    showFileHintModal({ ...BASE_OPTS, supported: true });
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeDefined();
  });

  it('displays the full path', () => {
    showFileHintModal({ ...BASE_OPTS, supported: true });
    const path = findByClass(document.body, 'ed-modal__path');
    expect(path?.textContent).toBe('/Users/tobias/Desktop/wireframe.md');
  });

  it('shows the Open File button', () => {
    showFileHintModal({ ...BASE_OPTS, supported: true });
    expect(findByClass(document.body, 'ed-modal__open')).toBeDefined();
  });

  it('does not show the browser-unsupported notice', () => {
    showFileHintModal({ ...BASE_OPTS, supported: true });
    expect(findByClass(document.body, 'ed-modal__unsupported')).toBeUndefined();
  });

  it('calls onOpen and removes modal when Open File is clicked', () => {
    const onOpen = vi.fn();
    showFileHintModal({ ...BASE_OPTS, supported: true, onOpen });

    findByClass(document.body, 'ed-modal__open')!.click();

    expect(onOpen).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('calls onDismiss and removes modal when Skip is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ ...BASE_OPTS, supported: true, onDismiss });

    findByClass(document.body, 'ed-modal__dismiss')!.click();

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('calls onDismiss and removes modal when backdrop is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ ...BASE_OPTS, supported: true, onDismiss });

    findByClass(document.body, 'ed-modal-backdrop')!.click();

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('does not dismiss when the modal card itself is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ ...BASE_OPTS, supported: true, onDismiss });

    findByClass(document.body, 'ed-modal')!.click();

    expect(onDismiss).not.toHaveBeenCalled();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeDefined();
  });

  it('close() removes the modal without calling any callback', () => {
    const onOpen = vi.fn();
    const onDismiss = vi.fn();
    const { close } = showFileHintModal({ ...BASE_OPTS, supported: true, onOpen, onDismiss });

    close();

    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
    expect(onOpen).not.toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });
});

describe('showFileHintModal — unsupported browser', () => {
  it('still shows the path', () => {
    showFileHintModal({ ...BASE_OPTS, supported: false });
    const path = findByClass(document.body, 'ed-modal__path');
    expect(path?.textContent).toBe('/Users/tobias/Desktop/wireframe.md');
  });

  it('does not show the Open File button', () => {
    showFileHintModal({ ...BASE_OPTS, supported: false });
    expect(findByClass(document.body, 'ed-modal__open')).toBeUndefined();
  });

  it('shows a browser-unsupported notice', () => {
    showFileHintModal({ ...BASE_OPTS, supported: false });
    expect(findByClass(document.body, 'ed-modal__unsupported')).toBeDefined();
  });

  it('Skip still calls onDismiss and removes modal', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ ...BASE_OPTS, supported: false, onDismiss });

    findByClass(document.body, 'ed-modal__dismiss')!.click();

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });
});
