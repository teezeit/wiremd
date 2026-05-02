import type { WiremdNode } from '../../types.js';
import type { TailwindRenderContext } from '../../renderer/tailwind-renderer.js';
import { renderTablerIcon } from './_iconmap.js';

type IconNode = Extract<WiremdNode, { type: 'icon' }>;

export function renderIconTailwind(node: IconNode, _context: TailwindRenderContext): string {
  const classes = 'inline-block align-middle';
  const iconName = node.props.name || 'default';

  return renderTablerIcon(iconName, classes);
}
