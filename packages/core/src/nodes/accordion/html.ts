import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  sourceLine,
  renderChildrenList,
} from '../../renderer/html-renderer.js';

type AccordionNode = Extract<WiremdNode, { type: 'accordion' }>;

export function renderAccordionHTML(node: AccordionNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'accordion', node.props);
  const hasExclusive = node.props.classes?.includes('exclusive');

  const items = (node.children || []) as Array<Extract<WiremdNode, { type: 'accordion-item' }>>;
  const renderedItems = items
    .map((item) => {
      const openAttr = item.expanded ? ' open' : '';
      const bodyContent = renderChildrenList(item.children || [], context);
      return `<details class="${prefix}accordion-item"${openAttr}>
  <summary class="${prefix}accordion-summary">${item.summary}</summary>
  <div class="${prefix}accordion-body">
  ${bodyContent}
  </div>
</details>`;
    })
    .join('\n');

  const exclusiveAttr = hasExclusive ? ' data-wmd-accordion-exclusive' : '';

  return `<div class="${classes}"${sourceLine(node)} data-wmd-accordion${exclusiveAttr}>
${renderedItems}
</div>${hasExclusive ? getExclusiveScript(prefix) : ''}`;
}

function getExclusiveScript(prefix: string): string {
  return `<script>(function(){if(window.__wmdAccordionExclusiveInit)return;window.__wmdAccordionExclusiveInit=true;document.addEventListener('toggle',function(e){var details=e.target;if(!details.open)return;var root=details.closest('[data-wmd-accordion-exclusive]');if(!root)return;root.querySelectorAll('.${prefix}accordion-item').forEach(function(d){if(d!==details)d.removeAttribute('open');});},{capture:true});})();</script>`;
}
