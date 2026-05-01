import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type ListItemNode = Extract<WiremdNode, { type: 'list-item' }>;

export function renderListItemTailwind(
  node: ListItemNode,
  context: TailwindRenderContext,
): string {
  const classes = 'text-gray-700';

  const childrenHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content || '');

  return `<li class="${classes}">${childrenHTML}</li>`;
}
