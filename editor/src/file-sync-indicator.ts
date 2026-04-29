/** wiremd Editor - File sync indicator: "File ▾" button ↔ "⟳ file.md ×" pill */

export type FileSyncState = 'idle' | 'suggested' | 'synced' | 'error';

export interface FileSyncIndicator {
  setState(state: FileSyncState, filename?: string): void;
}

export function createFileSyncIndicator(
  container: HTMLElement,
  opts: {
    supported?: boolean;
    onOpen: () => void;
    onSaveAs: () => void;
    onUnlink: () => void;
  },
): FileSyncIndicator {
  function render(state: FileSyncState, filename?: string) {
    container.replaceChildren();

    if (state === 'idle') {
      renderIdle();
    } else if (state === 'suggested') {
      renderSuggested(filename ?? '');
    } else {
      renderLinked(state, filename ?? '');
    }
  }

  function renderIdle() {
    if (opts.supported === false) {
      renderUnsupported();
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'ed-dropdown ed-file-btn';

    const btn = document.createElement('button');
    btn.className = 'ed-btn';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      </svg>
      File
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px;">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;

    const menu = document.createElement('div');
    menu.className = 'ed-dropdown__menu';

    const openItem = document.createElement('button');
    openItem.className = 'ed-dropdown__item ed-file-menu__open';
    openItem.textContent = 'Open…';
    openItem.addEventListener('click', () => {
      menu.classList.remove('ed-dropdown__menu--open');
      opts.onOpen();
    });

    const saveItem = document.createElement('button');
    saveItem.className = 'ed-dropdown__item ed-file-menu__save-as';
    saveItem.textContent = 'Save as…';
    saveItem.addEventListener('click', () => {
      menu.classList.remove('ed-dropdown__menu--open');
      opts.onSaveAs();
    });

    menu.appendChild(openItem);
    menu.appendChild(saveItem);

    btn.addEventListener('click', (e) => {
      (e as Event).stopPropagation();
      menu.classList.toggle('ed-dropdown__menu--open');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('ed-dropdown__menu--open');
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(menu);
    container.appendChild(wrapper);
  }

  function renderUnsupported() {
    const btn = document.createElement('button');
    btn.className = 'ed-btn ed-file-btn ed-file-btn--unsupported';
    btn.title = 'Local file sync requires Chrome, Edge, or Safari 16.4+ — not supported in this browser';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      </svg>
      File
    `;
    container.appendChild(btn);
  }

  function renderSuggested(filename: string) {
    const btn = document.createElement('button');
    btn.className = 'ed-btn ed-file-suggested';
    btn.title = `Click to open ${filename} and start syncing`;
    btn.addEventListener('click', opts.onOpen);

    const icon = document.createElement('span');
    icon.textContent = '📄';

    const name = document.createElement('span');
    name.className = 'ed-file-suggested__name';
    name.textContent = filename;

    const cta = document.createElement('span');
    cta.className = 'ed-file-suggested__cta';
    cta.textContent = 'Open →';

    btn.appendChild(icon);
    btn.appendChild(name);
    btn.appendChild(cta);
    container.appendChild(btn);
  }

  function renderLinked(state: FileSyncState, filename: string) {
    const pill = document.createElement('div');
    pill.className = state === 'error'
      ? 'ed-file-linked ed-file-linked--error'
      : 'ed-file-linked';

    const icon = document.createElement('span');
    icon.className = 'ed-file-linked__icon';
    icon.textContent = state === 'error' ? '⚠' : '⟳';
    icon.title = state === 'error' ? 'File not writable — reopen to reconnect' : 'Syncing with local file';

    const name = document.createElement('span');
    name.className = 'ed-file-linked__name';
    name.textContent = filename;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ed-file-linked__close';
    closeBtn.textContent = '×';
    closeBtn.title = 'Stop syncing';
    closeBtn.addEventListener('click', opts.onUnlink);

    pill.appendChild(icon);
    pill.appendChild(name);
    pill.appendChild(closeBtn);
    container.appendChild(pill);
  }

  render('idle');

  return {
    setState(state, filename) {
      render(state, filename);
    },
  };
}
