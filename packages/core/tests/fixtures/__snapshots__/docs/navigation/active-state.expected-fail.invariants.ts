/**
 * The "active" nav item should not behave as a clickable link to itself.
 * Currently the renderer emits `<a href="#" class="wmd-nav-item wmd-active">`
 * — a fully clickable anchor with no semantic indication that it
 * represents the current page. Acceptable fixes: emit `<a aria-current=
 * "page" ...>` (preserve the tag, mark it semantically) or emit a
 * `<span class="wmd-active">` (drop the anchor entirely).
 */

import { expect } from 'vitest';
import type { DocumentNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ html }: InvariantsArgs) {
  // Locate the active nav item in the rendered HTML.
  const activeMatch = html.match(/<(\w+)[^>]*\bwmd-active\b[^>]*>/);
  expect(activeMatch).not.toBeNull();
  if (!activeMatch) return;

  const [tag, tagName] = activeMatch;

  // Either: the active item is a non-anchor element (e.g., span)…
  if (tagName !== 'a') {
    expect(tagName).not.toBe('a');
    return;
  }

  // …or: it stays an anchor but is marked aria-current="page".
  expect(tag).toMatch(/\baria-current="page"/);
}
