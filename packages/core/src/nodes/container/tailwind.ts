/**
 * Container — Tailwind render.
 * Migrated from src/renderer/tailwind-renderer.ts.
 */

import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderChildrenList } from '../../renderer/tailwind-renderer.js';

type ContainerNode = Extract<WiremdNode, { type: 'container' }>;

export function renderContainerTailwind(
  node: ContainerNode,
  context: TailwindRenderContext,
): string {
  let classes = '';

  switch (node.containerType) {
    case 'hero':
      classes =
        'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-12 text-center my-8 shadow-lg';
      break;
    case 'card':
      classes = 'bg-white rounded-lg p-6 shadow-md border border-gray-200 my-4';
      break;
    case 'modal':
      classes = 'bg-white rounded-lg p-8 shadow-2xl max-w-md mx-auto my-8';
      break;
    case 'footer':
      classes = 'bg-gray-900 text-gray-300 p-8 rounded-lg mt-12';
      break;
    case 'alert':
      classes = 'border-l-4 p-4 my-4 rounded';
      if (node.props.state === 'error') {
        classes += ' bg-red-50 border-red-500 text-red-900';
      } else if (node.props.state === 'success') {
        classes += ' bg-green-50 border-green-500 text-green-900';
      } else if (node.props.state === 'warning') {
        classes += ' bg-yellow-50 border-yellow-500 text-yellow-900';
      } else {
        classes += ' bg-blue-50 border-blue-500 text-blue-900';
      }
      break;
    case 'section':
      classes = 'py-6 border-b border-gray-200 last:border-b-0';
      break;
    case 'form-group':
      classes = 'mb-4';
      break;
    case 'button-group':
      classes = 'flex flex-wrap gap-2 my-4';
      break;
    default:
      classes = 'p-4 my-4';
  }

  const childrenHTML = renderChildrenList(node.children || [], context);

  return `<div class="${classes}">
  ${childrenHTML}
</div>`;
}
