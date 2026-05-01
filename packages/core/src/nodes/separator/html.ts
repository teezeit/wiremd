import type { WiremdNode } from '../../types.js';
import { type RenderContext, buildClasses } from '../../renderer/html-renderer.js';

type SeparatorNode = Extract<WiremdNode, { type: 'separator' }>;

export function renderSeparatorHTML(node: SeparatorNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'separator', node.props);

  return `<hr class="${classes}" />`;
}
