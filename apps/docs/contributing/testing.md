# Testing

The wiremd test suite runs through Turborepo across the monorepo. The bulk of the tests live in `packages/core/`; smaller suites cover the web editor (`apps/editor/`) and the Figma plugin (`extensions/figma/`). All tests use [Vitest](https://vitest.dev/).

## Running tests

All commands run from the repo root.

```bash
# All tests across the monorepo (cached by turbo, runs in parallel where possible)
pnpm turbo run test

# Only the core library
pnpm --filter wiremd run test

# Watch mode (core)
pnpm --filter wiremd run test:watch

# Coverage (core)
pnpm --filter wiremd run test:coverage

# Single test file (run from packages/core/)
pnpm --filter wiremd run test -- tests/parser.test.ts

# Single test by name
pnpm --filter wiremd run test -- tests/parser.test.ts -t "Button"

# Editor tests only
pnpm --filter wiremd-editor run test

# Figma plugin tests only
pnpm --filter wiremd-figma-plugin run test
```

`pnpm turbo run test` depends on `build` (see `turbo.json`), so the core library is built first, then test runs are fanned out to every workspace that defines a `test` script.

## Test layout

### `packages/core/tests/`

The main suite. Notable files:

- `parser.test.ts` — Markdown + wiremd-syntax parsing
- `renderer.test.ts` — HTML rendering
- `react-renderer.test.ts` — React/JSX renderer
- `tailwind-renderer.test.ts` — Tailwind-classed HTML
- `integration.test.ts` — end-to-end parse → render
- `cli.test.ts`, `cli-unit.test.ts` — CLI behaviour, watch mode, dev server
- `cli-bundle.test.ts` — the standalone CLI bundle
- `server.test.ts` — live-reload dev server, WebSocket injection, viewport switcher
- `error-handling.test.ts`, `validation.test.ts` — error and validation paths
- `api-examples.test.ts` — the public API examples in the docs
- `package-shape.test.ts` — published package shape (entry points, exports, files)

### `apps/editor/tests/`

Browser editor: storage adapters, file-system access shim, render-markup glue.

### `extensions/figma/tests/`

Figma plugin: AST → Figma frame conversion, theme styling, fixture-based regression tests. Mocks the Figma global API in `tests/setup.ts`.

## Writing tests

### Where new tests go

| Change | Test home |
|---|---|
| Parser / renderer / CLI / library API | `packages/core/tests/` |
| Editor UI behaviour | `apps/editor/tests/` |
| Figma converter | `extensions/figma/tests/` |
| Cross-package integration | `packages/core/tests/integration.test.ts` |

### Style

```typescript
// packages/core/tests/feature.test.ts
import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser';
import { renderToHTML } from '../src/renderer';

describe('Feature name', () => {
  it('renders the basic case', () => {
    const html = renderToHTML(parse('## Heading'), { style: 'sketch' });
    expect(html).toContain('<h2');
  });

  it('handles the edge case', () => {
    // Arrange / Act / Assert
  });

  it('throws for invalid input', () => {
    expect(() => parse('')).toThrow();
  });
});
```

Use descriptive names (`it('renders viewport switcher buttons', …)`), not opaque ones (`it('test viewport', …)`). Async tests use `async/await`.

## Continuous integration

The `ci.yml` workflow runs on every push to `main` and every pull request. Jobs:

| Job | Matrix | Runs |
|---|---|---|
| `test` | Node 20 + 22, Linux + macOS + Windows | `pnpm turbo run build`, `typecheck`, `lint`, `test` |
| `coverage` | Node 20 / Linux | `pnpm --filter wiremd run test:coverage`, uploads to Codecov |
| `lint-package` | Node 20 / Linux | Builds the core, runs `npm pack` to verify the published package shape |
| `test-editor` | Node 20 / Linux | `pnpm turbo run test --filter=wiremd-editor` |
| `test-figma-plugin` | Node 20 / Linux | `pnpm turbo run test --filter=wiremd-figma-plugin` |

A green PR means: every workspace's tests pass, the core compiles + lints cleanly on three OSes, and the published shape is intact.

## Coverage

```bash
pnpm --filter wiremd run test:coverage
```

Coverage targets (current goals, not enforced):

- Overall: 80%+
- Critical paths (parser, html-renderer, CLI argv): 90%+
- Error handling: 100%

Reports land in `packages/core/coverage/` and are uploaded to Codecov from the `coverage` CI job.

## Common patterns

### Temporary files

```typescript
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'wiremd-'));
  writeFileSync(join(dir, 'test.md'), '# Test');
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});
```

Always use `os.tmpdir()` instead of `/tmp` so tests work on Windows runners (this was a real CI fix — see commit `f0e4164`).

### Testing the CLI

```typescript
import { execSync } from 'node:child_process';

it('generates output', () => {
  const out = execSync(
    'node packages/core/dist/cli/index.js input.md',
    { encoding: 'utf-8' },
  );
  expect(out).toContain('Generated');
});
```

### Mocking the dev server

```typescript
import { vi } from 'vitest';

vi.mock('http', () => ({ createServer: vi.fn() }));
```

## Debugging

### Run a single test by name

```bash
pnpm --filter wiremd run test -- -t "should render sketch style"
```

### Verbose reporter

```bash
pnpm --filter wiremd run test -- --reporter=verbose
```

### Debug under VS Code

`.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug wiremd tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["--filter", "wiremd", "run", "test", "--", "--no-coverage"],
  "console": "integratedTerminal"
}
```

## When tests are slow

Vitest reports per-test timings. Tests over a second or two should either be optimized or moved to `integration.test.ts` so they can be filtered out with `--exclude`.

```bash
pnpm --filter wiremd run test -- --reporter=verbose
```
