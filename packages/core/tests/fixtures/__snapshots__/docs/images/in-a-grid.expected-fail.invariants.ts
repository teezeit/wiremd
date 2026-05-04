import { expect } from 'vitest';
import type { parse } from '../../../../src/parser/index.js';

export function check({
  html,
}: {
  ast: ReturnType<typeof parse>;
  html: string;
  react: string;
  tailwind: string;
}) {
  // Bug: images inside a :::columns-3 grid produce an empty grid — the image
  // nodes are not collected as grid items and are silently dropped.
  expect(html).toContain('<img');
  // All three images should be present
  expect(html).toContain('seed/a/');
  expect(html).toContain('seed/b/');
  expect(html).toContain('seed/c/');
  // They should be inside the grid
  expect(html).toMatch(/wmd-grid[^"]*"[^>]*>[\s\S]*<img/);
}
