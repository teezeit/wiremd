import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  repeatString,
} from '../../renderer/react-renderer.js';

type SeparatorNode = Extract<WiremdNode, { type: 'separator' }>;

export function renderSeparatorReact(
  node: SeparatorNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'separator', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  return `${indentStr}<hr ${classAttr}="${classes}" />`;
}
