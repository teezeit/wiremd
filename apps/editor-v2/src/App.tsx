import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { StyleSelect } from './components/StyleSelect';
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
  const { markdown, setMarkdown, style, setStyle, activeTab, setActiveTab, showComments, setShowComments } =
    useEditorState(getInitialMarkdown());

  // v1 default: 'edit' — v4 will default to 'preview' once visual click-select exists
  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
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

  const handleShare = useCallback(async () => {
    window.history.replaceState(null, '', window.location.pathname + encodeShareHash(markdown));
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied!');
    } catch {
      showToast('Copy failed');
    }
  }, [markdown, showToast]);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="ed-header">
        <div className="ed-header__brand-group">
          <button className="ed-btn ed-hamburger" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <a
            className="ed-header__brand"
            href={import.meta.env.DEV ? 'http://localhost:5175/wiremd/' : '/wiremd/'}
          >
            <div className="ed-header__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div className="ed-header__title">wiremd</div>
              <div className="ed-header__subtitle">Wireframe editor</div>
            </div>
          </a>
        </div>

        <div className="ed-header__actions">
          {/* mode toggle: 👁 Preview / ✏ Edit */}
          <div className="ed-mode-toggle">
            <button
              className={`ed-mode-btn${mode === 'preview' ? ' ed-mode-btn--active' : ''}`}
              onClick={() => setMode('preview')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </button>
            <button
              className={`ed-mode-btn${mode === 'edit' ? ' ed-mode-btn--active' : ''}`}
              onClick={() => setMode('edit')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          </div>

          {/* comments toggle */}
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

          {/* share */}
          <button className="ed-btn ed-btn--primary" onClick={handleShare}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>
      </header>

      {/* ── Main split ─────────────────────────────────────── */}
      <main className={`ed-main${mode === 'preview' ? ' ed-main--preview' : ''}`}>

        {/* Left: editor sidebar */}
        <aside className="ed-sidebar">
          <div className="ed-sidebar__toolbar">
            <span className="ed-sidebar__label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown
            </span>
          </div>
          <div className="ed-codemirror-wrap">
            <Editor value={markdown} onChange={handleChange} />
          </div>
        </aside>

        {/* Right: preview canvas */}
        <section className="ed-canvas">
          <div className="ed-canvas__toolbar">
            <div className="ed-canvas__toolbar-left">
              <div className="ed-tabs">
                <button
                  className={`ed-tab${activeTab === 'preview' ? ' ed-tab--active' : ''}`}
                  onClick={() => setActiveTab('preview')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </button>
                <button
                  className={`ed-tab${activeTab === 'html' ? ' ed-tab--active' : ''}`}
                  onClick={() => setActiveTab('html')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                  HTML
                </button>
              </div>
            </div>
            <div className="ed-canvas__toolbar-right">
              {/* style switcher — moves to hamburger menu in v2 */}
              <StyleSelect value={style} onChange={setStyle} />
            </div>
          </div>

          <Preview
            markdown={markdown}
            style={style}
            activeTab={activeTab}
            showComments={showComments}
          />
        </section>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
