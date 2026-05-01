/**
 * `[[ a > b > c ]]` breadcrumb syntax should be recognized as a breadcrumbs
 * (or nav) node regardless of preceding content. Currently it's only
 * recognized when preceded by a blank line; otherwise the leading `[[` is
 * eaten by the previous line and the rest renders as a button.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

function findFirst(nodes: WiremdNode[], types: string[]): WiremdNode | undefined {
  for (const n of nodes) {
    if (types.includes(n.type)) return n;
    const kids = (n as { children?: WiremdNode[] }).children;
    if (kids) {
      const found = findFirst(kids, types);
      if (found) return found;
    }
  }
  return undefined;
}

export function check({ ast }: InvariantsArgs) {
  // A breadcrumbs or nav node must appear somewhere in the tree.
  const nav = findFirst(ast.children, ['breadcrumbs', 'nav']);
  expect(nav).toBeDefined();
}
