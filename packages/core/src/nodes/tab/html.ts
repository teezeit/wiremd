import type { WiremdNode } from '../../types.js';
import { type RenderContext, renderNode } from '../../renderer/html-renderer.js';

type TabNode = Extract<WiremdNode, { type: 'tab' }>;

export function renderTabHTML(node: TabNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const hidden = node.active ? '' : ' hidden';
  const childrenHTML = (node.children || []).map((c) => renderNode(c, context)).join('');
  return `<div class="${prefix}tab-panel" role="tabpanel"${hidden}>${childrenHTML}</div>`;
}
