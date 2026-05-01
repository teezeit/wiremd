import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderChildrenList,
  sourceLine,
} from '../../renderer/html-renderer.js';

type RowNode = Extract<WiremdNode, { type: 'row' }>;

export function renderRowHTML(node: RowNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'row', node.props);
  const childrenHTML = renderChildrenList(node.children || [], context);

  return `<div class="${classes}"${sourceLine(node)}>
  ${childrenHTML}
</div>`;
}
