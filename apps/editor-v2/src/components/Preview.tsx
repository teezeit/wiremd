import { memo, useEffect, useMemo, useRef } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { StyleName } from '../lib/renderMarkup';

interface Props {
  markdown: string;
  style: StyleName;
  activeTab: 'preview' | 'html';
  showComments: boolean;
}

export const Preview = memo(function Preview({ markdown, style, activeTab, showComments }: Props) {
  const result = useMemo(
    () => renderMarkup(markdown, style, showComments),
    [markdown, style, showComments],
  );

  const html = result.error === null ? result.html : '';
  const error = result.error;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const savedScrollY = useRef(0);

  // Listen for scroll position reports from the iframe before it reloads
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'wiremd-scroll') {
        savedScrollY.current = e.data.scrollY as number;
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // After iframe loads, restore saved scroll position
  function onIframeLoad() {
    const win = iframeRef.current?.contentWindow;
    if (!win || savedScrollY.current === 0) return;
    win.postMessage({ type: 'wiremd-set-scroll', scrollY: savedScrollY.current }, '*');
  }

  return (
    <div className="ed-preview__content">
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
