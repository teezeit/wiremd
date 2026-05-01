import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type BlockquoteNode = Extract<WiremdNode, { type: 'blockquote' }>;

export function renderBlockquoteHTML(node: BlockquoteNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'blockquote', node.props);
  const childrenHTML = (node.children || [])
    .map((child) => renderNode(child, context))
    .join('\n  ');

  return `<blockquote class="${classes}"${sourceLine(node)}>
  ${childrenHTML}
</blockquote>`;
}
