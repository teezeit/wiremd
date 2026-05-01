import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type TextareaNode = Extract<WiremdNode, { type: 'textarea' }>;

export function renderTextareaReact(
  node: TextareaNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'textarea', props);
  const rows = (props.rows as number) || 4;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.placeholder) attrs.push(`placeholder="${escapeJSX(props.placeholder as string)}"`);
  if (props.required) attrs.push('required');
  if (props.disabled) attrs.push('disabled');

  const value = (props.value as string) || '';

  return `${indentStr}<textarea ${classAttr}="${classes}" rows={${rows}} ${attrs.join(' ')}>\n${indentStr}  ${escapeJSX(value)}\n${indentStr}</textarea>`;
}
