/**
 * Text directly before a nested `::: card` opener should not prevent the
 * opener from being recognized. Currently the text and the opener get
 * folded together as a paragraph; downstream closers misalign and the
 * inner card's children leak to the document root.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast, html }: InvariantsArgs) {
  // Single outer container at the document root; nothing should leak out.
  expect(ast.children).toHaveLength(1);
  const outer = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(outer.type).toBe('container');
  expect(outer.containerType).toBe('card');

  // The outer should hold the heading, the intro paragraph, and an inner card.
  const innerCard = outer.children.find(
    (c): c is Extract<WiremdNode, { type: 'container' }> =>
      c.type === 'container' && c.containerType === 'card'
  );
  expect(innerCard).toBeDefined();
  if (!innerCard) return;

  // Inner card holds the H2 heading and the button.
  const innerHeading = innerCard.children[0] as Extract<WiremdNode, { type: 'heading' }>;
  expect(innerHeading.type).toBe('heading');
  expect(innerHeading.level).toBe(2);

  // The literal `:::` must never appear in rendered HTML.
  expect(html).not.toMatch(/:::/);
}
