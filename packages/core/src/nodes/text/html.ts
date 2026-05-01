import type { WiremdNode } from '../../types.js';
import { type RenderContext, escapeHtml } from '../../renderer/html-renderer.js';

type TextNode = Extract<WiremdNode, { type: 'text' }>;

export function renderTextHTML(node: TextNode, _context: RenderContext): string {
  const content = node.content || '';
  // Allow inline HTML pass-through when the parser left tag soup in the content.
  const hasHtmlTags = /<[^>]+>/.test(content);
  const escaped = hasHtmlTags ? content : escapeHtml(content);
  if (node.mark === 'strong') return `<strong>${escaped}</strong>`;
  if (node.mark === 'em') return `<em>${escaped}</em>`;
  if (node.mark === 'code') return `<code>${escaped}</code>`;
  return escaped;
}
