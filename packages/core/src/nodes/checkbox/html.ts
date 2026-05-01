import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type CheckboxNode = Extract<WiremdNode, { type: 'checkbox' }>;

export function renderCheckboxHTML(node: CheckboxNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'checkbox', props);
  const checked = node.checked ? ' checked' : '';
  const disabled = props.disabled ? ' disabled' : '';
  const value = props.value ? ` value="${escapeHtml(props.value as string)}"` : '';

  // Separate inline children (icons/text) from nested children (lists).
  let labelHTML = escapeHtml(node.label || '');
  let nestedHTML = '';

  if (node.children) {
    const inlineChildren: WiremdNode[] = [];
    const nestedChildren: WiremdNode[] = [];

    for (const child of node.children) {
      if (child.type === 'list') {
        nestedChildren.push(child);
      } else {
        inlineChildren.push(child);
      }
    }

    if (inlineChildren.length > 0) {
      labelHTML = inlineChildren.map((child) => renderNode(child, context)).join('');
    }

    if (nestedChildren.length > 0) {
      nestedHTML = nestedChildren.map((child) => renderNode(child, context)).join('');
    }
  }

  return `<label class="${classes}">
    <input type="checkbox"${checked}${disabled}${value} />
    <span>${labelHTML}</span>
  </label>${nestedHTML}`;
}
