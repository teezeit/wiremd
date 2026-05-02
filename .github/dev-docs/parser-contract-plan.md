# Parser contract plan — handover

This is a self-contained brief for the agent or contributor who picks up parser-side work after the renderer split (PRs #77 / #78 / #79). Read top-to-bottom; everything you need is here.

## The arc

The user's plan, restated:

> "first we fix the tests, then we split the monolith — that's the whole idea, make the core lib more easily extendable. but in order to do so, we need good testing."

PR #75 closed "fix the tests."
PRs #77 #78 #79 closed "split the renderer monolith" (each renderable node type lives in `packages/core/src/nodes/<type>/` with a `NodeDefinition<K>` registered in `_registry.ts`; legacy renderers shrunk 2,214 → 383 lines).

This doc is the **next** chunk: **fix the parser contract** so that future syntax changes and parser bug fixes are cheap. The parser is still monolithic (`packages/core/src/parser/transformer.ts`, ~1,892 lines) and is now the highest-friction file in the codebase.

## Why a parser contract before a parser split

The original instinct was "split the parser per node type the same way we split renderers." That instinct is not wrong, but the leverage analysis says it's the **wrong first move**:

- The transformer is **already** organized per-node internally — 17 named functions: `transformContainer`, `transformParagraph`, `transformList`, etc. Splitting them into separate files is mostly mechanical. It produces tidier file structure but doesn't make bugs easier to find or fix.

- The 17 `KNOWN_FAILURES` aren't hard to **locate** today. Fixtures already isolate them by feature (`fixtures/regressions/formatting/blank-line-before-list.expected-fail.invariants.ts`). `git grep` finds the relevant transform function in seconds.

- The bugs that are **hard to fix** are the ones with cross-node coupling:
  - `transformParagraph` peeks at the next MDAST sibling for select-options lookahead and consumes it via `i++` in the parent loop. Implicit. Easy to forget, easy to misuse.
  - Container parsing flattens following headings into grid-items, swallows preceding HTML comments into tabs, and so on. Cross-cutting logic that doesn't belong to any single node type.
  - There's no way to unit-test `transformContainer(mdastNode, ctx)` in isolation. Every parser test goes through `parse(markdown)` end-to-end. Bug fixes feel scary because you don't know what else they'll break.

A file split makes none of those better. Splitting on top of these problems just spreads them across more files.

**The leverage is in the contract, not the file structure.** Once the contract is right, the file split becomes mechanical (or unnecessary).

## The plan

One PR. Two pieces. Land them together.

### Piece A — `TransformContext` with explicit lookahead

Replace the implicit `nextNode` parameter + `i++` in `processNodeList` with a proper `TransformContext` object passed to every transform function. The context exposes lookahead and consumption as first-class operations.

```ts
// packages/core/src/parser/_context.ts (new)
export interface TransformContext {
  options: ParseOptions;

  // Recursion: transform a single child / list of children.
  transformChild(mdast: unknown): WiremdNode | null;
  transformChildren(mdast: unknown[]): WiremdNode[];

  // Lookahead: peek at the next sibling MDAST node without consuming it.
  // Returns null at end-of-list.
  peekNext(): unknown | null;

  // Consume the next sibling so the parent loop skips it.
  // (Replaces the implicit `i++` in processNodeList.)
  consumeNext(): void;

  // Shared parser helpers (currently inlined in transformer.ts).
  parseAttributes(text: string): Record<string, unknown>;
  extractTextContent(mdast: unknown): string;
  isHtmlCommentNode(mdast: unknown): boolean;
}
```

Every `transform<NodeType>` function changes from:

```ts
function transformParagraph(node: any, options: ParseOptions, nextNode?: any): WiremdNode | null {
  // ... implicit lookahead via nextNode parameter
  // ... children via processNodeList(...)
}
```

to:

```ts
function transformParagraph(node: any, ctx: TransformContext): WiremdNode | null {
  // ... explicit lookahead via ctx.peekNext() / ctx.consumeNext()
  // ... children via ctx.transformChildren(node.children)
}
```

The `processNodeList` driver becomes:

```ts
export function processNodeList(nodes: any[], options: ParseOptions): WiremdNode[] {
  const result: WiremdNode[] = [];
  let i = 0;
  while (i < nodes.length) {
    const ctx: TransformContext = makeContext(nodes, i, options, /* skipNext callback */);
    const out = transformNode(nodes[i], ctx);
    if (out) result.push(...(Array.isArray(out) ? out : [out]));
    i = ctx.cursor; // ctx.consumeNext() advanced this
  }
  return result;
}
```

What this fixes:

- **Lookahead becomes auditable.** Every place that peeks at a sibling has an explicit `ctx.peekNext()` call. Today you have to read the call site of `processNodeList` and guess.
- **Consumption is a first-class operation.** Forgetting to consume after peeking is a bug today; with the contract it's structurally visible.
- **Nested transforms get a clean recursion surface.** Container subtrees use `ctx.transformChildren(node.children)` instead of calling `processNodeList` directly, which makes context propagation uniform.

### Piece B — Isolated parse tests

Add a way to call `transformX(mdast, ctx)` in isolation against crafted MDAST inputs. Today every parser test has to construct full markdown that triggers the path — slow feedback, brittle assertions, and you can't easily test edge cases that natural markdown wouldn't produce.

Concretely:

```ts
// packages/core/tests/lib/transform-test-helpers.ts (new)
import { fromMarkdown } from 'mdast-util-from-markdown';
// ... wiremd's remark plugins

export function mdastFor(markdown: string): MdastNode {
  // Run the same parser pipeline as parse() but stop at MDAST.
  return parsePipeline(markdown);
}

export function makeTestContext(siblings: unknown[] = []): TransformContext {
  // Build a TransformContext over a synthetic sibling list.
  // peekNext()/consumeNext() walk `siblings`.
}
```

With those primitives:

```ts
// packages/core/tests/parser/container.test.ts (new)
import { transformContainer } from '../../src/parser/transformer.js';
import { mdastFor, makeTestContext } from '../lib/transform-test-helpers.js';

describe('transformContainer', () => {
  it('grid containers with following headings flatten them as grid-items', () => {
    const mdast = mdastFor('::: grid\n### Item one\n### Item two\n:::');
    const node = transformContainer(mdast.children[0], makeTestContext());
    expect(node?.type).toBe('grid');
    expect(node?.children.map(c => c.type)).toEqual(['grid-item', 'grid-item']);
  });

  it('does not consume the next sibling outside the container', () => {
    // crafted siblings — exercises peekNext/consumeNext contract
    const ctx = makeTestContext([{ type: 'paragraph' }]);
    transformContainer(/* container mdast */, ctx);
    expect(ctx.cursor).toBe(0); // didn't consume the paragraph
  });
});
```

What this enables:

- **Tight feedback for parser bug fixes.** A test failure points at the exact transform function and the exact MDAST input. You don't have to bisect across the markdown→MDAST→AST→render pipeline.
- **Edge case coverage.** Some edge cases require contrived MDAST that natural markdown rarely produces (nested wiremd containers with empty children, comments interleaved with grid items, etc.). With direct unit tests these become trivial.
- **Refactor safety net for piece A.** Without isolated tests the contract change in piece A is hard to verify — fixtures only catch end-to-end regressions, not "did `transformParagraph` peek at the wrong thing?"

Add a per-node test file as you migrate each function to the new context. Don't try to write all of them up front; let the bug-fix work pull them in.

## What this PR is NOT

- **Not a file split.** The transformer stays in one file. Each function gets the new `ctx` parameter; that's it.
- **Not a bug-fix PR.** The 17 `KNOWN_FAILURES` stay `.fails` — refactor must not change parser behavior. If a fixture flips green during the refactor, that's a side effect to investigate, not celebrate.
- **Not a syntax change.** The user has a list of pending syntax changes (see "Syntax direction" below). They land in separate PRs *after* this one.
- **Not a `nodes/<type>/parse.ts` migration.** The renderer-side `nodes/<type>/` modules stay focused on render. If the parser ever splits per node, that's a separate PR after this contract lands.

## Syntax direction (captured for the next session)

The user is planning syntax changes. They are **not part of this PR**, but they justify why the parser contract is worth fixing first — every change below is a parser change, and adding them on top of the current implicit-lookahead pattern compounds the bug surface.

The list, with the agent's pre-discussion takes:

1. **`((pill))` instead of `|pill|`** — landed in PR #92 as the primary badge syntax. Doubled delimiters are easier to scan, harder to typo, and work inside Markdown tables without escaping. Legacy pipe pills remain accepted as an alias during migration.

2. **Consistent `{.classname}` over bare `{classname}` or modifier syntax** — yes. Standard pandoc/markdown-attr convention; already de facto used. Removes ambiguity in attribute parsing. Touches `parser/transformer.ts` (the `parseAttributes` helper).

3. **`:::columns` instead of `:::grid`** — yes. "Grid" implies CSS Grid (rows + columns + areas + spans); "columns" is what people actually want. Same internal AST node; rename only. Add `:::grid` as deprecated alias for one release. Touches container parsing and renderer-side classes.

4. **Disallow `:::row` with `### {.right}`-style alignment** — yes. Rows are for inline arrangement; using `### {.right}` to push items inside a row is a smell. Force layout to use grids; force alignment to use direct attributes. Removes a class of bug reports. Touches container parsing.

5. **Free-floating `{.right} {.center} {.left}` ⚠️** — push back. The user's idea was "applies to nearest element until resolved by another alignment class" — this is **stateful** parsing (every block carries an ambient alignment that flows down until interrupted). Pandoc, CommonMark, every markdown extension that's tried this has either backed off or lived with the bugs. Hard no.

   **Counter-proposal**: `{.right}` etc. apply to the **immediately preceding or following element only.** Stateless. Verbose if you want three right-aligned items in a row, but errors stay local and the parser stays simple.

6. **Navbar with `|` separators** — push back; offer alternative. `[[ left | middle | right ]]` introduces a new sub-grammar inside `[[ ... ]]`, including escape rules ("what if my content contains a `|`?"). Plus `|` collides with table syntax in surrounding context.

   **Counter-proposal**: just allow alignment classes inside `[[ ... ]]` items. `[[ **Brand** [Home](/) [Pricing](/p) [Sign up]*{.right} ]]` — the `{.right}` pushes "Sign up" to the far right; everything else stays left-aligned. Same effect, zero new grammar.

The order the user is likely to pursue these (best-guess): `((pill))` first (smallest visible win), then `:::columns` rename, then attribute consistency, then disallow row+heading alignment. The free-floating alignment and navbar separator ideas need design conversations before any code.

**Migration tooling**: every syntax change rewrites fixtures. The fixture corpus *is* the syntax spec ([`feedback-fixtures-as-syntax-spec`](../../packages/core/tests/fixtures/README.md) memory). Plan to write a small fixture-rewrite script per syntax change rather than hand-editing 120 fixtures three times.

## The safety net (preserve through the refactor)

Same as the renderer split:

- **Snapshot tests**: every fixture's HTML/React/Tailwind/tree output must be byte-identical after the refactor. If a snapshot drifts, the refactor changed parser behavior — that's a bug, not a snapshot to update.
- **17 `KNOWN_FAILURES`**: must continue failing. A side-effect green is a regression in disguise.
- **`tests/parser.test.ts` and `tests/integration.test.ts`**: classic end-to-end parser tests. All must pass.
- **`tests/registry.test.ts` and `tests/styles-split.test.ts`**: contract tests for the renderer-side split (PR #77). Unrelated, must stay green.
- **Public exports** in `packages/core/src/index.ts`. Don't change the surface area.

The visual-review gate (`pnpm review:refresh`) enforces snapshot drift mechanically; same workflow as before.

## The 5-step contributor loop (use this for the parser PR)

```bash
# 1. edit code (transformer.ts + new _context.ts + new parse tests)
# 2. refresh snapshots and flag affected fixtures as ⏳
pnpm review:refresh

# 3. confirm the gate is green — ZERO ⏳ flips on a pure refactor
pnpm test

# 4. (no eyeballing needed for a pure refactor — but still useful)
pnpm review

# 5. green — commit
pnpm test && git commit
```

A pure parser-contract refactor produces **zero** snapshot diffs. If `pnpm review:refresh` shows fixtures going to ⏳, the refactor changed parser behavior. Investigate before continuing.

## Concrete first steps

1. Branch: `git checkout -b parser-contract`
2. Read `packages/core/src/parser/transformer.ts` top-to-bottom. Don't edit yet.
3. Map the existing implicit lookahead points: every `nextNode` parameter, every `i++` in `processNodeList`, every place that peeks at children before consuming them.
4. Write `packages/core/src/parser/_context.ts` with the `TransformContext` interface and a `makeContext(siblings, options)` factory.
5. Migrate `processNodeList` to use the context. Run tests — all green, zero drift.
6. Migrate transform functions one at a time, starting with the simplest leaf (`transformText` is trivial). Each migration: change signature, update body to use `ctx.transformChildren` / `ctx.peekNext` / `ctx.consumeNext`, run tests, zero drift.
7. After 2-3 functions, write the test helpers (`mdastFor`, `makeTestContext`) and add per-node parse tests. Don't backfill — only add tests for the functions you've migrated.
8. Continue migrating functions. Each one becomes safer once isolated tests are in place.
9. When all transform functions use the new context, delete `nextNode` parameters and the `i++` patterns from `processNodeList`. The contract is now enforced.

Open the PR with a descriptive title; the squash-merge commit becomes the audit entry.

## User preferences (carry through every PR)

- **Always PR-based**, never push to main. `gh pr create --repo teezeit/wiremd --base main`. Squash-merge.
- **Minimal blank lines** in fixtures. Required-but-not-load-bearing blanks are tracked as parser bugs.
- **Use `uv run --with <pkg>`** if you need Python.
- **Don't reach for `--no-verify`** — investigate hook failures.
- **Bug fixes are separate PRs from refactors.** The parser contract PR must not green any `.expected-fail.invariants.ts` test as a side effect.
- **Fixtures are the spec.** Don't add new syntax features in this PR; design conversations first, then a separate PR per syntax change.

## Files that pin the contract

If any of these change in unexpected ways during the parser-contract PR, stop and re-read:

- `packages/core/tests/fixtures/REVIEW_LOG.md` — visual-review state
- `packages/core/tests/review-gate.test.ts` — gate + `KNOWN_FAILURES` list
- `packages/core/tests/fixtures/__snapshots__/**` — rendered-output snapshots
- `packages/core/tests/fixtures/__snapshots__/**/*.{invariants,expected-fail.invariants}.ts`
- `packages/core/src/parser/transformer.ts` — the file being refactored
- `packages/core/src/parser/index.ts` — `parse()` entry point
- `packages/core/src/types.ts` — `WiremdNode` discriminated union (don't touch in this PR)

## How to start

1. Pull `main`. Confirm it's at PR #80 or later (`docs: update CLAUDE.md + CONTRIBUTING.md`).
2. `pnpm install && pnpm test` from `packages/core/` — confirm a green baseline (1,180+ tests).
3. Branch off `main`. Skim this doc, skim the previous handover at `.github/dev-docs/monolith-split-plan.md` (superseded but useful context).
4. Read `packages/core/src/parser/transformer.ts` top-to-bottom before touching anything.
5. Sketch the `TransformContext` in `_context.ts` first. Don't migrate functions yet.
6. Migrate one transform at a time. The fixture corpus + visual-review gate will tell you immediately if you broke something.
7. Open the PR when the contract is enforced and zero `nextNode` parameters / `i++` patterns remain in the transformer.

The corpus and the gate will tell you if you broke something. Trust them.
