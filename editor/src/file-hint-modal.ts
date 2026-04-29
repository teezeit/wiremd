/** wiremd Editor - Modal shown when ?file= hint is present in the URL */

export interface FileHintModalOpts {
  fullPath: string;
  supported: boolean;
  onOpen: () => void;
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

  const path = document.createElement('div');
  path.className = 'ed-modal__path';
  path.textContent = opts.fullPath;
  path.title = opts.fullPath;

  modal.appendChild(title);
  modal.appendChild(path);

  if (opts.supported) {
    const openBtn = document.createElement('button');
    openBtn.className = 'ed-btn ed-btn--accent ed-modal__open';
    openBtn.textContent = 'Open File';
    openBtn.addEventListener('click', () => { remove(); opts.onOpen(); });
    modal.appendChild(openBtn);
  } else {
    const notice = document.createElement('p');
    notice.className = 'ed-modal__unsupported';
    notice.textContent = 'Local file sync requires Chrome, Edge, or Safari 16.4+';
    modal.appendChild(notice);
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
