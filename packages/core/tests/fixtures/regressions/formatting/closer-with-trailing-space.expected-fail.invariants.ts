/**
 * `:::` followed by trailing whitespace should still close its container.
 * Currently the trailing space prevents the closer match, so the rest of
 * the document is absorbed (and most of it gets dropped).
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast, html }: InvariantsArgs) {
  // Two top-level nodes: a container with "inside" content, then a paragraph.
  expect(ast.children).toHaveLength(2);

  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');
  expect(card.containerType).toBe('card');
  const cardChild = card.children[0] as Extract<WiremdNode, { type: 'paragraph' }>;
  expect(cardChild.type).toBe('paragraph');
  expect(cardChild.content ?? '').toBe('inside');

  // The trailing line must NOT be inside the (closed) container.
  const trailing = ast.children[1] as Extract<WiremdNode, { type: 'paragraph' }>;
  expect(trailing.type).toBe('paragraph');
  expect(trailing.content ?? '').toContain('text after');

  // The literal `:::` must never appear in rendered HTML.
  expect(html).not.toMatch(/:::/);
}
