/**
 * `[Submit]{disabled}` should disable the rendered button. Currently the
 * shorthand `{disabled}` sets `props.disabled` but the renderer reads
 * `props.state === 'disabled'`, so the rendered HTML omits the `disabled`
 * attribute and the button is fully clickable. Either the parser should
 * map `{disabled}` → `state: 'disabled'`, or the renderer should also
 * honour `props.disabled`.
 */

import { expect } from 'vitest';
import type { DocumentNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ html, react, tailwind }: InvariantsArgs) {
  // Rendered HTML must mark the button as disabled.
  expect(html).toMatch(/<button[^>]*\sdisabled\b/);
  expect(react).toMatch(/disabled/);
  expect(tailwind).toMatch(/<button[^>]*\sdisabled\b/);
}
