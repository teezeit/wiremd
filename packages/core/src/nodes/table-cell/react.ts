import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type TableCellNode = Extract<WiremdNode, { type: 'table-cell' }>;

export function renderTableCellReact(
  node: TableCellNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const tag = node.header ? 'th' : 'td';
  const align = node.align || 'left';
  const classes = buildClasses(prefix, `table-cell ${prefix}align-${align}`, {});
  const classAttr = context.useClassName ? 'className' : 'class';

  const contentJSX =
    node.children && node.children.length > 0
      ? node.children.map((child) => renderNode(child, context, 0)).join('')
      : escapeJSX(node.content || '');

  return `${indentStr}      <${tag} ${classAttr}="${classes}">${contentJSX}</${tag}>`;
}
