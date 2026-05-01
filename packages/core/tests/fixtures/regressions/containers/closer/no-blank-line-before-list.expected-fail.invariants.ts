/**
 * Documents the closer-blank-line bug: when a `:::` closer immediately
 * follows a list (no blank line between), remark folds the closer into
 * the final list item's text.
 *
 * Currently fails. When the parser is fixed, this passes — at which point
 * vitest's `it.fails(...)` reports "expected to fail but didn't", forcing
 * the author to rename the file to `no-blank-line-before-list.invariants.ts`
 * and refresh the snapshot. That rename IS the signal that a bug got fixed.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs {
  ast: DocumentNode;
  html: string;
  react: string;
  tailwind: string;
}

export function check({ ast, html }: InvariantsArgs) {
  // Top-level: a single card container.
  expect(ast.children).toHaveLength(1);
  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');
  expect(card.containerType).toBe('card');

  // The card holds exactly one list with two items.
  expect(card.children).toHaveLength(1);
  const list = card.children[0] as Extract<WiremdNode, { type: 'list' }>;
  expect(list.type).toBe('list');
  expect(list.children).toHaveLength(2);

  const lastItem = list.children[1] as Extract<WiremdNode, { type: 'list-item' }>;
  expect(lastItem.type).toBe('list-item');

  // The bug: the closer `:::` gets concatenated into "item two".
  // Correct behavior: content is exactly "item two".
  expect(lastItem.content ?? '').toBe('item two');

  // And nothing in the rendered HTML should contain a literal `:::` —
  // it's a parser sigil, not user-visible content.
  expect(html).not.toMatch(/:::/);
}
