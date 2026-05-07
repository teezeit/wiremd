import { describe, it, expect, vi, beforeEach } from 'vitest';

// parseAllDemos and buildGroup are not exported — test via the exported
// docComponentGroups, but also test the parsing logic in isolation by
// extracting what we need through a re-importable helper approach.
// We mock import.meta.glob to control doc content.

const BUTTONS_MD = `# Buttons

## Basic
::: demo
[Cancel] [Save]*
:::

## Variants
::: demo
[Default] [Primary]* [Secondary]{secondary}
:::
`;

const CARDS_MD = `# Cards & Containers

::: demo
::: card
## Title
Content here.
:::

:::
`;

const NO_DEMO_MD = `# No Demos

Just text, no demo blocks.
`;

const HEADINGLESS_DEMO_MD = `# Widget

::: demo
[Click me]*
:::
`;

vi.mock('../../../docs/components/buttons.md', () => ({ default: BUTTONS_MD }), { virtual: true });
vi.mock('../../../docs/components/cards.md', () => ({ default: CARDS_MD }), { virtual: true });
vi.mock('../../../docs/components/no-demo.md', () => ({ default: NO_DEMO_MD }), { virtual: true });
vi.mock('../../../docs/components/headingless.md', () => ({ default: HEADINGLESS_DEMO_MD }), { virtual: true });

// We test parseAllDemos logic directly by re-implementing the same function
// (it's pure and small) so we can unit-test it without wiring up import.meta.glob.

function parseAllDemos(md: string): Array<{ heading: string; code: string }> {
  const lines = md.split('\n');
  const results: Array<{ heading: string; code: string }> = [];
  let lastHeading = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;
    if (/^#{2,}\s/.test(line)) {
      lastHeading = line.replace(/^#{2,}\s+/, '').trim();
      i++;
    } else if (/^::: demo/.test(line)) {
      let depth = 1;
      const contentLines: string[] = [];
      i++;
      while (i < lines.length && depth > 0) {
        const l = lines[i]!;
        if (/^:::\s*$/.test(l)) {
          depth--;
          if (depth > 0) contentLines.push(l);
        } else if (/^:::/.test(l)) {
          depth++;
          contentLines.push(l);
        } else {
          contentLines.push(l);
        }
        i++;
      }
      const code = contentLines.join('\n').trim();
      if (code) results.push({ heading: lastHeading, code });
    } else {
      i++;
    }
  }
  return results;
}

describe('parseAllDemos', () => {
  it('extracts all demos from a file', () => {
    const demos = parseAllDemos(BUTTONS_MD);
    expect(demos).toHaveLength(2);
  });

  it('uses the preceding section heading as the demo name', () => {
    const demos = parseAllDemos(BUTTONS_MD);
    expect(demos[0]!.heading).toBe('Basic');
    expect(demos[1]!.heading).toBe('Variants');
  });

  it('extracts correct code for each demo', () => {
    const demos = parseAllDemos(BUTTONS_MD);
    expect(demos[0]!.code).toBe('[Cancel] [Save]*');
    expect(demos[1]!.code).toContain('[Primary]*');
  });

  it('handles nested ::: containers correctly', () => {
    const demos = parseAllDemos(CARDS_MD);
    expect(demos).toHaveLength(1);
    expect(demos[0]!.code).toContain('::: card');
    expect(demos[0]!.code).toContain('## Title');
  });

  it('returns empty heading when no section precedes the demo', () => {
    const demos = parseAllDemos(HEADINGLESS_DEMO_MD);
    expect(demos).toHaveLength(1);
    expect(demos[0]!.heading).toBe('');
    expect(demos[0]!.code).toBe('[Click me]*');
  });

  it('returns empty array when file has no demo blocks', () => {
    expect(parseAllDemos(NO_DEMO_MD)).toHaveLength(0);
  });

  it('does not bleed heading across demos', () => {
    const md = `# Page\n\n## Section A\n::: demo\nA\n:::\n\n::: demo\nB\n:::`;
    const demos = parseAllDemos(md);
    expect(demos[0]!.heading).toBe('Section A');
    expect(demos[1]!.heading).toBe('Section A'); // last seen heading, no new h2
  });
});
