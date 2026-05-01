import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type TextNode = Extract<WiremdNode, { type: 'text' }>;

export function renderTextTailwind(node: TextNode, _context: TailwindRenderContext): string {
  return escapeHtml(node.content || '');
}
