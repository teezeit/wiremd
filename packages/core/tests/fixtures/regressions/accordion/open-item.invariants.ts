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
  // AST: second item has expanded=true, others false
  const acc = ast.children.find((n: any) => n.type === 'accordion');
  expect(acc).toBeDefined();
  expect(acc.children).toHaveLength(3);
  expect(acc.children[0].expanded).toBe(false);
  expect(acc.children[1].expanded).toBe(true);
  expect(acc.children[1].summary).toBe('Expanded item');
  expect(acc.children[2].expanded).toBe(false);

  // HTML: only the second <details> has the `open` attribute
  const detailsMatches = [...html.matchAll(/<details([^>]*)>/g)];
  expect(detailsMatches).toHaveLength(3);
  expect(detailsMatches[0][1]).not.toMatch(/\bopen\b/);
  expect(detailsMatches[1][1]).toMatch(/\bopen\b/);
  expect(detailsMatches[2][1]).not.toMatch(/\bopen\b/);
}
