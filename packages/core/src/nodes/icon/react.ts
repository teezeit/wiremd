import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  repeatString,
} from '../../renderer/react-renderer.js';
import { ICON_MAP_SMALL } from './_iconmap.js';

type IconNode = Extract<WiremdNode, { type: 'icon' }>;

export function renderIconReact(
  node: IconNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'icon', node.props);
  const iconName = node.props.name || 'default';
  const classAttr = context.useClassName ? 'className' : 'class';

  const iconContent = ICON_MAP_SMALL[iconName] || ICON_MAP_SMALL['default'];

  return `${indentStr}<span ${classAttr}="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}
