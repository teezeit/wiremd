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
  const hasLinkedOptions = (node.options || []).some((opt) => Boolean(opt.href));
  const hasActionOptions = !hasLinkedOptions && (node.options || []).some((opt) => Boolean(opt.action));
  const variantClass = hasLinkedOptions ? ` ${prefix}navigation-select` : hasActionOptions ? ` ${prefix}action-select` : '';
  const classes = `${buildClasses(prefix, 'select', props)}${variantClass}`;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (props.required) attrs.push('required');
  if (props.disabled) attrs.push('disabled');
  if (props.multiple) attrs.push('multiple');
  if (hasLinkedOptions) {
    attrs.push('onChange={(event) => { const target = event.currentTarget; if (target.value) window.location.href = target.value; }}');
  }

  const optionsJSX = (node.options || [])
    .map((opt) => {
      const selected = opt.selected ? ' defaultSelected' : '';
      const value = hasLinkedOptions ? (opt.href || '') : opt.value;
      const href = opt.href ? ` data-href="${escapeJSX(opt.href)}"` : '';
      const action = opt.action ? ` data-action="${escapeJSX(opt.action)}"` : '';
      return `    <option value="${escapeJSX(value)}"${selected}${href}${action}>${escapeJSX(opt.label)}</option>`;
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
