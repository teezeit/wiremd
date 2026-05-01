import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderNode,
} from '../../renderer/html-renderer.js';

type BrandNode = Extract<WiremdNode, { type: 'brand' }>;

export function renderBrandHTML(node: BrandNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'brand', node.props);
  const childrenHTML = (node.children || []).map((child) => renderNode(child, context)).join('');

  return `<div class="${classes}">${childrenHTML}</div>`;
}
