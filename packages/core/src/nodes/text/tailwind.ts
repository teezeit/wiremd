import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type TextNode = Extract<WiremdNode, { type: 'text' }>;

export function renderTextTailwind(node: TextNode, _context: TailwindRenderContext): string {
  const content = escapeHtml(node.content || '');
  if (node.mark === 'strong') return `<strong class="font-semibold">${content}</strong>`;
  if (node.mark === 'em') return `<em class="italic">${content}</em>`;
  if (node.mark === 'code') return `<code class="font-mono text-sm bg-gray-100 px-1 rounded">${content}</code>`;
  return content;
}
