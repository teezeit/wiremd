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
  // AST: accordion node has 'card' in its classes
  const acc = ast.children.find((n: any) => n.type === 'accordion');
  expect(acc).toBeDefined();
  expect(acc.props.classes).toContain('card');
  expect(acc.children).toHaveLength(2);

  // HTML: wrapper carries wmd-card class
  expect(html).toMatch(/class="wmd-accordion[^"]*wmd-card[^"]*"/);
  expect(html).toContain('<summary class="wmd-accordion-summary">Shipping</summary>');
  expect(html).toContain('<summary class="wmd-accordion-summary">Returns</summary>');
}
