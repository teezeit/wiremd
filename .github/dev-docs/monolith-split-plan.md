# De-monolith plan — handover

This is a self-contained brief for the agent or contributor who picks up the monolith split. Read top-to-bottom; everything you need is here.

## The arc

The user's plan, repeatedly stated:

> "first we fix the tests — then we split the monolith. that's the whole idea — make the core lib more easily extendable. but in order to do so, we need good testing."

PR #75 (`testing-increase-coverage`) closes the "fix the tests" half. This doc is the "split the monolith" half.

## Why split

Adding a new wiremd feature today touches **5+ files**: `types.ts` (AST node), `parser/transformer.ts` (one big switch), `html-renderer.ts` + `react-renderer.ts` + `tailwind-renderer.ts` (three parallel switches), `styles.ts` (CSS). The Feature Development Checklist in `CONTRIBUTING.md` lists ~13 steps.

Goal: **adding a new node type should be "drop in a file"**. Not "edit five places."

## The four monoliths

| File | Lines | Shape | Split target |
|---|---|---|---|
| `packages/core/src/parser/transformer.ts` | 1892 | 17 internal functions, MDAST-walk + per-node case branches | `parser/transform/<node>.ts` per node type, thin dispatcher |
| `packages/core/src/renderer/html-renderer.ts` | 953 | One switch over 35 node-type cases | `renderer/html/<node>.ts` per node type, thin dispatcher |
| `packages/core/src/renderer/react-renderer.ts` | 638 | Same shape, 31 cases | parallel split |
| `packages/core/src/renderer/tailwind-renderer.ts` | 623 | Same shape, 39 cases | parallel split |
| `packages/core/src/renderer/styles.ts` | 3900 | 7 self-contained style blocks (`getSketchStyle`, `getCleanStyle`, `getWireframeStyle`, `getNoneStyle`, `getTailwindStyle`, `getMaterialStyle`, `getBrutalStyle`) | one file per style: `styles/{sketch,clean,wireframe,…}.ts`, thin dispatcher in `styles/index.ts` |

After the split, adding a node type ≈ writing one parser file + three renderer files + zero changes to existing code. Adding a visual style ≈ writing one CSS file.

## The safety net (don't break it)

The corpus is the contract. Before any split, run `pnpm test` from `packages/core/`. Confirm 1153+ tests passing across 23 files.

What you must preserve through the refactor:

- **Snapshot tests**: every fixture's HTML/React/Tailwind/tree output is byte-identical to current. If a snapshot drifts, your refactor changed behavior — that's a bug, not a snapshot to update with `-u`.
- **17 `KNOWN_FAILURES` anchors** in `tests/review-gate.test.ts`. The bugs they document are real and existing; the split shouldn't fix them or change their failure mode. If a `.expected-fail.invariants.ts` test starts passing under `it.fails`, a side effect of your refactor accidentally fixed something — investigate before celebrating.
- **`tests/styles.test.ts`** (6 assertions on `clean` style). All must continue passing.
- **Public exports** in `packages/core/src/index.ts`. The `wiremd` npm package is consumed by the editor, VS Code extension, Figma plugin, and the bundled CLI in the Claude skill — don't change the surface area.
- **The CLI** (`packages/core/src/cli/index.ts`) and its `bin/wiremd.js` wrapper. Tested by `tests/cli.test.ts`.

The visual-review gate enforces the snapshot-drift constraint mechanically: any fixture whose output changes flips to ⏳ in `REVIEW_LOG.md`, which makes `tests/review-gate.test.ts` fail until you click ✅ in `pnpm review`. So the split *physically cannot* hide rendering changes — they'll surface as gate failures.

## The 5-step contributor loop (use this for every PR in the split)

```bash
# 1. edit code
# 2. refresh snapshots and flag affected fixtures as ⏳
pnpm review:refresh

# 3. confirm the gate is now red — names every pending fixture
pnpm test

# 4. eyeball, click ✅
pnpm review

# 5. green — commit
pnpm test && git commit
```

A pure refactor should produce **zero** snapshot diffs. If `pnpm review:refresh` shows fixtures going to ⏳, your refactor is changing behavior. Investigate before continuing.

## Suggested phase order

The cheapest, lowest-risk split first; the riskiest last. Each phase is one PR.

### Phase 1 — Split `styles.ts` (lowest risk)

7 self-contained `getXxxStyle(prefix): string` functions. Each is independent — no shared state, no cross-references. Pure mechanical extraction:

1. Create `packages/core/src/renderer/styles/` directory.
2. For each style: extract its function to `styles/<name>.ts`. Keep the structural-CSS prefixes (`linkButtonReset`, `tabsStructural`, `rowStructural`) shared via `styles/_structural.ts`.
3. Replace the body of `styles.ts` with a re-export + dispatch:
   ```ts
   import { getSketchStyle } from './styles/sketch.js';
   // …
   export function getStyleCSS(style: string, prefix: string): string {
     switch (style) {
       case 'sketch': return getSketchStyle(prefix);
       // …
     }
   }
   ```
4. `pnpm test` — every test must still pass byte-identically.
5. `pnpm review:refresh` — there should be **no** ⏳ flips.

This is the warmup. If you can't land this cleanly, the other phases will be much harder.

### Phase 2 — Split renderers per node type

The three renderers (`html-renderer.ts`, `react-renderer.ts`, `tailwind-renderer.ts`) have parallel structure: one big function with a `switch (node.type)` that handles 31–39 cases. Split each into:

