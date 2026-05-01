/**
 * Button — HTML render.
 *
 * Migrated from src/renderer/html-renderer.ts. Renders as <a> when an
 * href is present, otherwise as <button>. Children (e.g. icons) are
 * recursively rendered via the dispatcher; falls back to escaped
 * `content` for the simple text case.
 */

import type { WiremdNode } from '../../types.js';
import {
  type RenderContext,
  buildClasses,
  escapeHtml,
  renderNode,
  sourceLine,
} from '../../renderer/html-renderer.js';

type ButtonNode = Extract<WiremdNode, { type: 'button' }>;

export function renderButtonHTML(node: ButtonNode, context: RenderContext): string {
  const { classPrefix: prefix } = context;
  const props = node.props as Record<string, unknown>;
  const classes = buildClasses(prefix, 'button', props);
  const isDisabled = props.state === 'disabled' || props.disabled;
  const isLoading = props.state === 'loading' || (props as { loading?: unknown }).loading;
  const disabled = isDisabled ? ' disabled' : '';
  const loading = isLoading ? ` ${prefix}loading` : '';

  const contentHTML = node.children
    ? node.children.map((child) => renderNode(child, context)).join('')
    : escapeHtml(node.content ?? '');

  const href = node.href || (props.href as string | undefined);
  if (href) {
    return `<a href="${escapeHtml(href)}" class="${classes}${loading}"${sourceLine(node)}>${contentHTML}</a>`;
  }

  return `<button class="${classes}${loading}"${disabled}${sourceLine(node)}>${contentHTML}</button>`;
}
