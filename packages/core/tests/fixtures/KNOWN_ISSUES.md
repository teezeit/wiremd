# Known issues surfaced by fixture review

Cross-cutting observations from reviewing snapshots — concerns that affect
many fixtures and don't fit a single `.invariants.ts` file. Anything in
this list is a candidate for a real fix; once tracked elsewhere (issue,
TODO, fix), prune the entry.

**Workflow:** a single-fixture concern goes in a sidecar `.notes.md`
(quick observation) or `.expected-fail.invariants.ts` (executable
contract). A *pattern across many fixtures* lives here.

Each entry below names the concern, the affected fixtures, whether it's
a parser or renderer/styles issue, and the suggested action.

---

## styles.ts: variant button classes have no visual differentiation

**Affected:** `__snapshots__/docs/buttons/variants.html`, `sizes-custom-classes.html`, `with-icons.html`

The parser correctly emits distinct classes (`wmd-button`,
`wmd-button-primary`, `wmd-button-secondary`, `wmd-button-danger`,
`.small`, `.large`, `.danger`), but `styles.ts` doesn't define visual
rules for many of them in `clean` (and possibly other styles). All
variants render identically.

**Action:** add CSS rules in `styles.ts` for the missing variants and
size classes. AST-side support already exists.

---

## styles.ts: required attribute has no visual indicator

**Affected:** `inputs/required`, `inputs/full-form-example`,
`textarea-select/textarea-required`, `textarea-select/select-required`,
`textarea-select/combined-example`

Inputs/textareas/selects with `{required}` produce the correct attribute
in the AST (and on the rendered HTML element). But the renderer doesn't
add any visual marker — no asterisk, no border colour, no `aria-required`
beyond what the browser does.

**Action:** decide on a visual convention (asterisk before label,
red border, etc.) and add CSS in `styles.ts`.

---

## styles.ts: error state has no visual indicator

**Affected:** `inputs/error-state`

`{state:error}` is captured as a state on the AST but the renderer
doesn't paint it. Same family as the required-indicator gap.

**Action:** add `[data-state="error"]` rules in `styles.ts`.

---

## styles.ts: number constraints have no visual indicator

**Affected:** `inputs/number-constraints`

`min`/`max` attributes are correctly emitted on the rendered `<input>`
but there's no visual indication of the constraint range (e.g., a
helper hint).

**Action:** add a small helper-text rendering for inputs with
constraints, or accept that browsers handle this natively.

---

## radio group doesn't enforce single-selection

**Affected:** `checkboxes-radio/radio-buttons`,
`checkboxes-radio/inline-options`

The renderer outputs each radio as its own `<input type="radio">`
without a shared `name` attribute. A user can select multiple radios in
the same group, which defeats the semantic.

**Action:** the renderer should derive a stable `name` per radio group
(or the parser should attach a `radio-group` parent and the renderer
uses its id). Likely a renderer-side fix — the AST already has a
`radio-group` node type.

---

## styles.ts: col-span > 4 has no CSS rules

**Affected:** `regressions/grid/col-span-large`,
`docs/grid/column-spanning`

The parser correctly captures `{.col-span-N}` for any N. The CSS in
`styles.ts` only defines rules up to col-span-4. Higher spans render at
the smallest column width.

**Action:** extend `styles.ts` with col-span rules up to a reasonable
maximum (e.g., 12, like Bootstrap), or accept that wider grids aren't
supported visually.

---

## styles.ts: alignment classes ignored in clean/wireframe styles

**Affected:** `tables/column-alignment`

`{.left}`/`{.center}`/`{.right}` are in the AST but the rendered
output's CSS for the `clean` and `wireframe` styles doesn't honour
the alignment classes on table cells.

**Action:** add `[class*="wmd-align-"]` rules to those styles.

---

## styles.ts: attributes on containers/headings have no visible effect

**Affected:** `attributes/on-containers`, `attributes/on-headings`

Custom classes applied to containers/headings (e.g., `{.my-class}`) are
emitted on the elements but don't have any default styling. This is
*intentional* — they're hooks for user CSS — but the docs demos show
no effect, which can confuse readers.

**Action:** either add demonstrative CSS rules in the style sheets for a
small set of visual classes, or update the docs to make clear that
these are user-CSS hooks.

---

## active link is still clickable

**Affected:** `navigation/active-state`

An "active" navigation link should typically not be clickable (or at
least visually distinct), but the renderer outputs it as a normal
clickable link.

**Action:** renderer-side — either add `aria-current="page"` and disable
pointer events for active links, or just disable them with
`<span class="wmd-active">` when active.

---

## alerts not implemented

**Affected:** `alerts/default`, `alerts/variants`, `alerts/variants-2`,
`alerts/variants-3`, `alerts/with-inline-content-on-opener`

The `::: alert` container syntax exists in the AST but no visual
implementation in `styles.ts` for any style. Renders as a plain
container with no chrome.

**Action:** implement alert chrome (icon + colour ring) in `styles.ts`
for at least the `clean` and `sketch` styles.

---

## buttons disabled: `{disabled}` shorthand ignored

**Affected:** `buttons/disabled`

`[Submit]{disabled}` (the natural shorthand) is silently ignored —
only `[Submit]{state:disabled}` actually disables the button. The
shorthand is documented in the syntax reference but not handled by
the parser/renderer.

**Action:** parser should treat `{disabled}` as sugar for
`{state:disabled}` (already noted in `apps/docs/components/buttons.md`
as a TODO).

---

## inputs: rows/cols on `[___]` should produce a textarea

**Affected:** `inputs/textarea-columns`

`[_____________________________]{rows:5 cols:40}` renders as a single-
line `<input>` because there's no parser distinction between input and
textarea by attributes. A user using `rows:N` likely wants a
multi-line textarea.

**Action:** parser should detect `rows`/`cols` attributes and emit a
`textarea` node instead of `input`. Or document that `[___]` is always
single-line; use `<textarea>` syntax (TBD) for multi-line.
