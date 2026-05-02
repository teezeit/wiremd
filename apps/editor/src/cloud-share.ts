/**
 * Header CTA + status pill for collaborative ("project") mode.
 *
 *   hash mode    → button "Work together in cloud" (calls onPromote)
 *   project mode → status pill ● Saved / Saving… / Save failed (calls onCopyLink)
 *
 * The save state is mirrored from the project-controller via setState().
 */

import type { SaveState } from './project-controller.js';

export type CloudShareState =
  | { mode: 'hash' }
  | { mode: 'project'; saveState: SaveState };

export type CloudShareOptions = {
  onPromote: () => void | Promise<void>;
  onCopyLink: () => void | Promise<void>;
};

export type CloudShareController = {
  setState(state: CloudShareState): void;
};

const STATUS_TEXT: Record<SaveState, string> = {
  idle: 'Sharing live',
  saving: 'Saving…',
  saved: 'Sharing live · Saved',
  error: 'Save failed',
};

export function createCloudShare(
  container: HTMLElement,
  opts: CloudShareOptions,
): CloudShareController {
  let pill: HTMLButtonElement | null = null;
  let cta: HTMLButtonElement | null = null;

  const wrapper = document.createElement('div');
  wrapper.className = 'ed-cloud-share';
  container.appendChild(wrapper);

  const renderCta = () => {
    if (cta) return;
    teardownPill();
    cta = document.createElement('button') as HTMLButtonElement;
    cta.className = 'ed-cloud-share__cta ed-btn ed-btn--accent';
    cta.type = 'button';
    cta.title = 'Save this wireframe to a project URL so multiple people can edit it';
    cta.textContent = 'Work together in cloud';
    cta.addEventListener('click', () => {
      void opts.onPromote();
    });
    wrapper.appendChild(cta);
  };

  const teardownCta = () => {
    if (!cta) return;
    cta.parentElement?.removeChild(cta);
    cta = null;
  };

  const renderPill = (state: SaveState) => {
    if (!pill) {
      pill = document.createElement('button') as HTMLButtonElement;
      pill.type = 'button';
      pill.title = 'Click to copy this project URL';
      pill.addEventListener('click', () => {
        void opts.onCopyLink();
      });
      wrapper.appendChild(pill);
    }
    teardownCta();

    pill.className =
      'ed-cloud-share__pill ed-cloud-share__pill--' +
      state +
      (state === 'idle' ? ' ed-cloud-share__pill--saved' : '');
    pill.textContent = STATUS_TEXT[state];
  };

  const teardownPill = () => {
    if (!pill) return;
    pill.parentElement?.removeChild(pill);
    pill = null;
  };

  // Initial state: hash mode
  renderCta();

  return {
    setState(next: CloudShareState) {
      if (next.mode === 'hash') {
        teardownPill();
        renderCta();
        return;
      }
      renderPill(next.saveState);
    },
  };
}
