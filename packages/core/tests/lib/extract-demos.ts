/**
 * Extract `::: demo` blocks from a wiremd/markdown document.
 *
 * Regex-based — deliberately does NOT use the wiremd parser. The fixture
 * suite tests the parser, so the demo-extraction layer must not depend on
 * the system under test (otherwise a parser regression silently shrinks
 * the fixture corpus and the tests pass with a hole).
 *
 * Behavior:
 *   - Matches `^:::\s*demo\b` as a demo opener.
 *   - Matches `^:::\s*\S` as any container opener (depth++).
 *   - Matches `^:::\s*$` as a closer (depth--).
 *   - Tracks fenced code blocks (```) and ignores `:::` inside them.
 *   - Names a demo from the slugified heading path (skipping H1, which is
 *     usually the page title). Multiple demos in the same section get a
 *     numeric suffix (`basic`, `basic-2`).
 */

export interface ExtractedDemo {
  /** Stable slug, e.g. "basic" or "variants". Disambiguated within a section. */
  name: string;
  /** Raw markdown inside the ::: demo block — the actual fixture input. */
  raw: string;
  /** Source heading path that named this demo, for human-readable IDs. */
  headingPath: string[];
  /** 1-based source line of the demo opener. */
  line: number;
}

const HEADING = /^(#{1,6})\s+(.+?)\s*$/;
const FENCE = /^```/;
const DEMO_OPENER = /^:::\s*demo(\s|$)/;
const ANY_OPENER = /^:::\s*\S/;
const CLOSER = /^:::\s*$/;

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-') || 'demo'
  );
}

export function extractDemos(markdown: string): ExtractedDemo[] {
  const lines = markdown.split('\n');
  const demos: ExtractedDemo[] = [];
  const headingPath: string[] = [];
  const counters = new Map<string, number>();

  let i = 0;
  let inCodeBlock = false;

  while (i < lines.length) {
    const line = lines[i];

    if (FENCE.test(line)) {
      inCodeBlock = !inCodeBlock;
      i++;
      continue;
    }

    if (inCodeBlock) {
      i++;
      continue;
    }

    const headingMatch = HEADING.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      headingPath.length = level - 1;
      headingPath[level - 1] = text;
      i++;
      continue;
    }

    if (DEMO_OPENER.test(line)) {
      const startLine = i + 1; // 1-based
      const inner: string[] = [];
      let depth = 1;
      i++;

      while (i < lines.length) {
        const cur = lines[i];

        if (FENCE.test(cur)) {
          // Pass through fenced code blocks intact: don't count `:::` inside.
          inner.push(cur);
          i++;
          while (i < lines.length && !FENCE.test(lines[i])) {
            inner.push(lines[i]);
            i++;
          }
          if (i < lines.length) {
            inner.push(lines[i]); // closing fence
            i++;
          }
          continue;
        }

        if (CLOSER.test(cur)) {
          depth--;
          if (depth === 0) {
            i++; // consume the closing :::
            break;
          }
          inner.push(cur);
          i++;
          continue;
        }

        if (ANY_OPENER.test(cur)) {
          depth++;
        }

        inner.push(cur);
        i++;
      }

      const baseSlug =
        headingPath
          .filter(Boolean)
          .slice(1) // skip H1 (page title)
          .map(slugify)
          .join('--') || 'demo';
      const seen = counters.get(baseSlug) ?? 0;
      counters.set(baseSlug, seen + 1);
      const name = seen === 0 ? baseSlug : `${baseSlug}-${seen + 1}`;

      // Trim a single trailing blank line if present — common pattern in docs.
      while (inner.length > 0 && inner[inner.length - 1].trim() === '') {
        inner.pop();
      }

      demos.push({
        name,
        raw: inner.join('\n'),
        headingPath: [...headingPath].filter(Boolean),
        line: startLine,
      });
      continue;
    }

    i++;
  }

  return demos;
}
