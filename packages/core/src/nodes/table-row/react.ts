import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type TableRowNode = Extract<WiremdNode, { type: 'table-row' }>;

export function renderTableRowReact(
  node: TableRowNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const cellsJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 1))
    .join('\n');

  return `${indentStr}    <tr>
${cellsJSX}
${indentStr}    </tr>`;
}
