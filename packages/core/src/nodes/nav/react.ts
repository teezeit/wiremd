import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type NavNode = Extract<WiremdNode, { type: 'nav' }>;

export function renderNavReact(node: NavNode, context: ReactRenderContext, indent = 0): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'nav', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  const childrenJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 2))
    .join('\n');

  return `${indentStr}<nav ${classAttr}="${classes}">
${indentStr}  <div ${classAttr}="${prefix}nav-content">
${childrenJSX}
${indentStr}  </div>
${indentStr}</nav>`;
}
