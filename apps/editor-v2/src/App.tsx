import { useState, useCallback, useRef } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { HamburgerMenu } from './components/HamburgerMenu';
import { CommentButton } from './components/CommentButton';
import { ShareModal } from './components/ShareModal';
import { SaveModal } from './components/SaveModal';
import { ConflictModal } from './components/ConflictModal';
import { LockModal } from './components/LockModal';
import { SidebarLockBanner } from './components/SidebarLockBanner';
import { ComponentsPanel } from './components/ComponentsPanel';
import { Avatar } from './components/Avatar';
import { Toast } from './components/Toast';
import { useEditorState } from './hooks/useEditorState';
import { useAutoSave, AUTO_SAVE_KEY } from './hooks/useAutoSave';
import { useCommentCount } from './hooks/useCommentCount';
import { useSessionIdentity } from './hooks/useSessionIdentity';
import { useProjectLock } from './hooks/useProjectLock';
import { decodeShareHash, encodeShareHash } from './lib/urlShare';
import { componentExamples, examples } from './lib/examples';

function getProjectId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('p');
}
import {
  isFileSystemAccessSupported,
  openLocalFile,
  saveAsLocalFile,
} from './lib/localFile';
import { renderForFormat, filenameForFormat } from './lib/exportFormat';
import { createProject, lockProject, unlockProject } from './lib/projectApi';
import type { SaveFormat } from './lib/exportFormat';

interface InitialContent {
  markdown: string;
  conflictContent: string | null; // hash content when conflict detected
  isFirstVisit: boolean;
}

interface MarkdownSelection {
  from: number;
  to: number;
}

function insertMarkdownSnippet(
  markdown: string,
  snippet: string,
  selection: MarkdownSelection | null,
): { markdown: string; cursor: number } {
  const start = selection ? Math.max(0, Math.min(selection.from, markdown.length)) : markdown.length;
  const end = selection ? Math.max(start, Math.min(selection.to, markdown.length)) : markdown.length;
  const before = markdown.slice(0, start);
  const after = markdown.slice(end);
  const trimmedSnippet = snippet.trim();
  const prefix = before.length === 0 || before.endsWith('\n') ? '' : '\n\n';
  const suffix = after.length === 0 || after.startsWith('\n') ? '' : '\n\n';
  const inserted = `${prefix}${trimmedSnippet}`;

  return {
    markdown: `${before}${inserted}${suffix}${after}`,
    cursor: before.length + inserted.length,
  };
}

function getInitialContent(): InitialContent {
  const fromHash = decodeShareHash(window.location.hash);
  const fromLocal = localStorage.getItem(AUTO_SAVE_KEY);

  if (fromHash) {
    window.history.replaceState(null, '', window.location.pathname);
    if (fromLocal && fromLocal !== fromHash) {
      // Show conflict modal — start with local content (safe default)
      return { markdown: fromLocal, conflictContent: fromHash, isFirstVisit: false };
    }
    return { markdown: fromHash, conflictContent: null, isFirstVisit: false };
  }

  if (fromLocal) return { markdown: fromLocal, conflictContent: null, isFirstVisit: false };

  return { markdown: examples[0]?.code ?? '', conflictContent: null, isFirstVisit: true };
}

const fileSupported = isFileSystemAccessSupported();

