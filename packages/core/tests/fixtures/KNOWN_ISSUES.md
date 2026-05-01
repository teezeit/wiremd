# Known issues surfaced by fixture review

Cross-cutting observations from reviewing snapshots — concerns that affect
many fixtures and don't fit a single `.invariants.ts` file. Anything in
this list is a candidate for a real fix; once tracked elsewhere (issue,
TODO, fix), prune the entry.

Workflow: a single-fixture concern goes in a sidecar `.notes.md` (quick
observation) or `.expected-fail.invariants.ts` (executable contract). A
*pattern across many fixtures* lives here.

---

## styles.ts: variant classes have no visual differentiation in `clean` style

**Surfaced by:** `__snapshots__/docs/buttons/variants.html`

The parser correctly emits distinct classes (`wmd-button`, `wmd-button-primary`,
`wmd-button-secondary`, `wmd-button-danger`), but `styles.ts` doesn't define
visual rules for the `-secondary` / `-danger` classes in the `clean` style
(and possibly others). All variants render identically.

This is a **renderer/styles concern**, not a parser concern — the AST
correctly carries the variant info; the CSS doesn't paint it. Out of scope
for the parser/renderer test refactor.

**Action:** track as a styles.ts issue when convenient.
