/**
 * Same as sidebar-layout but with section headers inside `::: sidebar`.
 * The sidebar remains the top-level AST node and renderers infer the layout.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const sidebar = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(sidebar.type).toBe('container');
  expect(sidebar.containerType).toBe('sidebar');

  // The sidebar should hold its inner content (paragraphs/headings/buttons),
  // not be empty.
  expect(sidebar.children.length).toBeGreaterThan(0);
}
