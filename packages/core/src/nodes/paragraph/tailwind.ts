import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type ParagraphNode = Extract<WiremdNode, { type: 'paragraph' }>;

export function renderParagraphTailwind(
  node: ParagraphNode,
  context: TailwindRenderContext,
): string {
  const classes = 'text-gray-700 my-3';

  const childrenHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : node.content
      ? escapeHtml(node.content)
      : '';

  return `<p class="${classes}">${childrenHTML}</p>`;
}
