/**
 * Free text after the `card` flag on a `::: grid-N card` opener should
 * either be ignored or rejected — but it should NOT silently consume the
 * `card` flag. Currently the grid renders without card chrome.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const grid = ast.children[0] as Extract<WiremdNode, { type: 'grid' }>;
  expect(grid.type).toBe('grid');
  expect(grid.columns).toBe(3);

  // The `card` flag must survive trailing free text.
  const props = grid.props as Record<string, unknown>;
  expect(props.card).toBe(true);
}
