/**
 * Integration tests: verify that parsed AST nodes carry the correct
 * position.start.line values matching the original markdown source.
 *
 * These tests would have caught the normalizeContainerDirectiveSpacing drift
 * bug immediately. They act as a regression guard for parser position accuracy.
 *
 * Strategy: parse a markdown string, walk the wiremd AST, and assert that
 * specific nodes appear on the line number they occupy in the source.
 */
import { describe, it, expect } from 'vitest';
import { parse } from '../../src/parser/index.js';
import type { DocumentNode } from '../../src/types.js';

// ── helpers ───────────────────────────────────────────────────────────────────

/** Collect all nodes of a given type from the AST (depth-first). */
function collect(ast: DocumentNode, type: string): any[] {
  const results: any[] = [];
  function walk(node: any) {
    if (node.type === type) results.push(node);
    for (const child of node.children ?? []) walk(child);
  }
  walk(ast);
  return results;
}

/** Return the sourceLine of a node (stored on position.start.line by the parser). */
function srcLine(node: any): number | undefined {
  return node.position?.start?.line;
}

/** Build a lookup: originalLine → list of node types at that line. */
function lineIndex(ast: DocumentNode): Map<number, string[]> {
  const map = new Map<number, string[]>();
  function walk(node: any) {
    const line = srcLine(node);
    if (line != null) {
      if (!map.has(line)) map.set(line, []);
      map.get(line)!.push(node.type);
    }
    for (const child of node.children ?? []) walk(child);
  }
  walk(ast);
  return map;
}

// ── plain markdown (no containers) ───────────────────────────────────────────

describe('position — plain markdown (no containers)', () => {
  it('heading on line 1', () => {
    const ast = parse('# Title\n\nParagraph.');
    const [h] = collect(ast, 'heading');
    expect(srcLine(h)).toBe(1);
  });

  it('paragraph on line 3', () => {
    const ast = parse('# Title\n\nParagraph.');
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(3);
  });

  it('multiple headings at correct lines', () => {
    const md = '# One\n\n## Two\n\n### Three';
    const ast = parse(md);
    const headings = collect(ast, 'heading');
    expect(headings).toHaveLength(3);
    expect(srcLine(headings[0])).toBe(1);
    expect(srcLine(headings[1])).toBe(3);
    expect(srcLine(headings[2])).toBe(5);
  });

  it('blockquote position', () => {
    const ast = parse('Text.\n\n> Quote here.');
    const [bq] = collect(ast, 'blockquote');
    expect(srcLine(bq)).toBe(3);
  });

  it('list position', () => {
    const ast = parse('Intro.\n\n- item one\n- item two');
    const [list] = collect(ast, 'list');
    expect(srcLine(list)).toBe(3);
  });
});

// ── single container ──────────────────────────────────────────────────────────

describe('position — single container', () => {
  it('container itself is at its opener line', () => {
    const md = '# Title\n\n::: card\nContent.\n:::';
    const ast = parse(md);
    const [card] = collect(ast, 'container');
    expect(srcLine(card)).toBe(3);
  });

  it('content immediately after opener is at its own line', () => {
    const md = '::: card\n# Heading inside\n\n:::';
    const ast = parse(md);
    const [h] = collect(ast, 'heading');
    expect(srcLine(h)).toBe(2);
  });

  it('paragraph inside card is at its own line', () => {
    const md = '::: card\n\nParagraph inside.\n\n:::';
    const ast = parse(md);
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(3);
  });

  it('node after container is at correct line', () => {
    const md = '::: card\nInside.\n:::\n\n## After';
    const ast = parse(md);
    const [h] = collect(ast, 'heading');
    expect(srcLine(h)).toBe(5);
  });

  it('multiple nodes inside container keep correct lines', () => {
    const md = '::: card\n# H\n\nParagraph.\n\n:::';
    //          line 1       2    3   4           5   6
    const ast = parse(md);
    const [h] = collect(ast, 'heading');
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(h)).toBe(2);
    expect(srcLine(p)).toBe(4);
  });
});

// ── nested containers ────────────────────────────────────────────────────────
// Note on wiremd node types:
//   ::: columns   → type:'container', containerType:'columns'
//   ::: columns-N → type:'grid'
//   ::: column    → type:'grid-item'  (no data-source-line in HTML, but has AST position)
//   ::: card      → type:'container', containerType:'card'

