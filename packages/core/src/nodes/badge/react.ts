import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type BadgeNode = Extract<WiremdNode, { type: 'badge' }>;

export function renderBadgeReact(
  node: BadgeNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'badge', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  const contentJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content);
  return `${indentStr}<span ${classAttr}="${classes}">${contentJSX}</span>`;
}
