/**
 * HTML Renderer for wiremd AST nodes
 * Converts each AST node type to HTML
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { WiremdNode } from '../types.js';
import { getNodeDefinition } from '../nodes/_registry.js';

export interface RenderContext {
  style: string;
  classPrefix: string;
  inlineStyles: boolean;
  pretty: boolean;
  showComments: boolean;
  // Mutable state for side-panel comment collection (set by renderToHTML)
  _comments?: Array<{ id: number; texts: string[] }>; // one entry per thread
  _nextCommentId?: number | null;
  // Mutable counter used to mint deterministic radio-group names so that
  // sibling radios in the same group share a `name=""` attribute (browser
  // single-select). Initialised by renderToHTML; bumped each time a group
  // is rendered (explicit radio-group node or a list whose children are
  // radios). Counter-based ⇒ snapshots are stable across runs.
  _radioGroupCounter?: { value: number };
}

/**
 * Mint the next deterministic radio-group name from the render context.
 * Falls back to `radio-group-1` when the context lacks a counter (defensive,
 * shouldn't happen via the public render entry points).
 */
export function nextRadioGroupName(context: RenderContext): string {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}

/**
 * If `children` contains any `radio` nodes, return a copy where every radio
 * shares a freshly-minted group name. Used by both `renderList` (block-level
 * radios produced by `- ( ) Option` syntax that the parser doesn't wrap in a
 * radio-group) and `renderRadioGroup` (explicit groups).
 *
 * When no radios are present the original array is returned unchanged so
 * non-radio lists pay zero cost.
 */
export function applyRadioGroupName(children: any[], context: RenderContext): any[] {
  if (!children || children.length === 0) return children;
  const hasRadio = children.some((c: any) => c && c.type === 'radio');
  if (!hasRadio) return children;
  const name = nextRadioGroupName(context);
  return children.map((c: any) => {
    if (!c || c.type !== 'radio') return c;
    // Respect any explicit name already set on the radio (e.g. via attributes).
    if (c.props && c.props.name) return c;
    return { ...c, props: { ...(c.props || {}), name } };
  });
}

/**
 * Render a wiremd AST node to HTML
 */
export function renderNode(node: WiremdNode, context: RenderContext): string {
  if (node == null) return '';
  // Registry-first dispatch: migrated node types are handled here.
  // Unmigrated types fall through to the switch below.
  const def = getNodeDefinition(node.type);
  if (def?.render?.html) {
    return def.render.html(node as never, context);
  }
  switch (node.type) {
    case 'input':
      return renderInput(node, context);

    case 'textarea':
      return renderTextarea(node, context);

    case 'select':
      return renderSelect(node, context);

    case 'checkbox':
      return renderCheckbox(node, context);

    case 'radio':
      return renderRadio(node, context);

    case 'radio-group':
      return renderRadioGroup(node, context);

    case 'badge':
      return renderBadge(node, context);

    case 'separator':
      return renderSeparator(node, context);

    case 'tabs':
      return renderTabs(node, context);

    case 'tab':
      return renderTab(node, context);

    case 'breadcrumbs':
      return renderBreadcrumbs(node, context);

    case 'demo':
      return renderDemo(node, context);

    case 'comment':
      return renderComment(node, context);

    default:
      return `<!-- Unknown node type: ${(node as any).type} -->`;
  }
}

/**
 * Renders a list of children, intercepting comment nodes to build the side panel.
 * When _comments is present on context, comment nodes are collected and the
 * immediately following sibling is wrapped with a yellow outline + numbered badge.
 */
export function renderChildrenList(children: WiremdNode[], context: RenderContext): string {
  const { classPrefix: prefix } = context;
  let result = '';

  // Isolate this scope: save any pending annotation from a parent scope and
  // start fresh. After this call returns the parent's state is restored so it
  // can still wrap its own element (e.g. the card that contains these children).
  const parentNextCommentId = context._nextCommentId ?? null;
  context._nextCommentId = null;

  for (const node of children) {
    if (node.type === 'comment') {
      if (context.showComments && context._comments != null) {
        const text = (node as any).text as string;
        if (context._nextCommentId != null) {
          // Consecutive comment — append to current thread
          const thread = context._comments.find(c => c.id === context._nextCommentId);
          if (thread) thread.texts.push(text);
        } else {
          // First comment in a new thread
          const id = context._comments.length + 1;
          context._comments.push({ id, texts: [text] });
          context._nextCommentId = id;
        }
      }
      continue;
    }

    const html = renderNode(node, context);

    if (context.showComments && context._comments != null && context._nextCommentId != null) {
      const id = context._nextCommentId;
      context._nextCommentId = null;
      result += `<div class="${prefix}annotated" id="wmd-ann-${id}"><span class="${prefix}comment-badge">${id}</span>${html}</div>\n`;
    } else {
      result += html + '\n';
    }
  }

  // Restore parent scope so the caller can wrap its own element if needed
  context._nextCommentId = parentNextCommentId;

  return result.trim();
}

