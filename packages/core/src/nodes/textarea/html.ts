import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type TextareaNode = Extract<WiremdNode, { type: 'textarea' }>;

export function renderTextareaHTML(node: TextareaNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'textarea', props);
  const rows = (props.rows as number) || 4;
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const placeholder = props.placeholder
    ? ` placeholder="${escapeHtml(props.placeholder as string)}"`
    : '';
  const value = (props.value as string) || '';

  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml(value)}</textarea>`;
}
