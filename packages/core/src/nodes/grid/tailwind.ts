import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type GridNode = Extract<WiremdNode, { type: 'grid' }>;

export function renderGridTailwind(node: GridNode, context: TailwindRenderContext): string {
  const columns = node.columns || 3;
  let gridClasses = 'grid gap-6 my-8';

  if (columns === 2) {
    gridClasses += ' grid-cols-1 md:grid-cols-2';
  } else if (columns === 3) {
    gridClasses += ' grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  } else if (columns === 4) {
    gridClasses += ' grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  } else {
    gridClasses += ` grid-cols-1 md:grid-cols-${Math.min(columns, 4)}`;
  }

  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n  ');

  return `<div class="${gridClasses}">
  ${childrenHTML}
</div>`;
}
