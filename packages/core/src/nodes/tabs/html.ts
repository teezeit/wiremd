import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderChildrenList,
  sourceLine,
} from '../../renderer/html-renderer.js';

type TabsNode = Extract<WiremdNode, { type: 'tabs' }>;

export function renderTabsHTML(node: TabsNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'tabs', node.props);
  const tabs = (node.children || []) as Array<{
    children?: WiremdNode[];
    label?: string;
    active?: boolean;
  }>;

  // Render panels first so we know which ones contain comment annotations.
  const renderedPanels = tabs.map((tab, i) => {
    const commentsBefore = context._comments?.length ?? 0;
    const panelChildren = renderChildrenList(tab.children || [], context);
    const hasAnnotations =
      context.showComments && (context._comments?.length ?? 0) > commentsBefore;
    const hidden = tab.active ? '' : ' hidden';
    return {
      html: `<div class="${prefix}tab-panel" role="tabpanel" data-wmd-tab-panel="${i}"${hidden}>
    ${panelChildren}
  </div>`,
      hasAnnotations,
    };
  });

  const headers = tabs
    .map((tab, i) => {
      const activeClass = tab.active ? ` ${prefix}active` : '';
      const annotatedClass = renderedPanels[i].hasAnnotations
        ? ` ${prefix}tab-header-annotated`
        : '';
      return `<button type="button" role="tab" class="${prefix}tab-header${activeClass}${annotatedClass}" data-wmd-tab="${i}">${escapeHtml(tab.label || '')}</button>`;
    })
    .join('');

  const panels = renderedPanels.map((r) => r.html).join('\n  ');

  return `<div class="${classes}"${sourceLine(node)} data-wmd-tabs>
  <div class="${prefix}tab-headers" role="tablist">${headers}</div>
  <div class="${prefix}tab-panels">
  ${panels}
  </div>
</div>${getTabsScript(prefix)}`;
}

function getTabsScript(prefix: string): string {
  return `<script>(function(){if(window.__wmdTabsInit)return;window.__wmdTabsInit=true;document.addEventListener('click',function(e){var btn=e.target.closest('.${prefix}tab-header');if(!btn)return;var root=btn.closest('[data-wmd-tabs]');if(!root)return;var idx=btn.getAttribute('data-wmd-tab');root.querySelectorAll('.${prefix}tab-header').forEach(function(b){b.classList.toggle('${prefix}active',b.getAttribute('data-wmd-tab')===idx);});root.querySelectorAll('[data-wmd-tab-panel]').forEach(function(p){if(p.getAttribute('data-wmd-tab-panel')===idx){p.removeAttribute('hidden');}else{p.setAttribute('hidden','');}});});})();</script>`;
}
