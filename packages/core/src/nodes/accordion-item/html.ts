import type { WiremdNode } from '../../types.js';
import type { RenderContext } from '../../renderer/html-renderer.js';
import { renderChildrenList, sourceLine } from '../../renderer/html-renderer.js';

type AccordionItemNode = Extract<WiremdNode, { type: 'accordion-item' }>;

export function renderAccordionItemHTML(node: AccordionItemNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const openAttr = node.expanded ? ' open' : '';
  const bodyContent = renderChildrenList(node.children || [], context);
  return `<details class="${prefix}accordion-item"${openAttr}${sourceLine(node)}>
  <summary class="${prefix}accordion-summary">${node.summary}</summary>
  <div class="${prefix}accordion-body">
  ${bodyContent}
  </div>
</details>`;
}
