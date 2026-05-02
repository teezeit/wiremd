import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type SwitchNode = Extract<WiremdNode, { type: 'switch' }>;

export function renderSwitchReact(
  node: SwitchNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'switch', props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.value) attrs.push(`value="${escapeJSX(props.value as string)}"`);
  if (props.disabled) attrs.push('disabled');

  const labelJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.label || '');

  const attrText = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <span ${classAttr}="${prefix}switch-label">${labelJSX}</span>
${indentStr}  <input type="checkbox" role="switch"${node.checked ? ' defaultChecked' : ''}${attrText} />
${indentStr}  <span ${classAttr}="${prefix}switch-track"><span ${classAttr}="${prefix}switch-thumb"></span></span>
${indentStr}</label>`;
}