export function renderCommentsPanel(comments: Array<{ id: number; texts: string[] }>, prefix: string): string {
  const items = comments.map(c => {
    const messages = c.texts.map((text, i) => {
      const divider = i < c.texts.length - 1
        ? `<div class="${prefix}comment-msg-divider"></div>`
        : '';
      return `<div class="${prefix}comment-msg">${escapeHtml(text)}</div>${divider}`;
    }).join('');

    return `<div class="${prefix}comment-card">` +
      `<div class="${prefix}comment-card-badge">${c.id}</div>` +
      `<div class="${prefix}comment-card-body">${messages}</div>` +
      `</div>`;
  }).join('\n  ');

  return `<aside class="${prefix}comments-panel">
  <div class="${prefix}comments-panel-header">
    <span>💬 Comments</span>
    <span class="${prefix}comments-panel-count">${comments.length}</span>
  </div>
  ${items}
</aside>`;
}

function renderBadge(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'badge', node.props);
  return `<span class="${classes}">${escapeHtml(node.content)}</span>`;
}

function renderInput(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'input', node.props);
  const type = node.props.inputType || node.props.type || 'text';
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const placeholder = node.props.placeholder ? ` placeholder="${escapeHtml(node.props.placeholder)}"` : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  // Apply width based on underscore count (each underscore ~= 1ch width)
  const style = node.props.width ? ` style="width: ${node.props.width}ch; max-width: ${node.props.width}ch;"` : '';

  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled}${style} />`;
}

function renderTextarea(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'textarea', node.props);
  const rows = node.props.rows || 4;
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const placeholder = node.props.placeholder ? ` placeholder="${escapeHtml(node.props.placeholder)}"` : '';
  const value = node.props.value || '';

  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml(value)}</textarea>`;
}

function renderSelect(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'select', node.props);
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const multiple = node.props.multiple ? ' multiple' : '';

  const optionsHTML = (node.options || []).map((opt: any) => {
    const selected = opt.selected ? ' selected' : '';
    return `<option value="${escapeHtml(opt.value)}"${selected}>${escapeHtml(opt.label)}</option>`;
  }).join('\n    ');

  const placeholder = node.props.placeholder;
  const placeholderOption = placeholder
    ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>\n    `
    : '';

  return `<select class="${classes}"${required}${disabled}${multiple}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}

function renderCheckbox(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'checkbox', node.props);
  const checked = node.checked ? ' checked' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  // Separate inline children (icons/text) from nested children (lists)
  let labelHTML = escapeHtml(node.label || '');
  let nestedHTML = '';

  if (node.children) {
    const inlineChildren: any[] = [];
    const nestedChildren: any[] = [];

    for (const child of node.children) {
      if (child.type === 'list') {
        nestedChildren.push(child);
      } else {
        inlineChildren.push(child);
      }
    }

    if (inlineChildren.length > 0) {
      labelHTML = inlineChildren.map((child: any) => renderNode(child, context)).join('');
    }

    if (nestedChildren.length > 0) {
      nestedHTML = nestedChildren.map((child: any) => renderNode(child, context)).join('');
    }
  }

  return `<label class="${classes}">
    <input type="checkbox"${checked}${disabled}${value} />
    <span>${labelHTML}</span>
  </label>${nestedHTML}`;
}

function renderRadio(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'radio', node.props);
  const checked = node.selected ? ' checked' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const name = node.props.name ? ` name="${escapeHtml(node.props.name)}"` : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  // Handle children (nested lists or other content)
  const labelHTML = escapeHtml(node.label);
  const childrenHTML = node.children
    ? node.children.map((child: any) => renderNode(child, context)).join('')
    : '';

  return `<label class="${classes}">
    <input type="radio"${checked}${disabled}${name}${value} />
    <span>${labelHTML}</span>
  </label>${childrenHTML}`;
}

function renderRadioGroup(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const isInline = node.props?.inline;
  const classes = buildClasses(prefix, 'radio-group', node.props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : '';

  // Use the group's explicit name if present; otherwise mint a deterministic
  // one from the context counter so snapshots are stable.
  const groupName = node.name || nextRadioGroupName(context);

  const radios = (node.children || []).map((child: any) => {
    // Add the group name to each radio button (unless it already has one).
    if (child.type === 'radio') {
      if (child.props && child.props.name) return renderNode(child, context);
      const modifiedChild = { ...child, props: { ...child.props, name: groupName } };
      return renderNode(modifiedChild, context);
    }
    return renderNode(child, context);
  }).join('\n    ');

  return `<div class="${classes}${inlineClass}">
    ${radios}
</div>`;
}

function renderBreadcrumbs(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const items: any[] = node.children || [];
  const crumbsHTML = items.map((crumb: any, i: number) => {
    const isLast = i === items.length - 1;
    const label = escapeHtml(crumb.content || '');
    return isLast
      ? `<span class="${prefix}breadcrumb-item ${prefix}breadcrumb-current" aria-current="page">${label}</span>`
      : `<span class="${prefix}breadcrumb-item"><a href="#">${label}</a></span><span class="${prefix}breadcrumb-sep" aria-hidden="true">›</span>`;
  }).join('');
  return `<nav class="${prefix}breadcrumbs"${sourceLine(node)} aria-label="breadcrumb">${crumbsHTML}</nav>`;
}

function renderSeparator(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'separator', node.props);

  return `<hr class="${classes}" />`;
}

