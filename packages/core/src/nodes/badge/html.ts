import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type BadgeNode = Extract<WiremdNode, { type: 'badge' }>;

export function renderBadgeHTML(node: BadgeNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'badge', node.props);
  const contentHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content);
  return `<span class="${classes}">${contentHTML}</span>`;
}
