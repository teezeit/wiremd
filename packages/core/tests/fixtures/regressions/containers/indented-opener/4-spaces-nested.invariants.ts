/**
 * 4-space indented ::: openers inside a container must be parsed as nested
 * containers, not as Markdown indented code blocks. CommonMark treats 4+
 * spaces as a code block, so normalizeContainerDirectiveSpacing must strip
 * leading whitespace from ::: lines before remark sees the input.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast, html }: InvariantsArgs) {
  const card = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(card.type).toBe('container');
  expect(card.containerType).toBe('card');

  // The inner ::: row must be a container, not a code node.
  expect(card.children.length).toBeGreaterThan(0);
  const row = card.children[0] as Extract<WiremdNode, { type: 'row' }>;
  expect(row.type).toBe('row');

  // Raw ::: markers must never leak into rendered output.
  expect(html).not.toMatch(/:::/);
}