export function App() {
  const { markdown: initialMarkdown, conflictContent } = getInitialContent();
  const { markdown, setMarkdown, style, setStyle, showComments, setShowComments } =
    useEditorState(initialMarkdown);

  useAutoSave(markdown);
  const commentCount = useCommentCount(markdown);

  const { sessionId, name: myName } = useSessionIdentity();
  const initialProjectId = getProjectId();
  const [projectId, setProjectId] = useState<string | null>(initialProjectId);

  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
  const [markdownOpen, setMarkdownOpen] = useState(true);
  const [componentsOpen, setComponentsOpen] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [conflictOpen, setConflictOpen] = useState(conflictContent !== null);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [pendingSharedContent] = useState(conflictContent);
  const [toast, setToast] = useState({ message: '', visible: false });
  const selectionRef = useRef<MarkdownSelection | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  const { lockState, steal } = useProjectLock({
    projectId,
    sessionId,
    name: myName,
    onStolen: (byName) => {
      setMode('preview');
      showToast(`Edit was taken over by ${byName}`);
    },
  });

  const handleChange = useCallback(
    (value: string) => {
      setMarkdown(value);
    },
    [setMarkdown],
  );

  const handleSelectionChange = useCallback((range: MarkdownSelection) => {
    selectionRef.current = range;
  }, []);

  const handleAddComponent = useCallback((code: string, name: string) => {
    const result = insertMarkdownSnippet(markdown, code, selectionRef.current);
    selectionRef.current = { from: result.cursor, to: result.cursor };
    setMarkdown(result.markdown);
    showToast(`Added ${name}`);
  }, [markdown, setMarkdown, showToast]);

  const handleReset = useCallback(() => {
    setMarkdown(examples[0]?.code ?? '');
    window.history.replaceState(null, '', window.location.pathname);
  }, [setMarkdown]);

  const handleGetLink = useCallback((): string => {
    const hash = encodeShareHash(markdown);
    return window.location.origin + window.location.pathname + hash;
  }, [markdown]);

  const handleCopyLink = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied!');
    } catch {
      showToast('Copy failed');
    }
  }, [showToast]);

  const handleOpenFile = useCallback(async () => {
    const w = window as unknown as Record<string, unknown>;
    const result = await openLocalFile(w.showOpenFilePicker as never);
    if (result) {
      setMarkdown(result.content);
      setMarkdownOpen(true);
      window.history.replaceState(null, '', window.location.pathname);
      showToast(`Opened ${result.handle.name}`);
    }
  }, [setMarkdown, showToast]);

  const handleSaveAs = useCallback(async (format: SaveFormat) => {
    const w = window as unknown as Record<string, unknown>;
    const content = await renderForFormat(markdown, format, style);
    const result = await saveAsLocalFile(w.showSaveFilePicker as never, content, filenameForFormat(format));
    if (result) showToast(`Saved as ${result.handle.name}`);
  }, [markdown, style, showToast]);

  const handleStartSession = useCallback(async () => {
    const { id } = await createProject(markdown);
    window.history.pushState(null, '', `${window.location.pathname}?p=${id}`);
    setProjectId(id);
    await lockProject(id, sessionId, myName, false);
    setMode('edit');
    // modal stays open — switches to active session view
  }, [markdown, sessionId, myName]);

  const handleLeaveSession = useCallback(async () => {
    if (projectId) await unlockProject(projectId, sessionId);
    window.history.replaceState(null, '', window.location.pathname);
    setProjectId(null);
    setMode('edit');
    setShareOpen(false);
  }, [projectId, sessionId]);

  const sessionUrl = projectId
    ? `${window.location.origin}${window.location.pathname}?p=${projectId}`
    : undefined;

  const toggleEdit = useCallback(() => {
    setMode((m) => (m === 'edit' ? 'preview' : 'edit'));
  }, []);

  return (
    <>
      <header className="ed-header">
        <div className="ed-header__tools">
          <HamburgerMenu
            style={style}
            onStyleChange={setStyle}
            onReset={handleReset}
            onOpenFile={handleOpenFile}
            onSaveAs={() => setSaveOpen(true)}
            fileSupported={fileSupported}
            name={myName}
            onLiveCollab={() => setShareOpen(true)}
            hasActiveSession={!!projectId}
            isEditor={lockState.status === 'solo' || lockState.status === 'mine'}
          />
          <button
            className={`ed-btn ed-btn--icon${
              lockState.status === 'mine' || (lockState.status === 'solo' && mode === 'edit')
                ? ' ed-btn--icon-active'
                : ''
            }`}
            onClick={toggleEdit}
            title={mode === 'edit' ? 'Hide editor' : 'Show editor'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {/* Lock status — shown only in shared project mode */}
          {lockState.status === 'taken' && (
            <div className="ed-lock-status">
              <Avatar name={lockState.lockedByName ?? '?'} size={20} />
              <span className="ed-lock-status__name">{lockState.lockedByName}</span>
              <span className="ed-lock-status__label">is already editing</span>
            </div>
          )}
          {lockState.status === 'mine' && (
            <div className="ed-lock-status ed-lock-status--mine">
              <Avatar name={myName} size={20} />
              <span className="ed-lock-status__name">{myName}</span>
              <span className="ed-lock-status__label">(you) is editing</span>
            </div>
          )}
        </div>

        <div className="ed-header__actions">
          {projectId ? (
            <button className="ed-btn ed-btn--primary ed-btn--live-session" onClick={() => setShareOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Live Session
              <span className="ed-btn__live-dot" />
            </button>
          ) : (
            <button className="ed-btn ed-btn--primary" onClick={() => setShareOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>
          )}
          <CommentButton
            commentCount={commentCount}
            active={showComments}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
      </header>

      <main className={`ed-main${mode === 'preview' ? ' ed-main--preview' : ''}`}>
        <aside className="ed-sidebar">
          {/* Markdown accordion */}
          <div className={`ed-accordion${markdownOpen ? ' ed-accordion--open' : ''}`}>
            <button className="ed-accordion__header" onClick={() => setMarkdownOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown
              <svg className="ed-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {markdownOpen && (
              <>
                {lockState.status === 'taken' && (
                  <SidebarLockBanner
                    lockedByName={lockState.lockedByName ?? 'Someone'}
                    lastEditedAt={lockState.lastEditedAt}
                    onSteal={() => setLockModalOpen(true)}
                  />
                )}
                <div className={`ed-codemirror-wrap${lockState.status === 'taken' && projectId ? ' ed-codemirror-wrap--locked' : ''}`}>
                  <Editor
                    value={markdown}
                    onChange={handleChange}
                    onSelectionChange={handleSelectionChange}
                    readOnly={lockState.status === 'taken' && !!projectId}
                  />
                </div>
              </>
            )}
          </div>

          {/* Components accordion */}
          <div className={`ed-accordion ed-accordion--components${componentsOpen ? ' ed-accordion--open' : ''}`}>
            <button className="ed-accordion__header" onClick={() => setComponentsOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.856.497.926.968a.979.979 0 0 1-.277.817l-1.61 1.61a2.404 2.404 0 0 1-3.408 0l-1.518-1.518a.977.977 0 0 0-.895-.277 2.5 2.5 0 0 1-2.31-3.31c.207-.54.116-1.172-.24-1.527l-1.521-1.521a2.404 2.404 0 0 1 0-3.408l1.518-1.518a.976.976 0 0 0 .277-.895 2.5 2.5 0 0 1 3.31-2.31c.54.207 1.172.116 1.527-.24l1.521-1.521a2.404 2.404 0 0 1 3.408 0z" />
              </svg>
              Components
              <svg className="ed-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {componentsOpen && (
              <ComponentsPanel
                templates={examples}
                components={componentExamples}
                style={style}
                disabled={lockState.status === 'taken' && !!projectId}
                onAdd={handleAddComponent}
              />
            )}
          </div>
        </aside>

        <section className="ed-canvas">
          <Preview
            markdown={markdown}
            style={style}
            activeTab="preview"
            showComments={showComments}
          />
        </section>
      </main>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        onGetLink={handleGetLink}
        onCopyLink={handleCopyLink}
        onStartSession={projectId ? undefined : handleStartSession}
        sessionUrl={sessionUrl}
        onLeaveSession={projectId ? handleLeaveSession : undefined}
        myName={myName}
      />

      <SaveModal
        isOpen={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSaveAs}
      />

      <ConflictModal
        isOpen={conflictOpen}
        onLoadShared={() => {
          if (pendingSharedContent) setMarkdown(pendingSharedContent);
          setConflictOpen(false);
        }}
        onKeepLocal={() => setConflictOpen(false)}
      />

      <LockModal
        isOpen={lockModalOpen}
        lockedByName={lockState.lockedByName ?? 'Someone'}
        lastEditorName={lockState.lastEditorName}
        lastEditedAt={lockState.lastEditedAt}
        onSteal={async () => {
          await steal();
          setMode('edit');
          setLockModalOpen(false);
        }}
        onClose={() => setLockModalOpen(false)}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
