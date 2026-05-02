/**
 * Buttons on separate markdown lines should render as separate elements
 * in their own block, not folded into the same paragraph as preceding
 * description text. Currently description prose + buttons collapse into
 * a single form-group when the buttons follow text without a blank line.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');

  // The card should hold: heading, description (paragraph), then a button
  // row (or direct button children) — NOT a form-group that wraps
  // text + buttons together.
  const hasFormGroupWithText = card.children.some(
    (c) =>
      c.type === 'container' &&
      c.containerType === 'form-group' &&
      c.children.some((k) => k.type === 'paragraph' || k.type === 'text')
  );
  expect(hasFormGroupWithText).toBe(false);

  // Buttons should appear as direct children or in a row.
  const hasButton = card.children.some(
    (c) =>
      c.type === 'button' ||
      (c.type === 'row' &&
        c.children.some((item: any) => item.children?.some((k: WiremdNode) => k.type === 'button')))
  );
  expect(hasButton).toBe(true);
}
