import type { WiremdNode } from '../../types.js';
import { type RenderContext, buildClasses } from '../../renderer/html-renderer.js';
import { ICON_MAP_FULL, SOCIAL_ICONS } from './_iconmap.js';

type IconNode = Extract<WiremdNode, { type: 'icon' }>;

export function renderIconHTML(node: IconNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'icon', node.props);
  const iconName = node.props.name || 'default';

  const iconContent = ICON_MAP_FULL[iconName] || ICON_MAP_FULL['default'];

  // Social media icons get a font-styling override to render glyph approximations cleanly.
  if (SOCIAL_ICONS.includes(iconName)) {
    return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}" style="font-family: monospace; font-weight: bold; font-style: normal;">${iconContent}</span>`;
  }

  return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}
