import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  nextRadioGroupName,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type RadioGroupNode = Extract<WiremdNode, { type: 'radio-group' }>;

export function renderRadioGroupReact(
  node: RadioGroupNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const isInline = props.inline as boolean | undefined;
  const classes = buildClasses(prefix, 'radio-group', props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : '';
  const classAttr = context.useClassName ? 'className' : 'class';

  const groupName = node.name || nextRadioGroupName(context);

  const radios = (node.children || [])
    .map((child) => {
      if (child.type === 'radio') {
        const childProps = child.props as Record<string, unknown> | undefined;
        if (childProps?.name) return renderNode(child, context, indent + 1);
        const modifiedChild = {
          ...child,
          props: { ...(childProps || {}), name: groupName },
        };
        return renderNode(modifiedChild as WiremdNode, context, indent + 1);
      }
      return renderNode(child, context, indent + 1);
    })
    .join('\n');

  return `${indentStr}<div ${classAttr}="${classes}${inlineClass}">
${radios}
${indentStr}</div>`;
}
