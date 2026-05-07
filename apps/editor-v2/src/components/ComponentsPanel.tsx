import { useState, useCallback } from 'react';
import { renderMarkup } from '../lib/renderMarkup';
import type { Example, ComponentGroup } from '../lib/examples';
import type { StyleName } from '../lib/renderMarkup';

interface Props {
  templates: Example[];
  groups: ComponentGroup[];
  style: StyleName;
  onAdd: (code: string, name: string) => void;
  disabled?: boolean;
}

interface CardProps {
  item: Example;
  style: StyleName;
  onAction: () => void;
  disabled?: boolean;
  compact?: boolean;
}

function useCollapsible(key: string, defaultCollapsed: boolean) {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored === 'true' : defaultCollapsed;
  });
  const toggle = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(key, String(next));
      return next;
    });
  }, [key]);
  return [collapsed, toggle] as const;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`ed-panel-group__chevron${open ? ' ed-panel-group__chevron--open' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const SCALE = 0.4; // iframe renders at 900px (CSS), displayed at 40%
const MAX_HEIGHT: Record<'template' | 'compact', number> = { template: 360, compact: 200 };

function GalleryCard({ item, style, onAction, disabled, compact }: CardProps) {
  const [copied, setCopied] = useState(false);
  const maxH = MAX_HEIGHT[compact ? 'compact' : 'template'];
  const [previewHeight, setPreviewHeight] = useState(maxH);
  const result = renderMarkup(item.code, style);
  const rawHtml = result.error === null ? result.html : '';
  const html = rawHtml.replace(
    '</head>',
    `<style>html,body{margin:0!important;padding:8px!important;min-height:unset!important;height:auto!important;background:transparent!important}</style></head>`,
  );

  async function handleCopy() {
    await navigator.clipboard.writeText(item.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handlePreviewLoad(event: React.SyntheticEvent<HTMLIFrameElement>) {
    const doc = event.currentTarget.contentDocument;
    if (!doc) return;
    const h = doc.body?.scrollHeight ?? 0;
    if (h > 0) setPreviewHeight(Math.min(Math.ceil(h * SCALE), maxH));
  }

  return (
    <div className="ed-template-card">
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
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Add
          </button>
        </div>
      </div>
      <div className="ed-template-card__preview" style={{ height: previewHeight }}>
        <iframe
          className="ed-template-card__iframe"
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
          title={item.name}
          onLoad={handlePreviewLoad}
        />
      </div>
      {compact && <pre className="ed-template-card__code">{item.code}</pre>}
    </div>
  );
}

interface GroupSectionProps {
  group: ComponentGroup;
  style: StyleName;
  onAdd: (code: string, name: string) => void;
  disabled?: boolean;
}

function GroupSection({ group, style, onAdd, disabled }: GroupSectionProps) {
  const [collapsed, toggle] = useCollapsible(`wmd-panel-group-${group.name}`, true);
  return (
    <div className="ed-panel-group">
      <button className="ed-panel-group__header" data-testid={`group-${group.name}`} onClick={toggle} aria-expanded={!collapsed}>
        <ChevronIcon open={!collapsed} />
        {group.name}
      </button>
      {!collapsed && group.items.map((item) => (
        <GalleryCard
          key={item.name}
          item={item}
          style={style}
          onAction={() => onAdd(item.code, item.name)}
          disabled={disabled}
          compact
        />
      ))}
    </div>
  );
}

export function ComponentsPanel({ templates, groups, style, onAdd, disabled }: Props) {
  const [templatesCollapsed, toggleTemplates] = useCollapsible('wmd-panel-templates', false);

  return (
    <div className="ed-components-panel">
      <div className="ed-panel-group">
        <button className="ed-panel-group__header" onClick={toggleTemplates} aria-expanded={!templatesCollapsed}>
          <ChevronIcon open={!templatesCollapsed} />
          Template Gallery
        </button>
        {!templatesCollapsed && templates.map((template) => (
          <GalleryCard
            key={template.name}
            item={template}
            style={style}
            onAction={() => onAdd(template.code, template.name)}
            disabled={disabled}
          />
        ))}
      </div>

      <div data-testid="component-gallery">
        {groups.map((group) => (
          <GroupSection
            key={group.name}
            group={group}
            style={style}
            onAdd={onAdd}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
