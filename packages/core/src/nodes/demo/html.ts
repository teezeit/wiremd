import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type DemoNode = Extract<WiremdNode, { type: 'demo' }>;

export function renderDemoHTML(node: DemoNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const previewHTML = (node.children || []).map((child) => renderNode(child, context)).join('\n');
  const codeHTML = escapeHtml(node.raw || '');
  return `<div class="${prefix}demo">
  <div class="${prefix}demo-preview">${previewHTML}</div>
  <div class="${prefix}demo-code">
    <div class="${prefix}demo-code-toolbar">
      <button class="${prefix}demo-copy" onclick="(function(btn){var code=btn.closest('.${prefix}demo-code').querySelector('code');navigator.clipboard.writeText(code.textContent).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1500)})})(this)">Copy</button>
    </div>
    <pre><code>${codeHTML}</code></pre>
  </div>
</div>`;
}
