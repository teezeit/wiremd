/**
 * Tailwind CSS Renderer for wiremd AST nodes
 * Converts AST nodes to HTML with Tailwind utility classes
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { WiremdNode } from '../types.js';
import { getNodeDefinition } from '../nodes/_registry.js';

export interface TailwindRenderContext {
  pretty: boolean;
  // Mutable counter for deterministic radio-group names; see html-renderer
  // for the rationale. Initialised by renderToTailwind.
  _radioGroupCounter?: { value: number };
}

/** Mint the next deterministic radio-group name. */
function nextRadioGroupName(context: TailwindRenderContext): string {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}

/**
 * If `children` contains any `radio` nodes, return a copy where every radio
 * shares a freshly-minted group name. Mirror of the helper in html-renderer.
 */
export function applyRadioGroupName(children: any[], context: TailwindRenderContext): any[] {
  if (!children || children.length === 0) return children;
  const hasRadio = children.some((c: any) => c && c.type === 'radio');
  if (!hasRadio) return children;
  const name = nextRadioGroupName(context);
  return children.map((c: any) => {
    if (!c || c.type !== 'radio') return c;
    if (c.props && c.props.name) return c;
    return { ...c, props: { ...(c.props || {}), name } };
  });
}

/**
 * Render a wiremd AST node to HTML with Tailwind classes
 */
export function renderNode(node: WiremdNode, context: TailwindRenderContext): string {
  if (node == null) return '';
  // Registry-first dispatch: migrated node types are handled here.
  const def = getNodeDefinition(node.type);
  if (def?.render?.tailwind) {
    return def.render.tailwind(node as never, context);
  }
  switch (node.type) {
    case 'input':
      return renderInput(node, context);

    case 'textarea':
      return renderTextarea(node, context);

    case 'select':
      return renderSelect(node, context);

    case 'checkbox':
      return renderCheckbox(node, context);

    case 'radio':
      return renderRadio(node, context);

    case 'radio-group':
      return renderRadioGroup(node, context);

    case 'badge':
      return renderBadge(node);

    case 'separator':
      return renderSeparator();

    case 'comment':
      return '';

    default:
      return `<!-- Unknown node type: ${(node as any).type} -->`;
  }
}

function renderBadge(node: any): string {
  const variant = node.props.variant;
  const nodeClasses = node.props.classes || [];
  let classes = 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium';

  if (variant === 'primary' || nodeClasses.includes('primary')) {
    classes += ' bg-blue-100 text-blue-800';
  } else if (variant === 'success' || nodeClasses.includes('success')) {
    classes += ' bg-green-100 text-green-800';
  } else if (variant === 'warning' || nodeClasses.includes('warning')) {
    classes += ' bg-yellow-100 text-yellow-800';
  } else if (variant === 'error' || nodeClasses.includes('error')) {
    classes += ' bg-red-100 text-red-800';
  } else {
    classes += ' bg-gray-100 text-gray-800';
  }

  return `<span class="${classes}">${escapeHtml(node.content)}</span>`;
}

function renderInput(node: any, _context: TailwindRenderContext): string {
  const classes = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
  const type = node.props.inputType || node.props.type || 'text';
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const placeholder = node.props.placeholder ? ` placeholder="${escapeHtml(node.props.placeholder)}"` : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled} />`;
}

function renderTextarea(node: any, _context: TailwindRenderContext): string {
  const classes = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical';
  const rows = node.props.rows || 4;
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const placeholder = node.props.placeholder ? ` placeholder="${escapeHtml(node.props.placeholder)}"` : '';
  const value = node.props.value || '';

  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml(value)}</textarea>`;
}

function renderSelect(node: any, _context: TailwindRenderContext): string {
  const classes = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
  const required = node.props.required ? ' required' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const multiple = node.props.multiple ? ' multiple' : '';

  const optionsHTML = (node.options || []).map((opt: any) => {
    const selected = opt.selected ? ' selected' : '';
    return `<option value="${escapeHtml(opt.value)}"${selected}>${escapeHtml(opt.label)}</option>`;
  }).join('\n    ');

  const placeholder = node.props.placeholder;
  const placeholderOption = placeholder
    ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>\n    `
    : '';

  return `<select class="${classes}"${required}${disabled}${multiple}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}

function renderCheckbox(node: any, context: TailwindRenderContext): string {
  const classes = 'flex items-center gap-2 cursor-pointer';
  const checked = node.checked ? ' checked' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  const labelHTML = node.children
    ? node.children.map((child: any) => renderNode(child, context)).join('')
    : escapeHtml(node.label);

  return `<label class="${classes}">
    <input type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"${checked}${disabled}${value} />
    <span class="text-gray-900">${labelHTML}</span>
  </label>`;
}

function renderRadio(node: any, _context: TailwindRenderContext): string {
  const classes = 'flex items-center gap-2 cursor-pointer';
  const checked = node.selected ? ' checked' : '';
  const disabled = node.props.disabled ? ' disabled' : '';
  const name = node.props.name ? ` name="${escapeHtml(node.props.name)}"` : '';
  const value = node.props.value ? ` value="${escapeHtml(node.props.value)}"` : '';

  return `<label class="${classes}">
    <input type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"${checked}${disabled}${name}${value} />
    <span class="text-gray-900">${escapeHtml(node.label)}</span>
  </label>`;
}

function renderRadioGroup(node: any, context: TailwindRenderContext): string {
  const isInline = node.props?.inline;
  const classes = isInline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2';

  const groupName = node.name || nextRadioGroupName(context);

  const radios = (node.children || []).map((child: any) => {
    if (child.type === 'radio') {
      if (child.props && child.props.name) return renderNode(child, context);
      const modifiedChild = { ...child, props: { ...child.props, name: groupName } };
      return renderNode(modifiedChild, context);
    }
    return renderNode(child, context);
  }).join('\n    ');

  return `<div class="${classes}">
    ${radios}
</div>`;
}

function renderSeparator(): string {
  const classes = 'border-t border-gray-300 my-8';

  return `<hr class="${classes}" />`;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  if (!text) return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
