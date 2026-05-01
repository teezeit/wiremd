import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type SelectNode = Extract<WiremdNode, { type: 'select' }>;

export function renderSelectReact(
  node: SelectNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'select', props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.required) attrs.push('required');
  if (props.disabled) attrs.push('disabled');
  if (props.multiple) attrs.push('multiple');

  const optionsJSX = (node.options || [])
    .map((opt) => {
      const selected = opt.selected ? ' defaultSelected' : '';
      return `    <option value="${escapeJSX(opt.value)}"${selected}>${escapeJSX(opt.label)}</option>`;
    })
    .join('\n');

  const placeholder = props.placeholder as string | undefined;
  const placeholderOption = placeholder
    ? `    <option value="" disabled defaultSelected>${escapeJSX(placeholder)}</option>\n`
    : '';

  return `${indentStr}<select ${classAttr}="${classes}" ${attrs.join(' ')}>
${placeholderOption}${optionsJSX}
${indentStr}</select>`;
}
