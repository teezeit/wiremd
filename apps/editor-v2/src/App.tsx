import { useState, useCallback, useRef, useEffect } from 'react';
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
import { Splitter } from './components/Splitter';
import { useSplitter } from './hooks/useSplitter';
import { Avatar } from './components/Avatar';
import { Toast } from './components/Toast';
import { useEditorState } from './hooks/useEditorState';
import { useAutoSave, AUTO_SAVE_KEY } from './hooks/useAutoSave';
import { useCommentCount } from './hooks/useCommentCount';
import { useSessionIdentity } from './hooks/useSessionIdentity';
import { useProjectLock } from './hooks/useProjectLock';
import { decodeShareHash, encodeShareHash } from './lib/urlShare';
import { examples } from './lib/examples';
import { docComponentGroups } from './lib/docExamples';

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
import { createProject, lockProject, unlockProject, updateProject } from './lib/projectApi';
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
  const [innerSplit, setInnerSplit] = useState(20);
  const innerDividerRef = useRef<HTMLDivElement>(null);
  const { dividerRef, onPointerDown, panelStyle } = useSplitter();

  const onInnerPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const divider = innerDividerRef.current;
    if (!divider) return;
    divider.setPointerCapture(e.pointerId);
    document.body.style.userSelect = 'none';
    function onMove(ev: PointerEvent) {
      const sidebar = divider!.parentElement;
      if (!sidebar) return;
      const rect = sidebar.getBoundingClientRect();
      const pct = ((ev.clientY - rect.top) / rect.height) * 100;
      setInnerSplit(Math.min(80, Math.max(20, pct)));
    }
    function onUp() {
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);
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
    onRemoteContent: setMarkdown,
  });
  const isLockedByOther = lockState.status === 'taken' && !!projectId;

  // Load server content once when joining an existing session via URL
  useEffect(() => {
    if (!initialProjectId) return;
    import('./lib/projectApi').then(({ getProjectLockInfo }) => {
      getProjectLockInfo(initialProjectId).then((info) => {
        if (info.content) setMarkdown(info.content);
      }).catch(() => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once on mount

  // Push content to API while holding the lock (debounced)
  useEffect(() => {
    if (!projectId || lockState.status !== 'mine') return;
    const timer = setTimeout(() => {
      updateProject(projectId, markdown, sessionId).catch(() => {});
    }, 1000);
    return () => clearTimeout(timer);
  }, [markdown, projectId, lockState.status, sessionId]);

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
    if (isLockedByOther) return;

    const result = insertMarkdownSnippet(markdown, code, selectionRef.current);
    selectionRef.current = { from: result.cursor, to: result.cursor };
    setMarkdown(result.markdown);
    showToast(`Added ${name}`);
  }, [isLockedByOther, markdown, setMarkdown, showToast]);

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
    showToast("It's yours now. You left the live session.");
  }, [projectId, sessionId, showToast]);

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
          {mode === 'preview' && (
            <button
              className="ed-btn ed-btn--icon"
              onClick={toggleEdit}
              title="Show editor"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          )}

          {/* Lock status — only shown in header when sidebar is hidden */}
          {mode === 'preview' && lockState.status === 'taken' && (
            <div className="ed-lock-status">
              <span className="ed-lock-status__name">{lockState.lockedByName}</span>
              <span className="ed-lock-status__label">is already editing</span>
            </div>
          )}
          {mode === 'preview' && lockState.status === 'mine' && (
            <div className="ed-lock-status">
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
        <div className="ed-sidebar-wrap" style={{
          width: mode === 'preview' ? undefined : (panelStyle.width || undefined),
          height: mode === 'preview' ? undefined : (panelStyle.height || undefined),
        }}>
        {mode !== 'preview' && (
          <button className="ed-sidebar__floating-collapse" onClick={toggleEdit} title="Collapse sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <aside className="ed-sidebar">
          {/* Lock banner — session-wide, always visible above accordions */}
          {lockState.status === 'taken' && (
            <SidebarLockBanner
              lockedByName={lockState.lockedByName ?? 'Someone'}
              lastEditedAt={lockState.lastEditedAt}
              onSteal={() => setLockModalOpen(true)}
            />
          )}

          {/* Markdown accordion */}
          <div
            className={`ed-accordion${markdownOpen ? ' ed-accordion--open' : ''}`}
            style={markdownOpen && componentsOpen ? { flex: 'none', height: `${innerSplit}%` } : undefined}
          >
            <button className="ed-accordion__header" onClick={() => setMarkdownOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              <svg className="ed-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Markdown
            </button>
            {markdownOpen && (
              <div className={`ed-codemirror-wrap${isLockedByOther ? ' ed-codemirror-wrap--locked' : ''}`}>
                <Editor
                  value={markdown}
                  onChange={handleChange}
                  onSelectionChange={handleSelectionChange}
                  readOnly={isLockedByOther}
                />
              </div>
            )}
          </div>

          {/* Inner drag handle — only when both panels open */}
          {markdownOpen && componentsOpen && (
            <div
              ref={innerDividerRef}
              className="ed-inner-divider"
              onPointerDown={onInnerPointerDown}
            />
          )}

          {/* Components accordion */}
          <div
            className={`ed-accordion ed-accordion--components${componentsOpen ? ' ed-accordion--open' : ''}`}
            style={markdownOpen && componentsOpen ? { flex: 'none', height: `${100 - innerSplit}%` } : undefined}
          >
            <button className="ed-accordion__header" onClick={() => setComponentsOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <svg className="ed-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Components
              <span
                className="ed-accordion__help"
                role="link"
                tabIndex={0}
                title="Component docs"
                onClick={(e) => { e.stopPropagation(); window.open(import.meta.env.DEV ? 'http://localhost:5173/wiremd/components/' : '/wiremd/components/', '_blank'); }}
                onKeyDown={(e) => e.key === 'Enter' && window.open(import.meta.env.DEV ? 'http://localhost:5173/wiremd/components/' : '/wiremd/components/', '_blank')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
            </button>
            {componentsOpen && (
              <ComponentsPanel
                templates={examples}
                groups={docComponentGroups}
                style={style}
                disabled={isLockedByOther}
                onAdd={handleAddComponent}
              />
            )}
          </div>
        </aside>
        </div>

        {mode !== 'preview' && <Splitter dividerRef={dividerRef} onPointerDown={onPointerDown} />}

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
