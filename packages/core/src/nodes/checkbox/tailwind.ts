import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type CheckboxNode = Extract<WiremdNode, { type: 'checkbox' }>;

export function renderCheckboxTailwind(
  node: CheckboxNode,
  context: TailwindRenderContext,
): string {
  const props = node.props as Record<string, unknown>;
  const classes = 'flex items-center gap-2 cursor-pointer';
  const checked = node.checked ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  const labelHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.label || '');

  return `<label class="${classes}">
    <input type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"${checked}${disabled}${value} />
    <span class="text-gray-900">${labelHTML}</span>
  </label>`;
}
