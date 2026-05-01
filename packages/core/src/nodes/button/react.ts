/**
 * Button — React/JSX render.
 *
 * Migrated from src/renderer/react-renderer.ts.
 */

import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  renderNode,
  repeatString,
} from '../../renderer/react-renderer.js';

type ButtonNode = Extract<WiremdNode, { type: 'button' }>;

export function renderButtonReact(
  node: ButtonNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'button', props);
  const disabled = props.state === 'disabled' || props.disabled;
  const classAttr = context.useClassName ? 'className' : 'class';

  const contentJSX = node.children
    ? node.children.map((child) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.content ?? '');

  return `${indentStr}<button ${classAttr}="${classes}"${disabled ? ' disabled' : ''}>\n${indentStr}  ${contentJSX}\n${indentStr}</button>`;
}
