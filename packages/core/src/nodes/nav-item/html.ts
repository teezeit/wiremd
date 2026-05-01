import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
} from '../../renderer/html-renderer.js';

type NavItemNode = Extract<WiremdNode, { type: 'nav-item' }>;

export function renderNavItemHTML(node: NavItemNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const href = node.href || '#';
  const isActive = Array.isArray(props.classes) && (props.classes as string[]).includes('active');
  const ariaCurrent = isActive ? ' aria-current="page"' : '';

  const contentHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content ?? '');

  if (props.variant === 'primary') {
    const classes = `${buildClasses(prefix, 'button', props)} ${prefix}button-primary`;
    return `<a href="${href}"${ariaCurrent} class="${classes.trim()}" style="text-decoration:none;color:inherit;">${contentHTML}</a>`;
  }

  const classes = buildClasses(prefix, 'nav-item', props);
  return `<a href="${href}"${ariaCurrent} class="${classes}">${contentHTML}</a>`;
}
