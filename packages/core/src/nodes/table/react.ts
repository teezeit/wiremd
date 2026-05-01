import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type TableNode = Extract<WiremdNode, { type: 'table' }>;

export function renderTableReact(
  node: TableNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'table', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const headerNode = node.children?.find((child) => child.type === 'table-header');
  const rowNodes = node.children?.filter((child) => child.type === 'table-row') || [];

  const headerJSX = headerNode ? renderNode(headerNode, context, indent + 1) : '';
  const rowsJSX = rowNodes.map((child) => renderNode(child, context, indent + 2)).join('\n');
  const bodyJSX = rowsJSX
    ? `\n${indentStr}  <tbody>\n${rowsJSX}\n${indentStr}  </tbody>`
    : '';

  return `${indentStr}<table ${classAttr}="${classes}">
${headerJSX}${bodyJSX}
${indentStr}</table>`;
}
