import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type GridItemNode = Extract<WiremdNode, { type: 'grid-item' }>;

export function renderGridItemTailwind(
  node: GridItemNode,
  context: TailwindRenderContext,
): string {
  const classes =
    'bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow';
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<div class="${classes}">
    ${childrenHTML}
  </div>`;
}
