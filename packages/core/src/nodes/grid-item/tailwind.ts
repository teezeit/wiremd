import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type GridItemNode = Extract<WiremdNode, { type: 'grid-item' }>;

export function renderGridItemTailwind(
  node: GridItemNode,
  context: TailwindRenderContext,
): string {
  const propsClasses = (node.props?.classes as string[] | undefined) || [];
  const utilityClasses: string[] = [];

  for (const className of propsClasses) {
    const span = className.match(/^col-span-(\d+)$/);
    if (span) {
      utilityClasses.push(`lg:col-span-${span[1]}`);
    }
  }

  if (propsClasses.includes('align-right')) {
    utilityClasses.push('ml-auto', 'text-right');
  } else if (propsClasses.includes('align-center')) {
    utilityClasses.push('mx-auto', 'text-center');
  } else if (propsClasses.includes('align-left')) {
    utilityClasses.push('mr-auto', 'text-left');
  }

  if (propsClasses.includes('align-top')) {
    utilityClasses.push('self-start');
  } else if (propsClasses.includes('align-bottom')) {
    utilityClasses.push('self-end');
  }

  const classes = [
    'bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow',
    ...utilityClasses,
  ].join(' ');
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<div class="${classes}">
    ${childrenHTML}
  </div>`;
}
