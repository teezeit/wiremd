import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type InputNode = Extract<WiremdNode, { type: 'input' }>;

export function renderInputReact(
  node: InputNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'input', props);
  const type = (props.inputType as string) || (props.type as string) || 'text';
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.placeholder) attrs.push(`placeholder="${escapeJSX(props.placeholder as string)}"`);
  if (props.value) attrs.push(`defaultValue="${escapeJSX(props.value as string)}"`);
  if (props.required) attrs.push('required');
  if (props.disabled) attrs.push('disabled');

  return `${indentStr}<input type="${type}" ${classAttr}="${classes}" ${attrs.join(' ')} />`;
}
