import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, renderNode } from '../../renderer/tailwind-renderer.js';

type RowNode = Extract<WiremdNode, { type: 'row' }>;

export function renderRowTailwind(node: RowNode, context: TailwindRenderContext): string {
  const propsClasses = (node.props?.classes as string[] | undefined) || [];
  const classes = [
    'flex',
    propsClasses.includes('align-top')
      ? 'items-start'
      : propsClasses.includes('align-bottom')
        ? 'items-end'
        : 'items-center',
    'gap-3',
    'flex-wrap',
    propsClasses.includes('right')
      ? 'justify-end'
      : propsClasses.includes('center')
        ? 'justify-center'
        : '',
  ].filter(Boolean).join(' ');
  const childrenHTML = (node.children || [])
    .map((child) => {
      if (child.type === 'grid-item') {
        return (child.children || [])
          .map((grandchild) => renderNode(grandchild, context))
          .join('\n  ');
      }
      return renderNode(child, context);
    })
    .join('\n  ');

  return `<div class="${classes}">
  ${childrenHTML}
</div>`;
}
