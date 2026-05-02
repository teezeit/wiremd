import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type SelectNode = Extract<WiremdNode, { type: 'select' }>;

export function renderSelectTailwind(node: SelectNode, _context: TailwindRenderContext): string {
  const props = node.props as Record<string, unknown>;
  const hasLinkedOptions = (node.options || []).some((opt) => Boolean(opt.href));
  const hasActionOptions = !hasLinkedOptions && (node.options || []).some((opt) => Boolean(opt.action));
  const classes =
    `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent${hasLinkedOptions ? ' wmd-navigation-select' : hasActionOptions ? ' wmd-action-select' : ''}`;
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const multiple = props.multiple ? ' multiple' : '';
  const navigationHandler = hasLinkedOptions
    ? ' onchange="if (this.value) window.location.href = this.value"'
    : '';

  const optionsHTML = (node.options || [])
    .map((opt) => {
      const selected = opt.selected ? ' selected' : '';
      const value = hasLinkedOptions ? (opt.href || '') : opt.value;
      const href = opt.href ? ` data-href="${escapeHtml(opt.href)}"` : '';
      const action = opt.action ? ` data-action="${escapeHtml(opt.action)}"` : '';
      return `<option value="${escapeHtml(value)}"${selected}${href}${action}>${escapeHtml(opt.label)}</option>`;
    })
    .join('\n    ');

  const placeholder = props.placeholder as string | undefined;
  const placeholderOption = placeholder
    ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>\n    `
    : '';

  return `<select class="${classes}"${required}${disabled}${multiple}${navigationHandler}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}
