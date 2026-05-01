import type { WiremdNode } from '../../types.js';
import type { TailwindRenderContext } from '../../renderer/tailwind-renderer.js';

type CommentNode = Extract<WiremdNode, { type: 'comment' }>;

export function renderCommentTailwind(
  _node: CommentNode,
  _context: TailwindRenderContext,
): string {
  return '';
}
