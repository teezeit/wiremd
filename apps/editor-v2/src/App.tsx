import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { StyleSelect } from './components/StyleSelect';
import { Splitter } from './components/Splitter';
import { Toast } from './components/Toast';
import { useEditorState } from './hooks/useEditorState';
import { useSplitter } from './hooks/useSplitter';
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
  const { dividerRef, onPointerDown, panelStyle } = useSplitter();

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setMarkdown(value);
      const hash = encodeShareHash(value);
      window.history.replaceState(null, '', window.location.pathname + hash);
    },
    [setMarkdown],
  );

  const handleCopyLink = useCallback(async () => {
    const hash = encodeShareHash(markdown);
    window.history.replaceState(null, '', window.location.pathname + hash);
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied!');
    } catch {
      showToast('Copy failed');
    }
  }, [markdown, showToast]);

  return (
    <>
      <header className="ed-header">
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
            <div className="ed-header__title">wiremd Editor</div>
            <div className="ed-header__subtitle">Interactive wireframe editor</div>
          </div>
        </a>
        <div className="ed-header__actions">
          <button className="ed-btn" onClick={handleCopyLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Copy link
          </button>
        </div>
      </header>

      <main className="ed-main">
        <section className="ed-editor" style={panelStyle}>
          <div className="ed-editor__toolbar">
            <span className="ed-editor__toolbar-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown
            </span>
          </div>
          <Editor value={markdown} onChange={handleChange} />
        </section>

        <Splitter dividerRef={dividerRef} onPointerDown={onPointerDown} />

        <section className="ed-preview" style={{ flex: 1, minWidth: 0 }}>
          <div className="ed-preview__toolbar">
            <div className="ed-preview__toolbar-left">
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
            <div className="ed-preview__toolbar-right">
              <label className="ed-comment-toggle">
                <span>💬</span>
                <span>{showComments ? 'Hide comments' : 'Show comments'}</span>
                <input
                  type="checkbox"
                  checked={showComments}
                  onChange={(e) => setShowComments(e.target.checked)}
                />
              </label>
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
