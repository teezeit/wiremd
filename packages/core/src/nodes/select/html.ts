import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type SelectNode = Extract<WiremdNode, { type: 'select' }>;

export function renderSelectHTML(node: SelectNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'select', props);
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
