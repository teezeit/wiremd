import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type CheckboxNode = Extract<WiremdNode, { type: 'checkbox' }>;

export function renderCheckboxReact(
  node: CheckboxNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'checkbox', props);
  const checked = node.checked;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.value) attrs.push(`value="${escapeJSX(props.value as string)}"`);
  if (props.disabled) attrs.push('disabled');

  const labelJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.label || '');

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="checkbox"${checked ? ' defaultChecked' : ''} ${attrs.join(' ')} />
${indentStr}  <span>${labelJSX}</span>
${indentStr}</label>`;
}