describe('position — nested containers', () => {
  it('outer columns container at its opener line', () => {
    const md = '::: columns\n\n::: column\nA.\n\n:::\n\n:::';
    const ast = parse(md);
    const [outer] = collect(ast, 'container');
    expect(srcLine(outer)).toBe(1);
  });

  it('inner grid-item (column) at its own opener line', () => {
    const md = '::: columns\n\n::: column\nA.\n\n:::\n\n:::';
    //           1             2   3        4    5  6    7  8
    const ast = parse(md);
    const [col] = collect(ast, 'grid-item');
    expect(srcLine(col)).toBe(3);
  });

  it('content inside column at correct line', () => {
    const md = '::: columns\n\n::: column\nContent here.\n\n:::\n\n:::';
    //           1             2   3        4               5  6    7  8
    const ast = parse(md);
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(4);
  });

  it('two sibling columns (grid-items) at correct lines', () => {
    const md = '::: columns\n\n::: column\nA.\n\n:::\n\n::: column\nB.\n\n:::\n\n:::';
    //           1             2   3        4    5  6    7   8        9    10 11   12  13
    const ast = parse(md);
    const gridItems = collect(ast, 'grid-item');
    expect(gridItems.length).toBe(2);
    expect(srcLine(gridItems[0])).toBe(3);
    expect(srcLine(gridItems[1])).toBe(8);
  });

  it('content in second column at correct line', () => {
    const md = '::: columns\n\n::: column\nA.\n\n:::\n\n::: column\nB.\n\n:::\n\n:::';
    const ast = parse(md);
    const paragraphs = collect(ast, 'paragraph');
    const lineNums = paragraphs.map(srcLine).sort((a, b) => a! - b!);
    expect(lineNums).toContain(4); // "A." at line 4
    expect(lineNums).toContain(9); // "B." at line 9
  });

  it('three-level nesting — innermost content at correct line', () => {
    const md = [
      '::: outer',    // 1
      '',             // 2
      '::: middle',   // 3
      '',             // 4
      '::: inner',    // 5
      'Deep content.',// 6
      '',             // 7
      ':::',          // 8
      '',             // 9
      ':::',          // 10
      '',             // 11
      ':::',          // 12
    ].join('\n');
    const ast = parse(md);
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(6);
  });
});

// ── mixed containers and plain markdown ──────────────────────────────────────

describe('position — mixed containers and plain markdown', () => {
  it('heading before container is at correct line', () => {
    const md = '# Title\n\n::: card\nContent.\n:::';
    const ast = parse(md);
    const [h] = collect(ast, 'heading');
    expect(srcLine(h)).toBe(1);
  });

  it('heading after container is at correct line', () => {
    const md = '::: card\nContent.\n:::\n\n# After';
    //           1         2        3    4   5
    const ast = parse(md);
    const [h] = collect(ast, 'heading');
    expect(srcLine(h)).toBe(5);
  });

  it('multiple containers with content between them', () => {
    const md = [
      '::: card',   // 1
      'First.',     // 2
      ':::',        // 3
      '',           // 4
      'Middle.',    // 5
      '',           // 6
      '::: card',   // 7
      'Second.',    // 8
      ':::',        // 9
    ].join('\n');
    const ast = parse(md);
    const index = lineIndex(ast);
    expect(index.get(5)).toContain('paragraph'); // "Middle." at line 5
    // containers at lines 1 and 7
    expect(index.get(1)).toContain('container');
    expect(index.get(7)).toContain('container');
  });

  it('nav before and after containers', () => {
    const md = '[[ Home | About ]]\n\n::: card\nContent.\n:::\n\n[[ Footer ]]';
    //           1                   2   3        4        5    6   7
    const ast = parse(md);
    const navs = collect(ast, 'nav');
    expect(srcLine(navs[0])).toBe(1);
    expect(srcLine(navs[1])).toBe(7);
  });
});

// ── real-world document ───────────────────────────────────────────────────────

