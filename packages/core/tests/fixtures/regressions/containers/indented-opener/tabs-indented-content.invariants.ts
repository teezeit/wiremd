/**
 * ::: tab blocks indented with 4 spaces inside ::: tabs must parse as tab
 * nodes, not code blocks. This is the gallery/multi-page pattern where
 * authors indent tab content for readability.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast, html }: InvariantsArgs) {
  const tabs = ast.children[0] as Extract<WiremdNode, { type: 'tabs' }>;
  expect(tabs.type).toBe('tabs');

  // Must have exactly two tab children, not code nodes.
  expect(tabs.children).toHaveLength(2);
  const [first, second] = tabs.children as Array<Extract<WiremdNode, { type: 'tab' }>>;
  expect(first.type).toBe('tab');
  expect(second.type).toBe('tab');

  // Each tab must contain its own content paragraph.
  expect(first.children.length).toBeGreaterThan(0);
  expect(second.children.length).toBeGreaterThan(0);

  expect(html).not.toMatch(/:::/);
}
