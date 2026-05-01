/**
 * Container — React/JSX render.
 * Migrated from src/renderer/react-renderer.ts.
 */

import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type ContainerNode = Extract<WiremdNode, { type: 'container' }>;

export function renderContainerReact(
  node: ContainerNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, `container-${node.containerType}`, node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  const childrenJSX = (node.children || [])
    .map((child) => renderNode(child, context, indent + 1))
    .join('\n');

  return `${indentStr}<div ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</div>`;
}
