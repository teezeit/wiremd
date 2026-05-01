import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type InputNode = Extract<WiremdNode, { type: 'input' }>;

export function renderInputHTML(node: InputNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'input', props);
  const type = (props.inputType as string) || (props.type as string) || 'text';
  const required = props.required ? ' required' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const placeholder = props.placeholder
    ? ` placeholder="${escapeHtml(props.placeholder as string)}"`
    : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  // Each `_` in the source corresponds to roughly one ch of width.
  const style = props.width
    ? ` style="width: ${props.width}ch; max-width: ${props.width}ch;"`
    : '';

  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled}${style} />`;
}
