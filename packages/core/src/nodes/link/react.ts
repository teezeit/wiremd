import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type LinkNode = Extract<WiremdNode, { type: 'link' }>;

export function renderLinkReact(node: LinkNode, context: ReactRenderContext, indent = 0): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'link', node.props);
  const href = node.href || '#';
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.title) attrs.push(`title="${escapeJSX(node.title)}"`);

  const childrenJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content || '');

  return `${indentStr}<a href="${escapeJSX(href)}" ${classAttr}="${classes}" ${attrs.join(' ')}>${childrenJSX}</a>`;
}
