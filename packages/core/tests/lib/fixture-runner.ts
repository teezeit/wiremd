/**
 * Loads fixtures from two sources:
 *
 *   1. Regression fixtures — hand-written .md files under
 *      tests/fixtures/regressions/**. Each file is a fixture; snapshots are
 *      written next to the .md.
 *
 *   2. Doc-derived fixtures — `::: demo` blocks extracted from registered
 *      docs files. Snapshots live under tests/fixtures/__snapshots__/docs/
 *      so they don't pollute the docs source tree.
 *
 * The single `loadFixtures()` call returns both kinds; the entry test
 * (tests/fixtures.test.ts) iterates and asserts via toMatchFileSnapshot.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';
import { extractDemos } from './extract-demos.js';

const __filename = fileURLToPath(import.meta.url);
const TESTS_DIR = dirname(dirname(__filename)); // packages/core/tests
const CORE_DIR = dirname(TESTS_DIR); // packages/core
const REPO_ROOT = dirname(dirname(CORE_DIR)); // monorepo root
const REGRESSIONS_DIR = join(TESTS_DIR, 'fixtures', 'regressions');
const SNAPSHOTS_DOCS_DIR = join(TESTS_DIR, 'fixtures', '__snapshots__', 'docs');

/**
 * Docs files whose `::: demo` blocks become fixtures.
 *
 * Excluded by design:
 *   - `_*.md` partials and `index.md` overview — covered as content elsewhere.
 *   - `includes.md` — its demos use `![[ ... ]]` file includes that need a
 *     basePath the test runner doesn't supply; would render as broken-include
 *     warnings.
 *   - `styles.md`, `not-implemented-components.md` — zero demos by design.
 */
const DOC_SOURCES = [
  // Primitives
  'apps/docs/components/buttons.md',
  'apps/docs/components/button-links.md',
  'apps/docs/components/inputs.md',
  'apps/docs/components/textarea-select.md',
  'apps/docs/components/checkboxes-radio.md',
  'apps/docs/components/icons.md',
  'apps/docs/components/badges.md',
  // Layouts
  'apps/docs/components/columns.md',
  'apps/docs/components/row.md',
  'apps/docs/components/cards.md',
  'apps/docs/components/tabs.md',
  'apps/docs/components/page-layouts.md',
  'apps/docs/components/navigation.md',
  // Content
  'apps/docs/components/tables.md',
  'apps/docs/components/alerts.md',
  'apps/docs/components/comments.md',
  'apps/docs/components/attributes.md',
  // Meta (syntax demos)
  'apps/docs/components/demo.md',
  'apps/docs/components/index.md',
];

export interface Fixture {
  /** Human-readable id for the test description. */
  id: string;
  /** Source path/anchor for error messages. */
  source: string;
  /** Markdown input. */
  input: string;
  /** Path prefix for snapshot files. Renderer suffixes (.html, .react.tsx, .tailwind.html, .tree.txt) are appended. */
  snapshotBase: string;
  /** When true, emit an AST tree snapshot in addition to the rendered outputs. */
  snapshotAst: boolean;
  /**
   * Absolute path to an invariants module if one exists next to the fixture.
   * `<base>.invariants.ts` — must pass.
   * `<base>.expected-fail.invariants.ts` — currently fails (documents a bug);
   *   wired via vitest's `it.fails()` so a future fix surfaces as a test that
   *   "passed unexpectedly", forcing explicit attention.
   */
  invariantsPath?: string;
  /** True when invariantsPath points at an `.expected-fail.invariants.ts`. */
  expectedToFail?: boolean;
}

function walkMd(dir: string): string[] {
  let out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out = out.concat(walkMd(full));
      continue;
    }
    // Only collect .md files that look like fixtures. Skip:
    //   - *.notes.md  → human review notes (sidecar)
    //   - KNOWN_ISSUES.md / README.md / etc. → uppercase docs aren't fixtures
    if (!entry.endsWith('.md')) continue;
    if (entry.endsWith('.notes.md')) continue;
    if (entry === entry.toUpperCase()) continue;
    out.push(full);
  }
  return out;
}

/**
 * Strip a leading run of HTML comments from a fixture file. Convention: the
 * top of a regression .md may carry `<!-- ... -->` notes describing why the
 * fixture exists; those are documentation, not parser input.
 */
function stripLeadingComments(md: string): string {
  return md.replace(/^(\s*<!--[\s\S]*?-->\s*)+/, '');
}

function findInvariants(snapshotBase: string): { path?: string; expectedToFail: boolean } {
  const ok = `${snapshotBase}.invariants.ts`;
  const fail = `${snapshotBase}.expected-fail.invariants.ts`;
  if (existsSync(ok) && existsSync(fail)) {
    throw new Error(
      `Fixture has both .invariants.ts and .expected-fail.invariants.ts: ${snapshotBase}\n` +
        `Pick one — a fixture either documents a bug (expected-fail) or asserts correctness, not both.`
    );
  }
  if (existsSync(ok)) return { path: ok, expectedToFail: false };
  if (existsSync(fail)) return { path: fail, expectedToFail: true };
  return { expectedToFail: false };
}

function loadRegressions(): Fixture[] {
  const files = walkMd(REGRESSIONS_DIR);
  return files.map((file) => {
    const rel = relative(REGRESSIONS_DIR, file).replace(/\.md$/, '');
    const raw = readFileSync(file, 'utf-8');
    const snapshotBase = file.replace(/\.md$/, '');
    const inv = findInvariants(snapshotBase);
    return {
      id: `regression: ${rel}`,
      source: relative(REPO_ROOT, file),
      input: stripLeadingComments(raw),
      snapshotBase,
      snapshotAst: true,
      invariantsPath: inv.path,
      expectedToFail: inv.expectedToFail,
    };
  });
}

function loadDocFixtures(): Fixture[] {
  const fixtures: Fixture[] = [];
  for (const docRel of DOC_SOURCES) {
    const docPath = join(REPO_ROOT, docRel);
    let markdown: string;
    try {
      markdown = readFileSync(docPath, 'utf-8');
    } catch {
      continue; // doc file moved/missing — not a hard failure for the runner
    }
    const slug = docRel.split('/').pop()!.replace(/\.md$/, '');
    const demos = extractDemos(markdown);
    if (demos.length === 0) {
      // Loud, not silent: a docs file that produces zero demos is almost
      // certainly an extraction regression, not an intentionally empty page.
      throw new Error(
        `No ::: demo blocks found in ${docRel}. Either the file lost its demos ` +
          `or the extractor is broken; refusing to silently shrink the fixture corpus.`
      );
    }
    for (const demo of demos) {
      const snapshotBase = join(SNAPSHOTS_DOCS_DIR, slug, demo.name);
      const inv = findInvariants(snapshotBase);
      fixtures.push({
        id: `docs/${slug}: ${demo.name}`,
        source: `${docRel}:${demo.line}`,
        input: demo.raw,
        snapshotBase,
        snapshotAst: false,
        invariantsPath: inv.path,
        expectedToFail: inv.expectedToFail,
      });
    }
  }
  return fixtures;
}

export function loadFixtures(): Fixture[] {
  return [...loadRegressions(), ...loadDocFixtures()];
}
