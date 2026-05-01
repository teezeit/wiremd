/**
 * Same as sidebar-layout but with section headers inside `::: sidebar`.
 * The sidebar container must appear in the AST with its sections.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const layout = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(layout.type).toBe('container');
  expect(layout.containerType).toBe('layout');

  const sidebar = layout.children.find(
    (c) => c.type === 'container' && c.containerType === 'sidebar'
  );
  expect(sidebar).toBeDefined();
  if (!sidebar) return;

  // The sidebar should hold its inner content (paragraphs/headings/buttons),
  // not be empty.
  expect((sidebar as Extract<WiremdNode, { type: 'container' }>).children.length).toBeGreaterThan(0);
}
