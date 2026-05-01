/**
 * Pretty-tree AST serializer for snapshot tests.
 *
 * Strips position info and prints the wiremd AST as a readable tree so
 * snapshot diffs are skimmable instead of being giant JSON blobs.
 *
 * Example output:
 *   Document
 *     Container[card]
 *       Button "Save" variant=primary
 *       Input placeholder="Email"
 */

import type { DocumentNode, WiremdNode } from '../../src/types.js';

const SKIP_KEYS = new Set(['type', 'children', 'position']);

function formatScalar(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[${value.map(formatScalar).join(', ')}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    return `{${entries.map(([k, v]) => `${k}=${formatScalar(v)}`).join(', ')}}`;
  }
  return String(value);
}

function summarizeNode(node: WiremdNode): string {
  const parts: string[] = [node.type];
  const anyNode = node as Record<string, unknown>;

  // True discriminators only — fields that pick which "kind" a node is.
  // Booleans like `ordered` (list) and `inline` (code) are NOT discriminators
  // and render as plain attributes below. Discriminator values render raw
  // (no JSON quotes) since they read as type tags, not data.
  const tagFields = ['containerType', 'level', 'columns', 'alertType'];
  for (const key of tagFields) {
    if (key in anyNode && anyNode[key] !== undefined) {
      const v = anyNode[key];
      const tag = typeof v === 'string' ? v : formatScalar(v);
      parts[0] = `${node.type}[${tag}]`;
      break;
    }
  }

  // Inline content (button label, text body, etc.).
  if ('content' in anyNode && typeof anyNode.content === 'string') {
    parts.push(JSON.stringify(anyNode.content));
  } else if ('label' in anyNode && typeof anyNode.label === 'string') {
    parts.push(JSON.stringify(anyNode.label));
  } else if ('value' in anyNode && typeof anyNode.value === 'string' && node.type !== 'option') {
    parts.push(JSON.stringify(anyNode.value));
  }

  // Other scalar attributes.
  const seen = new Set([...SKIP_KEYS, 'content', 'label', 'value', ...tagFields]);
  for (const [key, value] of Object.entries(anyNode)) {
    if (seen.has(key)) continue;
    if (value === undefined || value === null) continue;
    if (key === 'props') {
      const propsEntries = Object.entries(value as Record<string, unknown>).filter(
        ([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)
      );
      if (propsEntries.length === 0) continue;
      parts.push(
        `props=${formatScalar(Object.fromEntries(propsEntries))}`
      );
      continue;
    }
    if (key === 'options' && Array.isArray(value)) {
      // For <select>, summarize options inline.
      const opts = (value as Array<Record<string, unknown>>).map(
        (o) => `${o.label ?? o.value}${o.selected ? '*' : ''}`
      );
      parts.push(`options=[${opts.join(', ')}]`);
      continue;
    }
    parts.push(`${key}=${formatScalar(value)}`);
  }

  return parts.join(' ');
}

function getChildren(node: WiremdNode): WiremdNode[] {
  const kids = (node as { children?: WiremdNode[] }).children;
  return Array.isArray(kids) ? kids : [];
}

function renderTree(node: WiremdNode, prefix = '', isLast = true): string {
  const connector = prefix === '' ? '' : isLast ? '└─ ' : '├─ ';
  const childPrefix = prefix === '' ? '  ' : prefix + (isLast ? '   ' : '│  ');
  const line = prefix + connector + summarizeNode(node);

  const children = getChildren(node);
  if (children.length === 0) return line;

  const childLines = children.map((child, i) =>
    renderTree(child, childPrefix, i === children.length - 1)
  );
  return [line, ...childLines].join('\n');
}

export function serializeAST(ast: DocumentNode): string {
  // Header is intentionally just "Document": the parser injects default
  // meta (version, viewport, theme) on every parse, which would otherwise
  // be identical noise on every snapshot. Children carry the signal.
  const header = 'Document';
  if (ast.children.length === 0) return header + '\n';

  const childLines = ast.children.map((child, i) =>
    renderTree(child, '  ', i === ast.children.length - 1)
  );
  return [header, ...childLines].join('\n') + '\n';
}
