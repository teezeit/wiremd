import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type RadioNode = Extract<WiremdNode, { type: 'radio' }>;

export function renderRadioTailwind(node: RadioNode, context: TailwindRenderContext): string {
  const props = node.props as Record<string, unknown>;
  const classes = 'flex items-center gap-2 cursor-pointer';
  const checked = node.selected ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const name = props.name ? ` name="${escapeHtml(props.name as string)}"` : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';
  const labelChildren = (node.children || []).filter((child) => child.type !== 'list');
  const labelHTML = labelChildren.length > 0
    ? labelChildren.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.label);

  return `<label class="${classes}">
    <input type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"${checked}${disabled}${name}${value} />
    <span class="text-gray-900">${labelHTML}</span>
  </label>`;
}
