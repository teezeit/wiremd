/**
 * Tailwind CSS Renderer for wiremd AST nodes
 * Converts AST nodes to HTML with Tailwind utility classes
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { WiremdNode } from '../types.js';
import { getNodeDefinition } from '../nodes/_registry.js';

export interface TailwindRenderContext {
  pretty: boolean;
  // Mutable counter for deterministic radio-group names; see html-renderer
  // for the rationale. Initialised by renderToTailwind.
  _radioGroupCounter?: { value: number };
}

/** Mint the next deterministic radio-group name. */
export function nextRadioGroupName(context: TailwindRenderContext): string {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}

/**
 * If `children` contains any `radio` nodes, return a copy where every radio
 * shares a freshly-minted group name. Mirror of the helper in html-renderer.
 */
export function applyRadioGroupName(children: any[], context: TailwindRenderContext): any[] {
  if (!children || children.length === 0) return children;
  const hasRadio = children.some((c: any) => c && c.type === 'radio');
  if (!hasRadio) return children;
  const name = nextRadioGroupName(context);
  return children.map((c: any) => {
    if (!c || c.type !== 'radio') return c;
    if (c.props && c.props.name) return c;
    return { ...c, props: { ...(c.props || {}), name } };
  });
}

/**
 * Render a wiremd AST node to HTML with Tailwind classes
 */
export function renderNode(node: WiremdNode, context: TailwindRenderContext): string {
  if (node == null) return '';
  const def = getNodeDefinition(node.type);
  if (def?.render?.tailwind) {
    return def.render.tailwind(node as never, context);
  }
  // Node types without a Tailwind renderer emit an "Unknown node"
  // comment for snapshot parity with the legacy default arm.
  return `<!-- Unknown node type: ${(node as { type: string }).type} -->`;
}

export function renderChildrenList(children: WiremdNode[], context: TailwindRenderContext): string {
  const sidebarLayout = splitStandaloneSidebarLayout(children);
  if (sidebarLayout) {
    const beforeHTML = renderChildrenList(sidebarLayout.before, context);
    const sidebarHTML = renderNode(sidebarLayout.sidebar, context);
    const mainHTML = renderChildrenList(sidebarLayout.main, context);
    const layoutHTML = `<div class="grid grid-cols-[220px_1fr] gap-4 items-start">
  <div class="min-w-0">
    ${sidebarHTML}
  </div>
  <div class="min-w-0 [&>*:first-child]:mt-0">
    ${mainHTML}
  </div>
</div>`;

    return [beforeHTML, layoutHTML].filter(Boolean).join('\n  ');
  }

  return children.map((child) => renderNode(child, context)).join('\n  ');
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
