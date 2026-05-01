import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type BrandNode = Extract<WiremdNode, { type: 'brand' }>;

export function renderBrandReact(
  node: BrandNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'brand', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  const childrenJSX = (node.children || [])
    .map((child) => renderNode(child, context, 0))
    .join('');

  return `${indentStr}<div ${classAttr}="${classes}">${childrenJSX}</div>`;
}
