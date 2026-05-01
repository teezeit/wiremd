/**
 * Seed REVIEW_LOG.md from the fixture corpus.
 *
 * Idempotent: re-running merges with the existing log. Per-fixture user
 * verdicts and free-form comments are preserved verbatim. New fixtures
 * land at their filesystem-derived status (`.expected-fail.invariants.ts`
 * → ❌, `.notes.md` → 📝, `.invariants.ts` → ✅, otherwise ⏳); fixtures
 * that disappear from the corpus drop out. Existing entries are never
 * mutated — if a sidecar appears or disappears mid-sweep, update the
 * row by hand (or via REVIEW.html).
 *
 * Usage: pnpm review:log
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadFixtures, type Fixture } from '../tests/lib/fixture-runner.js';

const __filename = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = dirname(__filename);
const CORE_DIR = dirname(SCRIPTS_DIR);
const FIXTURES_DIR = join(CORE_DIR, 'tests', 'fixtures');
const LOG_PATH = join(FIXTURES_DIR, 'REVIEW_LOG.md');

type Status = '⏳' | '✅' | '❌' | '📝' | '🚧';
const STATUSES: readonly Status[] = ['⏳', '✅', '❌', '📝', '🚧'];

function deriveStatus(fixture: Fixture): Status {
  // Order matters: a fixture can have at most one of these (enforced by findInvariants).
  if (fixture.expectedToFail) return '❌';
  if (fixture.invariantsPath) return '✅';
  if (existsSync(`${fixture.snapshotBase}.notes.md`)) return '📝';
  return '⏳';
}

interface StoredEntry {
  status: Status;
  comment: string;
}

/**
 * Parse an existing REVIEW_LOG.md into anchor → {status, comment}.
 * Mirrors the parser in REVIEW.html so the two stay round-trip compatible.
 */
function parseExistingLog(text: string): Map<string, StoredEntry> {
  const refToAnchor = new Map<string, string>();
  const refDef = /^\[(\d+)\]:\s+\.\/REVIEW\.html#(fixture-[a-z0-9-]+)/i;
  for (const line of text.split('\n')) {
    const m = refDef.exec(line);
    if (m) refToAnchor.set(m[1], m[2]);
  }

  const out = new Map<string, StoredEntry>();
  const row = /^- \[(\S+)\s+([^\]]+)\]\[(\d+)\](?:\s+—\s+(.*))?$/;
  for (const line of text.split('\n')) {
    const m = row.exec(line);
    if (!m) continue;
    const [, status, , ref, comment] = m;
    const anchor = refToAnchor.get(ref);
    if (!anchor) continue;
    if (!STATUSES.includes(status as Status)) continue;
    // Decode the soft-newline sentinel REVIEW.html uses to keep rows single-line.
    const decoded = (comment ?? '').replace(/ \\n /g, '\n').trim();
    out.set(anchor, { status: status as Status, comment: decoded });
  }
  return out;
}

/**
 * Pick a status for a fixture row. Stored verdict wins verbatim — the
 * user is authoritative. Filesystem-derived status only applies when
 * there's no stored entry (i.e. a new fixture).
 */
function mergeStatus(derived: Status, stored: StoredEntry | undefined): Status {
  return stored ? stored.status : derived;
}

interface Group {
  heading: string;
  source?: string;
  fixtures: Fixture[];
}

function groupFixtures(fixtures: Fixture[]): Group[] {
  const groups = new Map<string, Group>();
  for (const f of fixtures) {
    let groupKey: string;
    let heading: string;
    let source: string | undefined;

    if (f.id.startsWith('regression: ')) {
      const path = f.id.slice('regression: '.length);
      const parts = path.split('/');
      const name = parts.pop()!;
      const dir = parts.join(' / ');
      groupKey = `regression-${dir}`;
      heading = dir
        .split(' / ')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' / ');
      source = `regressions/${parts.join('/')}`;
      void name;
    } else if (f.id.startsWith('docs/')) {
      const slug = f.id.slice('docs/'.length).split(':')[0].trim();
      groupKey = `docs-${slug}`;
      heading = slug
        .split('-')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' ');
      source = `apps/docs/components/${slug}.md`;
    } else {
      groupKey = 'other';
      heading = 'Other';
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, { heading, source, fixtures: [] });
    }
    groups.get(groupKey)!.fixtures.push(f);
  }
  return [...groups.values()];
}

