import { describe, it, expect } from 'vitest';
import { extractDemos } from './extract-demos.js';

describe('extractDemos', () => {
  it('returns no demos for empty markdown', () => {
    expect(extractDemos('')).toEqual([]);
  });

  it('returns no demos when none are present', () => {
    expect(extractDemos('# Title\n\nJust text.\n')).toEqual([]);
  });

  it('extracts a single demo with default name when no heading precedes', () => {
    const md = '::: demo\n[Click]*\n:::\n';
    const demos = extractDemos(md);
    expect(demos).toHaveLength(1);
    expect(demos[0].name).toBe('demo');
    expect(demos[0].raw).toBe('[Click]*');
  });

  it('uses the most recent ## heading as the slug (skipping H1)', () => {
    const md = '# Page\n\n## Basic\n\n::: demo\n[Click]*\n:::\n';
    expect(extractDemos(md)[0].name).toBe('basic');
  });

  it('joins H2 and H3 with `--` when both are active', () => {
    const md =
      '# Page\n\n## Forms\n\n### Inputs\n\n::: demo\n[__]\n:::\n';
    expect(extractDemos(md)[0].name).toBe('forms--inputs');
  });

  it('disambiguates multiple demos under the same heading with -2, -3...', () => {
    const md =
      '# Page\n\n## Basic\n\n::: demo\nA\n:::\n\n::: demo\nB\n:::\n\n::: demo\nC\n:::\n';
    expect(extractDemos(md).map((d) => d.name)).toEqual([
      'basic',
      'basic-2',
      'basic-3',
    ]);
  });

  it('tracks closer depth for nested ::: containers', () => {
    const md =
      '# Page\n\n## Compound\n\n::: demo\n\n::: card\nInner content\n:::\n\n:::\n';
    const demos = extractDemos(md);
    expect(demos).toHaveLength(1);
    expect(demos[0].raw).toContain('::: card');
    expect(demos[0].raw).toContain('Inner content');
    // The inner ::: closer must be present in raw — only the matching outer
    // closer ends the demo block.
    expect(demos[0].raw.split('\n').filter((l) => l.trim() === ':::')).toHaveLength(1);
  });

  it('ignores ::: tokens inside fenced code blocks', () => {
    const md =
      '# Page\n\n## Syntax\n\n::: demo\nReal demo\n:::\n\n```\n::: not a real opener\n:::\n```\n';
    const demos = extractDemos(md);
    expect(demos).toHaveLength(1);
    expect(demos[0].raw).toBe('Real demo');
  });

  it('preserves fenced code blocks WITHIN a demo verbatim', () => {
    const md =
      '# Page\n\n## With Code\n\n::: demo\nbefore\n```\n::: literal\n```\nafter\n:::\n';
    const demos = extractDemos(md);
    expect(demos).toHaveLength(1);
    expect(demos[0].raw).toContain('::: literal'); // must survive
    expect(demos[0].raw).toContain('before');
    expect(demos[0].raw).toContain('after');
  });

  it('captures the 1-based start line of the demo opener', () => {
    const md = 'Line 1\nLine 2\n::: demo\ncontent\n:::\n';
    expect(extractDemos(md)[0].line).toBe(3);
  });

  it('returns the heading path for a demo', () => {
    const md =
      '# Page\n\n## Forms\n\n### Inputs\n\n::: demo\n[__]\n:::\n';
    expect(extractDemos(md)[0].headingPath).toEqual(['Page', 'Forms', 'Inputs']);
  });

  it('does not match `::: demos` or `::: demo-thing` (word boundary)', () => {
    const md = '## A\n\n::: demos\nnot a demo\n:::\n';
    expect(extractDemos(md)).toEqual([]);
  });

  it('resets the heading path when a higher-level heading appears', () => {
    const md =
      '# Page\n\n## Forms\n\n### Inputs\n\n::: demo\nA\n:::\n\n## Layout\n\n::: demo\nB\n:::\n';
    const demos = extractDemos(md);
    expect(demos.map((d) => d.name)).toEqual(['forms--inputs', 'layout']);
  });

  it('trims a single trailing blank line from demo content', () => {
    const md = '## A\n\n::: demo\ncontent\n\n:::\n';
    expect(extractDemos(md)[0].raw).toBe('content');
  });
});
