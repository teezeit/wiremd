import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type NavNode = Extract<WiremdNode, { type: 'nav' }>;

export function renderNavHTML(node: NavNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'nav', node.props);
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n    ');

  return `<nav class="${classes}"${sourceLine(node)}>
  <div class="${prefix}nav-content">
    ${childrenHTML}
  </div>
</nav>`;
}
