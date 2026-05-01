import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type HeadingNode = Extract<WiremdNode, { type: 'heading' }>;

export function renderHeadingHTML(node: HeadingNode, context: RenderContext): string {
  if (!node.content && !node.children?.length) return '';

  const { classPrefix: prefix } = context;
  const level = node.level || 1;
  const classes = buildClasses(prefix, `h${level}`, node.props);
  const content = node.content || '';

  const childrenHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(content);

  return `<h${level} class="${classes}"${sourceLine(node)}>${childrenHTML}</h${level}>`;
}
