import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type ImageNode = Extract<WiremdNode, { type: 'image' }>;

export function renderImageTailwind(node: ImageNode, _context: TailwindRenderContext): string {
  const classes = 'max-w-full h-auto rounded-lg shadow-md';
  const src = node.src || '';
  const alt = node.alt || '';

  const attrs: string[] = [];
  if (node.props.width) attrs.push(`width="${node.props.width}"`);
  if (node.props.height) attrs.push(`height="${node.props.height}"`);

  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${classes}" ${attrs.join(' ')} />`;
}
