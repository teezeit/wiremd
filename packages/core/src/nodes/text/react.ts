import type { WiremdNode } from '../../types.js';
import { type ReactRenderContext, escapeJSX } from '../../renderer/react-renderer.js';

type TextNode = Extract<WiremdNode, { type: 'text' }>;

export function renderTextReact(node: TextNode, _context: ReactRenderContext, _indent = 0): string {
  return escapeJSX(node.content || '');
}
