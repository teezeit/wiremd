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
  // Bug: image inside :::card is wrapped in wmd-container-form-group instead
  // of being a direct child of the card. The <img> should render inside the
  // card without an extra form-group wrapper.
  expect(html).not.toContain('wmd-container-form-group');
  expect(html).toContain('<img');
  expect(html).toContain('wmd-container-card');
}
