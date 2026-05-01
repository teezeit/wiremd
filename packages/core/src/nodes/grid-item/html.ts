import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderChildrenList,
} from '../../renderer/html-renderer.js';

type GridItemNode = Extract<WiremdNode, { type: 'grid-item' }>;

export function renderGridItemHTML(node: GridItemNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  // The transformer stores 'card' in node.props.classes for card grids;
  // detect it there and append 'grid-item-card' so the legacy CSS hooks fire.
  const propsClasses: string[] = (node.props?.classes as string[] | undefined) || [];
  const hasCard = propsClasses.includes('card');
  const extraClasses = hasCard ? [...propsClasses, 'grid-item-card'] : propsClasses;
  const itemProps = { ...node.props, classes: extraClasses };
  const classes = buildClasses(prefix, 'grid-item', itemProps);
  const childrenHTML = renderChildrenList(node.children || [], context);

  return `<div class="${classes}">
    ${childrenHTML}
  </div>`;
}
