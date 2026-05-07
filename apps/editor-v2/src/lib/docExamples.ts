import type { Example, ComponentGroup } from './examples';

// Raw doc files — sourced directly from apps/docs/components/
const rawDocs = import.meta.glob('../../../docs/components/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function getDocBySlug(slug: string): string {
  const key = Object.keys(rawDocs).find((k) => k.endsWith(`/${slug}.md`));
  return key ? rawDocs[key]! : '';
}

function getTitle(md: string): string {
  const match = md.match(/^# (.+)/m);
  return match ? match[1].trim() : '';
}

function parseFirstDemo(md: string): string | null {
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    if (/^::: demo/.test(lines[i]!)) {
      let depth = 1;
      const contentLines: string[] = [];
      i++;
      while (i < lines.length && depth > 0) {
        const line = lines[i]!;
        if (/^:::\s*$/.test(line)) {
          depth--;
          if (depth > 0) contentLines.push(line);
        } else if (/^:::/.test(line)) {
          depth++;
          contentLines.push(line);
        } else {
          contentLines.push(line);
        }
        i++;
      }
      const content = contentLines.join('\n').trim();
      if (content) return content;
    } else {
      i++;
    }
  }
  return null;
}

function docExample(slug: string, description: string): Example | null {
  const md = getDocBySlug(slug);
  if (!md) return null;
  const code = parseFirstDemo(md);
  if (!code) return null;
  return { name: getTitle(md) || slug, description, code };
}

function examples(pairs: Array<[string, string]>): Example[] {
  return pairs.flatMap(([slug, desc]) => {
    const ex = docExample(slug, desc);
    return ex ? [ex] : [];
  });
}

export const docComponentGroups: ComponentGroup[] = [
  {
    name: 'Inputs',
    items: examples([
      ['buttons', 'Primary, secondary and danger variants'],
      ['inputs', 'Single-line text fields'],
      ['textarea-select', 'Multi-line input and dropdown'],
      ['checkboxes-radio', 'Toggle and choice controls'],
    ]),
  },
  {
    name: 'Display',
    items: examples([
      ['cards', 'Bordered content containers'],
      ['tabs', 'Tabbed content panels'],
      ['badges', 'Status pills and labels'],
      ['navigation', 'Top nav bar'],
      ['tables', 'Data tables'],
      ['icons', 'Inline icon tokens'],
      ['images', 'Image placeholders'],
    ]),
  },
  {
    name: 'Layout',
    items: examples([
      ['columns', 'Multi-column layouts'],
      ['row', 'Horizontal action rows'],
      ['alignment', 'Text and block alignment'],
      ['page-layouts', 'Full page layout patterns'],
    ]),
  },
  {
    name: 'Advanced',
    items: examples([
      ['button-links', 'Buttons that navigate to a URL'],
      ['attributes', 'Custom classes and key-value props'],
      ['comments', 'Design annotations in the editor'],
    ]),
  },
];
