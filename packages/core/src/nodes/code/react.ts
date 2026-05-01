import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type CodeNode = Extract<WiremdNode, { type: 'code' }>;

export function renderCodeReact(node: CodeNode, context: ReactRenderContext, indent = 0): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const inline = node.inline !== false;
  const classAttr = context.useClassName ? 'className' : 'class';

  if (inline) {
    const classes = buildClasses(prefix, 'code-inline', {});
    return `${indentStr}<code ${classAttr}="${classes}">${escapeJSX(node.value)}</code>`;
  }
  const classes = buildClasses(prefix, 'code-block', {});
  const dataLang = node.lang ? ` data-lang="${escapeJSX(node.lang)}"` : '';
  return `${indentStr}<pre ${classAttr}="${classes}"><code${dataLang}>${escapeJSX(node.value)}</code></pre>`;
}
