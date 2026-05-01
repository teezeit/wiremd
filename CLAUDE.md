# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**wiremd** converts Markdown with extended wireframing syntax into visual wireframes. It ships as an npm library, a CLI tool, and a VS Code extension. Input is `.md` files with wiremd syntax; output is HTML (7 styles), React/JSX, Tailwind, or JSON.

## Commands

Run from the monorepo root (requires pnpm):
```bash
pnpm install             # install all workspaces in one shot
pnpm turbo run build     # build everything (core first, then apps/extensions)
pnpm turbo run test      # run all tests
pnpm turbo run dev       # start all dev servers
pnpm turbo run typecheck
pnpm turbo run lint

# Run a single workspace:
pnpm --filter wiremd run build
pnpm --filter wiremd run test
pnpm --filter wiremd run test:watch
pnpm --filter wiremd-editor run dev
pnpm --filter wiremd-docs run dev
pnpm --filter wiremd-landing run dev
pnpm --filter wiremd-preview run dev   # VS Code extension watcher
```

Run from `packages/core/` for core-library work:
```bash
pnpm run build        # TypeScript + Vite → dist/
pnpm run test         # vitest run
pnpm test -- tests/parser.test.ts              # single test file
pnpm test -- tests/parser.test.ts -t "Button"  # single test by name
pnpm test -- tests/fixtures.test.ts -u         # refresh fixture snapshots
pnpm run test:coverage
pnpm run typecheck
pnpm run lint

# Snapshot review tool (for visually verifying fixture rendering):
pnpm review:log       # seed REVIEW_LOG.md from filesystem state
pnpm review           # build REVIEW.html and open in browser
```

CLI usage (after build):
```bash
wiremd input.md --style clean --serve 3001 --watch
wiremd input.md -o output.html -f html -s sketch
```

## Monorepo layout

```
wiremd/                          ← monorepo root (private, NOT published)
├── packages/
│   └── core/                   ← published "wiremd" npm package (src/ bin/ tests/)
├── apps/
│   ├── docs/                   ← VitePress docs, port 5173
│   ├── landing/                ← marketing site (Vue), port 5175
│   └── editor/                 ← web editor (Monaco), port 5174
├── extensions/
│   ├── vscode/                 ← VS Code live preview extension
│   ├── figma/                  ← imports wiremd JSON into Figma as native designs
│   └── skills/                 ← Claude skill (wireframe/ — zip uploaded to claude.ai)
├── scripts/                    ← build-bundle.mjs, sync-versions.mjs, package-skill.sh
├── pnpm-workspace.yaml
├── turbo.json
└── package.json                ← private root, delegates to turbo run
```

Apps and extensions depend on the core library via `"wiremd": "workspace:*"` — pnpm resolves this to `packages/core/` automatically.

Cross-app links use `import.meta.env.DEV` in the frontend apps and `process.env.WIREMD_DEV` in the VitePress config to resolve the correct port in dev vs. the shared `/wiremd/` base path in production.

## Architecture

The pipeline: `Markdown string → parse() → WiremdAST → render*() → HTML/React/JSON/Tailwind`

```
packages/core/src/
├── types.ts                        # ~40 discriminated-union AST node types
├── index.ts                        # Public exports
├── parser/
│   ├── index.ts                    # parse() + validate(); calls resolveIncludes()
│   ├── transformer.ts              # MDAST → wiremd AST (the bulk of parsing logic)
│   ├── remark-containers.ts        # ::: block syntax plugin (supports nesting)
│   └── remark-inline-containers.ts # [[ ... ]] nav/inline syntax plugin
└── renderer/
    ├── index.ts                    # renderToHTML(), renderToReact(), renderToJSON(), renderToTailwind()
    ├── html-renderer.ts            # Component → HTML string (handles all node types)
    ├── react-renderer.ts           # Component → React/JSX string
    ├── tailwind-renderer.ts        # Component → Tailwind-classed HTML
    └── styles.ts                   # 7 CSS style systems (sketch, clean, wireframe, material, brutal, tailwind, none)
```

**Parser flow**: unified/remark parses standard Markdown into MDAST, then `remark-containers` and `remark-inline-containers` handle wiremd-specific syntax (`::: card`, `[[ nav ]]`, buttons `[Label]*`, inputs `[_____]`). The transformer walks the MDAST and emits wiremd AST nodes.

