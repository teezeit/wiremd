/**
 * Flip review-log entries to ⏳ for re-review.
 *
 * Use after a code change that affects rendering, so the matching
 * fixtures show up under the "Todo" filter in REVIEW.html. Comments are
 * preserved; only the status emoji is flipped (and only if not already
 * ⏳). Other rows are untouched.
 *
 * Usage:
 *   pnpm review:flag <fixture-id-or-pattern>...
 *   pnpm review:flag --snapshot-changes [--since <git-ref>]
 *   pnpm review:flag --all
 *
 * Patterns:
 *   - Fixture id: "docs/alerts: variants" or "regression: containers/closer/foo"
 *   - Short name: "variants"  (matches all fixtures with that short name)
 *   - Glob on id: "docs/alerts:*"
 *
 * --snapshot-changes flips every fixture whose .html / .react.tsx /
 * .tailwind.html / .tree.txt has changed against <since>. The default
 * (`HEAD`) looks at *working-tree changes* — pair it with `pnpm test -u`
 * to flip exactly the fixtures whose snapshots just got refreshed.
 * Pass `--since HEAD~1` etc. to compare across commits. Doesn't help
 * for CSS-only changes — pass those fixtures explicitly.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { loadFixtures, type Fixture } from '../tests/lib/fixture-runner.js';

const __filename = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = dirname(__filename);
const CORE_DIR = dirname(SCRIPTS_DIR);
const REPO_ROOT = dirname(dirname(CORE_DIR));
const LOG_PATH = join(CORE_DIR, 'tests', 'fixtures', 'REVIEW_LOG.md');

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function anchorFor(fixture: Fixture): string {
  return `fixture-${slugify(fixture.id)}`;
}

function shortName(fixture: Fixture): string {
  if (fixture.id.startsWith('regression: ')) return fixture.id.split('/').pop() ?? fixture.id;
  if (fixture.id.startsWith('docs/')) return fixture.id.split(':')[1]?.trim() ?? fixture.id;
  return fixture.id;
}

/** Normalize "<slug>/<name>" to "docs/<slug>: <name>" for ergonomics. */
function normalizePattern(p: string): string[] {
  const out = [p];
  const m = /^([a-z0-9-]+)\/([a-z0-9-*]+)$/.exec(p);
  if (m) out.push(`docs/${m[1]}: ${m[2]}`);
  return out;
}

function matchFixtures(fixtures: Fixture[], patterns: string[]): Fixture[] {
  if (patterns.length === 0) return [];
  const matched = new Set<Fixture>();
  for (const p of patterns) {
    const candidates = normalizePattern(p);
    let any = false;
    for (const f of fixtures) {
      const id = f.id;
      const short = shortName(f);
      for (const cand of candidates) {
        if (id === cand || short === cand) { matched.add(f); any = true; break; }
        if (cand.includes('*')) {
          const re = new RegExp('^' + cand.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
          if (re.test(id)) { matched.add(f); any = true; break; }
        }
      }
    }
    if (!any) console.warn(`  ! no fixture matched: ${p}`);
  }
  return [...matched];
}

function fixturesWithChangedSnapshots(fixtures: Fixture[], since: string): Fixture[] {
  // Default `since=HEAD` means working-tree-vs-HEAD (intentional — pairs
  // with `pnpm test -u`). A non-HEAD ref gives commit-range diff.
  const cmd = since === 'HEAD' || since === ''
    ? 'git diff --name-only HEAD'
    : `git diff --name-only ${since}..HEAD`;
  let diffOut: string;
  try {
    diffOut = execSync(cmd, { cwd: REPO_ROOT, encoding: 'utf-8' });
  } catch (err) {
    console.error(`Failed to run \`${cmd}\`:`, err);
    return [];
  }
  const changed = new Set(
    diffOut.split('\n').map((p) => p.trim()).filter(Boolean)
  );
  const matched: Fixture[] = [];
  for (const f of fixtures) {
    const base = f.snapshotBase;
    const candidates = ['.html', '.react.tsx', '.tailwind.html', '.tree.txt'].map(
      (ext) => relative(REPO_ROOT, base + ext)
    );
    if (candidates.some((c) => changed.has(c))) matched.push(f);
  }
  return matched;
}

function flipToTodo(text: string, anchors: Set<string>): { text: string; flipped: number; alreadyTodo: number } {
  const refToAnchor = new Map<string, string>();
  const refDef = /^\[(\d+)\]:\s+\.\/REVIEW\.html#(fixture-[a-z0-9-]+)/i;
  for (const line of text.split('\n')) {
    const m = refDef.exec(line);
    if (m) refToAnchor.set(m[1], m[2]);
  }

  const row = /^(- \[)(\S+)(\s+[^\]]+\]\[(\d+)\])(?:(\s+—\s+.*))?$/;
  let flipped = 0;
  let alreadyTodo = 0;
  const lines = text.split('\n').map((line) => {
    const m = row.exec(line);
    if (!m) return line;
    const ref = m[4];
    const anchor = refToAnchor.get(ref);
    if (!anchor || !anchors.has(anchor)) return line;
    const status = m[2];
    if (status === '⏳') { alreadyTodo++; return line; }
    flipped++;
    return `${m[1]}⏳${m[3]}${m[5] ?? ''}`;
  });
  return { text: lines.join('\n'), flipped, alreadyTodo };
}

const args = process.argv.slice(2);
let since = 'HEAD';
let useSnapshotChanges = false;
let useAll = false;
const patterns: string[] = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--snapshot-changes') useSnapshotChanges = true;
  else if (a === '--all') useAll = true;
  else if (a === '--since') since = args[++i];
  else if (a.startsWith('--')) { console.error(`Unknown flag: ${a}`); process.exit(2); }
  else patterns.push(a);
}

if (!useSnapshotChanges && !useAll && patterns.length === 0) {
  console.error('Provide one or more fixture ids/patterns, --snapshot-changes, or --all');
  process.exit(2);
}

if (!existsSync(LOG_PATH)) {
  console.error(`No REVIEW_LOG.md at ${LOG_PATH}. Run \`pnpm review:log\` first.`);
  process.exit(1);
}

const fixtures = loadFixtures();
const targets: Fixture[] = useAll
  ? fixtures
  : useSnapshotChanges
  ? fixturesWithChangedSnapshots(fixtures, since)
  : matchFixtures(fixtures, patterns);

if (targets.length === 0) {
  console.log('Nothing matched — log unchanged.');
  process.exit(0);
}

const anchors = new Set(targets.map(anchorFor));
const original = readFileSync(LOG_PATH, 'utf-8');
const { text, flipped, alreadyTodo } = flipToTodo(original, anchors);
writeFileSync(LOG_PATH, text, 'utf-8');

console.log(`✓ flipped ${flipped} row(s) to ⏳ (${alreadyTodo} already ⏳, ${targets.length - flipped - alreadyTodo} not in log).`);
for (const t of targets) console.log(`    ⏳ ${t.id}`);
