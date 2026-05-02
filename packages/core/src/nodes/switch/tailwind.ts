import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type SwitchNode = Extract<WiremdNode, { type: 'switch' }>;

export function renderSwitchTailwind(
  node: SwitchNode,
  context: TailwindRenderContext,
): string {
  const props = node.props as Record<string, unknown>;
  const checked = node.checked ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';
  const labelClasses = props.disabled
    ? 'flex items-center justify-between gap-3 opacity-50 cursor-not-allowed'
    : 'flex items-center justify-between gap-3 cursor-pointer';
  const trackClasses = node.checked
    ? 'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-indigo-600 bg-indigo-600 transition-colors'
    : 'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-gray-400 bg-gray-100 transition-colors';
  const thumbClasses = node.checked
    ? 'absolute right-0.5 h-4 w-4 rounded-full bg-white shadow'
    : 'absolute left-0.5 h-4 w-4 rounded-full bg-white border border-gray-400 shadow-sm';

  const labelHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.label || '');

  return `<label class="${labelClasses}">
    <span class="text-gray-900">${labelHTML}</span>
    <input type="checkbox" role="switch" class="sr-only"${checked}${disabled}${value} />
    <span class="${trackClasses}"><span class="${thumbClasses}"></span></span>
  </label>`;
}
