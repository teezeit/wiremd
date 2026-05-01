import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type BrandNode = Extract<WiremdNode, { type: 'brand' }>;

export function renderBrandTailwind(node: BrandNode, context: TailwindRenderContext): string {
  const classes = 'font-bold text-xl text-gray-900 mr-auto flex items-center gap-2';
  const childrenHTML = (node.children || []).map((child) => renderNode(child, context)).join('');

  return `<div class="${classes}">${childrenHTML}</div>`;
}
