import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderChildrenList,
  sourceLine,
} from '../../renderer/html-renderer.js';

type GridNode = Extract<WiremdNode, { type: 'grid' }>;

export function renderGridHTML(node: GridNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'grid', node.props);
  const columns = node.columns || 3;
  const gridClass = `${classes} ${prefix}grid-${columns}`;
  // renderChildrenList intercepts comment nodes so they wrap the next grid-item
  // as a whole (wmd-annotated wraps the full grid-item div, not a child inside).
  const childrenHTML = renderChildrenList(node.children || [], context);

  return `<div class="${gridClass}"${sourceLine(node)} style="--grid-columns: ${columns}">
  ${childrenHTML}
</div>`;
}
