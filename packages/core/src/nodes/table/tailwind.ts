import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type TableNode = Extract<WiremdNode, { type: 'table' }>;

export function renderTableTailwind(node: TableNode, context: TailwindRenderContext): string {
  const classes =
    'min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden my-6';

  const headerNode = node.children?.find((child) => child.type === 'table-header');
  const rowNodes = node.children?.filter((child) => child.type === 'table-row') || [];

  const headerHTML = headerNode ? renderNode(headerNode, context) : '';
  const rowsHTML = rowNodes.map((child) => renderNode(child, context)).join('\n    ');
  const bodyHTML = rowsHTML
    ? `\n  <tbody class="divide-y divide-gray-200">\n    ${rowsHTML}\n  </tbody>`
    : '';

  return `<table class="${classes}">
  ${headerHTML}${bodyHTML}
</table>`;
}
