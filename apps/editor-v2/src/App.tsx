import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { HamburgerMenu } from './components/HamburgerMenu';
import { CommentButton } from './components/CommentButton';
import { ShareModal } from './components/ShareModal';
import { SaveModal } from './components/SaveModal';
import { ConflictModal } from './components/ConflictModal';
import { LockModal } from './components/LockModal';
import { Toast } from './components/Toast';
import { useEditorState } from './hooks/useEditorState';
import { useAutoSave, AUTO_SAVE_KEY } from './hooks/useAutoSave';
import { useCommentCount } from './hooks/useCommentCount';
import { useSessionIdentity } from './hooks/useSessionIdentity';
import { useProjectLock } from './hooks/useProjectLock';
import { decodeShareHash, encodeShareHash } from './lib/urlShare';
import { examples } from './lib/examples';

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
}

function getInitialContent(): InitialContent {
  const fromHash = decodeShareHash(window.location.hash);
  const fromLocal = localStorage.getItem(AUTO_SAVE_KEY);

  if (fromHash) {
    window.history.replaceState(null, '', window.location.pathname);
    if (fromLocal && fromLocal !== fromHash) {
      // Show conflict modal — start with local content (safe default)
      return { markdown: fromLocal, conflictContent: fromHash };
    }
    return { markdown: fromHash, conflictContent: null };
  }

  if (fromLocal) return { markdown: fromLocal, conflictContent: null };

  return { markdown: examples[0]?.code ?? '', conflictContent: null };
}

const fileSupported = isFileSystemAccessSupported();

export function App() {
  const { markdown: initialMarkdown, conflictContent } = getInitialContent();
  const { markdown, setMarkdown, style, setStyle, showComments, setShowComments } =
    useEditorState(initialMarkdown);

  useAutoSave(markdown);
  const commentCount = useCommentCount(markdown);

  const { sessionId, name: myName } = useSessionIdentity();
  const [projectId, setProjectId] = useState<string | null>(getProjectId);

  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
  const [sidebarTab, setSidebarTab] = useState<'insert' | 'markdown'>('markdown');
  const [shareOpen, setShareOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [conflictOpen, setConflictOpen] = useState(conflictContent !== null);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [pendingSharedContent] = useState(conflictContent);
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  const { lockState, acquire, release, steal } = useProjectLock({
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

  const handleStopSession = useCallback(async () => {
    // Force-unlock so joiner who doesn't hold the lock still clears it
    if (projectId) await unlockProject(projectId, sessionId, true);
    window.history.replaceState(null, '', window.location.pathname);
    setProjectId(null);
    setMode('edit');
    setShareOpen(false);
  }, [projectId, sessionId]);

  const sessionUrl = projectId
    ? `${window.location.origin}${window.location.pathname}?p=${projectId}`
    : undefined;

  const toggleEdit = useCallback(async () => {
    if (lockState.status === 'solo') {
      setMode((m) => (m === 'edit' ? 'preview' : 'edit'));
      return;
    }
    if (lockState.status === 'taken') {
      setLockModalOpen(true);
      return;
    }
    if (lockState.status === 'mine') {
      await release();
      setMode('preview');
      return;
    }
    // unlocked — acquire and enter edit
    await acquire();
    setMode('edit');
  }, [lockState.status, acquire, release]);

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
          />
          <button
            className={`ed-btn ed-btn--icon${
              lockState.status === 'mine' || (lockState.status === 'solo' && mode === 'edit')
                ? ' ed-btn--icon-active'
                : lockState.status === 'taken'
                  ? ' ed-btn--icon-locked'
                  : ''
            }`}
            onClick={toggleEdit}
            title={
              lockState.status === 'taken'
                ? `${lockState.lockedByName ?? 'Someone'} is editing — click to steal`
                : lockState.status === 'mine'
                  ? `Editing as ${myName} — click to stop`
                  : mode === 'edit'
                    ? 'Hide editor'
                    : 'Show editor'
            }
          >
            {lockState.status === 'taken' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            )}
          </button>
        </div>

        <div className="ed-header__actions">
          <button className="ed-btn ed-btn--primary" onClick={() => setShareOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
          <CommentButton
            commentCount={commentCount}
            active={showComments}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
      </header>

      <main className={`ed-main${mode === 'preview' ? ' ed-main--preview' : ''}`}>
        <aside className="ed-sidebar">
          <div className="ed-sidebar__tabs">
            <button
              className={`ed-sidebar__tab${sidebarTab === 'insert' ? ' ed-sidebar__tab--active' : ''}`}
              onClick={() => setSidebarTab('insert')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Insert
            </button>
            <button
              className={`ed-sidebar__tab${sidebarTab === 'markdown' ? ' ed-sidebar__tab--active' : ''}`}
              onClick={() => setSidebarTab('markdown')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown
            </button>
          </div>

          {sidebarTab === 'insert' ? (
            <div className="ed-sidebar__insert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>Component library</span>
              <span className="ed-sidebar__insert-sub">Coming in v4</span>
            </div>
          ) : (
            <div className="ed-codemirror-wrap">
              <Editor value={markdown} onChange={handleChange} />
            </div>
          )}
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
        onStopSession={projectId ? handleStopSession : undefined}
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
