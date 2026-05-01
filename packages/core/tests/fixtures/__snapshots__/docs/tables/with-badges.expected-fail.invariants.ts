/**
 * Same family as `badges/in-a-table` — table cells using `|content|{.class}`
 * syntax should produce badge nodes, not render as raw `|...|{.class}`
 * text in the cell.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

function findAny(nodes: WiremdNode[], type: string): WiremdNode | undefined {
  for (const n of nodes) {
    if (n.type === type) return n;
    const kids = (n as { children?: WiremdNode[] }).children;
    if (kids) {
      const found = findAny(kids, type);
      if (found) return found;
    }
  }
  return undefined;
}

export function check({ ast, html }: InvariantsArgs) {
  expect(findAny(ast.children, 'badge')).toBeDefined();
  expect(html).not.toMatch(/\{\.warning\}|\{\.success\}|\{\.danger\}/);
}
