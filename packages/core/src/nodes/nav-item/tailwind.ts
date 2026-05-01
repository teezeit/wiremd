import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type NavItemNode = Extract<WiremdNode, { type: 'nav-item' }>;

export function renderNavItemTailwind(
  node: NavItemNode,
  context: TailwindRenderContext,
): string {
  const props = node.props as Record<string, unknown>;
  const classes =
    'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium';
  const href = node.href || '#';
  const isActive = Array.isArray(props.classes) && (props.classes as string[]).includes('active');
  const ariaCurrent = isActive ? ' aria-current="page"' : '';

  const contentHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content ?? '');

  return `<a href="${href}"${ariaCurrent} class="${classes}">${contentHTML}</a>`;
}
