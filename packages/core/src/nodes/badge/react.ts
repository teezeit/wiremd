import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
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
  return `${indentStr}<span ${classAttr}="${classes}">${escapeJSX(node.content)}</span>`;
}
