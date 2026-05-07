import { memo, useEffect, useMemo, useRef } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { StyleName } from '../lib/renderMarkup';

interface Props {
  markdown: string;
  style: StyleName;
  activeTab: 'preview' | 'html';
  showComments: boolean;
  cursorLine: number | null;
  visualEditing: boolean;
  onComponentClick: (line: number) => void;
}

export const Preview = memo(function Preview({
  markdown,
  style,
  activeTab,
  showComments,
  cursorLine,
  visualEditing,
  onComponentClick,
}: Props) {
  const result = useMemo(
    () => renderMarkup(markdown, style, showComments),
    [markdown, style, showComments],
  );
  const html = result.error === null ? result.html : '';
  const error = result.error;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const savedScrollY = useRef(0);

  function post(msg: unknown) {
    iframeRef.current?.contentWindow?.postMessage(msg, '*');
  }

  // Listen for messages from the iframe (scroll reports + component clicks)
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'wiremd-scroll') {
        savedScrollY.current = e.data.scrollY as number;
        return;
      }
      if (e.data?.type === 'wiremd-component-click') {
        onComponentClick(e.data.line as number);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onComponentClick]);

  // Restore scroll and send current cursor/visual-mode state after iframe loads
  function onIframeLoad() {
    if (savedScrollY.current !== 0) {
      post({ type: 'wiremd-set-scroll', scrollY: savedScrollY.current });
    }
    if (cursorLine !== null) {
      post({ type: 'wiremd-cursor', line: cursorLine });
    }
    post({ type: 'wiremd-visual-mode', enabled: visualEditing });
  }

  // Send cursor line to iframe whenever it changes
  useEffect(() => {
    if (cursorLine === null) {
      post({ type: 'wiremd-cursor-blur' });
    } else {
      post({ type: 'wiremd-cursor', line: cursorLine });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorLine]);

  // Send visual mode toggle to iframe whenever it changes
  useEffect(() => {
    post({ type: 'wiremd-visual-mode', enabled: visualEditing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualEditing]);

  return (
    <div className={`ed-preview__content${visualEditing ? ' ed-preview__content--visual-editing' : ''}`}>
      {activeTab === 'preview' ? (
        <iframe
          ref={iframeRef}
          className="ed-preview__iframe"
          sandbox="allow-scripts"
          title="Preview"
          srcDoc={html}
          onLoad={onIframeLoad}
        />
      ) : (
        <div className="ed-preview__html">
          <pre style={{ padding: '16px', fontSize: '12px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {html}
          </pre>
        </div>
      )}
      {error && (
        <div className="ed-error ed-error--visible">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});
