import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type TextareaNode = Extract<WiremdNode, { type: 'textarea' }>;

export function renderTextareaTailwind(
  node: TextareaNode,
  _context: TailwindRenderContext,
): string {
  const props = node.props as Record<string, unknown>;
  const classes =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical';
  const rows = (props.rows as number) || 4;
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const placeholder = props.placeholder
    ? ` placeholder="${escapeHtml(props.placeholder as string)}"`
    : '';
  const value = (props.value as string) || '';

  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml(value)}</textarea>`;
}
