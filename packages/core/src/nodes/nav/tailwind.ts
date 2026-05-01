import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type NavNode = Extract<WiremdNode, { type: 'nav' }>;

export function renderNavTailwind(node: NavNode, context: TailwindRenderContext): string {
  const classes = 'bg-white shadow-sm rounded-lg p-4 mb-8';
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<nav class="${classes}">
  <div class="flex items-center gap-6 flex-wrap">
    ${childrenHTML}
  </div>
</nav>`;
}
