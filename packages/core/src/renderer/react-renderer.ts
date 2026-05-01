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
export function nextRadioGroupName(context: ReactRenderContext): string {
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
  const def = getNodeDefinition(node.type);
  if (def?.render?.react) {
    return def.render.react(node as never, context, indent);
  }
  // Node types without a React renderer (alert, tabs, accordion,
  // breadcrumbs, demo, loading/empty/error-state) emit an "Unknown
  // node" comment for snapshot parity with the legacy default arm.
  const indentStr = repeatString('  ', indent);
  return `${indentStr}{/* Unknown node type: ${(node as { type: string }).type} */}`;
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
