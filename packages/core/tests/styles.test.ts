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

function cssFor(style: string): string {
  return getStyleCSS(style, PREFIX);
}

describe('clean style: known CSS gaps (it.fails until styles.ts grows the rule)', () => {
  it('adds a visual indicator for required inputs', () => {
    // [required] inputs render with the native attribute but no asterisk,
    // border colour, or `aria-required` styling. Add a rule targeting
    // `input[required]`, `.wmd-required`, or a label `::after` marker.
    expect(clean()).toMatch(/\[required\]|\.wmd-required\b/);
  });

  it('defines col-span rules beyond 4', () => {
    // The renderer emits `wmd-col-span-N` on grid items for any N. Each of
    // 5–12 must have a matching rule, not just one. (A rule for col-span-5
    // alone wouldn't help users writing {.col-span-9}.)
    const css = clean();
    for (const n of [5, 6, 7, 8, 9, 10, 11, 12]) {
      expect(css).toMatch(new RegExp(`\\.wmd-col-span-${n}\\b`));
    }
  });

  it('honours alignment classes on table cells', () => {
    // `{.left}` / `{.center}` / `{.right}` are emitted as `wmd-align-*`
    // on `<td>`/`<th>`. The shared row CSS has `wmd-align-*` rules but
    // they set `margin: auto` (flexbox alignment), not `text-align` — so
    // the rule must be table-cell-scoped, otherwise it conflicts with the
    // row layout. Assert all three directions are covered, scoped to td/th.
    const css = clean();
    for (const dir of ['left', 'center', 'right']) {
      expect(css).toMatch(
        new RegExp(`(?:td|th)\\.wmd-align-${dir}[^{]*\\{[^}]*text-align`)
      );
    }
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
    // The renderer emits e.g. `<button class="wmd-button wmd-small">`. The
    // matching rule must target the AND of both classes on the same element
    // (`.wmd-button.wmd-small`, no whitespace), not a descendant selector.
    // Assert each variant has a rule with at least one declaration.
    for (const style of ['sketch', 'clean', 'wireframe', 'none', 'tailwind', 'material', 'brutal']) {
      const css = cssFor(style);
      for (const size of ['small', 'large']) {
        expect(css).toMatch(
          new RegExp(`\\.wmd-button\\.wmd-${size}\\b[^{]*\\{[^}]*[a-z-]+\\s*:`)
        );
      }
    }
  });

  it('paints {state:error} on inputs', () => {
    // `{state:error}` renders as `wmd-state-error` on the element. The CSS
    // rule must exist AND set a visible property (border-color or color),
    // not just an empty `.wmd-state-error {}` block.
    expect(clean()).toMatch(
      /\.wmd-state-error\b[^{]*\{[^}]*(?:border-color|color)\s*:/
    );
  });

  it('styles accordion wrapper (.wmd-accordion)', () => {
    // The renderer emits `<div class="wmd-accordion">`. The wrapper needs
    // at minimum a display rule to stack items vertically.
    expect(clean()).toMatch(
      /\.wmd-accordion\b[^{]*\{[^}]*(?:display|border|padding)\s*:/
    );
  });

  it('styles accordion-item <details> element (.wmd-accordion-item)', () => {
    // Plain accordion items have no border (borderless by default); only
    // .wmd-accordion.wmd-card items get borders. Assert the base item rule exists.
    expect(clean()).toMatch(/\.wmd-accordion-item\b/);
  });

  it('styles accordion summary (.wmd-accordion-summary)', () => {
    // <summary class="wmd-accordion-summary"> needs cursor:pointer and a
    // display rule so it looks like a clickable header, not raw browser default.
    const css = clean();
    expect(css).toMatch(
      /\.wmd-accordion-summary\b[^{]*\{[^}]*cursor\s*:/
    );
    expect(css).toMatch(
      /\.wmd-accordion-summary\b[^{]*\{[^}]*(?:padding|font-weight|display)\s*:/
    );
  });

  it('styles accordion body (.wmd-accordion-body)', () => {
    // The body div inside each <details> needs padding so content doesn't
    // sit flush against the summary border.
    expect(clean()).toMatch(
      /\.wmd-accordion-body\b[^{]*\{[^}]*padding\s*:/
    );
  });

  it('styles accordion card variant (.wmd-accordion.wmd-card)', () => {
    // `:::accordion card` adds a bordered outer wrapper. The combined
    // selector must target the AND of both classes on the same element.
    expect(clean()).toMatch(
      /\.wmd-accordion\.wmd-card\b[^{]*\{[^}]*(?:border|box-shadow|border-radius)\s*:/
    );
  });
});
