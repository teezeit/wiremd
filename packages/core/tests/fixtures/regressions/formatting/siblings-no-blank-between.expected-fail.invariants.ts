/**
 * Documents the sibling-containers-no-blank-line bug: when a `:::` closer
 * is immediately followed by a `:::` opener (no blank line between), remark
 * folds the lines into a single paragraph and the second container is lost.
 *
 * Currently fails. When the parser is fixed, vitest's `it.fails(...)` reports
 * "expected to fail but didn't" — at which point the file should be renamed
 * to drop `.expected-fail.` and the snapshot refreshed.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs {
  ast: DocumentNode;
  html: string;
  react: string;
  tailwind: string;
}

export function check({ ast, html }: InvariantsArgs) {
  // Exactly two containers at the top level.
  expect(ast.children).toHaveLength(2);

  const [first, second] = ast.children;
  expect(first.type).toBe('container');
  expect(second.type).toBe('container');

  if (first.type !== 'container' || second.type !== 'container') return;
  expect(first.containerType).toBe('card');
  expect(second.containerType).toBe('card');

  // Each container holds its own paragraph, not the other's content.
  const firstPara = first.children[0] as Extract<WiremdNode, { type: 'paragraph' }>;
  const secondPara = second.children[0] as Extract<WiremdNode, { type: 'paragraph' }>;
  expect(firstPara.type).toBe('paragraph');
  expect(secondPara.type).toBe('paragraph');
  expect(firstPara.content ?? '').toBe('A');
  expect(secondPara.content ?? '').toBe('B');

  // The literal `:::` sigil must never appear in rendered HTML.
  expect(html).not.toMatch(/:::/);
}