**Styles**: Each visual style is a self-contained CSS string in `styles.ts`. The `sketch` style uses Comic Sans / hand-drawn look; `clean` is modern minimal; `wireframe` is traditional grayscale. Passed as `{ style: 'clean' }` to render functions.

**CLI** (`packages/core/src/cli/index.ts`): arg parsing → calls parse()+render() → optionally starts a chokidar watcher + WebSocket live-reload server. The `packages/core/bin/wiremd.js` wrapper loads the ESM CLI module.

**VS Code extension** (`extensions/vscode/`): `src/extension.ts` registers commands; `src/preview-provider.ts` is the WebView that embeds the rendered HTML and refreshes on save. Depends on core via `"wiremd": "workspace:*"`.

**VS Code extension local development**: uninstall any installed Wiremd extension, then launch VS Code with the dev build loaded into your current window:
```bash
code --extensionDevelopmentPath=$(pwd)/extensions/vscode .
```
Run both watchers in parallel terminals:
```bash
pnpm --filter wiremd run dev          # core: rebuilds dist/ on src/ changes
cd extensions/vscode && pnpm run dev  # extension: rebuilds dist/ on changes
```
After edits rebuild: `Cmd+Shift+P` → "Developer: Reload Window".

## Testing

**Fixture corpus** (preferred for syntax/render tests) — `packages/core/tests/fixtures/` + driver `tests/fixtures.test.ts`. Two sources: hand-written regressions under `regressions/` and auto-extracted `:::demo` blocks from `apps/docs/components/` (list in `tests/lib/fixture-runner.ts`). Each fixture parses to AST and renders to HTML/React/Tailwind/tree snapshots; opt-in `.invariants.ts` (or `.expected-fail.invariants.ts`) sidecars assert correctness contracts and track known bugs as `it.fails` until fixed. Adding a `:::demo` to a docs file automatically adds a regression test. **See [`packages/core/tests/fixtures/README.md`](packages/core/tests/fixtures/README.md) for the full workflow** — conventions, sweep tooling (`pnpm review`), and the snapshots-vs-invariants split.

**Classic tests** live in `packages/core/tests/`: `cli.test.ts`, `cli-unit.test.ts`, `server.test.ts`, `error-handling.test.ts`, `validation.test.ts`, `package-shape.test.ts`, `integration.test.ts`, `edge-cases.test.ts`, `api-examples.test.ts`, plus the older monoliths `parser.test.ts` / `renderer.test.ts` / `react-renderer.test.ts` / `tailwind-renderer.test.ts` (gradually migrating into the fixture corpus). Use these for CLI behaviour, error paths, validation messages, server lifecycle, and anything that's not pure parse-then-render. Vitest with node environment; globals enabled.

**E2E tests** live in `tests/e2e/` (Playwright, configured at root `playwright.config.ts`). They run against the deployed site at `teezeit.github.io` — not locally. Run with `pnpm exec playwright test`.

## Build output

`packages/core/vite.config.ts` emits both ESM (`dist/index.js`) and CJS (`dist/index.cjs`) with TypeScript declarations. The CLI entry is excluded from the library bundle and built separately.

## New features

Before marking a feature done, run through the **Feature Development Checklist** in `CONTRIBUTING.md`. It covers: types → parser → renderers (HTML/React/Tailwind) → renderer index → public exports → CLI → editor → VS Code extension → tests → CHANGELOG → docs → skill → landing page → URL share smoke test.

## Releasing

Four artifacts ship together under a single version: npm package (`@eclectic-ai/wiremd`), VS Code extension, Claude skill (`plugin.json`), and standalone CLI bundle.

```bash
# Bump version from monorepo root — syncs extensions/vscode/package.json
# and extensions/skills/wireframe/.claude-plugin/plugin.json via the `version` hook:
pnpm version:patch   # or version:minor / version:major
git push && git push --tags
```

Pushing the tag triggers the full automated pipeline:
1. `release.yml` — creates the GitHub release (uses `GH_PAT` so step 2 fires)
2. `publish.yml` — publishes `@eclectic-ai/wiremd` to npm, publishes VS Code extension to Marketplace, attaches skill zip

**Extension-only fix**: bump `extensions/vscode/package.json` independently (`cd extensions/vscode && npm version patch`), then create a GitHub release manually for that tag. The core npm version stays unchanged.

See `CONTRIBUTING.md` → Release Process for the full checklist and required GitHub secrets (`GH_PAT`, `NPM_TOKEN`, `VSCE_PAT`).

See `CONTRIBUTING.md` → Release Process for the full checklist.
