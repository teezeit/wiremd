import type { WiremdNode } from '../../types.js';
import type { TailwindRenderContext } from '../../renderer/tailwind-renderer.js';

type SeparatorNode = Extract<WiremdNode, { type: 'separator' }>;

export function renderSeparatorTailwind(
  _node: SeparatorNode,
  _context: TailwindRenderContext,
): string {
  const classes = 'border-t border-gray-300 my-8';

  return `<hr class="${classes}" />`;
}
