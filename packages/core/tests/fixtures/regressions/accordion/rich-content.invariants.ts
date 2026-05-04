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
  // AST: two items; first contains input nodes, second contains a list
  const acc = ast.children.find((n: any) => n.type === 'accordion');
  expect(acc).toBeDefined();
  expect(acc.children).toHaveLength(2);

  const firstItem = acc.children[0];
  expect(firstItem.summary).toBe('Contact us');
  const hasInputs = firstItem.children.some(
    (n: any) => n.type === 'input' || (n.children ?? []).some((c: any) => c.type === 'input')
  );
  expect(hasInputs).toBe(true);

  const secondItem = acc.children[1];
  expect(secondItem.summary).toBe('FAQ');
  const hasList = secondItem.children.some((n: any) => n.type === 'list');
  expect(hasList).toBe(true);

  // HTML: form elements and list are rendered inside accordion bodies
  expect(html).toMatch(/<input[^>]*type="text"/);
  expect(html).toMatch(/<input[^>]*type="email"/);
  expect(html).toMatch(/<button[^>]*>Send message<\/button>/);
  expect(html).toContain('<ul');
}
