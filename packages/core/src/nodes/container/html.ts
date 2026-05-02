/**
 * Container — HTML render.
 *
 * Container subtypes include hero, card, modal, sidebar, footer, alert,
 * grid, layout, section, and form-group. The `layout` subtype with the
 * `sidebar-main` class triggers a custom two-column extractor that
 * groups child nodes into named sections.
 *
 * Migrated from src/renderer/html-renderer.ts.
 */

import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  renderChildrenList,
  sourceLine,
} from '../../renderer/html-renderer.js';

type ContainerNode = Extract<WiremdNode, { type: 'container' }>;

export function renderContainerHTML(node: ContainerNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, `container-${node.containerType}`, node.props);

  const nodeClasses: string[] = (node.props?.classes as string[] | undefined) || [];
  if (node.containerType === 'layout' && nodeClasses.includes('sidebar-main')) {
    return renderSidebarMainLayout(node, context, classes);
  }

  const childrenHTML = renderChildrenList(node.children || [], context);

  return `<div class="${classes}"${sourceLine(node)}>
  ${childrenHTML}
</div>`;
}

function renderSidebarMainLayout(
  node: ContainerNode,
  context: RenderContext,
  classes: string,
): string {
  const { classPrefix: prefix } = context;
  const children = (node.children || []) as Array<Record<string, unknown>>;

  const sections: { name: string; nodes: WiremdNode[] }[] = [];
  let current: { name: string; nodes: WiremdNode[] } | null = null;

  for (const child of children) {
    if (
      child.type === 'container' &&
      ((child as { containerType?: string }).containerType === 'sidebar' ||
        (child as { containerType?: string }).containerType === 'main')
    ) {
      if (current) sections.push(current);
      sections.push({
        name: (child as { containerType: string }).containerType,
        nodes: ((child as { children?: WiremdNode[] }).children || []) as WiremdNode[],
      });
      current = null;
    } else {
      const childClasses: string[] =
        (child.props as { classes?: string[] } | undefined)?.classes || [];
      if (
        child.type === 'heading' &&
        (childClasses.includes('sidebar') || childClasses.includes('main'))
      ) {
        if (current) sections.push(current);
        current = { name: childClasses.includes('sidebar') ? 'sidebar' : 'main', nodes: [] };
      } else if (current) {
        current.nodes.push(child as unknown as WiremdNode);
      }
    }
  }
  if (current) sections.push(current);

  const sectionsHTML = sections
    .map((s) => {
      const contentHTML = renderChildrenList(s.nodes, context);
      return `  <div class="${prefix}layout-${s.name}">
    ${contentHTML}
  </div>`;
    })
    .join('\n');

  return `<div class="${classes}">
${sectionsHTML}
</div>`;
}
