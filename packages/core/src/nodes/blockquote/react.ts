import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type BlockquoteNode = Extract<WiremdNode, { type: 'blockquote' }>;

export function renderBlockquoteReact(
  node: BlockquoteNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'blockquote', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  const childrenJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 1))
    .join('\n');

  return `${indentStr}<blockquote ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</blockquote>`;
}
