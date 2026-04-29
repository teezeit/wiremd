/** wiremd Editor - Main Entry Point */

import './styles/editor.css';
import { initEditor } from './editor.js';
import { createPreview } from './preview.js';
import type { StyleName } from './renderMarkup.js';
import {
  calculateSplitPercent,
  getEditorPanelStyle,
  getSplitLayout,
} from './splitter.js';
import { initToolbar, showToast } from './toolbar.js';
import { examples } from './examples.js';
import { decodeShareHash, encodeShareHash } from './url-share.js';
import { createFileSyncIndicator } from './file-sync-indicator.js';
import { basenameFromPath, parseFileHint } from './file-hint.js';
import { showFileHintModal } from './file-hint-modal.js';
import {
  isFileSystemAccessSupported,
  openLocalFile,
  saveAsLocalFile,
  watchFile,
  writeFile,
} from './local-file.js';
import type { LocalFileResult, WireFileHandle } from './local-file.js';
import { createDebouncedChangeController } from './debouncedChange.js';

// --- DOM Elements ---
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const fileSyncContainer = $('file-sync-indicator');
const monacoContainer = $('monaco-container');
const previewIframe = $<HTMLIFrameElement>('preview-iframe');
const htmlOutputContainer = $('html-output');
const errorBar = $('error-bar');
const errorMessage = $('error-message');
const styleSelect = $<HTMLSelectElement>('style-select');
const previewTabs = $('preview-tabs');
const copyBtn = $<HTMLButtonElement>('copy-html-btn');
const copyLinkBtn = $<HTMLButtonElement>('copy-link-btn');
const examplesDropdown = $('examples-dropdown');
const toast = $('toast');
const divider = $('divider');
const editorPanel = $('editor-panel');
const showCommentsCheck = $<HTMLInputElement>('show-comments-check');
const commentCountBadge = $('comment-count-badge');
const commentToggleLabel = $('comment-toggle-label');

// --- File sync state ---
let currentHandle: WireFileHandle | null = null;
let watcher: ReturnType<typeof watchFile> | null = null;
let isUpdatingFromFile = false;

const writeDebounce = createDebouncedChangeController<string>({
  delayMs: 500,
  onChange: async (content) => {
    if (!currentHandle) return;
    try {
      await writeFile(currentHandle, content);
      const file = await currentHandle.getFile();
      watcher?.setLastSeen(file.lastModified);
      fileSyncIndicator.setState('synced', currentHandle.name);
    } catch {
      fileSyncIndicator.setState('error', currentHandle.name);
    }
  },
});

async function linkFile(result: LocalFileResult) {
  watcher?.stop();
  writeDebounce.cancel();
  currentHandle = result.handle;
  isUpdatingFromFile = true;
  editor.setValue(result.content);
  isUpdatingFromFile = false;
  watcher = watchFile(
    result.handle,
    (content) => {
      isUpdatingFromFile = true;
      editor.setValue(content);
      isUpdatingFromFile = false;
    },
    { initialLastModified: result.lastModified },
  );
  fileSyncIndicator.setState('synced', result.handle.name);
}

function unlinkFile() {
  watcher?.stop();
  writeDebounce.cancel();
  watcher = null;
  currentHandle = null;
  fileSyncIndicator.setState('idle');
}

const fileSyncIndicator = createFileSyncIndicator(fileSyncContainer, {
  supported: isFileSystemAccessSupported(),
  onOpen: async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await openLocalFile((window as any).showOpenFilePicker);
    if (result) linkFile(result);
  },
  onSaveAs: async () => {
    editor.flushPendingChange();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await saveAsLocalFile((window as any).showSaveFilePicker, editor.getValue());
    if (result) linkFile(result);
  },
  onUnlink: unlinkFile,
});

function updateCopyButtonState() {
  copyBtn.disabled = preview.getHTML() === '';
}

function updateCommentBadge() {
  const count = preview.state.lastCommentCount;
  if (count > 0) {
    commentCountBadge.textContent = String(count);
    commentCountBadge.removeAttribute('hidden');
  } else {
    commentCountBadge.setAttribute('hidden', '');
  }
}

function renderMarkdown(markdown: string) {
  preview.render(markdown);
  updateCopyButtonState();
  updateCommentBadge();
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to the legacy copy path below.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
}

let isInitializing = true;

function syncUrlToBuffer(value: string) {
  const hash = encodeShareHash(value);
  const url = window.location.pathname + window.location.search + hash;
  window.history.replaceState(null, '', url);
}
	
// --- Preview ---
const preview = createPreview({
  iframe: previewIframe,
  htmlOutputContainer,
  errorBar,
  errorMessage,
});

