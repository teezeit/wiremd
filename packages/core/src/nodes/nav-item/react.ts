import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type NavItemNode = Extract<WiremdNode, { type: 'nav-item' }>;

export function renderNavItemReact(
  node: NavItemNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'nav-item', props);
  const href = node.href || '#';
  const classAttr = context.useClassName ? 'className' : 'class';
  const isActive = Array.isArray(props.classes) && (props.classes as string[]).includes('active');
  const ariaCurrent = isActive ? ' aria-current="page"' : '';

  const contentJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content ?? '');

  return `${indentStr}<a href="${href}"${ariaCurrent} ${classAttr}="${classes}">${contentJSX}</a>`;
}
