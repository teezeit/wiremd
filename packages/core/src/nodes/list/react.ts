import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  applyRadioGroupName,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type ListNode = Extract<WiremdNode, { type: 'list' }>;

export function renderListReact(node: ListNode, context: ReactRenderContext, indent = 0): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'list', node.props);
  const tag = node.ordered ? 'ol' : 'ul';
  const classAttr = context.useClassName ? 'className' : 'class';
  const children = applyRadioGroupName(node.children || [], context);
  const childrenJSX = children.map((child) => renderNode(child, context, indent + 1)).join('\n');

  return `${indentStr}<${tag} ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</${tag}>`;
}
