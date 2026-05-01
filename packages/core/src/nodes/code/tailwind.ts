import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type CodeNode = Extract<WiremdNode, { type: 'code' }>;

export function renderCodeTailwind(node: CodeNode, _context: TailwindRenderContext): string {
  const inline = node.inline !== false;

  if (inline) {
    const classes = 'bg-gray-100 text-indigo-600 rounded px-2 py-1 font-mono text-sm';
    return `<code class="${classes}">${escapeHtml(node.value)}</code>`;
  }
  const classes = 'bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto';
  const dataLang = node.lang ? ` data-lang="${escapeHtml(node.lang)}"` : '';
  return `<pre class="${classes}"><code class="font-mono text-sm"${dataLang}>${escapeHtml(node.value)}</code></pre>`;
}
