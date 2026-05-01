import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type ListItemNode = Extract<WiremdNode, { type: 'list-item' }>;

export function renderListItemHTML(node: ListItemNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'list-item', node.props);

  let html = '';
  // Immediate text content (if the parser put it on `content`).
  if (node.content) {
    html = escapeHtml(node.content);
  }
  // Children may include nested lists, icons, etc.
  if (node.children) {
    html += node.children.map((child) => renderNode(child, context)).join('');
  }

  return `<li class="${classes}">${html}</li>`;
}
