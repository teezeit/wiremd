# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-05-02

### Added
- Added first-class switch controls with `[Label]{switch}`, including `checked` and `disabled` state support across HTML, React, Tailwind, and bundled styles.
- Added navigation and action select options: Markdown links in select option lists render as navigation selects, and button-style options render as action selects.
- Added semantic no-dot modifier tokens for buttons, badges, containers, rows, columns, and form states, such as `{danger large disabled}`, `{success}`, and `{span-2 right}`.
- Added Tabler SVG icon rendering across HTML, React, and Tailwind outputs, including digit-bearing icon names like `:menu-2:` and compatibility aliases for existing icon names.
- Added compact nested container parsing so adjacent nested `:::` directives no longer require spacer lines.

### Breaking
- Replaced author-facing grid syntax with explicit columns syntax: use `::: columns-N` with child `::: column` blocks, optional opener titles like `::: column Billing address`, `::: columns-N card` for card chrome, and `::: column {span-N left/right/center}` or `::: column Title {span-N right}` for per-column modifiers.
- Removed `::: grid-N` plus `###` heading-delimited grid items from the parser syntax. Internally, renderers may still emit grid AST nodes and CSS classes.
- Badge/pill syntax now uses `((Label))` / `((Label)){variant}` as the primary notation; legacy pipe-delimited pills remain accepted as a migration alias.
- Sidebar layouts now use standalone `::: sidebar` followed by page content; `::: layout {.sidebar-main}` / `::: main` remains supported for compatibility but is no longer documented as the preferred pattern.
- `### {.left}` / `### {.center}` / `### {.right}` inside `::: row` are now ignored; use `::: row {right}` or `::: row {center}` for whole-row alignment, and `::: columns-N` for split left/right layouts.

### Changed
- Updated the editor and landing page examples to use the current columns, badges, navigation, icon, switch, and action-select syntax.
- Updated the Claude skill references and syntax docs for compact nested containers, blank-line guidance, current dashboard examples, and icon-aware column titles.

### Fixed
- Exposed `CORS_ALLOWED_ORIGINS` to the API app's nested Turbo build environment.
- Fixed icon rendering in `::: column :icon: Title` opener titles.
- Fixed logo navigation grouping so `[[ :logo: WireOps | *Dashboard* | Reports | :settings: Settings | [Profile] ]]` renders a single left-side brand with the remaining items/actions on the right.

## [0.2.1] - 2026-04-30

### Changed
- Docs: screenshots added to overview page (Claude Desktop + web editor side-by-side)
- README: screenshot added to quick example; direct VS Code marketplace link
- GitHub repo: description and homepage updated to match product story

## [0.2.0] - 2026-04-30

### Added
- **Plugin v2** — wireframe skill split into four focused sub-skills: `editor` (live browser editor), `display` (static HTML), `chat` (markup-only), `serve` (dev server with hot reload)
- **Plugin marketplace** — install via `/plugin marketplace add teezeit/wiremd` in Claude Code or Claude Desktop; self-contained CLI bundled, no npm install required
- **Inline comments** — `<!-- text -->` renders as yellow sticky-note callouts in all HTML output; attach to the following element, work at any nesting depth
- `showComments` option in `RenderOptions` (default `true`) — pass `false` to strip callouts
- `--show-comments` CLI flag (comments hidden by default in CLI, opt-in)
- Comments toggle pill in the web editor preview toolbar
- Comments On/Off button in the VS Code extension preview toolbar
- **Comment side panel** — fixed panel with thread grouping, scope isolation, and inter-cell routing; thread count badge in editor and VS Code toolbars
- **Cursor sync** — source positions propagated from parser through AST; clicking a rendered element scrolls the source cursor to the matching line
- Comment dot indicators on rendered elements; editor blur-to-clear behaviour
- **Editor local file sync** — read/write `.md` files directly from the browser editor via the File System Access API (no server needed)
- **Editor file history** — recent files list with IDB persistence; silent cross-session reopen on return
- **`?file=` URL hint** — open the editor with a suggested file path pre-filled in the open dialog; hint stripped from URL after modal resolves
- **URL hash sharing** — wireframe content encoded in the URL hash for instant sharing from the browser editor
- GitHub Releases as canonical distribution for CLI binary and VS Code `.vsix`

### Changed
- `--hide-comments` flag removed; simplified to single `--show-comments` opt-in
- Plugin `plugin.json` version bumped to `2.0.0`
- **Docs: Claude guide restructured** around three modes (Only Claude / Claude + Editor / Only Editor) with decision table, flow diagram, and screenshots
- **Docs: new Web Editor guide page** — share via URL, live sync, browser compatibility
- **Docs: CLI page** merged with CLI reference — flags table, styles, serve-locally example with screenshot
- **Docs: overview pipeline diagram** — live-rendered three-panel `Markdown → Renderer → Output` using `WmdPipeline` Vue component
- **Docs: landing page** — new `LandingHero` (Mermaid for wireframes tagline, CTA buttons) and `LandingFeatures` (4 sections with screenshots)
- **Docs: sidebar** reordered — Claude guide and Web Editor before VS Code Extension; CLI Reference merged into CLI page
- **README** tagline and Why section updated to match product story; Use with Claude section condensed to 3-mode table

