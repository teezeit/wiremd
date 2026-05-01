import type { WiremdNode } from '../../types.js';
import { type RenderContext, renderNode } from '../../renderer/html-renderer.js';

type TableHeaderNode = Extract<WiremdNode, { type: 'table-header' }>;

export function renderTableHeaderHTML(node: TableHeaderNode, context: RenderContext): string {
  const cellsHTML = (node.children || []).map((child) => renderNode(child, context)).join('\n    ');
  return `<thead>
    <tr>
      ${cellsHTML}
    </tr>
  </thead>`;
}
