import { useState } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { Example } from '../lib/examples';
import type { StyleName } from '../lib/renderMarkup';

interface Props {
  examples: Example[];
  style: StyleName;
  onLoad: (code: string, name: string) => void;
  disabled?: boolean;
}

interface CardProps {
  example: Example;
  style: StyleName;
  onLoad: () => void;
  disabled?: boolean;
}

function TemplateCard({ example, style, onLoad, disabled }: CardProps) {
  const [copied, setCopied] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(240);
  const result = renderMarkup(example.code, style);
  const html = result.error === null ? result.html : '';

  async function handleCopy() {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handlePreviewLoad(event: React.SyntheticEvent<HTMLIFrameElement>) {
    const doc = event.currentTarget.contentDocument;
    if (!doc) return;

    const bodyHeight = doc.body?.scrollHeight ?? 0;
    const htmlHeight = doc.documentElement?.scrollHeight ?? 0;
    const renderedHeight = Math.max(bodyHeight, htmlHeight);
    if (renderedHeight > 0) setPreviewHeight(Math.ceil(renderedHeight * 0.5));
  }

  return (
    <div className="ed-template-card">
      {/* Header: name + description + buttons */}
      <div className="ed-template-card__header">
        <div className="ed-template-card__info">
          <span className="ed-template-card__name">{example.name}</span>
          <span className="ed-template-card__desc">{example.description}</span>
        </div>
        <div className="ed-template-card__actions">
          <button className="ed-btn ed-btn--sm" onClick={handleCopy} title="Copy markdown">
            {copied ? '✓' : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
          <button className="ed-btn ed-btn--primary ed-btn--sm" onClick={onLoad} disabled={disabled}>
            Load
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="ed-template-card__preview" style={{ height: previewHeight }}>
        <iframe
          className="ed-template-card__iframe"
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
          title={example.name}
          onLoad={handlePreviewLoad}
        />
      </div>
    </div>
  );
}

export function ComponentsPanel({ examples, style, onLoad, disabled }: Props) {
  return (
    <div className="ed-components-panel">
      <div className="ed-components-panel__section-label">Template Gallery</div>
      {examples.map((example) => (
        <TemplateCard
          key={example.name}
          example={example}
          style={style}
          onLoad={() => onLoad(example.code, example.name)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
