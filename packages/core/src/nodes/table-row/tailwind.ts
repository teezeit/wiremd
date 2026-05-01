import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type TableRowNode = Extract<WiremdNode, { type: 'table-row' }>;

export function renderTableRowTailwind(
  node: TableRowNode,
  context: TailwindRenderContext,
): string {
  const cellsHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<tr class="hover:bg-gray-50">
    ${cellsHTML}
  </tr>`;
}
