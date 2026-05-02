# Fixture corpus

The wiremd parser/renderer test suite is built around a **fixture corpus**: small markdown inputs paired with snapshots of every renderer's output. Most test coverage for syntax and rendering lives here, not in the older monolith test files.

This README covers:

1. [What's in this directory](#whats-in-this-directory)
2. [Two test channels: snapshots vs invariants](#two-test-channels)
3. [File-naming conventions](#file-naming-conventions)
4. [Adding a fixture](#adding-a-fixture)
5. [Reviewing snapshots — the review tool](#reviewing-snapshots)
6. [Workflow when something fails](#workflow-when-something-fails)
7. [Status legend](#status-legend)

---

## What's in this directory

```
tests/fixtures/
├── regressions/                  # hand-written .md fixtures
│   └── containers/closer/
│       ├── blank-line-before-list.md           ← input
│       ├── blank-line-before-list.html         ← snapshot (HTML)
│       ├── blank-line-before-list.react.tsx    ← snapshot (React)
│       ├── blank-line-before-list.tailwind.html ← snapshot (Tailwind)
│       └── blank-line-before-list.tree.txt     ← snapshot (AST tree)
│
├── __snapshots__/docs/           # auto-extracted from apps/docs/components/
│   ├── buttons/
│   │   ├── basic.html
│   │   ├── basic.react.tsx
│   │   └── basic.tailwind.html
│   └── … (one folder per docs source)
│
├── KNOWN_ISSUES.md               # cross-cutting concerns from snapshot review
├── REVIEW_LOG.md                 # (gitignored) generated review tracker
└── REVIEW.html                   # (gitignored) review tool UI
```

**Two fixture sources:**

- **Regressions** (`regressions/**/*.md`): hand-written cases covering bugs, edge cases, malformed input, robustness, and validation tests. Snapshots co-located with the input.
- **Doc-derived** (`__snapshots__/docs/**`): every `::: demo` block in `apps/docs/components/*.md` is automatically a fixture. Snapshots live separately so they don't pollute the docs source tree. The list of docs files lives in `tests/lib/fixture-runner.ts` (`DOC_SOURCES`).

The single `loadFixtures()` function in `tests/lib/fixture-runner.ts` returns both. The driver test `tests/fixtures.test.ts` runs every fixture through `parse() → renderToHTML() / renderToReact() / renderToTailwind()` and asserts each output matches its snapshot.

---

## The corpus IS the syntax spec

The corpus is functioning as more than a test suite. Each fixture is a worked claim about what wiremd does for a given input — collectively they form the de facto specification of the language. That has a few practical consequences:

- A new syntax feature isn't fully landed until a fixture demonstrates it. Adding the renderer case + a `:::demo` in `apps/docs/components/` are the same act.
- "Does wiremd support X?" can be answered by `grep` (find a fixture demonstrating X). If there isn't one, the answer is "not formally."
- The review tool's `REVIEW.html` is, in effect, "wiremd, every supported pattern, on one page with rendered output." Useful for newcomers, contributors, and self-review.
- **Robustness counts as syntax.** If the parser misbehaves on a common formatting variation, that's a paper cut — and the right place to enumerate the cuts is here, as `.expected-fail.invariants.ts` fixtures that fail until the parser is fixed.

### Rough taxonomy of what the corpus covers today

| Category | Source | Examples |
|---|---|---|
| **Primitives** | `apps/docs/components/{buttons,button-links,inputs,textarea-select,checkboxes-radio,icons,badges}.md` | Button variants, input types, checkbox/radio groups, icons in cells |
| **Layouts** | `{columns,row,cards,tabs,page-layouts,navigation}.md` | Column spans, row alignment, sidebar layout, tabs |
| **Content** | `{tables,alerts,comments,attributes}.md` | Tables with badges, alert variants, comment threads, attributes on containers |
| **Meta** | `{demo,index}.md` | `:::demo` syntax itself, kitchen-sink pages |
| **Closer behavior** | `regressions/containers/closer/` | Closer after list / paragraph / heading; nested containers |
| **Formatting** | `regressions/formatting/` | Whitespace handling, line endings (CRLF), BOM, trailing whitespace, blank-line discipline. The contract: wiremd should accept common formatting variations without breaking. Fixtures here document both cases that work (✅) and cases where the parser is currently strict and the contract is violated (❌). |

A category isn't "covered" unless representative fixtures exist. **If you find an edge case the parser handles correctly that we don't have a fixture for, add one** — even if it works today, that pins the contract going forward. The whole point of the corpus is "what wiremd guarantees," not "what we happened to remember to test."

When a category gets dense enough to deserve its own folder under `regressions/`, give it one. Categories are discovered, not designed.

---

## Three test channels

Bugs and contracts get tracked in one of three places, depending on what they're about:

| Channel | Asserts | Form | Fails when |
|---|---|---|---|
| **Snapshot** | "What the system *currently* produces." | Generated `.html`/`.react.tsx`/`.tailwind.html`/`.tree.txt` next to each fixture. | Output drifts from last commit. Could be a bug, a fix, or a refactor — diff tells the story. |
| **Invariants** | "What the system *must* produce." | Optional `.invariants.ts` (or `.expected-fail.invariants.ts`) sidecar on a specific fixture. | Real correctness violation in the AST/HTML/React/Tailwind output. Don't paper over with `-u`. |
| **Style gaps** | "A specific CSS selector exists in `getStyleCSS('clean', …)`." | `it.fails(...)` (or `it(...)`) in [`tests/styles.test.ts`](../styles.test.ts). | A CSS rule we depend on was removed, or a new gap is documented and not yet filled. |

**Snapshots catch regressions. Invariants catch bugs in rendered output. Style gaps catch missing CSS rules.** Different signals, different responses.

A fixture without an invariants file is fine — most are. Invariants are for cases where you can articulate an output contract that must hold (especially for known bugs tracked before fixing). Style-gap tests live separately because CSS rules don't show up in our snapshot strings — when an AST is correct and the rendered HTML is correct but the *visual output* is wrong, the assertion belongs in `tests/styles.test.ts`.

The two it-fails patterns mirror each other:

- Parser/renderer bug → `<base>.expected-fail.invariants.ts` next to the fixture. When the parser is fixed, the contract starts passing under `it.fails`, vitest reports red, you rename the file (drop `.expected-fail.`) to close.
- Missing CSS rule → `it.fails(...)` in `tests/styles.test.ts`. When the rule lands in `styles.ts`, the test goes red, you drop `.fails` to close.

### Writing assertions that actually catch the bug

**Match what the code emits, not just the shape of it.** An assertion that "a rule exists" passes when *any* rule exists — even one that doesn't match the rendered output. The single most common way bugs ship green here is asserting against an *almost-right* selector. Concrete patterns to follow:

- **Pin the exact class the renderer produces.** When the renderer emits `<div class="wmd-container-alert wmd-success">`, the test asserts `.wmd-container-alert.wmd-success` (no whitespace, no `state-` prefix). A previous version of the alert test only checked `.wmd-container-alert\b` and shipped green while the variant rules silently targeted `wmd-state-success`/`wmd-state-error` — classes the renderer never emits.
- **Require all members of a set, not "at least one".** For `col-span-5` through `col-span-12`, loop and assert each, not `(?:5|6|7|...|12)`. Otherwise a rule for col-span-5 alone hides the gap for col-span-9.
- **Constrain the selector shape.** `.wmd-button[^{]*\.wmd-small` matches both `.wmd-button.wmd-small` (target) and `.wmd-button .wmd-small` (descendant — wrong). Use `\.wmd-button\.wmd-small` to demand the combined form.
- **Require a real declaration, not an empty block.** `expect(css).toMatch(/\.wmd-state-error\b/)` passes for `.wmd-state-error {}`. Tighten to `\.wmd-state-error\b[^{]*\{[^}]*(?:border-color|color)\s*:` so an empty rule can't satisfy the assertion.
- **Fixture invariants follow the same rule.** Assert against `findFirst(ast, 'icon')` and check `props.name` — not just "there's an icon node somewhere."

The fix when an assertion is found to be too weak: tighten it in the same change as the bug fix, so the test would have caught the bug if it had run earlier. See `tests/styles.test.ts` for current examples.

---

## File-naming conventions

For a fixture at `<base>.md`, the runner discovers:

| File | Role | Required? |
|---|---|---|
| `<base>.md` | Input markdown | yes |
| `<base>.html` | HTML renderer snapshot | yes (auto-written by `pnpm test -u`) |
| `<base>.react.tsx` | React renderer snapshot | yes (auto-written) |
| `<base>.tailwind.html` | Tailwind renderer snapshot | yes (auto-written) |
| `<base>.tree.txt` | AST tree snapshot (regressions only) | regressions only |
| `<base>.invariants.ts` | Executable contract that **must** pass | optional |
| `<base>.expected-fail.invariants.ts` | Contract that **currently** fails — documents a known bug | optional |
| `<base>.notes.md` | Free-form review observation | optional |

A fixture can carry **at most one** of `.invariants.ts` and `.expected-fail.invariants.ts` (the runner throws if both exist).

The `.expected-fail.invariants.ts` is wired through vitest's `it.fails(...)`. When the parser is fixed and the contract starts passing, vitest reports "expected to fail but didn't" — forcing the author to rename the file (drop `.expected-fail.`) and refresh the snapshot. **The rename IS the signal that a bug was fixed.**

For regression fixtures, leading `<!-- ... -->` comments at the top of the `.md` are stripped before parsing — use them to document why the fixture exists.

---

## Adding a fixture

### A doc-derived fixture (the easy path)

Add a `::: demo` block to the relevant `apps/docs/components/<name>.md`. Run `pnpm test -u` from `packages/core/`. The fixture and its snapshots appear automatically.

The fixture's name comes from the slugified `##` / `###` heading path (skipping H1 page title). Multiple demos in the same section get a numeric suffix: `basic`, `basic-2`, `basic-3`.

### A regression fixture

```bash
# 1. Create the input
mkdir -p packages/core/tests/fixtures/regressions/<area>/<scenario>
cat > packages/core/tests/fixtures/regressions/<area>/<scenario>/<name>.md <<'EOF'
<!-- regression: short description of why this fixture exists -->
... your wiremd input ...
EOF

# 2. Generate snapshots
pnpm --filter wiremd run test -- tests/fixtures.test.ts -u

# 3. Eyeball the snapshots — open the .html, .tree.txt, etc. in your editor
#    and confirm the output is what you expect. THIS IS THE VERIFICATION STEP.

# 4. Commit input + snapshots together
```

### Adding a new docs source

In `tests/lib/fixture-runner.ts`, append the path to `DOC_SOURCES`. Run `pnpm test -u`. The extraction guard throws loudly if the docs file produces zero `:::demo` blocks.

---

## Reviewing snapshots

For visual judgment of rendered output, use the review tool. It generates a single static HTML page with every fixture rendered with full styles, and uses the File System Access API (Chrome/Edge/Opera) to write status changes back to `REVIEW_LOG.md`.

`REVIEW_LOG.md` is **committed to git** — visual review verdicts are part of the project's source of truth. The [Review gate](#review-gate) test in `tests/review-gate.test.ts` fails when any fixture is ⏳, so the test suite enforces visual review before code can ship.

```bash
# From packages/core/
pnpm review:log    # seeds REVIEW_LOG.md with all fixtures (idempotent — preserves verdicts)
pnpm review        # builds REVIEW.html and opens it in your browser

# In the page header: click "Connect to REVIEW_LOG.md" → grant write access.
# Per fixture row: glance source + rendered output, click a status emoji,
# optionally type a comment. Autosaves on blur.

# After a code change that affects rendering — refresh snapshots AND flip
# the affected fixtures back to ⏳ in one shot:
pnpm review:refresh   # = pnpm review:log + pnpm test -u + pnpm review:flag --snapshot-changes

# Or do the steps manually:
pnpm review:flag "alerts/variants" "active-state"  # by id, short name, or glob
pnpm review:flag --snapshot-changes                # working-tree-vs-HEAD
pnpm review:flag --snapshot-changes --since HEAD~1 # commit-range
pnpm review:flag --all                             # flip everything (fresh sweep)
```

Each fixture row has 3 columns:
- **Left**: input markdown (`.md` source).
- **Middle**: rendered output (styled, in an iframe — full visual fidelity).
- **Right**: status buttons (⏳/✅/❌/📝/🚧) + comment textarea + saved indicator.

Row border colour reflects status. Top filter chips restrict visible rows. Sticky TOC on the left lets you jump.

`REVIEW_LOG.md` is a reference-style markdown checklist — the source of truth for the sweep. Hand-edits are also fine; the page picks them up on the next focus event. Re-running `pnpm review:log` is **idempotent**: existing verdicts and comments are merged forward verbatim, new fixtures land at their filesystem-derived status, removed fixtures drop out.

After the sweep, ask Claude (or do it yourself) to translate `📝` and `❌` log entries into `.notes.md` and `.expected-fail.invariants.ts` files. The log captures intent; promotion to executable contracts is deliberate.

### Review gate

[`tests/review-gate.test.ts`](../review-gate.test.ts) parses `REVIEW_LOG.md` and fails if any fixture is ⏳. This makes visual review load-bearing in the test suite: a snapshot change cannot ship until a human has clicked ✅ in the page.

#### The loop when your change affects rendering

```bash
# 1. edit code
# 2. refresh snapshots AND flag affected fixtures as ⏳
pnpm review:refresh

# 3. confirm the gate is now red — error names every pending fixture
pnpm test

# 4. eyeball the rendered output, click ✅ on each row that looks right
pnpm review

# 5. gate is green again — commit
pnpm test && git commit
```

CI enforces the same: a PR with un-reviewed snapshot drift cannot merge.

The gate is a forcing function, not a lock. If you need to ship without review (don't), manually flip the row in `REVIEW_LOG.md` — git history will show that the verdict was set without a review commit, which is the audit trail.

---

## Workflow when something fails

### Snapshot mismatch on `pnpm test`

Read the diff *before* you reach for `-u`. Three things you might be seeing:

1. **A real bug just got introduced.** Diff shows wrong-looking output. → fix the code, don't update the snapshot.
2. **An intentional change.** You touched the renderer, output is what you want. → `-u`, eyeball, commit.
3. **Formatter/editor mangled a snapshot file.** Diff shows reformatted whitespace, lowercase `<!doctype>`, etc. → `-u` to revert. (`.prettierignore` should prevent this; if you're seeing it, your editor is overriding the ignore rules.)

**If the diff is hard to understand at a glance, do not `-u`.** Snapshots are most useful when the diff tells a story.

### An `it.fails(...)` test "passed unexpectedly"

This is a parser fix surfacing. Protocol:

1. Open the `.expected-fail.invariants.ts` file. Confirm the contract still describes correct behavior.
2. **Rename** the file: drop `.expected-fail.` (now `<base>.invariants.ts`).
3. Run `pnpm test -u` to refresh the now-correct snapshot.
4. Commit. The bug-doc-fixture is now a regression-guarantee fixture.

The rename is intentional friction — it forces you to actively close out a bug rather than silently letting `it.fails` keep passing under different reasoning.

### Found a bug while reviewing

Three options, choose by how confident you are:

- **Vague: "this looks weird"** → write `<base>.notes.md` (or use the review tool's comment field). Snapshot stays as-is. Triage later.
- **Concrete: "X should produce Y"** → write `<base>.expected-fail.invariants.ts` declaring the contract. Mark in REVIEW_LOG.md. Test fails red until parser is fixed.
- **Cross-cutting: "this affects many fixtures"** → add an entry to `KNOWN_ISSUES.md`. (Example: variant button classes have no CSS in `clean` style — affects every variant fixture.)

**Never edit a snapshot file directly.** It will get clobbered by the next `-u`, fail the test until then, and the format may not match what your code actually produces.

### Editor formatters corrupting snapshots

`.prettierignore` covers this. If your editor still reformats snapshot files on save, your editor is bypassing the ignore file — adjust your editor settings, not the snapshots.

---

## Status legend

Used in `REVIEW_LOG.md`, the review tool, and this README:

| Icon | Meaning | Files |
|---|---|---|
| ⏳ | Todo (not yet reviewed) | none |
| ✅ | OK (verified correct) | `<base>.invariants.ts` if a contract is also worth pinning |
| ❌ | Failing — currently broken with a contract | `<base>.expected-fail.invariants.ts` |
| 📝 | Noted — vague observation | `<base>.notes.md` |
| 🚧 | Known cross-cutting issue | entry in `KNOWN_ISSUES.md` |

---

## Things that can bite you

- **Running `-u` blindly.** It's the loaded gun. Snapshots are only as good as the human who reviews the diff before accepting.
- **Treating `it.fails` as "test that passes."** Every `.expected-fail.invariants.ts` in the repo is a parked bug waiting to be fixed.
- **Adding fixtures without reviewing.** A snapshot that locks in broken output is worse than no test — it makes the bug *harder* to fix later. The verification step at first commit is the most important moment in a fixture's life.
- **`KNOWN_ISSUES.md` growing without action.** It's a triage queue, not a graveyard. Prune entries when fixed or moved to issue tracking.

---

## Current state & next steps

This is the handover surface for a fresh conversation or contributor. Updated as work progresses.

### Where we are

- **114 fixtures** in the corpus (3 regressions + extracted from 19 docs files). Total test count: 1149 passing.
- **18 parser/renderer bugs** tracked as `.expected-fail.invariants.ts` on individual fixtures (will turn red the moment a fix lands; rename to drop `.expected-fail.` to close).
- **6 CSS gaps** tracked as `it.fails` in `tests/styles.test.ts` (assert specific selectors exist in `getStyleCSS('clean', …)`; flips red when the rule lands).
- **4 design-pending entries** in `KNOWN_ISSUES.md` (alerts depth, attribute-hook docs, number-constraint helper, textarea-columns syntax) — items that need a decision before they can become an executable contract.
- **Review tool** (`pnpm review` from `packages/core/`) is operational; uses the File System Access API for round-tripping `REVIEW_LOG.md`.
- One full snapshot review sweep complete (`REVIEW_LOG.md` reflects user verdicts, gitignored).

### Suggested order of work

The bug list is now machine-checkable. Pick a category and the test suite tells you when you're done.

**1. Formatting bugs (smallest, highest leverage).** Six `.expected-fail.invariants.ts` in `regressions/formatting/` plus one in `regressions/containers/closer/`. Likely share machinery in `parser/remark-containers.ts` and `parser/transformer.ts`. When fixed, several tests turn green at once.

**2. Inline-text bugs.** `regressions/inline/text-after-button` and the related `docs/cards/card`. Concerns how block-level elements interact with surrounding text in markdown paragraphs.

**3. Grid opener parsing.** `regressions/grid/text-after-opener-flag` (the `card` flag gets eaten by trailing text). Localized to opener-line tokenization.

**4. Quoted attribute values with spaces.** `docs/inputs/with-placeholder`. The attribute parser drops everything after the first space inside a quoted value.

**5. Badge syntax in table cells.** Closed: `((cell)){.warning}` works inside `<td>` without escaping table pipes. The legacy escaped pipe form remains covered as an alias.

**6. Sidebar layout.** `docs/page-layouts/sidebar-layout` + `sidebar-with-sections`. Same family as the formatting bugs (no blank line after `::: sidebar`).

**7. Renderer/CSS pass.** Pick an `it.fails` from `tests/styles.test.ts`, add the missing rule in `src/renderer/styles.ts`, drop `.fails` from `it.fails`. (`KNOWN_ISSUES.md` only holds design-pending entries now.)

**8. Property tests + coverage gate** (Phase 5 of the original plan). `tests/property/` with `fast-check`, plus a CI floor on `src/parser/` and `src/renderer/`. Surfaces parser bugs that no human enumerated.

### Design decisions worth knowing

- **Fixtures are the syntax spec.** A new feature isn't done until a fixture demonstrates it. `:::demo` blocks in `apps/docs/components/*.md` are auto-extracted as fixtures — so docs and tests are unified.
- **Minimal-blank-line style.** Fixtures use the smallest set of blank lines required. Where a blank line is currently load-bearing (e.g., before `:::` closer), we document it as a parser bug, not a feature.
- **Robustness counts as syntax.** If the parser misbehaves on a common formatting variation, the right place to catalog it is here as a `.expected-fail.invariants.ts`.
- **Topic folders, not verdict folders.** Folder names describe what's being tested (`formatting/`, `inline/`, `grid/`); status emoji and `.expected-fail.` suffix carry the verdict.
- **Static review tool over server-backed.** `REVIEW.html` is a single static page that uses File System Access API to round-trip `REVIEW_LOG.md`. No backend.

### Pending decisions (not yet committed to)

- **`inputs/textarea-columns`** — `[___]{rows:5 cols:40}` should probably emit a `textarea` node. Documented in `KNOWN_ISSUES.md`. No fix planned yet.
- **Badge syntax migration** — `((pill content))` is the primary badge syntax. The legacy pipe-delimited form is still accepted as an alias during migration.
- **`grid` should require `::: column` children?** Design suggestion to mirror tabs syntax. Backwards-incompatible. Documented in `grid/layout-grid-no-card-chrome.notes.md`.
- **Alerts implementation** — AST exists; styles missing for all 7 visual styles. Likely substantial work.

### What a fresh session needs to do to continue

1. Read this README from the top.
2. Read `KNOWN_ISSUES.md`.
3. Pick a category from "Suggested order of work" (1–8 above).
4. For parser bugs: open the `.expected-fail.invariants.ts`, read the contract, fix the parser/renderer until the contract holds, rename the file to drop `.expected-fail.`, refresh the snapshot with `pnpm test -u`, commit.
5. For renderer gaps: pick a section in `KNOWN_ISSUES.md`, add CSS in `src/renderer/styles.ts`, refresh snapshots, eyeball them, commit. Prune the entry from `KNOWN_ISSUES.md`.

The test suite is the truth. The README is the map. The bugs are bookmarked in `.expected-fail.invariants.ts` files.

---

## Test infrastructure (for the curious)

| File | Role |
|---|---|
| `tests/lib/fixture-runner.ts` | Discovers regressions + doc-derived fixtures; resolves invariants files |
| `tests/lib/extract-demos.ts` | Regex-based extraction of `:::demo` blocks (deliberately doesn't use the parser — would couple test discovery to the SUT) |
| `tests/lib/ast-serializer.ts` | Pretty-tree formatter for `.tree.txt` snapshots, position-stripped |
| `tests/lib/*.test.ts` | Unit tests for the infrastructure itself |
| `tests/fixtures.test.ts` | The driver — iterates `loadFixtures()`, asserts snapshots, runs invariants |
| `tests/styles.test.ts` | The CSS-gap channel — `it.fails` against `getStyleCSS('clean', …)` for missing rules |
| `tests/review-gate.test.ts` | The visual-review gate — fails on any ⏳ row in `REVIEW_LOG.md` |
| `scripts/build-review-log.ts` | Seeds `REVIEW_LOG.md` (idempotent — re-runs merge with existing verdicts) |
| `scripts/build-review-page.ts` | Builds `REVIEW.html` with FSAccess-driven log round-tripping |
| `scripts/flag-review.ts` | Flips fixtures back to ⏳ after a code change (used by `pnpm review:flag`) |

The infrastructure is unit-tested (24 tests). Bugs in it would corrupt every snapshot downstream, so it doesn't get a free pass.
