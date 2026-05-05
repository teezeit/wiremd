export function App() {
  return (
    <>
      <header className="ed-header">
        <a className="ed-header__brand" href="/wiremd/">
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
        <div className="ed-header__actions" />
      </header>

      <main className="ed-main">
        <section className="ed-editor" id="editor-panel">
          <div className="ed-editor__toolbar">
            <span className="ed-editor__toolbar-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown
            </span>
          </div>
          <div className="ed-editor__body" id="monaco-container" />
        </section>

        <div className="ed-divider" id="divider" />

        <section className="ed-preview">
          <div className="ed-preview__toolbar">
            <div className="ed-preview__toolbar-left">
              <div className="ed-tabs">
                <button className="ed-tab ed-tab--active" data-tab="preview">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </button>
                <button className="ed-tab" data-tab="html">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                  HTML
                </button>
              </div>
            </div>
            <div className="ed-preview__toolbar-right" />
          </div>
          <div className="ed-preview__content">
            <iframe className="ed-preview__iframe" sandbox="allow-scripts" title="Preview" />
          </div>
        </section>
      </main>

      <div className="ed-toast" id="toast" />
    </>
  );
}
