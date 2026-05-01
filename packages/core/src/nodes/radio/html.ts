import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type RadioNode = Extract<WiremdNode, { type: 'radio' }>;

export function renderRadioHTML(node: RadioNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'radio', props);
  const checked = node.selected ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const name = props.name ? ` name="${escapeHtml(props.name as string)}"` : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  const labelHTML = escapeHtml(node.label);
  const childrenHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : '';

  return `<label class="${classes}">
    <input type="radio"${checked}${disabled}${name}${value} />
    <span>${labelHTML}</span>
  </label>${childrenHTML}`;
}
