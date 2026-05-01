import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
} from '../../renderer/html-renderer.js';

type CodeNode = Extract<WiremdNode, { type: 'code' }>;

export function renderCodeHTML(node: CodeNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const inline = node.inline !== false;

  if (inline) {
    const classes = buildClasses(prefix, 'code-inline', {});
    return `<code class="${classes}">${escapeHtml(node.value)}</code>`;
  }
  const classes = buildClasses(prefix, 'code-block', {});
  const lang = node.lang ? ` data-lang="${escapeHtml(node.lang)}"` : '';
  return `<pre class="${classes}"><code${lang}>${escapeHtml(node.value)}</code></pre>`;
}
