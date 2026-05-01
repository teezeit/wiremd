import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type RowNode = Extract<WiremdNode, { type: 'row' }>;

export function renderRowTailwind(node: RowNode, context: TailwindRenderContext): string {
  const propsClasses = (node.props?.classes as string[] | undefined) || [];
  const classes = propsClasses.includes('right')
    ? 'flex items-center gap-3 flex-wrap justify-end'
    : propsClasses.includes('center')
      ? 'flex items-center gap-3 flex-wrap justify-center'
      : 'flex items-center gap-3 flex-wrap';
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n  ');

  return `<div class="${classes}">
  ${childrenHTML}
</div>`;
}
