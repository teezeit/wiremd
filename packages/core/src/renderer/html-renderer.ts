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
 * Render a wiremd AST node to HTML.
 *
 * All node types with HTML output live under src/nodes/<type>/ and are
 * registered in src/nodes/_registry.ts. The few node types whose
 * fixtures expect a fall-through (alert, accordion, breadcrumb-item,
 * loading-state, empty-state, error-state) hit the comment branch
 * below so their snapshots stay byte-identical.
 */
export function renderNode(node: WiremdNode, context: RenderContext): string {
  if (node == null) return '';
  const def = getNodeDefinition(node.type);
  if (def?.render?.html) {
    return def.render.html(node as never, context);
  }
  return `<!-- Unknown node type: ${(node as { type: string }).type} -->`;
}

/**
 * Renders a list of children, intercepting comment nodes to build the side panel.
 * When _comments is present on context, comment nodes are collected and the
 * immediately following sibling is wrapped with a yellow outline + numbered badge.
 */
export function renderChildrenList(children: WiremdNode[], context: RenderContext): string {
  const sidebarLayout = splitStandaloneSidebarLayout(children);
  if (sidebarLayout) {
    const { classPrefix: prefix } = context;
    const beforeHTML = renderChildrenList(sidebarLayout.before, context);
    const sidebarHTML = renderNode(sidebarLayout.sidebar, context);
    const mainHTML = renderChildrenList(sidebarLayout.main, context);
    const layoutHTML = `<div class="${prefix}container-layout ${prefix}sidebar-main">
  <div class="${prefix}layout-sidebar">
    ${sidebarHTML}
  </div>
  <div class="${prefix}layout-main">
    ${mainHTML}
  </div>
</div>`;

    return [beforeHTML, layoutHTML].filter(Boolean).join('\n');
  }

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

function splitStandaloneSidebarLayout(
  children: WiremdNode[],
): { before: WiremdNode[]; sidebar: WiremdNode; main: WiremdNode[] } | null {
  const sidebarIndex = children.findIndex((child) => {
    return child.type === 'container' && child.containerType === 'sidebar';
  });

  if (sidebarIndex < 0) return null;

  const main = children.slice(sidebarIndex + 1);
  const hasMainContent = main.some((child) => child.type !== 'comment');
  if (!hasMainContent) return null;

  return {
    before: children.slice(0, sidebarIndex),
    sidebar: children[sidebarIndex],
    main,
  };
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
