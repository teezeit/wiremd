/**
 * `::: sidebar` followed by content should keep the concise AST shape while
 * renderers infer the two-column sidebar + main layout.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const sidebar = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(sidebar.type).toBe('container');
  expect(sidebar.containerType).toBe('sidebar');

  const heading = ast.children.find((c) => c.type === 'heading');
  expect(heading).toBeDefined();
}
