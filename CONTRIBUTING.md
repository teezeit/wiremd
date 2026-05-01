# Contributing to wiremd

Thank you for your interest in contributing to wiremd! This document provides guidelines and information for contributors.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Code samples** or markdown examples
- **Environment details** (Node version, OS, etc.)
- **Error messages** or screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Proposed solution** if you have one
- **Examples** of how it would work

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the development setup** below
3. **Make your changes** following our coding standards
4. **Add tests** for any new functionality
5. **Update documentation** as needed
6. **Ensure tests pass** with `pnpm turbo run test`
7. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm 9+ — npm and yarn are blocked by a `preinstall` guard. Install with `npm install -g pnpm` or `corepack enable`.

### Getting Started

All commands run from the repo root unless noted. The workspace is driven by Turborepo — `pnpm turbo run <task>` fans the task out to every package that defines it, with caching and correct dependency order.

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/wiremd.git
cd wiremd

# Install all workspaces in one shot
pnpm install

# Build everything (core first, then apps & extensions)
pnpm turbo run build

# Run the full test suite
pnpm turbo run test

# Type check / lint everything
pnpm turbo run typecheck
pnpm turbo run lint

# Iterate on a single workspace
pnpm --filter wiremd run test:watch          # core library
pnpm --filter wiremd-editor run dev          # web editor at :5174
pnpm --filter wiremd-docs run dev            # VitePress docs at :5173
pnpm --filter wiremd-landing run dev         # marketing site at :5175
```

### Workspace names

| Path | Workspace name | What it is |
|---|---|---|
| `packages/core/` | `wiremd` | Published npm package — parser, renderers, CLI |
| `apps/docs/` | `wiremd-docs` | VitePress documentation site |
| `apps/editor/` | `wiremd-editor` | Browser editor (Vite + Monaco) |
| `apps/landing/` | `wiremd-landing` | Marketing site (Vite + Vue) |
| `extensions/vscode/` | `wiremd-preview` | VS Code live preview extension |
| `extensions/figma/` | `wiremd-figma-plugin` | Figma plugin |
| `extensions/skills/wireframe/` | n/a (Claude plugin) | Claude skill, packaged as a zip |

### Project Structure

```
wiremd/
├── packages/
│   └── core/                       # published "wiremd" npm package
│       ├── src/
│       │   ├── parser/             # Markdown + wiremd syntax parser
│       │   │   ├── index.ts                # Main parser entry
│       │   │   ├── transformer.ts          # MDAST → wiremd AST
│       │   │   ├── remark-containers.ts    # ::: syntax plugin
│       │   │   └── remark-inline-containers.ts # [[...]] syntax plugin
│       │   ├── renderer/           # HTML / React / Tailwind / JSON
│       │   │   ├── index.ts
│       │   │   ├── html-renderer.ts
│       │   │   ├── react-renderer.ts
│       │   │   ├── tailwind-renderer.ts
│       │   │   └── styles.ts       # 7 visual style CSS strings
│       │   ├── cli/                # CLI tool (wiremd binary)
│       │   ├── types.ts            # WiremdNode discriminated union
│       │   └── index.ts            # Library entry point
│       ├── bin/wiremd.js           # CLI shim (loaded via `bin` field)
│       └── tests/                  # vitest test suite
├── apps/
│   ├── docs/                       # VitePress site
│   ├── editor/                     # browser editor
│   └── landing/                    # marketing site
├── extensions/
│   ├── vscode/                     # VS Code extension
│   ├── figma/                      # Figma plugin
│   └── skills/wireframe/           # Claude skill (plugin marketplace source)
├── scripts/
│   ├── build-bundle.mjs            # builds standalone CLI + .vsix into releases/
│   ├── sync-versions.mjs           # syncs core version → vscode + skill plugin.json
│   └── package-skill.sh            # zips the wireframe skill for upload
├── pnpm-workspace.yaml
├── turbo.json
└── package.json                    # private root, only delegates to turbo
```

## Coding Standards

### TypeScript

- Use **TypeScript strict mode**
- Add **JSDoc comments** for all exported functions
- Use **discriminated unions** for type safety
- Prefer **named exports** over default exports

### Testing

- Write **unit tests** for new functions
- Maintain or improve **test coverage**
- Use **descriptive test names**
- Test edge cases and error conditions
- **Assert against what the code emits, not just shape.** An assertion that "a rule exists" or "a token appears somewhere" can ship green while the rendered output is wrong. Pin the exact selector / class / attribute the renderer produces, require all members of a set (not "at least one"), constrain selector shape, and demand at least one real declaration where applicable. See [`packages/core/tests/fixtures/README.md`](packages/core/tests/fixtures/README.md#writing-assertions-that-actually-catch-the-bug) for concrete patterns and worked examples.

### Code Style

- Use **Prettier** for formatting (if configured)
- Follow existing code patterns
- Keep functions **small and focused**
- Use **meaningful variable names**

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Build process or tooling changes

Examples:
```
feat(parser): add support for table components
fix(renderer): correct button style rendering
docs(readme): update installation instructions
test(parser): add tests for nested containers
```

## Testing Guidelines

### Running Tests

```bash
# Run all tests across the monorepo (cached by turbo)
pnpm turbo run test

