/**
 * CSS-gap contracts.
 *
 * The fixture-driven test suite catches AST/HTML drift but cannot detect
 * missing CSS rules — when the AST is correct, the rendered HTML is
 * correct, and only the *visual output* is wrong because `styles.ts`
 * lacks the matching selectors. This file fills that gap.
 *
 * Each `it.fails` documents a known-missing rule in the `clean` style.
 * When a rule is added (or moved into shared structural CSS), the test
 * flips red — drop `.fails` from `it.fails`, refresh nothing, commit.
 *
 * Sister of `tests/fixtures/KNOWN_ISSUES.md`. The suffix on the failing
 * tests is the renderer-side companion of `.expected-fail.invariants.ts`
 * on the parser side.
 */

import { describe, expect, it } from 'vitest';
import { getStyleCSS } from '../src/renderer/styles.js';

const PREFIX = 'wmd-';

function clean(): string {
  return getStyleCSS('clean', PREFIX);
}

describe('clean style: known CSS gaps (it.fails until styles.ts grows the rule)', () => {
  it('adds a visual indicator for required inputs', () => {
    // [required] inputs render with the native attribute but no asterisk,
    // border colour, or `aria-required` styling. Add a rule targeting
    // `input[required]`, `.wmd-required`, or a label `::after` marker.
    expect(clean()).toMatch(/\[required\]|\.wmd-required\b/);
  });

  it('defines col-span rules beyond 4', () => {
    // styles.ts caps at col-span-4. Higher spans render at the smallest
    // column width. Extend to a reasonable max (12, like Bootstrap).
    expect(clean()).toMatch(/\.wmd-col-span-(?:5|6|7|8|9|10|11|12)\b/);
  });

  it('honours alignment classes on table cells', () => {
    // `{.left}` / `{.center}` / `{.right}` are emitted as `wmd-align-*`
    // on `<td>`/`<th>`. The shared row CSS has `wmd-align-*` rules but
    // they set `margin: auto` (flexbox alignment), not `text-align`, so
    // table cells silently ignore the alignment. Need either a scoped
    // rule (`td.wmd-align-left { text-align: left }`) or a refactor.
    expect(clean()).toMatch(/wmd-align-(?:left|center|right)[^{]*\{[^}]*text-align/);
  });

  it('styles ::: alert containers (chrome + all three variants)', () => {
    // Base chrome must exist, AND the variant selectors must match the
    // classes the renderer actually emits (`wmd-success` / `wmd-warning` /
    // `wmd-error` — note: NO `state-` prefix). Earlier iterations of these
    // rules used `state-success`/`state-error` which silently never matched
    // the rendered HTML; the visual review surfaced it.
    const css = clean();
    expect(css).toMatch(/\.wmd-container-alert\b/);
    expect(css).toMatch(/\.wmd-container-alert\.wmd-success\b/);
    expect(css).toMatch(/\.wmd-container-alert\.wmd-warning\b/);
    expect(css).toMatch(/\.wmd-container-alert\.wmd-error\b/);
  });

  it('styles button size variants (.small / .large)', () => {
    // `[Small]{.small}` and `[Large]{.large}` apply the classes correctly
    // but no CSS rules exist for them — all sizes render identically.
    expect(clean()).toMatch(/\.wmd-button[^{]*\.wmd-(?:small|large)\b/);
  });

  it('paints {state:error} on inputs', () => {
    // `{state:error}` renders as `wmd-state-error` on the element. Other
    // styles (wireframe, material, tailwind, brutal) define a rule for
    // it; `clean` and `sketch` don't, so the error state is invisible.
    expect(clean()).toMatch(/\.wmd-state-error\b/);
  });
});
