import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { HamburgerMenu } from './components/HamburgerMenu';
import { Toast } from './components/Toast';
import { useEditorState } from './hooks/useEditorState';
import { decodeShareHash, encodeShareHash } from './lib/urlShare';
import { examples } from './lib/examples';

function getInitialMarkdown(): string {
  const fromHash = decodeShareHash(window.location.hash);
  if (fromHash) return fromHash;
  return examples[0]?.code ?? '';
}

export function App() {
  const { markdown, setMarkdown, style, setStyle, showComments, setShowComments } =
    useEditorState(getInitialMarkdown());

  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
  const [sidebarTab, setSidebarTab] = useState<'insert' | 'markdown'>('markdown');
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setMarkdown(value);
      window.history.replaceState(null, '', window.location.pathname + encodeShareHash(value));
    },
    [setMarkdown],
  );

  const handleReset = useCallback(() => {
    setMarkdown(examples[0]?.code ?? '');
    window.history.replaceState(null, '', window.location.pathname);
  }, [setMarkdown]);

  const handleShare = useCallback(async () => {
    window.history.replaceState(null, '', window.location.pathname + encodeShareHash(markdown));
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied!');
    } catch {
      showToast('Copy failed');
    }
  }, [markdown, showToast]);

  const toggleEdit = useCallback(() => {
    setMode((m) => (m === 'edit' ? 'preview' : 'edit'));
  }, []);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="ed-header">
        {/* Left: tool controls */}
        <div className="ed-header__tools">
          <HamburgerMenu style={style} onStyleChange={setStyle} onReset={handleReset} />
          <button
            className={`ed-btn ed-btn--icon${mode === 'edit' ? ' ed-btn--icon-active' : ''}`}
            onClick={toggleEdit}
            title={mode === 'edit' ? 'Hide editor' : 'Show editor'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        {/* Right: brand + actions */}
        <div className="ed-header__actions">
          <a
            className="ed-header__brand"
            href={import.meta.env.DEV ? 'http://localhost:5175/wiremd/' : '/wiremd/'}
          >
            wiremd
          </a>
          <div className="ed-header__divider" />
          <button className="ed-btn ed-btn--primary" onClick={handleShare}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
          <button
            className={`ed-btn${showComments ? ' ed-btn--comments-on' : ''}`}
            onClick={() => setShowComments(!showComments)}
            title={showComments ? 'Hide comments' : 'Show comments'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Comments
          </button>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className={`ed-main${mode === 'preview' ? ' ed-main--preview' : ''}`}>

        {/* Left sidebar */}
        <aside className="ed-sidebar">
          {/* Tab bar */}
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

          {/* Tab content */}
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

        {/* Right canvas */}
        <section className="ed-canvas">
          <Preview
            markdown={markdown}
            style={style}
            activeTab="preview"
            showComments={showComments}
          />
        </section>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
