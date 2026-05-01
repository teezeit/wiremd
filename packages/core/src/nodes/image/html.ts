import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type ImageNode = Extract<WiremdNode, { type: 'image' }>;

export function renderImageHTML(node: ImageNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'image', node.props);
  const src = node.src || '';
  const alt = node.alt || '';
  const width = node.props.width ? ` width="${node.props.width}"` : '';
  const height = node.props.height ? ` height="${node.props.height}"` : '';

  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${classes}"${width}${height} />`;
}
