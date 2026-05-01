import type { WiremdNode } from '../../types.js';
import { type TailwindRenderContext, escapeHtml } from '../../renderer/tailwind-renderer.js';

type BadgeNode = Extract<WiremdNode, { type: 'badge' }>;

export function renderBadgeTailwind(node: BadgeNode, _context: TailwindRenderContext): string {
  const props = node.props as Record<string, unknown>;
  const variant = props.variant as string | undefined;
  const nodeClasses = (props.classes as string[] | undefined) || [];
  let classes = 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium';

  if (variant === 'primary' || nodeClasses.includes('primary')) {
    classes += ' bg-blue-100 text-blue-800';
  } else if (variant === 'success' || nodeClasses.includes('success')) {
    classes += ' bg-green-100 text-green-800';
  } else if (variant === 'warning' || nodeClasses.includes('warning')) {
    classes += ' bg-yellow-100 text-yellow-800';
  } else if (variant === 'error' || nodeClasses.includes('error')) {
    classes += ' bg-red-100 text-red-800';
  } else {
    classes += ' bg-gray-100 text-gray-800';
  }

  return `<span class="${classes}">${escapeHtml(node.content)}</span>`;
}
