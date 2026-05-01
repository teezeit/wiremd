import type { WiremdNode } from '../../types.js';
import {
  type ReactRenderContext,
  buildClasses,
  escapeJSX,
  repeatString,
} from '../../renderer/react-renderer.js';

type ImageNode = Extract<WiremdNode, { type: 'image' }>;

export function renderImageReact(
  node: ImageNode,
  context: ReactRenderContext,
  indent = 0,
): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'image', node.props);
  const src = node.src || '';
  const alt = node.alt || '';
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.width) attrs.push(`width="${node.props.width}"`);
  if (node.props.height) attrs.push(`height="${node.props.height}"`);

  return `${indentStr}<img src="${escapeJSX(src)}" alt="${escapeJSX(alt)}" ${classAttr}="${classes}" ${attrs.join(' ')} />`;
}