function shortName(fixture: Fixture): string {
  if (fixture.id.startsWith('regression: ')) {
    return fixture.id.split('/').pop() ?? fixture.id;
  }
  if (fixture.id.startsWith('docs/')) {
    return fixture.id.split(':')[1]?.trim() ?? fixture.id;
  }
  return fixture.id;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Stable per-fixture anchor used in REVIEW.html. Must match build-review-page. */
function anchorFor(fixture: Fixture): string {
  return `fixture-${slugify(fixture.id)}`;
}

function buildLog(fixtures: Fixture[], stored: Map<string, StoredEntry>): string {
  const regressionGroups = [];
  const docGroups = [];
  for (const g of groupFixtures(fixtures)) {
    if (g.source?.startsWith('regressions/')) regressionGroups.push(g);
    else docGroups.push(g);
  }

  const lines: string[] = [];
  lines.push(
    `<!-- Auto-seeded by \`pnpm review:log\`. Re-runs MERGE — your verdicts and`,
    `     comments are preserved. REVIEW.html reads/writes this file via the`,
    `     FS Access API; hand-edits are fine but keep the row pattern intact. -->`,
    ``,
    `# Snapshot review log`,
    ``,
    `Legend: ⏳ todo | ✅ OK | ❌ failing (.expected-fail.invariants.ts) | 📝 noted (.notes.md) | 🚧 known issue (KNOWN_ISSUES.md)`,
    ``
  );

  let refIndex = 1;
  const refs: string[] = [];

  function emitGroup(g: Group) {
    const headingLine = g.source
      ? `### ${g.heading} (${g.source})`
      : `### ${g.heading}`;
    lines.push(headingLine);
    for (const f of g.fixtures) {
      const anchor = anchorFor(f);
      const existing = stored.get(anchor);
      const status = mergeStatus(deriveStatus(f), existing);
      const ref = refIndex++;
      const name = shortName(f);
      let row = `- [${status} ${name}][${ref}]`;
      if (existing?.comment) {
        // Preserve user comment, encoded as a single-line row using the
        // same sentinel REVIEW.html's serializeLog uses.
        const flat = existing.comment.replace(/[\r\n]+/g, ' \\n ');
        row += ` — ${flat}`;
      }
      lines.push(row);
      refs.push(`[${ref}]: ./REVIEW.html#${anchorFor(f)}`);
    }
    lines.push('');
  }

  if (regressionGroups.length > 0) {
    lines.push('## Regression fixtures', '');
    for (const g of regressionGroups) emitGroup(g);
  }

  if (docGroups.length > 0) {
    lines.push('## Doc-derived fixtures', '');
    for (const g of docGroups) emitGroup(g);
  }

  lines.push(...refs, '');
  return lines.join('\n');
}

const fixtures = loadFixtures();
const existing = existsSync(LOG_PATH)
  ? parseExistingLog(readFileSync(LOG_PATH, 'utf-8'))
  : new Map<string, StoredEntry>();
const content = buildLog(fixtures, existing);
writeFileSync(LOG_PATH, content, 'utf-8');

const preserved = [...existing.keys()].filter((a) =>
  fixtures.some((f) => anchorFor(f) === a)
).length;
const newFixtures = fixtures.filter((f) => !existing.has(anchorFor(f))).length;
const dropped = existing.size - preserved;
console.log(
  `✓ wrote ${LOG_PATH} (${fixtures.length} fixtures: ${preserved} preserved, ${newFixtures} new, ${dropped} dropped)`
);
