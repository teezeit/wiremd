import { expect } from 'vitest';
import type { parse } from '../../../src/parser/index.js';

export function check({
  ast,
  html,
}: {
  ast: ReturnType<typeof parse>;
  html: string;
  react: string;
  tailwind: string;
}) {
  // AST: top-level accordion node with three accordion-item children
  const acc = ast.children.find((n: any) => n.type === 'accordion');
  expect(acc).toBeDefined();
  expect(acc.children).toHaveLength(3);

  for (const item of acc.children) {
    expect(item.type).toBe('accordion-item');
    expect(typeof item.summary).toBe('string');
    expect(item.summary.length).toBeGreaterThan(0);
    expect(item.expanded).toBe(false);
  }

  expect(acc.children[0].summary).toBe('What is wiremd?');
  expect(acc.children[1].summary).toBe('Can I export to React?');
  expect(acc.children[2].summary).toBe('Is it free?');

  // HTML: wrapper + details/summary structure, no open attributes
  expect(html).toMatch(/class="wmd-accordion"/);
  expect(html).toContain('data-wmd-accordion');
  expect(html).toMatch(/<details class="wmd-accordion-item"/);
  expect(html).toContain('<summary class="wmd-accordion-summary">What is wiremd?</summary>');
  expect(html).toContain('<summary class="wmd-accordion-summary">Can I export to React?</summary>');
  expect(html).toContain('<summary class="wmd-accordion-summary">Is it free?</summary>');
  expect(html).toMatch(/<div class="wmd-accordion-body"/);
  // no item should be open by default
  expect(html).not.toMatch(/<details[^>]*\bopen\b/);
  // item body contains the paragraph text
  expect(html).toContain('wiremd converts Markdown into HTML wireframes.');
}
