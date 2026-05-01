import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type GridNode = Extract<WiremdNode, { type: 'grid' }>;

export function renderGridReact(node: GridNode, context: ReactRenderContext, indent = 0): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'grid', node.props);
  const columns = node.columns || 3;
  const gridClass = `${classes} ${prefix}grid-${columns}`;
  const classAttr = context.useClassName ? 'className' : 'class';
  const childrenJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 1))
    .join('\n');

  return `${indentStr}<div ${classAttr}="${gridClass}" style={{ '--grid-columns': ${columns} }${context.typescript ? ' as React.CSSProperties' : ''}}>
${childrenJSX}
${indentStr}</div>`;
}
