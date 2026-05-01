/**
 * `[Submit]{disabled}` must disable the rendered button. The attribute
 * parser stores the bareword as `props.disabled = true`, while the
 * canonical state representation is `props.state === 'disabled'`. The
 * button renderers honour both so this shorthand works alongside the
 * explicit `{state:disabled}` form.
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
