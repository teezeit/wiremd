import type { WiremdNode } from '../../types.js';
import type { RenderContext } from '../../renderer/html-renderer.js';
import { escapeHtml, renderChildrenList, renderNode, sourceLine } from '../../renderer/html-renderer.js';

type AccordionItemNode = Extract<WiremdNode, { type: 'accordion-item' }>;

export function renderAccordionItemHTML(node: AccordionItemNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const openAttr = node.expanded ? ' open' : '';
  const bodyContent = renderChildrenList(node.children || [], context);
  const summaryHTML = node.summaryChildren?.length
    ? node.summaryChildren.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.summary);
  return `<details class="${prefix}accordion-item"${openAttr}${sourceLine(node)}>
  <summary class="${prefix}accordion-summary">${summaryHTML}</summary>
  <div class="${prefix}accordion-body">
  ${bodyContent}
  </div>
</details>`;
}
