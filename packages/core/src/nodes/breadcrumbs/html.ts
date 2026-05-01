import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  escapeHtml,
  sourceLine,
} from '../../renderer/html-renderer.js';

type BreadcrumbsNode = Extract<WiremdNode, { type: 'breadcrumbs' }>;

export function renderBreadcrumbsHTML(node: BreadcrumbsNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const items = (node.children || []) as Array<{ content?: string }>;
  const crumbsHTML = items
    .map((crumb, i) => {
      const isLast = i === items.length - 1;
      const label = escapeHtml(crumb.content || '');
      return isLast
        ? `<span class="${prefix}breadcrumb-item ${prefix}breadcrumb-current" aria-current="page">${label}</span>`
        : `<span class="${prefix}breadcrumb-item"><a href="#">${label}</a></span><span class="${prefix}breadcrumb-sep" aria-hidden="true">›</span>`;
    })
    .join('');
  return `<nav class="${prefix}breadcrumbs"${sourceLine(node)} aria-label="breadcrumb">${crumbsHTML}</nav>`;
}
