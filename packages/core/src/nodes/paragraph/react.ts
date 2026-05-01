import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type ParagraphNode = Extract<WiremdNode, { type: 'paragraph' }>;

export function renderParagraphReact(
  node: ParagraphNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'paragraph', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const childrenJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : node.content
      ? escapeJSX(node.content)
      : '';

  return `${indentStr}<p ${classAttr}="${classes}">${childrenJSX}</p>`;
}
