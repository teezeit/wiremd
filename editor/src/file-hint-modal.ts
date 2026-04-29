/** wiremd Editor - Modal shown when ?file= hint is present or recent files exist */

import type { WireFileHandle } from './local-file.js';

export interface RecentFileItem {
  name: string;
  path: string;
  handle: WireFileHandle | null;
}

export interface FileHintModalOpts {
  fullPath?: string;
  supported: boolean;
  recentFiles?: RecentFileItem[];
  onOpen?: () => void;
  onRecentOpen?: (handle: WireFileHandle | null, path: string) => void;
  onDismiss: () => void;
}

export function showFileHintModal(opts: FileHintModalOpts): { close: () => void } {
  const backdrop = document.createElement('div');
  backdrop.className = 'ed-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'ed-modal';

  const title = document.createElement('h2');
  title.className = 'ed-modal__title';
  title.textContent = 'Edit File in Browser';
  modal.appendChild(title);

  if (opts.fullPath) {
    const path = document.createElement('div');
    path.className = 'ed-modal__path';
    path.textContent = opts.fullPath;
    path.title = opts.fullPath;
    modal.appendChild(path);

    if (opts.supported) {
      const openBtn = document.createElement('button');
      openBtn.className = 'ed-btn ed-btn--accent ed-modal__open';
      openBtn.textContent = 'Open File';
      openBtn.addEventListener('click', () => { remove(); opts.onOpen?.(); });
      modal.appendChild(openBtn);
    } else {
      const notice = document.createElement('p');
      notice.className = 'ed-modal__unsupported';
      notice.textContent = 'Local file sync requires Chrome, Edge, or Safari 16.4+';
      modal.appendChild(notice);
    }
  }

  const recent = opts.recentFiles ?? [];
  if (recent.length > 0) {
    const section = document.createElement('div');
    section.className = 'ed-modal__recent';

    const label = document.createElement('p');
    label.className = 'ed-modal__recent-label';
    label.textContent = opts.fullPath ? 'Recently opened' : 'Continue with a recent file';
    section.appendChild(label);

    for (const item of recent) {
      const btn = document.createElement('button');
      btn.className = 'ed-modal__recent-item';
      btn.textContent = item.name;
      btn.title = item.path;
      btn.addEventListener('click', () => { remove(); opts.onRecentOpen?.(item.handle, item.path); });
      section.appendChild(btn);
    }

    modal.appendChild(section);
  }

  const dismissBtn = document.createElement('button');
  dismissBtn.className = 'ed-modal__dismiss';
  dismissBtn.textContent = 'Skip';
  dismissBtn.addEventListener('click', () => { remove(); opts.onDismiss(); });
  modal.appendChild(dismissBtn);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  function remove() {
    if (backdrop.parentElement) backdrop.parentElement.removeChild(backdrop);
  }

  backdrop.addEventListener('click', (e) => {
    if ((e as MouseEvent).target === backdrop) { remove(); opts.onDismiss(); }
  });

  modal.addEventListener('click', (e) => { (e as Event).stopPropagation(); });

  return { close: remove };
}
