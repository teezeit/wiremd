import type { WiremdNode } from '../../types.js';
import type { TailwindRenderContext } from '../../renderer/tailwind-renderer.js';
import { ICON_MAP_SMALL } from './_iconmap.js';

type IconNode = Extract<WiremdNode, { type: 'icon' }>;

export function renderIconTailwind(node: IconNode, _context: TailwindRenderContext): string {
  const classes = 'inline-block align-middle';
  const iconName = node.props.name || 'default';

  const iconContent = ICON_MAP_SMALL[iconName] || ICON_MAP_SMALL['default'];

  return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}
