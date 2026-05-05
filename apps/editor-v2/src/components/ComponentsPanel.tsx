import { useState } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { Example } from '../lib/examples';

interface Props {
  examples: Example[];
  onLoad: (code: string, name: string) => void;
  disabled?: boolean;
}

interface CardProps {
  example: Example;
  onLoad: () => void;
  disabled?: boolean;
}

function TemplateCard({ example, onLoad, disabled }: CardProps) {
  const [copied, setCopied] = useState(false);
  const result = renderMarkup(example.code, 'sketch');
  const html = result.error === null ? result.html : '';

  async function handleCopy() {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="ed-template-card">
      {/* Rendered preview */}
      <div className="ed-template-card__preview">
        <iframe
          className="ed-template-card__iframe"
          srcDoc={html}
          sandbox="allow-scripts"
          title={example.name}
        />
      </div>

      {/* Footer: name + buttons */}
      <div className="ed-template-card__footer">
        <div className="ed-template-card__info">
          <span className="ed-template-card__name">{example.name}</span>
          <span className="ed-template-card__desc">{example.description}</span>
        </div>
        <div className="ed-template-card__actions">
          <button
            className="ed-btn ed-btn--sm"
            onClick={handleCopy}
            title="Copy markdown"
          >
            {copied ? '✓' : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
          <button
            className="ed-btn ed-btn--primary ed-btn--sm"
            onClick={onLoad}
            disabled={disabled}
            title="Load into editor"
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComponentsPanel({ examples, onLoad, disabled }: Props) {
  return (
    <div className="ed-components-panel">
      <div className="ed-components-panel__section-label">Templates</div>
      {examples.map((example) => (
        <TemplateCard
          key={example.name}
          example={example}
          onLoad={() => onLoad(example.code, example.name)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
