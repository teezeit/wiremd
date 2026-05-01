import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type RadioNode = Extract<WiremdNode, { type: 'radio' }>;

export function renderRadioReact(
  node: RadioNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'radio', props);
  const checked = node.selected;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.name) attrs.push(`name="${escapeJSX(props.name as string)}"`);
  if (props.value) attrs.push(`value="${escapeJSX(props.value as string)}"`);
  if (props.disabled) attrs.push('disabled');

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="radio"${checked ? ' defaultChecked' : ''} ${attrs.join(' ')} />
${indentStr}  <span>${escapeJSX(node.label)}</span>
${indentStr}</label>`;
}
