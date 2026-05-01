import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  applyRadioGroupName,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type ListNode = Extract<WiremdNode, { type: 'list' }>;

export function renderListTailwind(node: ListNode, context: TailwindRenderContext): string {
  const classes = 'my-4 pl-6 space-y-2';
  const tag = node.ordered ? 'ol' : 'ul';
  const listStyle = node.ordered ? ' list-decimal' : ' list-disc';
  const children = applyRadioGroupName(node.children || [], context);
  const childrenHTML = children.map((child) => renderNode(child, context)).join('\n  ');

  return `<${tag} class="${classes}${listStyle}">
  ${childrenHTML}
</${tag}>`;
}
