import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
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
  const labelChildren = (node.children || []).filter((child) => child.type !== 'list');
  const labelJSX = labelChildren.length > 0
    ? labelChildren.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.label);

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="radio"${checked ? ' defaultChecked' : ''} ${attrs.join(' ')} />
${indentStr}  <span>${labelJSX}</span>
${indentStr}</label>`;
}
