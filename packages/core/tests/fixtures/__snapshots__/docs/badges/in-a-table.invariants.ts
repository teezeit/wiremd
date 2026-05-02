/**
 * Badge syntax `((cell)){.warning}` inside a table cell should render as a
 * badge node, not as raw text.
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
  // At least one badge node must exist somewhere in the tree.
  const badge = findAny(ast.children, 'badge');
  expect(badge).toBeDefined();

  // The literal `{.warning}` should not appear as raw text in the HTML —
  // it's a parser sigil, not user-visible content.
  expect(html).not.toMatch(/\{\.warning\}/);
  expect(html).not.toMatch(/\{\.success\}/);
}