## [0.1.7] - 2026-04-23

### Fixed
- Gallery rendering in docs — converted all examples to `:::demo` blocks

## [0.1.6] - 2026-04-22

### Added
- **`:::` container syntax** — replaces `## {.grid}` / `## {.row}` heading-class layout syntax (breaking change); full nesting support via recursive parser rewrite
- **`:::demo` container** — split preview/code showcase block for docs and examples
- **Tabs component** — `:::tabs` with named panels
- **Badge/pill component** — `((Label)){.variant}` inline syntax
- **`## {.row}` flex layout** — row primitive with alignment support
- **`![[file.md]]` includes** — resolve and inline external wireframe files
- **`:icon-name:` syntax** — icon rendering in table cells
- **CLI directory mode** — `wiremd <folder>` serves all `.md` files in a folder
- **`:::demo` VitePress plugin** — live wireframe previews inside VitePress docs
- **VS Code: Install Wiremd Claude Skill** command added to command palette
- **VS Code: component docs** open inline in the extension webview
- Wireframe skill shipped as Claude Code plugin (initial `plugin.json`)
- Comprehensive docs overhaul: new sidebar, landing page, VS Code guide, Claude integration guide, visual styles reference with screenshots

### Fixed
- Parser: `[[...]]` nav inside container blocks when items contain markdown links
- Parser: button-link sequences and nav inside block containers
- Parser: nested `:::` openers now require blank lines (remark folds otherwise)
- Renderer: style fixes across sketch/clean/wireframe themes (card max-width, sidebar chrome, toolbar overlap)
- `[[ A > B > C ]]` now renders as breadcrumbs, not nav
- VS Code: rendering parity, dotted sketch background, hot-reload dev workflow
- VS Code: publisher updated to `eclectic-ai`; 128px icon; `.vsix` packaging fixed
- `prepare` script added so `dist/` builds correctly on GitHub install
- Dropdown options now correctly associate with `<select>` inside implicit row items

## [0.1.5] - 2025-11-24

### Fixed
- Fixed navigation button rendering
- Fixed checkbox and button rendering inside paragraphs

## [0.1.4] - 2025-11-24

### Fixed
- Fixed npm global installation by adding a proper CLI wrapper (`bin/wiremd.js`)
- CLI now works correctly when installed via `npm install -g wiremd`
- Wrapper explicitly calls `main()` function to ensure proper execution

### Changed
- Changed bin entry point from `./dist/cli/index.js` to `./bin/wiremd.js`
- Added `bin` directory to published files

## [0.1.3] - 2025-11-24

### Fixed
- Fixed `--version` command to correctly display package version in ESM environment
- Updated fallback version to 0.1.2 instead of 0.1.0

## [0.1.2] - 2025-11-24

### Fixed
- CLI now returns exit code 1 (error) when called without arguments instead of 0 (success)
- Improved error handling for missing input files

### Added
- Comprehensive test coverage for CLI error scenarios
- New test file: `tests/cli-file-not-found.test.ts`

## [0.1.0] - 2025-01-22

### Added
- Initial release of wiremd
- Core parser with full markdown + wiremd syntax support
- AST transformer with 40+ node types
- HTML renderer with Balsamiq-style default theme
- Alternative visual styles: clean, wireframe, none, material, tailwind, brutal
- JSON output format
- CLI tool with watch mode and live-reload dev server
- React component renderer (JSX/TSX output)
- Tailwind CSS class renderer
- VS Code extension with live preview
- Figma plugin for design import
- 48+ passing tests
- TypeScript strict mode implementation
- Community health files (CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md)
- GitHub Actions CI workflow
- .npmignore for clean package distribution
- Support for:
  - Forms (inputs, textareas, selects, buttons)
  - Layout containers (sections, grids, headers, footers)
  - Navigation components
  - Content elements (headings, paragraphs, images, icons)
  - Inline containers `[[...]]`
  - Block containers `:::`
  - Component attributes and modifiers
  - Custom classes and IDs

### Documentation
- Complete syntax specification (SYNTAX-SPEC-v0.1.md)
- Comprehensive README with examples
- Project plan and roadmap (moved to .github/dev-docs)
- Syntax research documentation (moved to .github/dev-docs)
- Example wireframes and outputs
- API documentation

### Changed
- Package name from `markdown-mockup` to `wiremd`
- Enabled parser and renderer exports in main index
- Moved internal documentation to .github/dev-docs/
- Moved screenshot files to docs/screenshots/
- Organized development files for cleaner repository structure

### Fixed
- LICENSE file cleanup (removed incorrect monorepo references)
- Removed debug console.log statements from production code
- Fixed broken documentation links
- Cleaned up .gitignore to exclude build artifacts and temporary files

## Version History

- **0.1.0** - Initial public release

---

For full release notes and migration guides, see the [releases page](https://github.com/teezeit/wiremd/releases).
