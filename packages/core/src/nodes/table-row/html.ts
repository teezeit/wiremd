import type { WiremdNode } from '../../types.js';
import { type RenderContext, renderNode } from '../../renderer/html-renderer.js';

type TableRowNode = Extract<WiremdNode, { type: 'table-row' }>;

export function renderTableRowHTML(node: TableRowNode, context: RenderContext): string {
  const cellsHTML = (node.children || []).map((child) => renderNode(child, context)).join('\n    ');
  return `<tr>
    ${cellsHTML}
  </tr>`;
}
