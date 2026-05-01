import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type ParagraphNode = Extract<WiremdNode, { type: 'paragraph' }>;

export function renderParagraphHTML(node: ParagraphNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'paragraph', node.props);

  let childrenHTML: string;
  if (node.children) {
    childrenHTML = node.children.map((child) => renderNode(child, context)).join('');
  } else if (node.content) {
    // Pass through inline HTML (e.g. emphasized text the parser left as-is).
    const hasHtmlTags = /<[^>]+>/.test(node.content);
    childrenHTML = hasHtmlTags ? node.content : escapeHtml(node.content);
  } else {
    childrenHTML = '';
  }

  return `<p class="${classes}"${sourceLine(node)}>${childrenHTML}</p>`;
}
