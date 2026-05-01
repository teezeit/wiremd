/**
 * React/JSX Renderer for wiremd AST nodes
 * Converts AST nodes to React functional components with TypeScript
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { WiremdNode } from '../types.js';
import { getNodeDefinition } from '../nodes/_registry.js';

export interface ReactRenderContext {
  classPrefix: string;
  typescript: boolean;
  useClassName: boolean; // true = className, false = class
  componentName?: string;
  // Mutable counter for deterministic radio-group names; see html-renderer
  // for the rationale. Initialised by renderToReact.
  _radioGroupCounter?: { value: number };
}

/** Mint the next deterministic radio-group name. */
function nextRadioGroupName(context: ReactRenderContext): string {
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
export function applyRadioGroupName(children: any[], context: ReactRenderContext): any[] {
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
 * Helper to repeat string (ES5 compatible)
 */
export function repeatString(str: string, count: number): string {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
}

/**
 * Render a wiremd AST node to React/JSX
 */
export function renderNode(node: WiremdNode, context: ReactRenderContext, indent = 0): string {
  if (node == null) return '';
  // Registry-first dispatch: migrated node types are handled here.
  const def = getNodeDefinition(node.type);
  if (def?.render?.react) {
    return def.render.react(node as never, context, indent);
  }
  const indentStr = repeatString('  ', indent);

  switch (node.type) {
    case 'input':
      return renderInput(node, context, indent);

    case 'textarea':
      return renderTextarea(node, context, indent);

    case 'select':
      return renderSelect(node, context, indent);

    case 'checkbox':
      return renderCheckbox(node, context, indent);

    case 'radio':
      return renderRadio(node, context, indent);

    case 'radio-group':
      return renderRadioGroup(node, context, indent);

    case 'badge':
      return renderBadge(node, context, indent);

    case 'separator':
      return renderSeparator(node, context, indent);

    case 'comment':
      return '';

    default:
      return `${indentStr}{/* Unknown node type: ${(node as any).type} */}`;
  }
}

function renderBadge(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'badge', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';
  return `${indentStr}<span ${classAttr}="${classes}">${escapeJSX(node.content)}</span>`;
}

function renderInput(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'input', node.props);
  const type = node.props.inputType || node.props.type || 'text';
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.placeholder) attrs.push(`placeholder="${escapeJSX(node.props.placeholder)}"`);
  if (node.props.value) attrs.push(`defaultValue="${escapeJSX(node.props.value)}"`);
  if (node.props.required) attrs.push('required');
  if (node.props.disabled) attrs.push('disabled');

  return `${indentStr}<input type="${type}" ${classAttr}="${classes}" ${attrs.join(' ')} />`;
}

function renderTextarea(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'textarea', node.props);
  const rows = node.props.rows || 4;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.placeholder) attrs.push(`placeholder="${escapeJSX(node.props.placeholder)}"`);
  if (node.props.required) attrs.push('required');
  if (node.props.disabled) attrs.push('disabled');

  const value = node.props.value || '';

  return `${indentStr}<textarea ${classAttr}="${classes}" rows={${rows}} ${attrs.join(' ')}>\n${indentStr}  ${escapeJSX(value)}\n${indentStr}</textarea>`;
}

function renderSelect(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'select', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.required) attrs.push('required');
  if (node.props.disabled) attrs.push('disabled');
  if (node.props.multiple) attrs.push('multiple');

  const optionsJSX = (node.options || []).map((opt: any) => {
    const selected = opt.selected ? ' defaultSelected' : '';
    return `    <option value="${escapeJSX(opt.value)}"${selected}>${escapeJSX(opt.label)}</option>`;
  }).join('\n');

  const placeholder = node.props.placeholder;
  const placeholderOption = placeholder
    ? `    <option value="" disabled defaultSelected>${escapeJSX(placeholder)}</option>\n`
    : '';

  return `${indentStr}<select ${classAttr}="${classes}" ${attrs.join(' ')}>
${placeholderOption}${optionsJSX}
${indentStr}</select>`;
}

function renderCheckbox(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'checkbox', node.props);
  const checked = node.checked;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.value) attrs.push(`value="${escapeJSX(node.props.value)}"`);
  if (node.props.disabled) attrs.push('disabled');

  const labelJSX = node.children
    ? node.children.map((child: any) => renderNode(child, context, 0)).join('')
    : escapeJSX(node.label);

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="checkbox"${checked ? ' defaultChecked' : ''} ${attrs.join(' ')} />
${indentStr}  <span>${labelJSX}</span>
${indentStr}</label>`;
}

function renderRadio(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'radio', node.props);
  const checked = node.selected;
  const classAttr = context.useClassName ? 'className' : 'class';

  const attrs: string[] = [];
  if (node.props.name) attrs.push(`name="${escapeJSX(node.props.name)}"`);
  if (node.props.value) attrs.push(`value="${escapeJSX(node.props.value)}"`);
  if (node.props.disabled) attrs.push('disabled');

  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="radio"${checked ? ' defaultChecked' : ''} ${attrs.join(' ')} />
${indentStr}  <span>${escapeJSX(node.label)}</span>
${indentStr}</label>`;
}

function renderRadioGroup(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const isInline = node.props?.inline;
  const classes = buildClasses(prefix, 'radio-group', node.props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : '';
  const classAttr = context.useClassName ? 'className' : 'class';

  const groupName = node.name || nextRadioGroupName(context);

  const radios = (node.children || []).map((child: any) => {
    if (child.type === 'radio') {
      if (child.props && child.props.name) return renderNode(child, context, indent + 1);
      const modifiedChild = { ...child, props: { ...child.props, name: groupName } };
      return renderNode(modifiedChild, context, indent + 1);
    }
    return renderNode(child, context, indent + 1);
  }).join('\n');

  return `${indentStr}<div ${classAttr}="${classes}${inlineClass}">
${radios}
${indentStr}</div>`;
}

function renderSeparator(node: any, context: ReactRenderContext, indent: number): string {
  const indentStr = repeatString('  ', indent);
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, 'separator', node.props);
  const classAttr = context.useClassName ? 'className' : 'class';

  return `${indentStr}<hr ${classAttr}="${classes}" />`;
}

/**
 * Build CSS classes string from prefix, base class, and props
 */
export function buildClasses(prefix: string, baseClass: string, props: any): string {
  const classes = [`${prefix}${baseClass}`];

  if (props.classes && Array.isArray(props.classes)) {
    props.classes.forEach((cls: string) => {
      classes.push(`${prefix}${cls}`);
    });
  }

  if (props.variant) {
    classes.push(`${prefix}${baseClass}-${props.variant}`);
  }

  if (props.state) {
    classes.push(`${prefix}state-${props.state}`);
  }

  return classes.join(' ');
}

/**
 * Escape JSX special characters
 */
export function escapeJSX(text: string): string {
  if (!text) return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;');
}
