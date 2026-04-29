/** wiremd Editor - Modal shown when ?file= hint is present in the URL */

export interface FileHintModalOpts {
  filename: string;
  fullPath: string;
  onOpen: () => void;
  onDismiss: () => void;
}

export function showFileHintModal(opts: FileHintModalOpts): { close: () => void } {
  const backdrop = document.createElement('div');
  backdrop.className = 'ed-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'ed-modal';

  const icon = document.createElement('div');
  icon.className = 'ed-modal__icon';
  icon.textContent = '📄';

  const title = document.createElement('h2');
  title.className = 'ed-modal__title';
  title.textContent = 'Claude prepared a wireframe for you';

  const filename = document.createElement('div');
  filename.className = 'ed-modal__filename';
  filename.textContent = opts.filename;

  const path = document.createElement('div');
  path.className = 'ed-modal__path';
  path.textContent = opts.fullPath;

  const openBtn = document.createElement('button');
  openBtn.className = 'ed-btn ed-btn--accent ed-modal__open';
  openBtn.textContent = 'Open file →';

  const dismissBtn = document.createElement('button');
  dismissBtn.className = 'ed-modal__dismiss';
  dismissBtn.textContent = 'Continue without file';

  modal.appendChild(icon);
  modal.appendChild(title);
  modal.appendChild(filename);
  modal.appendChild(path);
  modal.appendChild(openBtn);
  modal.appendChild(dismissBtn);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  function remove() {
    if (backdrop.parentElement) {
      backdrop.parentElement.removeChild(backdrop);
    }
  }

  openBtn.addEventListener('click', () => {
    remove();
    opts.onOpen();
  });

  dismissBtn.addEventListener('click', () => {
    remove();
    opts.onDismiss();
  });

  backdrop.addEventListener('click', (e) => {
    if ((e as MouseEvent).target === backdrop) {
      remove();
      opts.onDismiss();
    }
  });

  modal.addEventListener('click', (e) => {
    (e as Event).stopPropagation();
  });

  return { close: remove };
}
