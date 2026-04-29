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

describe('showFileHintModal', () => {
  it('appends the modal to document.body', () => {
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen: vi.fn(), onDismiss: vi.fn() });
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeDefined();
  });

  it('displays the filename', () => {
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen: vi.fn(), onDismiss: vi.fn() });
    const name = findByClass(document.body, 'ed-modal__filename');
    expect(name?.textContent).toBe('wireframe.md');
  });

  it('displays the full path', () => {
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/Users/tobias/Desktop/wireframe.md', onOpen: vi.fn(), onDismiss: vi.fn() });
    const path = findByClass(document.body, 'ed-modal__path');
    expect(path?.textContent).toBe('/Users/tobias/Desktop/wireframe.md');
  });

  it('calls onOpen and removes modal when Open button is clicked', () => {
    const onOpen = vi.fn();
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen, onDismiss: vi.fn() });

    findByClass(document.body, 'ed-modal__open')!.click();

    expect(onOpen).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('calls onDismiss and removes modal when Dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen: vi.fn(), onDismiss });

    findByClass(document.body, 'ed-modal__dismiss')!.click();

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('calls onDismiss and removes modal when backdrop is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen: vi.fn(), onDismiss });

    findByClass(document.body, 'ed-modal-backdrop')!.click();

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
  });

  it('does not dismiss when the modal card itself is clicked', () => {
    const onDismiss = vi.fn();
    showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen: vi.fn(), onDismiss });

    findByClass(document.body, 'ed-modal')!.click();

    expect(onDismiss).not.toHaveBeenCalled();
    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeDefined();
  });

  it('close() removes the modal without calling any callback', () => {
    const onOpen = vi.fn();
    const onDismiss = vi.fn();
    const { close } = showFileHintModal({ filename: 'wireframe.md', fullPath: '/path/wireframe.md', onOpen, onDismiss });

    close();

    expect(findByClass(document.body, 'ed-modal-backdrop')).toBeUndefined();
    expect(onOpen).not.toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
