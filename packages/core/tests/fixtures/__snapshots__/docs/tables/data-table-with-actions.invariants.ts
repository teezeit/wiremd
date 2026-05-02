/**
 * Sister of `tables/with-badges` and `badges/in-a-table` — table cells
 * using `((content)){.class}` syntax should produce badge nodes, not
 * render parser sigils as raw text. Action buttons in this fixture
 * already work; the badge cells are the failing case.
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
  expect(html).not.toMatch(/\{\.success\}|\{\.warning\}|\{\.danger\}|\{\.error\}/);
}
