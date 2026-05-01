import type { WiremdNode } from '../../types.js';
import { type RenderContext, escapeHtml } from '../../renderer/html-renderer.js';

type CommentNode = Extract<WiremdNode, { type: 'comment' }>;

export function renderCommentHTML(node: CommentNode, context: RenderContext): string {
  // Comments are skipped unless showComments is on. When `_comments` is
  // present the comment was already extracted upstream by
  // renderChildrenList (which collates them into the side-panel).
  if (!context.showComments) return '';
  if (context._comments != null) return '';
  return `<span class="${context.classPrefix}comment">${escapeHtml(node.text)}</span>`;
}