describe('position — real-world document', () => {
  const md = [
    '# wiremd',                    // 1
    '',                            // 2
    'The possibilities are endless.', // 3
    '',                            // 4
    '::: hero',                    // 5
    '# Design UI with Markdown',   // 6
    '### Subtitle',                // 7
    '',                            // 8
    '[Get Started]*',              // 9
    ':::',                         // 10
    '',                            // 11
    '::: columns-3',               // 12
    '',                            // 13
    '::: column',                  // 14
    'Content A.',                  // 15
    '',                            // 16
    ':::',                         // 17
    '',                            // 18
    '::: column',                  // 19
    'Content B.',                  // 20
    '',                            // 21
    ':::',                         // 22
    '',                            // 23
    ':::',                         // 24
    '',                            // 25
    '## Summary',                  // 26
  ].join('\n');

  it('top-level heading at line 1', () => {
    const ast = parse(md);
    const headings = collect(ast, 'heading');
    expect(srcLine(headings[0])).toBe(1);
  });

  it('paragraph at line 3', () => {
    const ast = parse(md);
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(3);
  });

  it('hero container at line 5', () => {
    const ast = parse(md);
    const containers = collect(ast, 'container');
    const hero = containers.find((c) => srcLine(c) === 5);
    expect(hero).toBeDefined();
  });

  it('heading inside hero at line 6', () => {
    const ast = parse(md);
    const headings = collect(ast, 'heading');
    const h1Inside = headings.find((h) => srcLine(h) === 6);
    expect(h1Inside).toBeDefined();
    expect(h1Inside.level).toBe(1);
  });

  it('subtitle heading inside hero at line 7', () => {
    const ast = parse(md);
    const headings = collect(ast, 'heading');
    const h3 = headings.find((h) => srcLine(h) === 7);
    expect(h3).toBeDefined();
    expect(h3.level).toBe(3);
  });

  it('columns-3 grid at line 12', () => {
    // ::: columns-3 → type:'grid' (numbered variants produce grid, not container)
    const ast = parse(md);
    const grids = collect(ast, 'grid');
    const cols = grids.find((c) => srcLine(c) === 12);
    expect(cols).toBeDefined();
  });

  it('first column content at line 15', () => {
    const ast = parse(md);
    const paragraphs = collect(ast, 'paragraph');
    const p = paragraphs.find((n) => srcLine(n) === 15);
    expect(p).toBeDefined();
    expect(p.content).toContain('Content A');
  });

  it('second column content at line 20', () => {
    const ast = parse(md);
    const paragraphs = collect(ast, 'paragraph');
    const p = paragraphs.find((n) => srcLine(n) === 20);
    expect(p).toBeDefined();
    expect(p.content).toContain('Content B');
  });

  it('summary heading at line 26', () => {
    const ast = parse(md);
    const headings = collect(ast, 'heading');
    const summary = headings.find((h) => srcLine(h) === 26);
    expect(summary).toBeDefined();
    expect(summary.level).toBe(2);
  });

  it('no node has a source line greater than the document line count', () => {
    const lineCount = md.split('\n').length;
    const ast = parse(md);
    const index = lineIndex(ast);
    for (const line of index.keys()) {
      expect(line).toBeLessThanOrEqual(lineCount);
    }
  });
});

// ── known gap ────────────────────────────────────────────────────────────────

describe('position — known gap: parseMarkdownBlocks sub-parse', () => {
  // parseMarkdownBlocks() does a fresh unified/remark parse on extracted text,
  // so the returned nodes have position.start.line relative to that text string
  // (starting at 1), not to the original document. This means if the function
  // were called for content starting at document line 10, inner nodes would
  // incorrectly report line 1 instead of line 10.
  //
  // Why it's currently unreachable:
  //   normalizeContainerDirectiveSpacing inserts blank lines around every :::
  //   directive, which causes remark to parse each directive as a separate
  //   paragraph rather than folding entire containers into one paragraph.
  //   collectPlainTextContainerRun (the only caller) only fires when the
  //   entire container is folded into a single remark paragraph — a condition
  //   normalization now prevents.
  //
  // Fix if it ever becomes reachable:
  //   Pass the container opener's position.start.line to collectPlainTextContainer
  //   and offset all positions from parseMarkdownBlocks by (openerLine + bufferOffset - 1).

  it.todo(
    'parseMarkdownBlocks: inner node positions are document-relative, not string-relative ' +
    '(gap is currently unreachable — normalization prevents the trigger condition; ' +
    'fix requires threading line offset through collectPlainTextContainer)',
  );
});

// ── tabs ──────────────────────────────────────────────────────────────────────

describe('position — tabs', () => {
  it('tabs container at its opener line', () => {
    const md = '::: tabs\n\n::: tab Alpha\nAlpha content.\n\n:::\n\n:::';
    const ast = parse(md);
    const [tabs] = collect(ast, 'tabs');
    expect(srcLine(tabs)).toBe(1);
  });

  it('content inside first tab at correct line', () => {
    const md = '::: tabs\n\n::: tab Alpha\nAlpha content.\n\n:::\n\n:::';
    //           1          2   3            4               5  6    7  8
    const ast = parse(md);
    const [p] = collect(ast, 'paragraph');
    expect(srcLine(p)).toBe(4);
  });

  it('content inside second tab at correct line', () => {
    const md = [
      '::: tabs',     // 1
      '',             // 2
      '::: tab Alpha',// 3
      'Alpha.',       // 4
      '',             // 5
      ':::',          // 6
      '',             // 7
      '::: tab Beta', // 8
      'Beta.',        // 9
      '',             // 10
      ':::',          // 11
      '',             // 12
      ':::',          // 13
    ].join('\n');
    const ast = parse(md);
    const paragraphs = collect(ast, 'paragraph');
    const beta = paragraphs.find((p) => srcLine(p) === 9);
    expect(beta).toBeDefined();
    expect(beta.content).toContain('Beta');
  });
});
