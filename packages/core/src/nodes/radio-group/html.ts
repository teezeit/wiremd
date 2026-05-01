import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  nextRadioGroupName,
  renderNode,
} from '../../renderer/html-renderer.js';

type RadioGroupNode = Extract<WiremdNode, { type: 'radio-group' }>;

export function renderRadioGroupHTML(node: RadioGroupNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const isInline = props.inline as boolean | undefined;
  const classes = buildClasses(prefix, 'radio-group', props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : '';

  // Use the explicit name if present; otherwise mint a deterministic one
  // from the context counter so snapshots are stable.
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

  return `<div class="${classes}${inlineClass}">
    ${radios}
</div>`;
}
