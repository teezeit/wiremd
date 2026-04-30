import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { resolveIncludes } from '../src/parser/index.js';
import { parse } from '../src/parser/index.js';
import { renderToHTML } from '../src/renderer/index.js';

const tmp = join(tmpdir(), 'wiremd-includes-test');

beforeEach(() => {
  mkdirSync(tmp, { recursive: true });
});

afterEach(() => {
  rmSync(tmp, { recursive: true, force: true });
});

describe('resolveIncludes', () => {
  it('returns markdown unchanged when there are no includes', () => {
    const md = '# Hello\n\nSome content.';
    expect(resolveIncludes(md, join(tmp, 'index.md'))).toBe(md);
  });

  it('inlines a referenced file', () => {
    const partial = '## Section\n\nContent from partial.';
    writeFileSync(join(tmp, 'partial.md'), partial);
    const md = '# Main\n\n![[partial.md]]';
    const result = resolveIncludes(md, join(tmp, 'index.md'));
    expect(result).toBe('# Main\n\n' + partial);
  });

  it('replaces a missing file with a warning blockquote', () => {
    const result = resolveIncludes('![[missing.md]]', join(tmp, 'index.md'));
    expect(result).toContain('⚠️');
    expect(result).toContain('missing.md');
  });

  it('resolves includes relative to the base file, not cwd', () => {
    const subdir = join(tmp, 'pages');
    mkdirSync(subdir);
    writeFileSync(join(subdir, 'header.md'), '# Header');
    const md = '![[header.md]]';
    const result = resolveIncludes(md, join(subdir, 'index.md'));
    expect(result).toBe('# Header');
  });

  it('handles multiple includes in one file', () => {
    writeFileSync(join(tmp, 'a.md'), 'A');
    writeFileSync(join(tmp, 'b.md'), 'B');
    const result = resolveIncludes('![[a.md]]\n![[b.md]]', join(tmp, 'index.md'));
    expect(result).toBe('A\nB');
  });

  it('ignores syntax that does not end in .md', () => {
    const md = '![[image.png]]';
    expect(resolveIncludes(md, join(tmp, 'index.md'))).toBe(md);
  });

  it('trims whitespace from the path inside brackets', () => {
    writeFileSync(join(tmp, 'partial.md'), 'Trimmed');
    const result = resolveIncludes('![[ partial.md ]]', join(tmp, 'index.md'));
    expect(result).toBe('Trimmed');
  });

  // Bug: data-source-line values in rendered HTML are based on resolved line numbers
  // (post-include expansion), not the original file's line numbers. This makes the
  // VS Code cursor-sync indicator wrong for any element that appears after an include.
  // See: https://github.com/teezeit/wiremd/issues/<TBD>
  it.fails('cursor-sync data-source-line reflects original file line numbers after an include', () => {
    // Include adds 5 lines; "## After Include" is at original line 5 but resolved line 10.
    writeFileSync(join(tmp, 'header.md'), 'Line A\nLine B\nLine C\nLine D\nLine E\n');
    const mainPath = join(tmp, 'main.md');
    const raw = '# Title\n\n![[header.md]]\n\n## After Include\n';
    writeFileSync(mainPath, raw);

    const resolved = resolveIncludes(raw, mainPath);
    const html = renderToHTML(parse(resolved), { cursorSync: true });

    const lines = [...html.matchAll(/data-source-line="(\d+)"/g)].map(m => Number(m[1]));
    // "## After Include" is at line 5 in the original file — the cursor-sync JS
    // should receive line=5 from VS Code and highlight this heading.
    expect(lines).toContain(5);   // fails today: actual value is 10 (resolved line)
    expect(lines).not.toContain(10);
  });
});
