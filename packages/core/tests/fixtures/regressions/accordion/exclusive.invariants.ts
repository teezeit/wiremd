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
  // AST: accordion node has 'exclusive' in its classes
  const acc = ast.children.find((n: any) => n.type === 'accordion');
  expect(acc).toBeDefined();
  expect(acc.props.classes).toContain('exclusive');
  expect(acc.children).toHaveLength(3);

  // HTML: wrapper carries wmd-exclusive class and the JS toggle script
  expect(html).toMatch(/class="wmd-accordion[^"]*wmd-exclusive[^"]*"/);
  // exclusive behaviour requires a script to close siblings
  expect(html).toContain('wmd-accordion-item');
  expect(html).toContain('data-wmd-accordion-exclusive');
}
