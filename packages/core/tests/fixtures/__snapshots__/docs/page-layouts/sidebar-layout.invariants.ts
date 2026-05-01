/**
 * `::: layout` containing `::: sidebar` and `::: main` should produce a
 * layout container with both children present. Currently the sidebar
 * container is missing from the AST when there's no blank line after
 * the `::: sidebar` opener.
 */

import { expect } from 'vitest';
import type { DocumentNode, WiremdNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ ast }: InvariantsArgs) {
  const layout = ast.children[0] as Extract<WiremdNode, { type: 'container' }>;
  expect(layout.type).toBe('container');
  expect(layout.containerType).toBe('layout');

  // The layout must contain both sidebar and main containers as children.
  const hasSidebar = layout.children.some(
    (c) => c.type === 'container' && c.containerType === 'sidebar'
  );
  const hasMain = layout.children.some(
    (c) => c.type === 'container' && (c.containerType as string) === 'main'
  );
  expect(hasSidebar).toBe(true);
  expect(hasMain).toBe(true);
}
