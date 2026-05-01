import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type BadgeNode = Extract<WiremdNode, { type: 'badge' }>;

export function renderBadgeHTML(node: BadgeNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'badge', node.props);
  return `<span class="${classes}">${escapeHtml(node.content)}</span>`;
}
