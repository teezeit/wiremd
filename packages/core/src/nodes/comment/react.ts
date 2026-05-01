import type { WiremdNode } from '../../types.js';
import type { ReactRenderContext } from '../../renderer/react-renderer.js';

type CommentNode = Extract<WiremdNode, { type: 'comment' }>;

export function renderCommentReact(
  _node: CommentNode,
  _context: ReactRenderContext,
  _indent = 0,
): string {
  return '';
}
