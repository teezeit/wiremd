import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type InputNode = Extract<WiremdNode, { type: 'input' }>;

export function renderInputTailwind(node: InputNode, _context: TailwindRenderContext): string {
  const props = node.props as Record<string, unknown>;
  const classes =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
  const type = (props.inputType as string) || (props.type as string) || 'text';
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const placeholder = props.placeholder
    ? ` placeholder="${escapeHtml(props.placeholder as string)}"`
    : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled} />`;
}
