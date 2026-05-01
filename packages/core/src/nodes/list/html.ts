import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  applyRadioGroupName,
  buildClasses,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type ListNode = Extract<WiremdNode, { type: 'list' }>;

export function renderListHTML(node: ListNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'list', node.props);
  const tag = node.ordered ? 'ol' : 'ul';
  // Block-level radios (`- ( ) Option`) sit as direct children of the list;
  // the parser does not wrap them in a radio-group, so the renderer applies
  // the shared `name` here.
  const children = applyRadioGroupName(node.children || [], context);
  const childrenHTML = children.map((child) => renderNode(child, context)).join('\n  ');

  return `<${tag} class="${classes}"${sourceLine(node)}>
  ${childrenHTML}
</${tag}>`;
}
