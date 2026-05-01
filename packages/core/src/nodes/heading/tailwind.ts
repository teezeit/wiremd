import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type HeadingNode = Extract<WiremdNode, { type: 'heading' }>;

export function renderHeadingTailwind(
  node: HeadingNode,
  context: TailwindRenderContext,
): string {
  const level = node.level || 1;
  let classes = 'font-bold text-gray-900 my-4';

  switch (level) {
    case 1:
      classes = 'text-4xl font-extrabold text-gray-900 mb-4 mt-8';
      break;
    case 2:
      classes = 'text-3xl font-bold text-gray-900 mb-3 mt-6';
      break;
    case 3:
      classes = 'text-2xl font-semibold text-gray-900 mb-2 mt-4';
      break;
    case 4:
      classes = 'text-xl font-semibold text-gray-800 mb-2 mt-4';
      break;
    case 5:
      classes = 'text-lg font-medium text-gray-800 mb-2 mt-3';
      break;
    case 6:
      classes = 'text-base font-medium text-gray-700 mb-2 mt-2';
      break;
  }

  const childrenHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content || '');

  return `<h${level} class="${classes}">${childrenHTML}</h${level}>`;
}
