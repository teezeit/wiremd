/**
 * A `[Button]` followed on the next line by free text should produce a
 * button element + a separate paragraph, not a single paragraph that
 * mixes the button and text inline. Authors expect a button to terminate
 * its line; the markdown soft-break behavior is wrong here.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');

  // The card should contain at least 2 children at the top level: a button
  // (or button-group) and a paragraph. Currently they're folded together
  // into a single paragraph.
  expect(card.children.length).toBeGreaterThanOrEqual(2);

  // A button must appear as a direct (non-nested) child.
  const directButton = card.children.some((c) => c.type === 'button');
  expect(directButton).toBe(true);

  // No paragraph should contain a button as an inline child.
  for (const child of card.children) {
    if (child.type === 'paragraph') {
      const kids = (child as { children?: WiremdNode[] }).children ?? [];
      const hasInlineButton = kids.some((k) => k.type === 'button');
      expect(hasInlineButton).toBe(false);
    }
  }
}
