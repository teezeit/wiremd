/**
 * `:icon:` on a line followed immediately by content should still parse as
 * an icon node. Currently the icon syntax is only recognized when followed
 * by a blank line — making it text-content-position-dependent, which is a
 * paper cut.
 *
 * Note: this fixture also exercises the in-cell badge syntax bug
 * (|Admin|{.warning}); both are simultaneous gaps. The invariants below
 * focus on the icon since that's the headline concern.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

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

export function check({ ast }: InvariantsArgs) {
  // The :user: token must be parsed as an icon node *somewhere* in the tree,
  // not as literal text content.
  const icon = findFirst(ast.children, 'icon') as Extract<WiremdNode, { type: 'icon' }> | undefined;
  expect(icon).toBeDefined();
  if (!icon) return;
  expect(icon.props.name).toBe('user');
}
