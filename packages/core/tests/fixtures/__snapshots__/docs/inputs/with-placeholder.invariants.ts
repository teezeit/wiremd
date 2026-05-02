/**
 * Quoted attribute values containing spaces should preserve the full
 * value. Currently the parser stops at the first space, dropping the
 * closing quote and everything after — the placeholder above renders as
 * `"Search` instead of `Search components...`.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

function findFirst(nodes: WiremdNode[], type: string): WiremdNode | undefined {
  for (const n of nodes) {
    if (n.type === type) return n;
    const kids = (n as { children?: WiremdNode[] }).children;
    if (kids) {
      const found = findFirst(kids, type);
      if (found) return found;
    }
  }
  return undefined;
}

export function check({ ast, html }: InvariantsArgs) {
  const input = findFirst(ast.children, 'input') as
    | Extract<WiremdNode, { type: 'input' }>
    | undefined;
  expect(input).toBeDefined();
  if (!input) return;

  // Full quoted placeholder must round-trip — including the space.
  expect(input.props.placeholder).toBe('Search components...');

  // Rendered HTML must not contain a stray escaped quote in the
  // placeholder attribute (sign of broken parsing).
  expect(html).not.toMatch(/placeholder="&quot;/);
}
