import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type TableCellNode = Extract<WiremdNode, { type: 'table-cell' }>;

export function renderTableCellTailwind(
  node: TableCellNode,
  context: TailwindRenderContext,
): string {
  const tag = node.header ? 'th' : 'td';
  const align = node.align || 'left';
  let classes = 'px-6 py-3 text-gray-900';

  if (node.header) {
    classes = 'px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider';
  } else {
    if (align === 'center') classes += ' text-center';
    if (align === 'right') classes += ' text-right';
  }

  const contentHTML =
    node.children && node.children.length > 0
      ? node.children.map((child) => renderNode(child, context)).join('')
      : escapeHtml(node.content || '');

  return `<${tag} class="${classes}">${contentHTML}</${tag}>`;
}
