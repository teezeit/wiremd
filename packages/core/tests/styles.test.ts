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
  it.fails('adds a visual indicator for required inputs', () => {
    // [required] inputs render with the native attribute but no asterisk,
    // border colour, or `aria-required` styling. Add a rule targeting
    // `input[required]`, `.wmd-required`, or a label `::after` marker.
    expect(clean()).toMatch(/\[required\]|\.wmd-required\b/);
  });

  it.fails('defines col-span rules beyond 4', () => {
    // styles.ts caps at col-span-4. Higher spans render at the smallest
    // column width. Extend to a reasonable max (12, like Bootstrap).
    expect(clean()).toMatch(/\.wmd-col-span-(?:5|6|7|8|9|10|11|12)\b/);
  });

  it.fails('honours alignment classes on table cells', () => {
    // `{.left}` / `{.center}` / `{.right}` are emitted as `wmd-align-*`
    // on `<td>`/`<th>`. The shared row CSS has `wmd-align-*` rules but
    // they set `margin: auto` (flexbox alignment), not `text-align`, so
    // table cells silently ignore the alignment. Need either a scoped
    // rule (`td.wmd-align-left { text-align: left }`) or a refactor.
    expect(clean()).toMatch(/wmd-align-(?:left|center|right)[^{]*\{[^}]*text-align/);
  });

  it.fails('styles ::: alert containers (chrome + variants)', () => {
    // The `alert` container type renders as a plain `wmd-container-alert`
    // div with no border, background, icon, or variant differentiation
    // in `clean`. Other styles (sketch, wireframe, material, brutal)
    // do implement alert chrome — `clean` is the outlier.
    expect(clean()).toMatch(/\.wmd-container-alert\b/);
  });

  it.fails('styles button size variants (.small / .large)', () => {
    // `[Small]{.small}` and `[Large]{.large}` apply the classes correctly
    // but no CSS rules exist for them — all sizes render identically.
    expect(clean()).toMatch(/\.wmd-button[^{]*\.wmd-(?:small|large)\b/);
  });

  it.fails('paints {state:error} on inputs', () => {
    // `{state:error}` renders as `wmd-state-error` on the element. Other
    // styles (wireframe, material, tailwind, brutal) define a rule for
    // it; `clean` and `sketch` don't, so the error state is invisible.
    expect(clean()).toMatch(/\.wmd-state-error\b/);
  });
});
