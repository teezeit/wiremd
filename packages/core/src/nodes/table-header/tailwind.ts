import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type TableHeaderNode = Extract<WiremdNode, { type: 'table-header' }>;

export function renderTableHeaderTailwind(
  node: TableHeaderNode,
  context: TailwindRenderContext,
): string {
  const cellsHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<thead class="bg-gray-50">
    <tr>
      ${cellsHTML}
    </tr>
  </thead>`;
}
