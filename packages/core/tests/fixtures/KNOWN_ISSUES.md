# Known issues surfaced by fixture review

Cross-cutting observations from reviewing snapshots — concerns that
affect many fixtures and don't fit a single `.invariants.ts` file.

**Where bugs go now (preferred):**

- A parser/renderer bug with a sharp HTML/AST contract → an
  `.expected-fail.invariants.ts` sidecar on the affected fixture.
- A missing CSS rule in `styles.ts` → an `it.fails(...)` in
  `tests/styles.test.ts`.
- This file is the residual: design-pending decisions, intentional
  behavior that confuses reviewers, and concerns that don't reduce to
  a single executable assertion.

When an entry below grows a sharp contract, promote it into one of the
two test channels above and prune the entry from this list.

---

## alerts not visually implemented across all styles (design depth)

**Affected:** `alerts/default`, `alerts/variants`, `alerts/variants-2`,
`alerts/variants-3`, `alerts/with-inline-content-on-opener`

The `::: alert` AST node exists. `tests/styles.test.ts` already
asserts that `clean` defines a `wmd-container-alert` rule (currently
failing). Full implementation is more than a one-liner: each of the
seven visual styles needs alert chrome, and most need variant-specific
treatment (icon + colour ring for `info`/`success`/`warning`/`error`).

**Action:** design the visual treatment per style, then implement. Once
each style has a complete variant set, retire this entry.

---

## attribute hooks on containers/headings have no default styling (intentional)

**Affected:** `attributes/on-containers`, `attributes/on-headings`

`{.my-class}` on a container/heading is a hook for user CSS, not a
styled feature. The docs demos render with no visual effect, which can
mislead readers into thinking the attribute syntax is broken.

**Action:** docs change — make the docs page explicit that custom
classes are user-styling hooks and the demo intentionally renders
unstyled. No code change.

---

## number constraints have no helper text (design TBD)

**Affected:** `inputs/number-constraints`

`min`/`max` attributes are correctly emitted on `<input type=number>`.
Browsers enforce them natively but show no inline hint. Whether wiremd
should render a "min: 0, max: 100" helper line near the input is a
design choice, not a bug.

**Action:** decide whether to add helper-text rendering. If yes, becomes
a renderer change (transformer/html-renderer) plus a fixture invariant.
If no, retire this entry.

---

## inputs: `rows`/`cols` on `[___]` should produce a textarea (design TBD)

**Affected:** `inputs/textarea-columns`

`[_____________________________]{rows:5 cols:40}` renders as a single-
line `<input>` because the parser doesn't promote `[___]` to `textarea`
based on attributes. A user using `rows:N` likely wants multi-line.

**Action:** decide between (a) parser promotes to `textarea` when
`rows`/`cols` is present, or (b) document that `[___]` is always
single-line and require an explicit textarea syntax. Either way, the
chosen contract becomes a fixture invariant and this entry retires.
