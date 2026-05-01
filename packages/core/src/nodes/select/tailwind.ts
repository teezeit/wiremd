import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type SelectNode = Extract<WiremdNode, { type: 'select' }>;

export function renderSelectTailwind(node: SelectNode, _context: TailwindRenderContext): string {
  const props = node.props as Record<string, unknown>;
  const classes =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const multiple = props.multiple ? ' multiple' : '';

  const optionsHTML = (node.options || [])
    .map((opt) => {
      const selected = opt.selected ? ' selected' : '';
      return `<option value="${escapeHtml(opt.value)}"${selected}>${escapeHtml(opt.label)}</option>`;
    })
    .join('\n    ');

  const placeholder = props.placeholder as string | undefined;
  const placeholderOption = placeholder
    ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>\n    `
    : '';

  return `<select class="${classes}"${required}${disabled}${multiple}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}
