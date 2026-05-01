import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type TableCellNode = Extract<WiremdNode, { type: 'table-cell' }>;

export function renderTableCellHTML(node: TableCellNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const tag = node.header ? 'th' : 'td';
  const align = node.align || 'left';
  const classes = buildClasses(prefix, `table-cell ${prefix}align-${align}`, {});

  const contentHTML =
    node.children && node.children.length > 0
      ? node.children.map((child) => renderNode(child, context)).join('')
      : escapeHtml(node.content || '');

  return `<${tag} class="${classes}">${contentHTML}</${tag}>`;
}
