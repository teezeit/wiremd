import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type SwitchNode = Extract<WiremdNode, { type: 'switch' }>;

export function renderSwitchHTML(node: SwitchNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'switch', props);
  const checked = node.checked ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  const labelHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.label || '');

  return `<label class="${classes}">
    <span class="${prefix}switch-label">${labelHTML}</span>
    <input type="checkbox" role="switch"${checked}${disabled}${value} />
    <span class="${prefix}switch-track"><span class="${prefix}switch-thumb"></span></span>
  </label>`;
}
