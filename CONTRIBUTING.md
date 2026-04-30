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
6. **Ensure tests pass** with `npm test`
7. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/wiremd.git
cd wiremd

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the project
npm run build

# Type check
npm run typecheck

# Run linter
npm run lint
```

### Project Structure

```
wiremd/
├── src/
│   ├── parser/              # Markdown + wiremd syntax parser
│   │   ├── index.ts         # Main parser entry
│   │   ├── transformer.ts   # MDAST to wiremd AST
│   │   ├── remark-containers.ts        # ::: syntax plugin
│   │   └── remark-inline-containers.ts # [[...]] syntax plugin
│   ├── renderer/            # HTML/JSON renderer
│   │   ├── index.ts         # Main renderer entry
│   │   ├── html-renderer.ts # Component HTML generation
│   │   └── styles.ts        # Visual styles
│   ├── cli/                 # CLI tool
│   ├── types.ts             # TypeScript types
│   └── index.ts             # Library entry point
├── tests/                   # Test suite
└── examples/                # Example wireframes
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
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/parser.test.ts

# Watch mode
npm run test:watch
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser';

describe('Feature Name', () => {
  it('should handle basic case', () => {
    const input = '## Heading';
    const result = parse(input);
    expect(result).toBeDefined();
  });

  it('should handle edge case', () => {
    // Test edge cases
  });

  it('should throw error for invalid input', () => {
    expect(() => parse('')).toThrow();
  });
});
```

## Feature Development Checklist

Run through this before opening a PR for any new syntax, render option, or user-visible behaviour.

### Core implementation
- [ ] **Types** — add node type to `WiremdNode` union in `src/types.ts`; add any new option to `RenderOptions`
- [ ] **Parser** — handle new MDAST node type in `src/parser/transformer.ts`; add to `validTypes` in `src/parser/index.ts`
- [ ] **HTML renderer** — add `case` in `src/renderer/html-renderer.ts`; extend `RenderContext` if needed
- [ ] **CSS** — add shared structural CSS in `src/renderer/styles.ts` (`getStyleCSS`)
- [ ] **React renderer** — add `case` in `src/renderer/react-renderer.ts` (full or silent no-op)
- [ ] **Tailwind renderer** — add `case` in `src/renderer/tailwind-renderer.ts` (full or silent no-op)
- [ ] **Renderer index** — plumb any new `RenderOptions` field through all four render functions in `src/renderer/index.ts`
- [ ] **Public exports** — export new types/options from `src/index.ts` so library consumers can use them

### Entry points
- [ ] **CLI** — add flag(s) to `CLIOptions` and `parseArgs` in `src/cli/index.ts`; pass through `generateOutput`
- [ ] **Web editor** — update `renderMarkup.ts`, `preview.ts` (state + setter), `main.ts` (event wiring), `index.html` (UI control)
- [ ] **VS Code extension** — update `preview-provider.ts` (state, `handleMessage` case, toolbar button); register command in `extension.ts` if needed

### Quality
- [ ] **Tests (TDD)** — write failing tests first in `tests/parser.test.ts`, `tests/renderer.test.ts`, `tests/cli-unit.test.ts`; confirm green after implementation
- [ ] **Full suite** — `npm test` passes with no regressions (currently 659 tests)
- [ ] **Typecheck** — `npm run typecheck` clean

### Documentation & distribution
- [ ] **CHANGELOG.md** — add entry under `[Unreleased]`
- [ ] **`docs/components/`** — create a component page with live `::: demo` blocks; add to `_sidebar.md`
- [ ] **`docs/reference/cli.md`** — add any new flags to the flags table
- [ ] **Claude skill** — update `.claude/skills/wireframe/references/syntax.md` and add example to `SKILL.md` quick reference
- [ ] **Landing page** (`index.html`) — update feature list if the change is a meaningful selling point
- [ ] **README.md** — update if the change affects installation, usage, or the headline feature list

### Smoke test
- [ ] **URL share** — paste a wireframe using the new feature into the editor, copy link, open in a new tab — confirm it round-trips correctly
- [ ] **Notion embed** — if applicable, embed the share URL in a Notion page and confirm it renders

## Plugin Maintenance

The wiremd Claude Code plugin lives in `skills/wireframe/`. It is installed via the VS Code extension's "Install Wiremd Claude Skill" command, or manually by copying the directory to `.claude/skills/wireframe/`.

### Structure

```
skills/wireframe/
├── SKILL.md                 # Ambient trigger — activates when user mentions wireframes
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata (name, version, description)
├── bin/
│   └── wiremd.js            # Bundled CLI — auto-built by `npm run bundle`
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

.claude-plugin/
└── marketplace.json         # Marketplace index — points source to ./skills/wireframe
```

The `bin/wiremd.js` is rebuilt automatically by `npm run bundle` (run in CI on every push to `main`). Do not edit it by hand.

### Marketplace

The repo root `.claude-plugin/marketplace.json` registers wiremd as a public marketplace. Users add it once with:

```
/plugin marketplace add teezeit/wiremd
```

---

## Release Process

Releases follow semantic versioning. Four artifacts ship together: npm package, VS Code extension, Claude skill (`plugin.json`), and standalone CLI bundle.

### Between releases

Merge PRs to `main` as normal. CI rebuilds the bundles and updates the rolling `latest` prerelease on GitHub. No version changes.

### Cutting a release

```bash
# 1. Make sure CHANGELOG.md has an entry under [Unreleased]
# 2. Run tests
npm test

# 3. Bump version (patch / minor / major)
#    This also syncs vscode-extension/package.json and plugin.json via the version hook
npm version patch

# 4. Push branch + tag
git push && git push --tags
```

Pushing the tag triggers CI automatically:
- **`release.yml`** — creates the GitHub release with auto-generated notes from PR titles
- **`publish.yml`** — publishes the VS Code extension to the Marketplace and attaches the skill zip to the release

No manual steps on GitHub or npm are needed.

### Extension-only fix

If only the VS Code extension changes and you don't want to bump the npm package version:

```bash
cd vscode-extension && npm version patch
git push && git push --tags
```

Then create a GitHub release for that tag manually. `publish.yml` will fire and publish to the Marketplace.

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
