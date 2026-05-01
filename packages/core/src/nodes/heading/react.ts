import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type HeadingNode = Extract<WiremdNode, { type: 'heading' }>;

export function renderHeadingReact(
  node: HeadingNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const level = node.level || 1;
  const classes = buildClasses(prefix, `h${level}`, node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const childrenJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content || '');

  const tag = `h${level}`;
  return `${indentStr}<${tag} ${classAttr}="${classes}">${childrenJSX}</${tag}>`;
}
