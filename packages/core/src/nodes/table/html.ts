import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type TableNode = Extract<WiremdNode, { type: 'table' }>;

export function renderTableHTML(node: TableNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'table', node.props);

  const headerNode = node.children?.find((child) => child.type === 'table-header');
  const rowNodes = node.children?.filter((child) => child.type === 'table-row') || [];

  const headerHTML = headerNode ? renderNode(headerNode, context) : '';
  const rowsHTML = rowNodes.map((child) => renderNode(child, context)).join('\n    ');
  const bodyHTML = rowsHTML ? `\n  <tbody>\n    ${rowsHTML}\n  </tbody>` : '';

  return `<table class="${classes}"${sourceLine(node)}>
  ${headerHTML}${bodyHTML}
</table>`;
}