// --- Editor ---
const editor = initEditor({
  container: monacoContainer,
  onChange: (value) => {
    renderMarkdown(value);
    if (!isInitializing) {
      syncUrlToBuffer(value);
    }
    if (currentHandle && !isUpdatingFromFile) {
      writeDebounce.schedule(value);
    }
  },
});

// --- Toolbar ---
initToolbar({
  examplesContainer: examplesDropdown,
  styleSelect,
  tabs: previewTabs,
  copyBtn,
  copyLinkBtn,
  onExampleSelect: (example) => {
    editor.setValue(example.code);
  },
  onStyleChange: (style) => {
    preview.setStyle(style as StyleName);
    renderMarkdown(editor.getValue());
  },
  onTabChange: (tab) => {
    preview.setTab(tab);
  },
  onCopy: async () => {
    editor.flushPendingChange();
    const html = preview.getHTML();

    if (!html) {
      showToast(toast, 'Nothing to copy');
      return;
    }

    const copied = await copyText(html);
    showToast(toast, copied ? 'Copied to clipboard!' : 'Copy failed');
  },
  onCopyLink: async () => {
    editor.flushPendingChange();
    syncUrlToBuffer(editor.getValue());
    const copied = await copyText(window.location.href);
    showToast(toast, copied ? 'Link copied!' : 'Copy failed');
  },
});

showCommentsCheck.addEventListener('change', () => {
  preview.setShowComments(showCommentsCheck.checked);
  commentToggleLabel.textContent = showCommentsCheck.checked ? 'Hide comments' : 'Show comments';
  renderMarkdown(editor.getValue());
});

// --- Resizable Divider ---
let isDragging = false;
let activePointerId: number | null = null;
let horizontalSplit = 50;
let verticalSplit = 50;

function applySplit() {
  const layout = getSplitLayout(window.innerWidth);
  const editorPanelStyle = getEditorPanelStyle(layout, horizontalSplit, verticalSplit);
  editorPanel.style.width = editorPanelStyle.width;
  editorPanel.style.height = editorPanelStyle.height;
  editor.layout();
}

divider.addEventListener('pointerdown', (e) => {
  isDragging = true;
  activePointerId = e.pointerId;
  divider.setPointerCapture(e.pointerId);
  divider.classList.add('ed-divider--active');
  document.body.style.cursor = getSplitLayout(window.innerWidth) === 'vertical'
    ? 'row-resize'
    : 'col-resize';
  document.body.style.userSelect = 'none';
  document.body.style.touchAction = 'none';
  e.preventDefault();
});

document.addEventListener('pointermove', (e) => {
  if (activePointerId !== null && e.pointerId !== activePointerId) return;
  if (!isDragging) return;

  const main = editorPanel.parentElement;
  if (!main) return;
  const mainRect = main.getBoundingClientRect();
  const layout = getSplitLayout(window.innerWidth);

  if (layout === 'vertical') {
    verticalSplit = calculateSplitPercent(layout, e, mainRect, verticalSplit);
  } else {
    horizontalSplit = calculateSplitPercent(layout, e, mainRect, horizontalSplit);
  }

  applySplit();
});

function stopDragging(e?: PointerEvent) {
  if (!isDragging) return;
  if (e && activePointerId !== null && e.pointerId !== activePointerId) return;

  isDragging = false;
  divider.classList.remove('ed-divider--active');
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
  document.body.style.touchAction = '';
  if (activePointerId !== null && divider.hasPointerCapture(activePointerId)) {
    divider.releasePointerCapture(activePointerId);
  }
  activePointerId = null;
}

document.addEventListener('pointerup', stopDragging);
document.addEventListener('pointercancel', stopDragging);
window.addEventListener('resize', applySplit);

applySplit();
updateCopyButtonState();

// --- Load initial content: from URL hash if present, else first example ---
const rawHash = window.location.hash ?? '';
const sharedContent = decodeShareHash(rawHash);
const fileHintPath = parseFileHint(window.location.search);

if (sharedContent !== null) {
  editor.setValue(sharedContent);
} else if (fileHintPath) {
  // Leave editor empty — modal will prompt the user to open the file
  showFileHintModal({
    fullPath: fileHintPath,
    supported: isFileSystemAccessSupported(),
    onOpen: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await openLocalFile((window as any).showOpenFilePicker);
      if (result) linkFile(result);
    },
    onDismiss: () => {
      if (examples.length > 0) editor.setValue(examples[0].code);
    },
  });
} else {
  if (rawHash.length > 1) {
    showToast(toast, 'Could not load shared link — opening default');
  }
  if (examples.length > 0) {
    editor.setValue(examples[0].code);
  }
}

isInitializing = false;