function renderTabs(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'tabs', node.props);
  const tabs: any[] = node.children || [];

  // Render panels first so we know which ones contain comment annotations
  const renderedPanels = tabs.map((tab: any, i: number) => {
    const commentsBefore = context._comments?.length ?? 0;
    const panelChildren = renderChildrenList(tab.children || [], context);
    const hasAnnotations = context.showComments && ((context._comments?.length ?? 0) > commentsBefore);
    const hidden = tab.active ? '' : ' hidden';
    return {
      html: `<div class="${prefix}tab-panel" role="tabpanel" data-wmd-tab-panel="${i}"${hidden}>
    ${panelChildren}
  </div>`,
      hasAnnotations,
    };
  });

  const headers = tabs.map((tab: any, i: number) => {
    const activeClass = tab.active ? ` ${prefix}active` : '';
    const annotatedClass = renderedPanels[i].hasAnnotations ? ` ${prefix}tab-header-annotated` : '';
    return `<button type="button" role="tab" class="${prefix}tab-header${activeClass}${annotatedClass}" data-wmd-tab="${i}">${escapeHtml(tab.label || '')}</button>`;
  }).join('');

  const panels = renderedPanels.map(r => r.html).join('\n  ');

  return `<div class="${classes}"${sourceLine(node)} data-wmd-tabs>
  <div class="${prefix}tab-headers" role="tablist">${headers}</div>
  <div class="${prefix}tab-panels">
  ${panels}
  </div>
</div>${getTabsScript(prefix)}`;
}

function renderTab(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const hidden = node.active ? '' : ' hidden';
  const childrenHTML = (node.children || []).map((c: any) => renderNode(c, context)).join('');
  return `<div class="${prefix}tab-panel" role="tabpanel"${hidden}>${childrenHTML}</div>`;
}

function getTabsScript(prefix: string): string {
  return `<script>(function(){if(window.__wmdTabsInit)return;window.__wmdTabsInit=true;document.addEventListener('click',function(e){var btn=e.target.closest('.${prefix}tab-header');if(!btn)return;var root=btn.closest('[data-wmd-tabs]');if(!root)return;var idx=btn.getAttribute('data-wmd-tab');root.querySelectorAll('.${prefix}tab-header').forEach(function(b){b.classList.toggle('${prefix}active',b.getAttribute('data-wmd-tab')===idx);});root.querySelectorAll('[data-wmd-tab-panel]').forEach(function(p){if(p.getAttribute('data-wmd-tab-panel')===idx){p.removeAttribute('hidden');}else{p.setAttribute('hidden','');}});});})();</script>`;
}

export function sourceLine(node: any): string {
  const line = node?.position?.start?.line;
  return line != null ? ` data-source-line="${line}"` : '';
}

/**
 * Build CSS classes string from prefix, base class, and props
 */
export function buildClasses(prefix: string, baseClass: string, props: any): string {
  const classes = [`${prefix}${baseClass}`];

  // Add custom classes
  if (props.classes && Array.isArray(props.classes)) {
    props.classes.forEach((cls: string) => {
      classes.push(`${prefix}${cls}`);
    });
  }

  // Add variant class
  if (props.variant) {
    classes.push(`${prefix}${baseClass}-${props.variant}`);
  }

  // Add state class
  if (props.state) {
    classes.push(`${prefix}state-${props.state}`);
  }

  return classes.join(' ');
}

function renderDemo(node: any, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const previewHTML = (node.children || []).map((child: any) => renderNode(child, context)).join('\n');
  const codeHTML = escapeHtml(node.raw || '');
  return `<div class="${prefix}demo">
  <div class="${prefix}demo-preview">${previewHTML}</div>
  <div class="${prefix}demo-code">
    <div class="${prefix}demo-code-toolbar">
      <button class="${prefix}demo-copy" onclick="(function(btn){var code=btn.closest('.${prefix}demo-code').querySelector('code');navigator.clipboard.writeText(code.textContent).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1500)})})(this)">Copy</button>
    </div>
    <pre><code>${codeHTML}</code></pre>
  </div>
</div>`;
}

function renderComment(node: any, context: RenderContext): string {
  if (!context.showComments) return '';
  if (context._comments != null) return ''; // handled upstream by renderChildrenList
  return `<span class="${context.classPrefix}comment">${escapeHtml(node.text)}</span>`;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  if (!text) return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
