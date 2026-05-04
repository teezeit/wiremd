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
  // Bug: {width:200 height:150} attributes are not applied to the <img> tag.
  // They render as a literal text node instead of becoming width/height attrs.
  expect(html).toContain('width="200"');
  expect(html).toContain('height="150"');
  expect(html).not.toContain('{width:200');
}
