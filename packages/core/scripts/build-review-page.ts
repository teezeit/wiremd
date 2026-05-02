/**
 * Build REVIEW.html — the snapshot review tool.
 *
 * Self-contained static HTML page (CSS + JS inline). Renders every fixture
 * in the corpus as a 3-column row: input markdown | rendered output (styled,
 * iframe) | status + comment controls.
 *
 * The page reads/writes REVIEW_LOG.md directly via the File System Access
 * API (Chrome/Edge/Opera). Falls back to a download flow elsewhere.
 *
 * Usage: pnpm review
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { register } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadFixtures, type Fixture } from '../tests/lib/fixture-runner.js';

const __filename = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = dirname(__filename);
const CORE_DIR = dirname(SCRIPTS_DIR);
const PAGE_PATH = join(CORE_DIR, 'tests', 'fixtures', 'REVIEW.html');

register('./svg-raw-loader.mjs', pathToFileURL(`${SCRIPTS_DIR}/`));

const { parse } = await import('../src/parser/index.js');
const { renderToHTML } = await import('../src/renderer/index.js');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function anchorFor(fixture: Fixture): string {
  return `fixture-${slugify(fixture.id)}`;
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

interface Group {
  heading: string;
  source?: string;
  fixtures: Fixture[];
}

function groupFixtures(fixtures: Fixture[]): { regressions: Group[]; docs: Group[] } {
  const groups = new Map<string, Group>();
  for (const f of fixtures) {
    let key: string;
    let heading: string;
    let source: string | undefined;
    if (f.id.startsWith('regression: ')) {
      const path = f.id.slice('regression: '.length);
      const parts = path.split('/');
      parts.pop();
      const dir = parts.join(' / ');
      key = `regression-${dir}`;
      heading = dir
        .split(' / ')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' / ');
      source = `regressions/${parts.join('/')}`;
    } else if (f.id.startsWith('docs/')) {
      const slug = f.id.slice('docs/'.length).split(':')[0].trim();
      key = `docs-${slug}`;
      heading = slug
        .split('-')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' ');
      source = `apps/docs/components/${slug}.md`;
    } else {
      key = 'other';
      heading = 'Other';
    }
    if (!groups.has(key)) groups.set(key, { heading, source, fixtures: [] });
    groups.get(key)!.fixtures.push(f);
  }
  const regressions: Group[] = [];
  const docs: Group[] = [];
  for (const g of groups.values()) {
    (g.source?.startsWith('regressions/') ? regressions : docs).push(g);
  }
  return { regressions, docs };
}

function renderFixtureSection(fixture: Fixture): string {
  const ast = parse(fixture.input);
  const styled = renderToHTML(ast, { style: 'clean', inlineStyles: true });
  const anchor = anchorFor(fixture);
  const name = shortName(fixture);

  return `
  <section id="${anchor}" class="fixture" data-fixture-id="${escapeAttr(fixture.id)}" data-name="${escapeAttr(name)}">
    <header class="fixture-header">
      <h2>${escapeHtml(fixture.id)}</h2>
      <span class="source">${escapeHtml(fixture.source)}</span>
    </header>
    <div class="row">
      <pre class="col-input"><code>${escapeHtml(fixture.input)}</code></pre>
      <iframe class="col-output" srcdoc="${escapeAttr(styled)}" loading="lazy"></iframe>
      <div class="col-status">
        <div class="status-buttons" role="radiogroup" aria-label="status">
          <button data-status="⏳" type="button" title="Todo">⏳</button>
          <button data-status="✅" type="button" title="OK">✅</button>
          <button data-status="❌" type="button" title="Failing — needs invariants">❌</button>
          <button data-status="📝" type="button" title="Noted — vague observation">📝</button>
          <button data-status="🚧" type="button" title="Known issue — see KNOWN_ISSUES.md">🚧</button>
        </div>
        <textarea class="comment" placeholder="Comment (optional, autosaves on blur)"></textarea>
        <span class="saved-indicator" aria-live="polite"></span>
        <span class="not-in-log" hidden>⚠ not in log — run <code>pnpm review:log</code></span>
      </div>
    </div>
  </section>`;
}

function renderToc(groups: { regressions: Group[]; docs: Group[] }): string {
  const lines: string[] = ['<nav class="toc"><h3>Fixtures</h3>'];

  function renderGroup(g: Group) {
    lines.push(`<details open><summary>${escapeHtml(g.heading)}</summary><ul>`);
    for (const f of g.fixtures) {
      const anchor = anchorFor(f);
      const name = escapeHtml(shortName(f));
      lines.push(
        `<li><a href="#${anchor}" data-anchor="${anchor}"><span class="toc-status">⏳</span> ${name}</a></li>`
      );
    }
    lines.push('</ul></details>');
  }

  if (groups.regressions.length > 0) {
    lines.push('<h4>Regressions</h4>');
    for (const g of groups.regressions) renderGroup(g);
  }
  if (groups.docs.length > 0) {
    lines.push('<h4>Doc-derived</h4>');
    for (const g of groups.docs) renderGroup(g);
  }

  lines.push('</nav>');
  return lines.join('\n');
}

const fixtures = loadFixtures();
const groups = groupFixtures(fixtures);
const sections = fixtures.map(renderFixtureSection).join('\n');
const toc = renderToc(groups);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Wiremd fixture review (${fixtures.length})</title>
<style>
  :root {
    --bg: #fafafa;
    --fg: #1c1c1e;
    --muted: #6b7280;
    --border: #e5e7eb;
    --accent: #2563eb;
    --col-todo: #d1d5db;
    --col-ok: #10b981;
    --col-fail: #ef4444;
    --col-noted: #f59e0b;
    --col-known: #8b5cf6;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--fg);
    font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  header.page {
    position: sticky;
    top: 0;
    z-index: 10;
    background: white;
    border-bottom: 1px solid var(--border);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  header.page h1 { margin: 0; font-size: 16px; font-weight: 600; }
  header.page .counts { display: flex; gap: 8px; font-size: 13px; }
  header.page .counts span { padding: 2px 8px; background: #f3f4f6; border-radius: 12px; }
  header.page .filters { display: flex; gap: 4px; }
  header.page .filters button {
    background: white;
    border: 1px solid var(--border);
    padding: 4px 10px;
    border-radius: 16px;
    cursor: pointer;
    font-size: 13px;
  }
  header.page .filters button.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }
  #connect-btn {
    margin-left: auto;
    background: var(--accent);
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
  }
  #connect-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  #connect-btn.connected { background: #10b981; }
  #fsaccess-warning {
    background: #fef3c7;
    color: #92400e;
    padding: 10px 20px;
    border-bottom: 1px solid #fcd34d;
    font-size: 13px;
  }
  main {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: calc(100vh - 60px);
  }
  nav.toc {
    border-right: 1px solid var(--border);
    background: white;
    padding: 16px;
    position: sticky;
    top: 60px;
    align-self: flex-start;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  nav.toc h3 { margin: 0 0 12px; font-size: 13px; text-transform: uppercase; color: var(--muted); }
  nav.toc h4 { margin: 16px 0 4px; font-size: 12px; text-transform: uppercase; color: var(--muted); }
  nav.toc details { margin-bottom: 4px; }
  nav.toc summary { cursor: pointer; font-weight: 500; padding: 2px 0; font-size: 13px; }
  nav.toc ul { list-style: none; margin: 4px 0 8px; padding: 0 0 0 14px; }
  nav.toc li { margin: 2px 0; }
  nav.toc a {
    display: flex;
    gap: 6px;
    align-items: center;
    color: inherit;
    text-decoration: none;
    font-size: 12px;
    padding: 1px 4px;
    border-radius: 3px;
  }
  nav.toc a:hover { background: #f3f4f6; }
  nav.toc .toc-status { font-size: 11px; }

  .content { padding: 20px; }
  section.fixture {
    background: white;
    border: 2px solid var(--col-todo);
    border-radius: 8px;
    margin-bottom: 24px;
    overflow: hidden;
    transition: border-color 120ms ease;
  }
  section.fixture[data-status="✅"] { border-color: var(--col-ok); }
  section.fixture[data-status="❌"] { border-color: var(--col-fail); }
  section.fixture[data-status="📝"] { border-color: var(--col-noted); }
  section.fixture[data-status="🚧"] { border-color: var(--col-known); }

  .fixture-header {
    padding: 10px 16px;
    background: #f9fafb;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .fixture-header h2 { margin: 0; font-size: 14px; font-family: ui-monospace, SF Mono, Menlo, monospace; }
  .fixture-header .source { font-size: 11px; color: var(--muted); }

  .row {
    display: grid;
    grid-template-columns: 30% 40% 30%;
    min-height: 240px;
    height: clamp(240px, 45vh, 400px);
  }
  .col-input {
    margin: 0;
    padding: 12px;
    background: #1c1c1e;
    color: #f3f4f6;
    font: 12px/1.55 ui-monospace, SF Mono, Menlo, monospace;
    overflow: auto;
    white-space: pre;
    border-right: 1px solid var(--border);
    min-height: 0;
    max-height: 100%;
  }
  .col-input code { display: block; }
  .col-output {
    border: 0;
    border-right: 1px solid var(--border);
    width: 100%;
    height: 100%;
    background: white;
  }
  .col-status {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .status-buttons { display: flex; gap: 4px; }
  .status-buttons button {
    flex: 1;
    background: white;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 120ms ease;
  }
  .status-buttons button:hover { background: #f3f4f6; }
  .status-buttons button.active {
    background: #1c1c1e;
    color: white;
    border-color: #1c1c1e;
  }
  .comment {
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px;
    font: inherit;
    resize: none;
    min-height: 80px;
    font-size: 13px;
  }
  .comment:focus { outline: 2px solid var(--accent); outline-offset: -1px; }
  .saved-indicator {
    font-size: 11px;
    color: var(--col-ok);
    text-align: right;
    height: 14px;
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .saved-indicator.show { opacity: 1; }
  .not-in-log {
    font-size: 11px;
    color: var(--col-noted);
  }
  .not-in-log code { background: #fef3c7; padding: 1px 4px; border-radius: 3px; }

  body.filter-todo section.fixture:not([data-status="⏳"]) { display: none; }
  body.filter-failing section.fixture:not([data-status="❌"]):not([data-status="📝"]) { display: none; }
  body.filter-ok section.fixture:not([data-status="✅"]) { display: none; }
  body.filter-known section.fixture:not([data-status="🚧"]) { display: none; }
</style>
</head>
<body>

<header class="page">
  <h1>Wiremd fixture review</h1>
  <div class="counts">
    <span class="count-todo">⏳ <span data-count="todo">0</span></span>
    <span class="count-ok">✅ <span data-count="ok">0</span></span>
    <span class="count-fail">❌ <span data-count="fail">0</span></span>
    <span class="count-noted">📝 <span data-count="noted">0</span></span>
    <span class="count-known">🚧 <span data-count="known">0</span></span>
  </div>
  <div class="filters" role="radiogroup" aria-label="filter">
    <button data-filter="all" class="active">All</button>
    <button data-filter="todo">Todo</button>
    <button data-filter="failing">Failing</button>
    <button data-filter="ok">OK</button>
    <button data-filter="known">Known</button>
  </div>
  <button id="connect-btn" type="button">Connect to REVIEW_LOG.md</button>
</header>

<div id="fsaccess-warning" hidden>
  ⚠ This browser doesn't support the File System Access API. Status changes will need to be applied to <code>REVIEW_LOG.md</code> manually. Use Chrome, Edge, or Opera for autosave.
</div>

<main>
${toc}
<div class="content">
${sections}
</div>
</main>

<script>
(() => {
  const STATUSES = ['⏳', '✅', '❌', '📝', '🚧'];

  let logHandle = null;
  /** Map of anchor → { ref:number, status:string, comment:string, name:string } */
  let logState = {};
  let originalText = '';

  const supported = typeof window.showOpenFilePicker === 'function';
  if (!supported) {
    document.getElementById('fsaccess-warning').hidden = false;
    document.getElementById('connect-btn').disabled = true;
    document.getElementById('connect-btn').textContent = 'FS Access unavailable';
  }

  /* ─── Wiring ───────────────────────────────────────────────────────────── */

  document.getElementById('connect-btn').addEventListener('click', connect);

  document.querySelectorAll('header.page .filters button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('header.page .filters button').forEach((b) =>
        b.classList.remove('active')
      );
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.body.className = f === 'all' ? '' : 'filter-' + f;
    });
  });

  document.querySelectorAll('section.fixture').forEach((section) => {
    section.querySelectorAll('.status-buttons button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const status = btn.dataset.status;
        section.dataset.status = status;
        highlightActive(section, status);
        scheduleSave(section);
      });
    });
    section.querySelector('.comment').addEventListener('blur', () => scheduleSave(section));
    // Also react to focus to surface "not in log" warning if user clicks a row
    // before connecting to the log file.
    section.querySelector('.comment').addEventListener('focus', () => {
      if (!logHandle) showNotInLog(section, true);
    });
  });

  // Re-read the log file when the page regains focus, so external edits propagate.
  window.addEventListener('focus', async () => {
    if (logHandle) await reloadLog();
  });

  refreshCounts();

  /* ─── FS Access flow ────────────────────────────────────────────────────── */

  async function connect() {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }],
        excludeAcceptAllOption: false,
        multiple: false,
      });
      // Verify write permission upfront.
      const perm = await handle.queryPermission?.({ mode: 'readwrite' });
      if (perm !== 'granted') {
        const req = await handle.requestPermission?.({ mode: 'readwrite' });
        if (req !== 'granted') throw new Error('Write permission denied');
      }
      logHandle = handle;
      const btn = document.getElementById('connect-btn');
      btn.classList.add('connected');
      btn.textContent = '✓ ' + handle.name;
      await reloadLog();
    } catch (err) {
      if (err.name === 'AbortError') return; // user cancelled
      console.error('connect failed:', err);
      alert('Failed to connect to log file: ' + err.message);
    }
  }

  async function reloadLog() {
    try {
      const file = await logHandle.getFile();
      originalText = await file.text();
      logState = parseLog(originalText);
      applyLogToUI();
    } catch (err) {
      console.error('reloadLog failed:', err);
    }
  }

  /* ─── Log parser / serializer ───────────────────────────────────────────── */

  function parseLog(text) {
    const refToAnchor = {};
    const refDef = /^\\[(\\d+)\\]:\\s+\\.\\/REVIEW\\.html#(fixture-[a-z0-9-]+)/i;
    for (const line of text.split('\\n')) {
      const m = refDef.exec(line);
      if (m) refToAnchor[m[1]] = m[2];
    }

    const state = {};
    const row = /^- \\[(\\S+)\\s+([^\\]]+)\\]\\[(\\d+)\\](?:\\s+—\\s+(.*))?$/;
    for (const line of text.split('\\n')) {
      const m = row.exec(line);
      if (!m) continue;
      const [, status, name, ref, comment] = m;
      const anchor = refToAnchor[ref];
      if (!anchor) continue;
      // Decode the soft newline marker back to real newlines for display.
      const decoded = (comment || '').replace(/ \\\\n /g, '\\n').trim();
      state[anchor] = {
        ref: Number(ref),
        status: STATUSES.includes(status) ? status : '⏳',
        comment: decoded,
        name: name.trim(),
      };
    }
    return state;
  }

  /** Serialize back into the original text, only updating row lines. Preserves
   *  comments at top, blank lines, ref definitions, and any rows whose anchor
   *  isn't in our current logState. */
  function serializeLog() {
    const refToAnchor = {};
    const refDef = /^\\[(\\d+)\\]:\\s+\\.\\/REVIEW\\.html#(fixture-[a-z0-9-]+)/i;
    for (const line of originalText.split('\\n')) {
      const m = refDef.exec(line);
      if (m) refToAnchor[m[1]] = m[2];
    }

    const row = /^- \\[(\\S+)\\s+([^\\]]+)\\]\\[(\\d+)\\](?:\\s+—\\s+.*)?$/;
    return originalText.split('\\n').map((line) => {
      const m = row.exec(line);
      if (!m) return line;
      const ref = m[3];
      const anchor = refToAnchor[ref];
      if (!anchor) return line;
      const entry = logState[anchor];
      if (!entry) return line;
      let out = '- [' + entry.status + ' ' + entry.name + '][' + ref + ']';
      if (entry.comment) {
        // Encode newlines as a sentinel so the row stays single-line on disk.
        // Read back via the decoder in parseLog.
        const flat = entry.comment.replace(/[\\r\\n]+/g, ' \\\\n ');
        out += ' — ' + flat;
      }
      return out;
    }).join('\\n');
  }

  /* ─── UI sync ───────────────────────────────────────────────────────────── */

  function applyLogToUI() {
    document.querySelectorAll('section.fixture').forEach((section) => {
      const anchor = section.id;
      const entry = logState[anchor];
      if (!entry) {
        showNotInLog(section, true);
        return;
      }
      showNotInLog(section, false);
      section.dataset.status = entry.status;
      highlightActive(section, entry.status);
      const ta = section.querySelector('.comment');
      if (document.activeElement !== ta) {
        ta.value = entry.comment;
      }
    });

    // TOC status indicators.
    document.querySelectorAll('nav.toc a[data-anchor]').forEach((a) => {
      const anchor = a.dataset.anchor;
      const entry = logState[anchor];
      a.querySelector('.toc-status').textContent = entry?.status ?? '⏳';
    });

    refreshCounts();
  }

  function highlightActive(section, status) {
    section.querySelectorAll('.status-buttons button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.status === status);
    });
  }

  function showNotInLog(section, show) {
    const el = section.querySelector('.not-in-log');
    if (el) el.hidden = !show;
  }

  function refreshCounts() {
    const counts = { todo: 0, ok: 0, fail: 0, noted: 0, known: 0 };
    document.querySelectorAll('section.fixture').forEach((s) => {
      const status = s.dataset.status || '⏳';
      if (status === '⏳') counts.todo++;
      else if (status === '✅') counts.ok++;
      else if (status === '❌') counts.fail++;
      else if (status === '📝') counts.noted++;
      else if (status === '🚧') counts.known++;
    });
    for (const [k, v] of Object.entries(counts)) {
      const el = document.querySelector('[data-count="' + k + '"]');
      if (el) el.textContent = String(v);
    }
  }

  /* ─── Save ───────────────────────────────────────────────────────────────── */

  let saveTimer = null;
  function scheduleSave(section) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => save(section), 50);
  }

  async function save(section) {
    if (!logHandle) {
      // Allow flag-state without a connected log: store in-memory only.
      // User will see "not in log" warning until they connect.
      return;
    }
    const anchor = section.id;
    const entry = logState[anchor];
    if (!entry) {
      // Anchor not in log — caller should re-seed REVIEW_LOG.md.
      showNotInLog(section, true);
      return;
    }
    const status = section.dataset.status || '⏳';
    const comment = section.querySelector('.comment').value.trim();
    if (entry.status === status && entry.comment === comment) return; // no-op

    entry.status = status;
    entry.comment = comment;

    try {
      const text = serializeLog();
      const writable = await logHandle.createWritable();
      await writable.write(text);
      await writable.close();
      originalText = text;
      flashSaved(section);
      // Update TOC indicator.
      const tocItem = document.querySelector('nav.toc a[data-anchor="' + anchor + '"] .toc-status');
      if (tocItem) tocItem.textContent = status;
      refreshCounts();
    } catch (err) {
      console.error('save failed:', err);
      const indicator = section.querySelector('.saved-indicator');
      indicator.style.color = 'var(--col-fail)';
      indicator.textContent = 'save failed';
      indicator.classList.add('show');
    }
  }

  function flashSaved(section) {
    const el = section.querySelector('.saved-indicator');
    el.style.color = '';
    el.textContent = 'saved ✓';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1200);
  }
})();
</script>

</body>
</html>`;

writeFileSync(PAGE_PATH, html, 'utf-8');
console.log(`✓ wrote ${PAGE_PATH} (${fixtures.length} fixtures, ${(html.length / 1024).toFixed(1)} KB)`);