```
renderer/
  html/
    index.ts          # dispatch (the switch)
    button.ts         # renderButton(node, ctx) → string
    container.ts
    grid.ts
    …
  react/
    (parallel)
  tailwind/
    (parallel)
```

Strategy:

1. Define a shared `NodeRenderer<T>` type per target: `(node: T, ctx: RenderContext) => string`.
2. Extract one node type per commit (or batch by family — e.g., all form elements together).
3. The dispatcher just maps `node.type` to the renderer function. No more giant switches.
4. Watch for **shared helpers** inside the existing renderers (e.g., escape functions, class composers). Those move to `renderer/<target>/_helpers.ts` or a shared `renderer/_helpers.ts`.

This is where you should expect to find subtle coupling — some renderer helpers operate on the `RenderContext` (e.g., the radio-group counter added in this PR). Keep them local to the renderer; don't lift to global state.

After Phase 2, adding a new node type's renderer = "drop one file in each of three directories." The CONTRIBUTING checklist shrinks.

### Phase 3 — Split `transformer.ts` per node type

Same shape as Phase 2 but on the parser side. `transformer.ts` has 17 internal functions; most are per-node-type already (`transformContainer`, `transformInlineContainer`, `transformHeading`, `transformParagraph`, `transformList`, `transformTable`, `transformBlockquote`, etc.). The split is largely "move each function to its own file under `parser/transform/<node>.ts`."

The shared utilities (`processNodeList`, `isHtmlCommentNode`, `collectGridItemsFromContainer`, `serializeMdastChildren`, `extractTextContent`, `parseAttributes`) move to `parser/transform/_helpers.ts`.

Why is this last? It's the riskiest one. The 16 known parser bugs (in `KNOWN_FAILURES`) live here. A split-introduced regression would be hard to distinguish from existing bugs without careful diffing. Do this after the renderers — by then you'll have a feel for the dispatch pattern.

### Phase 4 (optional, after split) — Knock out the parser bug clusters

With the parser decomposed, the existing bugs have natural homes:

- **Formatting cluster** (6 fixtures + 1 closer): probably all in the new `parser/transform/container.ts` (or whatever owns `:::` blocks) and `parser/remark-containers.ts`. One fix likely turns several green.
- **Inline/block** (`text-after-button`, `cards/card`): paragraph-level handling, probably in `parser/transform/paragraph.ts`.
- **Grid opener tokenization** (`text-after-opener-flag`, sidebar layouts): container opener parsing.
- **Quoted attribute values** (`with-placeholder`): the attribute parser, probably standalone.
- **Table-cell badges** (3 fixtures): a new transformer pass over `<td>`/`<th>`.

When a parser bug gets fixed, the matching `.expected-fail.invariants.ts` flips red, the file rename closes the loop, and the matching anchor is removed from `KNOWN_FAILURES`.

## Pending design decisions (don't fix without explicit user input)

These have notes/sidecars but need a design call before any code:

- **`((pill content))` as cleaner badge syntax** — backwards-incompatible. See `__snapshots__/docs/badges/variants.notes.md`.
- **`grid` requiring `::: column` children** — backwards-incompatible. See `__snapshots__/docs/grid/layout-grid-no-card-chrome.notes.md`.
- **Alerts visual depth across all 7 styles** — needs design per style. Currently only `clean` has chrome.
- **`cards/section` and `cards/footer`** — user is unclear what these do. Design clarity needed.
- **`inputs/textarea-columns`** — `[___]{rows:5 cols:40}` should probably emit a `textarea` node. Per `KNOWN_ISSUES.md`.
- **Number-constraint helper text** — design TBD.

## User preferences worth knowing

- **Always PR-based**, never push to main. Always `--repo teezeit/wiremd --base main`. Squash-merge.
- **Minimal blank lines** in fixtures. Required-but-not-load-bearing blanks are tracked as parser bugs.
- **Use `uv run --with <pkg>`** if you need Python.
- **Don't reach for `--no-verify`** — investigate the underlying issue.
- The user wants split-then-fix, not fix-then-split. Don't try to fix parser bugs as part of the split itself.

## Files that pin the contract

If any of these change in unexpected ways, stop and re-read:

- `packages/core/tests/fixtures/REVIEW_LOG.md` — the visual-review state. Committed.
- `packages/core/tests/review-gate.test.ts` — the gate, including `KNOWN_FAILURES`.
- `packages/core/tests/fixtures/__snapshots__/**/*.{html,react.tsx,tailwind.html,tree.txt}` — the rendered-output snapshots.
- `packages/core/tests/fixtures/__snapshots__/**/*.{invariants,expected-fail.invariants}.ts` — executable contracts.
- `packages/core/tests/fixtures/regressions/**` — same as above for hand-written fixtures.
- `packages/core/src/types.ts` — the `WiremdNode` discriminated union; the source of truth for what node types exist.

## How to start

1. Pull `main` (PR #75 should be merged by the time you read this).
2. Branch off: `git checkout -b split-styles` (or whatever phase).
3. `pnpm install && pnpm test` from the root — confirm a green baseline.
4. Read the file you're about to split, top to bottom. Don't touch anything yet.
5. Sketch the target structure (a directory listing is enough). Confirm with the user before moving code.
6. Extract one piece. Run `pnpm test`. Diff should be exactly zero meaningful changes.
7. Commit. Repeat.
8. When the phase is done, open a PR with a descriptive title; the squash-merge commit becomes the audit entry.

The corpus and the gate will tell you if you broke something. Trust them.
