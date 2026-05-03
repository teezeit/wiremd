import { expect } from 'vitest';

export function check({ ast, html, react, tailwind }: {
  ast: ReturnType<typeof import('../../../src/parser/index.js').parse>;
  html: string;
  react: string;
  tailwind: string;
}) {
  // AST: exactly one image node with correct src and alt
  const imageNode = ast.children
    .flatMap((n: any) => n.children ?? [])
    .find((n: any) => n.type === 'image');
  expect(imageNode).toBeDefined();
  expect(imageNode.src).toBe('https://example.com/hero.jpg');
  expect(imageNode.alt).toBe('Hero image');

  // HTML: <img> with correct src and alt
  expect(html).toContain('<img src="https://example.com/hero.jpg"');
  expect(html).toContain('alt="Hero image"');
  expect(html).toContain('class="wmd-image"');

  // React: <img> rendered as JSX
  expect(react).toContain('<img src="https://example.com/hero.jpg"');
  expect(react).toContain('alt="Hero image"');
  expect(react).toContain('className="wmd-image"');

  // Tailwind: <img> with utility classes
  expect(tailwind).toContain('<img src="https://example.com/hero.jpg"');
  expect(tailwind).toContain('alt="Hero image"');
}
