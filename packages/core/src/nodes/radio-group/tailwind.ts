import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  nextRadioGroupName,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type RadioGroupNode = Extract<WiremdNode, { type: 'radio-group' }>;

export function renderRadioGroupTailwind(
  node: RadioGroupNode,
  context: TailwindRenderContext,
): string {
  const props = node.props as Record<string, unknown>;
  const isInline = props.inline as boolean | undefined;
  const classes = isInline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2';

  const groupName = node.name || nextRadioGroupName(context);

  const radios = (node.children || [])
    .map((child) => {
      if (child.type === 'radio') {
        const childProps = child.props as Record<string, unknown> | undefined;
        if (childProps?.name) return renderNode(child, context);
        const modifiedChild = {
          ...child,
          props: { ...(childProps || {}), name: groupName },
        };
        return renderNode(modifiedChild as WiremdNode, context);
      }
      return renderNode(child, context);
    })
    .join('\n    ');

  return `<div class="${classes}">
    ${radios}
</div>`;
}
