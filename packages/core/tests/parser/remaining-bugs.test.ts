/**
 * Isolated parse tests for the 10 bugs closed in this PR. Each test pins
 * the contract for one fix so future regressions surface here as a
 * targeted failure (instead of a snapshot drift somewhere in the corpus).
 */

import { describe, it, expect } from 'vitest';
import { parse } from '../../src/parser/index.js';

function findFirst(nodes: any[], type: string): any {
  for (const n of nodes) {
    if (n.type === type) return n;
    const kids = (n as { children?: any[] }).children;
    if (kids) {
      const f = findFirst(kids, type);
      if (f) return f;
    }
  }
  return undefined;
}

describe('remark-containers — closer/opener edge cases', () => {
  it('siblings-no-blank-between: `:::\\n::: card` is split into closer + new opener', () => {
    const ast = parse(':::card\nA\n\n:::\n::: card\nB\n\n:::\n');
    expect(ast.children).toHaveLength(2);
    const [a, b] = ast.children as any[];
    expect(a.type).toBe('container');
    expect(b.type).toBe('container');
    expect((a.children[0] as any).content).toBe('A');
    expect((b.children[0] as any).content).toBe('B');
  });

  it('no-blank-line-before-list: list with `\\n:::` in last item closes the container', () => {
    const ast = parse('::: card\n- item one\n- item two\n:::\n');
    expect(ast.children).toHaveLength(1);
    const card = ast.children[0] as any;
    expect(card.containerType).toBe('card');
    const list = card.children[0];
    expect(list.type).toBe('list');
    const lastItem = list.children[1];
    expect(lastItem.content).toBe('item two');
  });

  it('text-before-nested-opener: text + nested `::: card` on same paragraph splits', () => {
    const ast = parse('::: card\n# Outer\nintro\n::: card\n## Inner\n[Action]*\n\n:::\n\n:::\n');
    expect(ast.children).toHaveLength(1);
    const outer = ast.children[0] as any;
    const inner = outer.children.find((c: any) => c.type === 'container' && c.containerType === 'card');
    expect(inner).toBeDefined();
    const innerHeading = inner.children.find((c: any) => c.type === 'heading' && c.level === 2);
    expect(innerHeading).toBeDefined();
  });
});

describe('transformContainer — opener flag tolerates trailing text', () => {
  it('::: columns-3 card extra text -> still flags card', () => {
    const ast = parse('::: columns-3 card extra text\n::: column\n### A\nx\n:::\n::: column\n### B\ny\n:::\n:::\n');
    const grid = ast.children[0] as any;
    expect(grid.type).toBe('grid');
    expect(grid.props.card).toBe(true);
  });
});

describe('parseAttributes — quoted values', () => {
  it('preserves spaces in quoted attribute values', () => {
    // Brackets with no leading text — placeholder comes from the attribute,
    // not the in-bracket text fallback (which would otherwise overwrite).
    const ast = parse('[_____________________________]{placeholder:"Search components..."}\n');
    const input = findFirst(ast.children, 'input');
    expect(input).toBeDefined();
    expect(input.props.placeholder).toBe('Search components...');
  });
});

describe('table cells — badge syntax', () => {
  it('((cell)){.warning} in a table cell renders as a badge node', () => {
    const md = `| Name | Status |\n|------|--------|\n| Alice | ((Admin)){.warning} |\n`;
    const ast = parse(md);
    const badge = findFirst(ast.children, 'badge');
    expect(badge).toBeDefined();
    expect((badge as any).content).toBe('Admin');
  });

  it('keeps escaped legacy pipe badges as a table-cell alias', () => {
    const md = `| Name | Status |\n|------|--------|\n| Alice | \\|Admin\\|{.warning} |\n`;
    const ast = parse(md);
    const badge = findFirst(ast.children, 'badge');
    expect(badge).toBeDefined();
    expect((badge as any).content).toBe('Admin');
  });
});

describe('multi-line paragraph splitter — inline patterns', () => {
  it('icon line + text-with-badge produces icon + text + badge children', () => {
    const ast = parse('::: row\n:user:\nJohn Doe ((Admin)){.warning}\n[Edit]\n\n:::\n');
    const icon = findFirst(ast.children, 'icon');
    expect(icon).toBeDefined();
    expect((icon as any).props.name).toBe('user');
    const badge = findFirst(ast.children, 'badge');
    expect(badge).toBeDefined();
  });

  it('text + [[ breadcrumbs ]] split into paragraph + breadcrumbs siblings', () => {
    const ast = parse('::: card\nsome intro\n[[ home > docs > components ]]\n\n:::\n');
    const breadcrumbs = findFirst(ast.children, 'breadcrumbs');
    expect(breadcrumbs).toBeDefined();
  });
});
