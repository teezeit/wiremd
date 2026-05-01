import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type ListItemNode = Extract<WiremdNode, { type: 'list-item' }>;

export function renderListItemReact(
  node: ListItemNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'list-item', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const childrenJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content || '');

  return `${indentStr}<li ${classAttr}="${classes}">${childrenJSX}</li>`;
}
