import type { WiremdNode } from '../../types.js';
import { type ReactRenderContext, escapeJSX } from '../../renderer/react-renderer.js';

type TextNode = Extract<WiremdNode, { type: 'text' }>;

export function renderTextReact(node: TextNode, _context: ReactRenderContext, _indent = 0): string {
  const content = escapeJSX(node.content || '');
  if (node.mark === 'strong') return `<strong>${content}</strong>`;
  if (node.mark === 'em') return `<em>${content}</em>`;
  if (node.mark === 'code') return `<code>${content}</code>`;
  return content;
}
