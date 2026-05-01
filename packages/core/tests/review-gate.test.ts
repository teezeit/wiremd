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

interface PendingRow {
  ref: string;
  name: string;
  comment: string;
  anchor: string;
}

function parsePending(text: string): PendingRow[] {
  // Map ref number → anchor via the footnote definitions.
  const refToAnchor = new Map<string, string>();
  const refDef = /^\[(\d+)\]:\s+\.\/REVIEW\.html#(fixture-[a-z0-9-]+)/i;
  for (const line of text.split('\n')) {
    const m = refDef.exec(line);
    if (m) refToAnchor.set(m[1], m[2]);
  }

  const out: PendingRow[] = [];
  const todoRow = /^- \[⏳\s+([^\]]+)\]\[(\d+)\](?:\s+—\s+(.*))?$/;
  for (const line of text.split('\n')) {
    const m = todoRow.exec(line);
    if (!m) continue;
    const [, name, ref, comment] = m;
    out.push({
      ref,
      name: name.trim(),
      comment: (comment ?? '').replace(/ \\n /g, '\n').trim(),
      anchor: refToAnchor.get(ref) ?? `(unknown ref ${ref})`,
    });
  }
  return out;
}

describe('Review gate', () => {
  it('every fixture has been visually reviewed (no ⏳ rows in REVIEW_LOG.md)', () => {
    if (!existsSync(LOG_PATH)) {
      throw new Error(
        `REVIEW_LOG.md not found at ${LOG_PATH}. Run \`pnpm review:log\` to seed it.`
      );
    }

    const pending = parsePending(readFileSync(LOG_PATH, 'utf-8'));
    if (pending.length === 0) return;

    const list = pending
      .map((p) => {
        const tail = p.comment ? `  // ${p.comment.split('\n')[0]}` : '';
        return `    ⏳ ${p.name}${tail}`;
      })
      .join('\n');

    throw new Error(
      `${pending.length} fixture(s) need visual review:\n` +
        `${list}\n\n` +
        `What to do:\n` +
        `  1. pnpm review            (opens the visual review page)\n` +
        `  2. Click ✅ on each row whose rendered output looks correct.\n` +
        `  3. Re-run pnpm test.\n\n` +
        `If a fixture is genuinely failing, mark it as such instead:\n` +
        `  - Add a sidecar \`<fixture>.expected-fail.invariants.ts\` with the contract,\n` +
        `    or \`<fixture>.notes.md\` for a vague observation, then re-seed the log\n` +
        `    with \`pnpm review:log\` (idempotent — preserves comments).`
    );
  });
});
