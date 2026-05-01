/**
 * Trailing whitespace on a `:::` opener should not lose the container's
 * content. After the recent minimal-blank-line trim, the trailing space
 * variant produces an empty container — content disappears entirely.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');
  expect(card.containerType).toBe('card');
  expect(card.children.length).toBeGreaterThan(0);
  const para = card.children[0] as Extract<WiremdNode, { type: 'paragraph' }>;
  expect(para.type).toBe('paragraph');
  expect(para.content ?? '').toContain('Inside the card');
}
