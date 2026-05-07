import type { Example, ComponentGroup } from './examples';

const rawDocs = import.meta.glob('../../../docs/components/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Files that are not insertable components
const SKIP = new Set(['index', 'not-implemented-components', 'demo', 'styles']);

function getDocBySlug(slug: string): string {
  const key = Object.keys(rawDocs).find((k) => k.endsWith(`/${slug}.md`));
  return key ? rawDocs[key]! : '';
}

function getTitle(md: string): string {
  const match = md.match(/^# (.+)/m);
  return match ? match[1].trim() : '';
}

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

// All slugs with their group assignment — covers every component doc page
const GROUP_MAP: Array<{ name: string; slugs: string[] }> = [
  {
    name: 'Buttons',
    slugs: ['buttons'],
  },
  {
    name: 'Inputs',
    slugs: ['inputs', 'textarea-select', 'checkboxes-radio'],
  },
  {
    name: 'Display',
    slugs: ['cards', 'tabs', 'accordion', 'badges', 'navigation', 'tables', 'alerts', 'icons', 'images'],
  },
  {
    name: 'Layout',
    slugs: ['columns', 'row', 'alignment', 'page-layouts'],
  },
  {
    name: 'Advanced',
    slugs: ['button-links', 'includes', 'attributes'],
  },
  {
    name: 'Comments',
    slugs: ['comments'],
  },
];

// Any slug in docs but not in GROUP_MAP gets added to a catch-all group
const mappedSlugs = new Set(GROUP_MAP.flatMap((g) => g.slugs));

const unmapped = Object.keys(rawDocs)
  .map((k) => k.replace(/^.*\//, '').replace(/\.md$/, ''))
  .filter((slug) => !slug.startsWith('_') && !SKIP.has(slug) && !mappedSlugs.has(slug));

function buildGroup(name: string, slugs: string[]): ComponentGroup {
  const items: Example[] = [];
  for (const slug of slugs) {
    const md = getDocBySlug(slug);
    if (!md) continue;
    const pageTitle = getTitle(md) || slug;
    const demos = parseAllDemos(md);
    for (const { heading, code } of demos) {
      items.push({
        name: heading ? `${pageTitle} — ${heading}` : pageTitle,
        description: '',
        code,
      });
    }
  }
  return { name, items };
}

export const docComponentGroups: ComponentGroup[] = [
  ...GROUP_MAP.map((g) => buildGroup(g.name, g.slugs)),
  ...(unmapped.length ? [buildGroup('Other', unmapped)] : []),
].filter((g) => g.items.length > 0);
