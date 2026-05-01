/**
 * Review gate.
 *
 * Fails when any fixture in REVIEW_LOG.md is still marked ⏳, i.e. its
 * rendered output has not been visually verified. Snapshot tests catch
 * drift, invariants catch contract violations, but neither tells you
 * whether the rendered HTML *looks right*. This test makes that human
 * judgement load-bearing: refresh a snapshot, the matching fixture
 * flips to ⏳, this test goes red, you can't ship until you've opened
 * `pnpm review` and clicked ✅.
 *
 * The pairing:
 *   - `pnpm review:refresh` (or `pnpm test -u` + `pnpm review:flag --snapshot-changes`)
 *     refreshes snapshots and flips the affected fixtures to ⏳.
 *   - `pnpm review` opens the visual page; click ✅ once each one looks right.
 *   - `pnpm test` then turns green again.
 *
 * Bypass intentionally exists: the gate is a forcing function, not a
 * lock. If you really need to ship without review, manually flip the
 * row in REVIEW_LOG.md or comment-out the assertion. But: don't.
 */

import { describe, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const TESTS_DIR = dirname(__filename);
const LOG_PATH = join(TESTS_DIR, 'fixtures', 'REVIEW_LOG.md');

/**
 * The set of fixtures currently marked ❌ in REVIEW_LOG.md (anchors).
 * The gate fails if a NEW ❌ appears that isn't in this list. Adding a
 * new known bug? Add its anchor here in the same change. Fixing one?
 * Remove the anchor here (or the gate will complain that ❌ shrank
 * without acknowledgement, which is also useful — it's the trigger to
 * rename the .expected-fail.invariants.ts file and close the bug).
 */
const KNOWN_FAILURES = new Set<string>([
  'fixture-regression-containers-closer-no-blank-line-before-list',
  'fixture-regression-containers-closer-text-before-nested-opener',
  'fixture-regression-formatting-closer-with-trailing-space',
  'fixture-regression-formatting-icon-needs-blank-line',
  'fixture-regression-formatting-inline-nav-needs-blank-line',
  'fixture-regression-formatting-siblings-no-blank-between',
  'fixture-regression-formatting-trailing-whitespace-opener',
  'fixture-regression-grid-text-after-opener-flag',
  'fixture-regression-inline-text-after-button',
  'fixture-docs-inputs-with-placeholder',
  'fixture-docs-badges-in-a-table',
  'fixture-docs-cards-card',
  'fixture-docs-page-layouts-sidebar-layout',
  'fixture-docs-page-layouts-sidebar-with-sections',
  'fixture-docs-tables-with-badges',
  'fixture-docs-tables-data-table-with-actions',
  // Button .small/.large size rules only landed in clean during Phase A;
  // sketch/wireframe/material/brutal/tailwind all render sizes identically.
  // Tracked here until the rules are propagated; a future styles.test.ts
  // assertion covering non-clean styles will tighten this further.
  'fixture-docs-buttons-sizes-custom-classes',
]);

interface Row {
  ref: string;
  name: string;
  comment: string;
  anchor: string;
  status: string;
}

function parseRows(text: string): Row[] {
  const refToAnchor = new Map<string, string>();
  const refDef = /^\[(\d+)\]:\s+\.\/REVIEW\.html#(fixture-[a-z0-9-]+)/i;
  for (const line of text.split(/\r?\n/)) {
    const m = refDef.exec(line);
    if (m) refToAnchor.set(m[1], m[2]);
  }

  const out: Row[] = [];
  const row = /^- \[(\S+)\s+([^\]]+)\]\[(\d+)\](?:\s+—\s+(.*))?$/;
  for (const line of text.split(/\r?\n/)) {
    const m = row.exec(line);
    if (!m) continue;
    const [, status, name, ref, comment] = m;
    out.push({
      ref,
      status,
      name: name.trim(),
      comment: (comment ?? '').replace(/ \\n /g, '\n').trim(),
      anchor: refToAnchor.get(ref) ?? `(unknown ref ${ref})`,
    });
  }
  return out;
}

describe('Review gate', () => {
  if (!existsSync(LOG_PATH)) {
    it('review log exists', () => {
      throw new Error(
        `REVIEW_LOG.md not found at ${LOG_PATH}. Run \`pnpm review:log\` to seed it.`
      );
    });
    return;
  }

  const rows = parseRows(readFileSync(LOG_PATH, 'utf-8'));

  it('every fixture has been visually reviewed (no ⏳ rows)', () => {
    const pending = rows.filter((r) => r.status === '⏳');
    if (pending.length === 0) return;
    const list = pending
      .map((p) => {
        const tail = p.comment ? `  // ${p.comment.split('\n')[0]}` : '';
        return `    ⏳ ${p.name}${tail}`;
      })
      .join('\n');
    throw new Error(
      `${pending.length} fixture(s) need visual review:\n${list}\n\n` +
        `What to do:\n` +
        `  1. pnpm review            (opens the visual review page)\n` +
        `  2. Click ✅ on each row whose rendered output looks correct.\n` +
        `  3. Re-run pnpm test.\n\n` +
        `If a fixture is genuinely failing, promote it instead:\n` +
        `  - Add \`<fixture>.expected-fail.invariants.ts\` with the contract,\n` +
        `    add the anchor to KNOWN_FAILURES in this file, then re-seed:\n` +
        `    \`pnpm review:log\`.`
    );
  });

  it('no new ❌ fixtures beyond KNOWN_FAILURES', () => {
    const failing = rows.filter((r) => r.status === '❌');
    const failingAnchors = new Set(failing.map((r) => r.anchor));
    const novel = [...failingAnchors].filter((a) => !KNOWN_FAILURES.has(a));
    if (novel.length === 0) return;
    const list = novel
      .map((a) => {
        const r = failing.find((f) => f.anchor === a)!;
        return `    ❌ ${r.name}  (${a})`;
      })
      .join('\n');
    throw new Error(
      `${novel.length} fixture(s) became ❌ but aren't in KNOWN_FAILURES:\n${list}\n\n` +
        `Either:\n` +
        `  - Fix the bug, mark the row ✅ in REVIEW_LOG.md.\n` +
        `  - Add the anchor to KNOWN_FAILURES in tests/review-gate.test.ts\n` +
        `    (and ship a matching .expected-fail.invariants.ts on the fixture).`
    );
  });

  it('no stale entries in KNOWN_FAILURES (each one is still ❌)', () => {
    const failingAnchors = new Set(rows.filter((r) => r.status === '❌').map((r) => r.anchor));
    const stale = [...KNOWN_FAILURES].filter((a) => !failingAnchors.has(a));
    if (stale.length === 0) return;
    throw new Error(
      `KNOWN_FAILURES lists ${stale.length} anchor(s) that aren't ❌ in REVIEW_LOG.md:\n` +
        stale.map((a) => `    ${a}`).join('\n') +
        `\n\nIf the bug is fixed, drop the entry here AND rename the\n` +
        `\`.expected-fail.invariants.ts\` file (drop \`.expected-fail.\`).\n` +
        `If the row was relabelled (e.g. to ✅ without a fix), restore\n` +
        `the ❌ in REVIEW_LOG.md.`
    );
  });
});
