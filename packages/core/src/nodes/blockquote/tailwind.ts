import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type BlockquoteNode = Extract<WiremdNode, { type: 'blockquote' }>;

export function renderBlockquoteTailwind(
  node: BlockquoteNode,
  context: TailwindRenderContext,
): string {
  const classes = 'border-l-4 border-indigo-500 pl-4 my-4 text-gray-700 italic';
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n  ');

  return `<blockquote class="${classes}">
  ${childrenHTML}
</blockquote>`;
}
