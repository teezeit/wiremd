import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCloudShare } from '../src/cloud-share.js';
import { FakeDocument, FakeElement } from './helpers/fake-dom.js';

let document: FakeDocument;

beforeEach(() => {
  document = new FakeDocument();
  vi.stubGlobal('document', document);
});

function makeContainer(): FakeElement {
  return document.createElement('div') as unknown as FakeElement;
}

function findByClass(container: FakeElement, cls: string): FakeElement | undefined {
  return container.querySelectorAll<FakeElement>(`.${cls}`)[0];
}

describe('createCloudShare — hash mode (initial)', () => {
  it('renders a "Work together" CTA button', () => {
    const container = makeContainer();
    createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    const btn = findByClass(container, 'ed-cloud-share__cta');
    expect(btn).toBeDefined();
    expect(btn?.textContent ?? '').toMatch(/work together/i);
  });

  it('does not render the status pill in hash mode', () => {
    const container = makeContainer();
    createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    expect(findByClass(container, 'ed-cloud-share__pill')).toBeUndefined();
  });

  it('calls onPromote when the CTA is clicked', () => {
    const container = makeContainer();
    const onPromote = vi.fn();
    createCloudShare(container as unknown as HTMLElement, {
      onPromote,
      onCopyLink: vi.fn(),
    });

    findByClass(container, 'ed-cloud-share__cta')!.click();
    expect(onPromote).toHaveBeenCalledOnce();
  });
});

describe('createCloudShare — switching to project mode', () => {
  it('replaces the CTA with a status pill', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saved' });

    expect(findByClass(container, 'ed-cloud-share__cta')).toBeUndefined();
    expect(findByClass(container, 'ed-cloud-share__pill')).toBeDefined();
  });

  it('shows "Saved" by default when entering project mode', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saved' });

    const pill = findByClass(container, 'ed-cloud-share__pill');
    expect(pill?.textContent ?? '').toMatch(/saved/i);
  });

  it('calls onCopyLink when the pill is clicked', () => {
    const container = makeContainer();
    const onCopyLink = vi.fn();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink,
    });

    ctrl.setState({ mode: 'project', saveState: 'saved' });
    findByClass(container, 'ed-cloud-share__pill')!.click();
    expect(onCopyLink).toHaveBeenCalledOnce();
  });
});

describe('createCloudShare — save state transitions in project mode', () => {
  it('shows "Saving…" when state is saving', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saving' });

    const pill = findByClass(container, 'ed-cloud-share__pill');
    expect(pill?.textContent ?? '').toMatch(/saving/i);
    expect(pill?.classList.contains('ed-cloud-share__pill--saving')).toBe(true);
  });

  it('shows "Saved" with the saved class when state is saved', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saved' });

    const pill = findByClass(container, 'ed-cloud-share__pill');
    expect(pill?.classList.contains('ed-cloud-share__pill--saved')).toBe(true);
  });

  it('shows "Save failed" with the error class when state is error', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'error' });

    const pill = findByClass(container, 'ed-cloud-share__pill');
    expect(pill?.textContent ?? '').toMatch(/failed|error/i);
    expect(pill?.classList.contains('ed-cloud-share__pill--error')).toBe(true);
  });

  it('updates the same pill in place across rapid state changes', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saving' });
    ctrl.setState({ mode: 'project', saveState: 'saved' });
    ctrl.setState({ mode: 'project', saveState: 'saving' });

    const pills = container.querySelectorAll<FakeElement>('.ed-cloud-share__pill');
    expect(pills).toHaveLength(1);
    expect(pills[0]?.classList.contains('ed-cloud-share__pill--saving')).toBe(true);
  });
});

describe('createCloudShare — back to hash mode', () => {
  it('restores the CTA button if setState({ mode: "hash" }) is called', () => {
    const container = makeContainer();
    const ctrl = createCloudShare(container as unknown as HTMLElement, {
      onPromote: vi.fn(),
      onCopyLink: vi.fn(),
    });

    ctrl.setState({ mode: 'project', saveState: 'saved' });
    ctrl.setState({ mode: 'hash' });

    expect(findByClass(container, 'ed-cloud-share__pill')).toBeUndefined();
    expect(findByClass(container, 'ed-cloud-share__cta')).toBeDefined();
  });
});
