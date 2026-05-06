import { useState } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { Example } from '../lib/examples';
import type { StyleName } from '../lib/renderMarkup';

interface Props {
  templates: Example[];
  components: Example[];
  style: StyleName;
  onLoadTemplate: (code: string, name: string) => void;
  onAddComponent: (code: string, name: string) => void;
  disabled?: boolean;
}

interface CardProps {
  item: Example;
  style: StyleName;
  actionLabel: 'Load' | 'Add';
  onAction: () => void;
  disabled?: boolean;
}

function GalleryCard({ item, style, actionLabel, onAction, disabled }: CardProps) {
  const [copied, setCopied] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(240);
  const result = renderMarkup(item.code, style);
  const html = result.error === null ? result.html : '';

  async function handleCopy() {
    await navigator.clipboard.writeText(item.code);
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
          <span className="ed-template-card__name">{item.name}</span>
          <span className="ed-template-card__desc">{item.description}</span>
        </div>
        <div className="ed-template-card__actions">
          <button className="ed-btn ed-btn--sm" onClick={handleCopy} title="Copy markdown">
            {copied ? '✓' : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
          <button className="ed-btn ed-btn--primary ed-btn--sm" onClick={onAction} disabled={disabled}>
            {actionLabel === 'Load' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 8h.01" />
                <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
                <path d="M14 14l1 -1c.653 -.629 1.413 -.815 2.13 -.559" />
                <path d="M19 16v6" />
                <path d="M22 19l-3 3l-3 -3" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            )}
            {actionLabel}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="ed-template-card__preview" style={{ height: previewHeight }}>
        <iframe
          className="ed-template-card__iframe"
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
          title={item.name}
          onLoad={handlePreviewLoad}
        />
      </div>
    </div>
  );
}

export function ComponentsPanel({ templates, components, style, onLoadTemplate, onAddComponent, disabled }: Props) {
  return (
    <div className="ed-components-panel">
      <div className="ed-components-panel__section-label">Template Gallery</div>
      {templates.map((template) => (
        <GalleryCard
          key={template.name}
          item={template}
          style={style}
          actionLabel="Load"
          onAction={() => onLoadTemplate(template.code, template.name)}
          disabled={disabled}
        />
      ))}

      <div className="ed-components-panel__section-label ed-components-panel__section-label--spaced">
        Component Library
      </div>
      {components.map((component) => (
        <GalleryCard
          key={component.name}
          item={component}
          style={style}
          actionLabel="Add"
          onAction={() => onAddComponent(component.code, component.name)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
