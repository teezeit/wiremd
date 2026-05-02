import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  repeatString,
} from '../../renderer/react-renderer.js';
import { renderTablerIcon } from './_iconmap.js';

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

  return `${indentStr}${renderTablerIcon(iconName, classes, { classAttribute: classAttr, react: true })}`;
}
