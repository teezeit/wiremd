/**
 * Seed REVIEW_LOG.md from the fixture corpus.
 *
 * Run once when starting a sweep. Afterwards, REVIEW.html (FS Access API)
 * writes status changes back to this file directly. Re-running this script
 * OVERWRITES any free-form comments that were typed into the log.
 *
 * Usage: pnpm review:log
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadFixtures, type Fixture } from '../tests/lib/fixture-runner.js';

const __filename = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = dirname(__filename);
const CORE_DIR = dirname(SCRIPTS_DIR);
const FIXTURES_DIR = join(CORE_DIR, 'tests', 'fixtures');
const LOG_PATH = join(FIXTURES_DIR, 'REVIEW_LOG.md');

type Status = '⏳' | '✅' | '❌' | '📝' | '🚧';

function deriveStatus(fixture: Fixture): Status {
  // Order matters: a fixture can have at most one of these (enforced by findInvariants).
  if (fixture.expectedToFail) return '❌';
  if (fixture.invariantsPath) return '✅';
  if (existsSync(`${fixture.snapshotBase}.notes.md`)) return '📝';
  return '⏳';
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
      // regression: containers/closer/foo → "Containers / Closer"
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
      // docs/buttons: basic → group "buttons"
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

function buildLog(fixtures: Fixture[]): string {
  const regressionGroups = [];
  const docGroups = [];
  for (const g of groupFixtures(fixtures)) {
    if (g.source?.startsWith('regressions/')) regressionGroups.push(g);
    else docGroups.push(g);
  }

  const lines: string[] = [];
  lines.push(
    `<!-- Auto-seeded by \`pnpm review:log\`. REVIEW.html reads/writes this file`,
    `     via the FS Access API; hand-edits are fine but keep the row pattern`,
    `     intact. Re-running the seeder OVERWRITES comments. -->`,
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
      const status = deriveStatus(f);
      const ref = refIndex++;
      const name = shortName(f);
      lines.push(`- [${status} ${name}][${ref}]`);
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
const content = buildLog(fixtures);
writeFileSync(LOG_PATH, content, 'utf-8');
console.log(`✓ wrote ${LOG_PATH} (${fixtures.length} fixtures)`);
