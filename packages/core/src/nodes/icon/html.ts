import type { WiremdNode } from '../../types.js';
import { type RenderContext, buildClasses } from '../../renderer/html-renderer.js';
import { renderTablerIcon } from './_iconmap.js';

type IconNode = Extract<WiremdNode, { type: 'icon' }>;

export function renderIconHTML(node: IconNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'icon', node.props);
  const iconName = node.props.name || 'default';

  return renderTablerIcon(iconName, classes);
}
