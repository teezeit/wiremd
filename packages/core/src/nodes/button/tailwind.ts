/**
 * Button — Tailwind render.
 *
 * Migrated from src/renderer/tailwind-renderer.ts. Tailwind output is
 * utility-class-driven; structure stays a <button> with no href branch
 * (legacy parity — Tailwind renderer never emitted <a> for buttons).
 */

import type { WiremdNode } from '../../types.js';
import {
  type TailwindRenderContext,
  escapeHtml,
  renderNode,
} from '../../renderer/tailwind-renderer.js';

type ButtonNode = Extract<WiremdNode, { type: 'button' }>;

export function renderButtonTailwind(node: ButtonNode, context: TailwindRenderContext): string {
  let classes = 'px-4 py-2 rounded-md font-medium transition-colors';

  const props = node.props as Record<string, unknown>;
  const variant = props.variant as string | undefined;
  const nodeClasses = (props.classes as string[] | undefined) || [];
  const isPrimary = variant === 'primary' || nodeClasses.includes('primary');
  const isSecondary = variant === 'secondary' || nodeClasses.includes('secondary');
  const isDanger = variant === 'danger' || nodeClasses.includes('danger');

  if (isPrimary) {
    classes += ' bg-indigo-600 text-white hover:bg-indigo-700';
  } else if (isSecondary) {
    classes += ' bg-gray-200 text-gray-900 hover:bg-gray-300';
  } else if (isDanger) {
    classes += ' bg-red-600 text-white hover:bg-red-700';
  } else {
    classes += ' bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300';
  }

  const isDisabled = props.state === 'disabled' || props.disabled;
  const isLoading = props.state === 'loading' || (props as { loading?: unknown }).loading;
  if (isDisabled) {
    classes += ' opacity-50 cursor-not-allowed';
  } else if (isLoading) {
    classes += ' opacity-75 cursor-wait';
  }

  const disabled = isDisabled ? ' disabled' : '';

  const contentHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content ?? '');

  return `<button class="${classes}"${disabled}>${contentHTML}</button>`;
}
