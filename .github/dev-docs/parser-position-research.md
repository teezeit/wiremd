# Parser Position Tracking — Research Findings

Surfaced during cursor sync feature development (May 2026, PRs #129/#130).

---

## What we discovered

The wiremd parser pipeline has a systematic gap in position tracking that caused silent, compounding errors in `data-source-line` attributes — the mechanism used by cursor sync to map rendered HTML elements back to source lines.

### The normalization drift bug (fixed, PR #129)

`normalizeContainerDirectiveSpacing` inserts synthetic blank lines around `:::` directives before handing the text to remark. This is necessary to prevent remark from folding container content into single paragraphs. However, the blank lines shift every `position.start.line` in the resulting MDAST relative to the original source.

**Effect:** A node at source line 6 would be reported at line 8, 10, or higher depending on nesting depth — one extra line per container level crossed. Deeply nested documents (`::: columns > ::: column > content`) had errors of 4–7 lines.

**Fix:** `normalizeContainerDirectiveSpacing` now returns a `lineMap` alongside the normalized text. `remapMdastPositions()` walks the full MDAST and corrects every `position.start.line` / `position.end.line` before plugins run — between `processor.parse()` and `processor.runSync()`.

### Container end-line not tracked (fixed, PR cursor-sync)

`makeContainerNode` in `remark-containers.ts` receives `openerNode.position` — the position of the opening `:::` paragraph. Remark's paragraph spans only that one line, so `position.end.line` was always equal to `position.start.line` regardless of where the closing `:::` appeared.

**Effect:** `data-source-line-end` was useless for containers — always the same as start. The cursor eject algorithm (place indicator after a container when cursor has passed its closing `:::`) could not work.

**Fix:** `collectContainer` now captures `_closerPosition` when the explicit `:::` closer is found and uses it to set `position.end` on the container node.

### `grid-item` position not forwarded through transformer (fixed, PR cursor-sync)

The transformer function that creates wiremd `grid-item` nodes from MDAST `wiremdContainer` nodes returned `{ type, props, children }` but omitted `position`. The MDAST node had a correct position (after remapping), but it was silently dropped.

**Effect:** All `grid-item` nodes had `position: undefined`. No `data-source-line` was emitted for columns in cursor sync output, making column opener lines invisible to the indicator algorithm.

**Fix:** Added `position: node.position` to the returned object in `transformer.ts` at the grid-item creation site.

### Injected title headings have no source position (known, not fixed)

When a `:::column` has an inline title (`::: column :rocket: Lightning Fast`), the transformer injects a title `<h3>` as the first child of the grid-item via `children.unshift(createColumnTitleHeading(title))`. This heading is synthetic — it has no position, so no `data-source-line`.

**Effect in cursor sync:** The opener fix placed the indicator before `firstElementChild`, which was the injected heading — putting the dot above the column title instead of after it. Fixed by detecting the absence of `data-source-line` on `firstElementChild` and advancing to the next sibling.

**Broader implication:** Any injected node in the AST is invisible to position-based features. Other places this pattern appears: dropdown options injected from a following list, tab panel structure, row wrapping.

---

## Where position is reliably tracked vs not

| Node type | Position in AST | data-source-line in HTML |
|---|---|---|
| heading, paragraph, blockquote, list | ✓ from MDAST | ✓ |
| container (hero, card, etc.) | ✓ start; ✓ end (after fix) | ✓ |
| grid (columns-N) | ✓ start; ✓ end (after fix) | ✓ |
| grid-item (column) | ✓ (after fix) | ✓ (after fix) |
| tabs, tab | ✓ start; partial end | ✓ |
| nav, row | ✓ | ✓ |
| table, accordion, breadcrumbs | ✓ | ✓ |
| **Injected nodes** (title headings, dropdown options) | ✗ never | ✗ never |
| **comment** (wiremd `<!-- -->` nodes) | partial | ✗ (side-panel only) |
| inline nodes (button, input, badge, etc.) | partial | ✗ intentionally |

---

## Testing gaps that allowed these bugs to go undetected

### 1. Fixture snapshots strip position attributes

`stripPositionAttrs()` in `tests/fixtures.test.ts` removes all `data-source-line` / `data-source-line-end` attributes before snapshot comparison. This was a deliberate choice to avoid snapshot churn on every input edit. The consequence: the entire position tracking subsystem is invisible to the 500+ fixture regression tests. None of them would detect position drift, wrong end-lines, or missing annotations.

### 2. No AST position contract

No test asserts that `position` is set on wiremd AST nodes. The transformer creates nodes in dozens of places and silently drops position in many of them. Without a contract test walking the AST and asserting `position != null` for block-level node types, omissions are invisible.

### 3. No `data-source-line` coverage matrix

The existing renderer tests check "data-source-line appears somewhere in the output" — not which node types carry it. A matrix-style test asserting one annotation per node type would have caught the grid-item omission at the renderer level.

### 4. No end-line tests

`position.end.line` had zero test coverage before cursor sync. The remark-containers tests check structural correctness (children, types) but never position values. End-line regressions are fully silent.

### 5. No round-trip position verification in fixture corpus

The fixture corpus is the wiremd syntax spec but it doesn't verify that source line N produces `data-source-line="N"` in the output. We added `tests/parser/position-integration.test.ts` and `tests/parser/position-linemap.test.ts` to cover this, but they cover only manually written scenarios — not the full fixture corpus.

---

## What to add

**Short term (already added):**
- `tests/parser/position-linemap.test.ts` — unit tests for `normalizeContainerDirectiveSpacing` lineMap output and `remapMdastPositions`
- `tests/parser/position-integration.test.ts` — parse markdown, assert exact `position.start.line` on AST nodes; real-world document with 9 line-specific assertions
- Exact `data-source-line` value assertions in `renderer.test.ts` (not just presence)

**Still needed:**
- A `position-corpus.test.ts` that runs a subset of fixtures with `cursorSync: true` and asserts specific `data-source-line` values against a compact sidecar (`.position.json`), seeded once, re-snapped deliberately — separate from the main stripped snapshots.
- A parametric AST position contract test: parse one document, walk every node, assert `position != null` for all block-level types. Parameterized over type so failures identify the specific node.
- `position.end.line` assertions in `remark-containers` tests for the explicit closer path.
- Extend position-integration to cover every node type in the wiremd type registry, not just the handful currently written.

---

## The `parseMarkdownBlocks` known gap

`parseMarkdownBlocks()` does a fresh `unified/remark` sub-parse on extracted container text. Nodes from this path have positions relative to the sub-string (starting at 1), not the full document. This path is currently unreachable in practice because `normalizeContainerDirectiveSpacing` inserts blank lines that prevent remark from folding entire containers into a single paragraph (the only trigger for this function). If that ever changes, inner node positions will be wrong by `(containerOpenerLine - 1)` lines.

See: `tests/parser/position-integration.test.ts` → `it.todo` entry for this gap.
