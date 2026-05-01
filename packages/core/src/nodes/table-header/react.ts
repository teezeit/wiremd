import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type TableHeaderNode = Extract<WiremdNode, { type: 'table-header' }>;

export function renderTableHeaderReact(
  node: TableHeaderNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const cellsJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 2))
    .join('\n');

  return `${indentStr}  <thead>
${indentStr}    <tr>
${cellsJSX}
${indentStr}    </tr>
${indentStr}  </thead>`;
}