# Run only the core library's tests
pnpm --filter wiremd run test

# Coverage
pnpm --filter wiremd run test:coverage

# Single test file or single test by name (run from packages/core/)
pnpm --filter wiremd run test -- tests/parser.test.ts
pnpm --filter wiremd run test -- tests/parser.test.ts -t "Button"

# Watch mode
pnpm --filter wiremd run test:watch

# Refresh fixture snapshots after intentional output changes
pnpm --filter wiremd run test -- tests/fixtures.test.ts -u
```

### The fixture corpus (preferred for syntax/render tests)

Most parser/renderer coverage lives in `packages/core/tests/fixtures/` — see the dedicated [`tests/fixtures/README.md`](packages/core/tests/fixtures/README.md) for full details. Two sources:

- **Doc-derived**: every `::: demo` block in `apps/docs/components/*.md` is automatically a fixture. Adding a doc demo automatically adds a regression test.
- **Regression**: hand-written `.md` files under `tests/fixtures/regressions/**` for bug repros, edge cases, and validation tests.

For each fixture: HTML, React, and Tailwind snapshots are generated by `pnpm test -u` and committed. Plus an opt-in **invariants channel** (`<base>.invariants.ts` or `<base>.expected-fail.invariants.ts`) for executable correctness contracts — useful for tracking known bugs as `it.fails` until they're fixed.

The interactive **review tool** (`pnpm review` from `packages/core/`) renders every fixture with full styles and uses the File System Access API to round-trip status updates through `REVIEW_LOG.md`. **Visual review is enforced**: `tests/review-gate.test.ts` fails on any ⏳ row, so a snapshot change cannot ship until a human has clicked ✅ in the page. Use `pnpm review:refresh` to refresh snapshots and flip affected fixtures to ⏳ in one shot.

### Writing classic tests (one-off behaviour, not pure render)

For tests that don't fit the fixture model (CLI behaviour, error paths, validation messages, server lifecycle):

```typescript
// packages/core/tests/feature.test.ts
import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser';

describe('Feature Name', () => {
  it('should handle basic case', () => {
    const input = '## Heading';
    const result = parse(input);
    expect(result).toBeDefined();
  });

  it('should throw on invalid input', () => {
    expect(() => parse('')).toThrow();
  });
});
```

## Feature Development Checklist

Run through this before opening a PR for any new syntax, render option, or user-visible behaviour. All paths are repo-relative.

### Core implementation (`packages/core/`)
- [ ] **Types** — add node type to `WiremdNode` union in `packages/core/src/types.ts`; add any new option to `RenderOptions`
- [ ] **Parser** — handle new MDAST node type in `packages/core/src/parser/transformer.ts`; add to `validTypes` in `packages/core/src/parser/index.ts`
- [ ] **HTML renderer** — add `case` in `packages/core/src/renderer/html-renderer.ts`; extend `RenderContext` if needed
- [ ] **CSS** — add shared structural CSS in `packages/core/src/renderer/styles.ts` (`getStyleCSS`)
- [ ] **React renderer** — add `case` in `packages/core/src/renderer/react-renderer.ts` (full or silent no-op)
- [ ] **Tailwind renderer** — add `case` in `packages/core/src/renderer/tailwind-renderer.ts` (full or silent no-op)
- [ ] **Renderer index** — plumb any new `RenderOptions` field through all four render functions in `packages/core/src/renderer/index.ts`
- [ ] **Public exports** — export new types/options from `packages/core/src/index.ts` so library consumers can use them

### Entry points
- [ ] **CLI** — add flag(s) to `CLIOptions` and `parseArgs` in `packages/core/src/cli/index.ts`; pass through `generateOutput`
- [ ] **Web editor** (`apps/editor/`) — update `src/renderMarkup.ts`, `src/preview.ts` (state + setter), `src/main.ts` (event wiring), `index.html` (UI control)
- [ ] **VS Code extension** (`extensions/vscode/`) — update `src/preview-provider.ts` (state, `handleMessage` case, toolbar button); register command in `src/extension.ts` if needed

### Quality
- [ ] **Tests (TDD)** — for syntax/rendering, prefer the fixture corpus: add `:::demo` blocks to the relevant `apps/docs/components/<name>.md` (auto-extracted as fixtures) or hand-write a regression under `packages/core/tests/fixtures/regressions/`. For CLI/validation/error paths, classic tests in `cli-unit.test.ts` etc. Run `pnpm test -u` to generate snapshots; review the diff before committing. See [`tests/fixtures/README.md`](packages/core/tests/fixtures/README.md).
- [ ] **Review the rendered output** — `pnpm --filter wiremd run review` opens the fixture review tool. Verify the new component looks correct under full styles before merging.
- [ ] **Full suite** — `pnpm turbo run test` passes with no regressions
- [ ] **Typecheck + lint** — `pnpm turbo run typecheck` and `pnpm turbo run lint` clean

### Documentation & distribution
- [ ] **CHANGELOG.md** — add entry under `[Unreleased]` at the repo root
- [ ] **`apps/docs/components/`** — create a component page with live `::: demo` blocks; add to `_sidebar.md`. The VS Code extension's `bundle` script copies this directory in, so the new page ships to the extension automatically.
- [ ] **`apps/docs/reference/cli.md`** — add any new flags to the flags table
- [ ] **Claude skill** — update `extensions/skills/wireframe/references/syntax.md` and add an example to `SKILL.md` quick reference
- [ ] **Landing page** (`apps/landing/index.html`) — update feature list if the change is a meaningful selling point
- [ ] **README.md** — update if the change affects installation, usage, or the headline feature list

### Smoke test
- [ ] **URL share** — paste a wireframe using the new feature into the editor (`pnpm --filter wiremd-editor run dev`), copy link, open in a new tab — confirm it round-trips correctly
- [ ] **Notion embed** — if applicable, embed the share URL in a Notion page and confirm it renders

## Plugin Maintenance

The wiremd Claude Code plugin lives in `extensions/skills/wireframe/`. It is installed via the VS Code extension's "Install Wiremd Claude Skill" command, the Claude plugin marketplace, or manually by copying the directory into `.claude/skills/wireframe/`.

### Structure

```
extensions/skills/wireframe/
├── SKILL.md                 # Ambient trigger — activates when user mentions wireframes
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata (name, version, description)
├── bin/
│   └── wiremd.js            # Bundled CLI — produced by scripts/build-bundle.mjs
├── commands/
│   └── wireframe.md         # /wireframe slash command
└── references/              # Lazy-loaded docs (only read when Claude needs them)
    ├── display.md
    ├── editor.md
    ├── serve.md
    ├── syntax.md
    ├── styles.md
    ├── quick-reference.md
    ├── rendering-modes.md
    ├── multi-page.md
    ├── vscode.md
    └── examples/
```

The repo-root `.claude-plugin/marketplace.json` registers wiremd as a public marketplace and points `source` at `./extensions/skills/wireframe`. Users add it once with:

```
/plugin marketplace add teezeit/wiremd
```

The `bin/wiremd.js` is regenerated by `pnpm bundle` (which runs `scripts/build-bundle.mjs`). The `build-bundle.yml` workflow re-runs it on every push to `main` that touches `packages/core/src/**`, `extensions/skills/**`, `extensions/vscode/src/**`, or the script itself, then commits the refreshed bundle back to `main`. Do not edit it by hand.

---

## Release Process

Releases follow semantic versioning. Four artifacts ship together under a single version: the npm package, the VS Code extension, the Claude skill (`plugin.json`), and the standalone CLI bundle.

### Between releases

Merge PRs to `main` as normal. CI rebuilds artifacts and rolls a prerelease called `latest` on GitHub Releases (CLI binary + `.vsix`). No version changes are required.

### Version sync

`packages/core/package.json` is the source of truth for the version. The root `package.json` wires `scripts/sync-versions.mjs` into the `version` lifecycle, so bumping the version propagates it to:

- `extensions/vscode/package.json`
- `extensions/skills/wireframe/.claude-plugin/plugin.json`

…and stages those files automatically. **Do not bump the version in those files by hand.**

### Cutting a release

```bash
# 1. Make sure CHANGELOG.md has an entry under [Unreleased]
# 2. Run the full suite
pnpm turbo run test

# 3. Bump version from the monorepo root (patch / minor / major)
pnpm version:patch   # or pnpm version:minor / pnpm version:major
# ↑ delegates to `cd packages/core && npm version patch`, which runs sync-versions.mjs,
#   stages extensions/vscode/package.json + plugin.json, commits and tags

# 4. Push commit + tag
git push && git push --tags
```

Pushing the tag triggers CI automatically:

| Workflow | Trigger | Does |
|---|---|---|
| `release.yml` | tag `v*` pushed | Creates the GitHub release with auto-generated notes (uses `GH_PAT` so the next workflow fires) |
| `publish.yml` | GitHub release published | Publishes `@eclectic-ai/wiremd` to npm (`NPM_TOKEN`), publishes VS Code extension to Marketplace (`VSCE_PAT`), attaches skill zip to the release |
| `build-bundle.yml` | push to `main` | Rebuilds standalone CLI + `.vsix`, commits plugin bin, uploads to `latest` prerelease |

No manual steps needed.

### Required GitHub secrets

| Secret | Used by | Purpose |
|---|---|---|
| `GH_PAT` | `release.yml`, `build-bundle.yml` | Push to protected `main` branch; `release.yml` uses it so creating the release triggers `publish.yml` |
| `NPM_TOKEN` | `publish.yml` | npm Automation token for `@eclectic-ai/wiremd` |
| `VSCE_PAT` | `publish.yml` | VS Code Marketplace personal access token |

### Extension-only fix

If only the VS Code extension changes and you don't want to bump the npm package version:

```bash
cd extensions/vscode
npm version patch
git push && git push --tags
```

Then create a GitHub release for that tag manually. `publish.yml` fires on the release event and publishes the new `.vsix` to the Marketplace.

### Frontend deploys (docs / editor / landing)

`docs.yml` deploys the public site to GitHub Pages on every push to `main` that touches `apps/docs/**`, `apps/editor/**`, `apps/landing/**`, `packages/core/src/**`, or the workflow itself. The job:

1. Builds `packages/core/` (the editor and docs depend on its types and runtime).
2. Builds `apps/docs/` (`vitepress build`) into `apps/docs/.vitepress/dist/`.
3. Builds `apps/landing/` and overlays its `dist/` onto the VitePress dist root.
4. Builds `apps/editor/` with `VITE_BASE=/wiremd/editor/` and copies it into `apps/docs/.vitepress/dist/editor/`.
5. Uploads the merged tree to GitHub Pages.

The result: `teezeit.github.io/wiremd/` serves the landing page at the root, the docs from VitePress, and the live editor at `/editor/` — all from a single Pages deployment.

### Standalone CLI bundle (`releases/wiremd.js`)

`scripts/build-bundle.mjs` produces a single-file CommonJS CLI from `packages/core/src/cli/index.ts` using esbuild and writes it to `releases/wiremd.js`. The same file is copied into `extensions/skills/wireframe/bin/wiremd.js` so the Claude plugin ships with a self-contained CLI (no `npm install` required for plugin users). The script also runs `pnpm package` inside `extensions/vscode/` and copies the resulting `.vsix` to `releases/wiremd.vsix`.

The `build-bundle.yml` workflow runs this on every relevant push to `main`, commits the refreshed plugin bin back to the repo, and uploads `releases/wiremd.js` + `releases/wiremd.vsix` to a rolling `latest` GitHub prerelease.

## Documentation

### Updating Documentation

- Update README.md for user-facing changes
- Update SYNTAX-SPEC-v0.1.md for syntax changes
- Add JSDoc comments for API changes
- Update examples/ for new features
- Create docs/ pages for major features

### Documentation Standards

- Use **clear, concise language**
- Include **code examples**
- Show **input and output** for parsers/renderers
- Link to related documentation
- Keep documentation **up-to-date** with code

## Getting Help

- **Documentation**: Check README.md and SYNTAX-SPEC-v0.1.md
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Chat**: (Add Discord/Slack link if available)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- CHANGELOG.md for significant contributions
- README.md credits section (for major contributions)

## License

By contributing to wiremd, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to wiremd! 🎉
