import { expect } from 'vitest';

export function check({ ast, html, react, tailwind }: {
  ast: ReturnType<typeof import('../../../src/parser/index.js').parse>;
  html: string;
  react: string;
  tailwind: string;
}) {
  // AST: image node nested inside card container
  const card = ast.children.find((n: any) => n.type === 'container' && n.containerType === 'card');
  expect(card).toBeDefined();

  const imageNode = (card as any).children
    .flatMap((n: any) => n.children ?? [n])
    .find((n: any) => n.type === 'image');
  expect(imageNode).toBeDefined();
  expect(imageNode.src).toBe('https://example.com/hero.jpg');
  expect(imageNode.alt).toBe('Hero image');

  // HTML: card wraps img, heading, and button
  expect(html).toContain('class="wmd-container-card"');
  expect(html).toContain('<img src="https://example.com/hero.jpg"');
  expect(html).toContain('alt="Hero image"');
  expect(html).toContain('class="wmd-image"');
  expect(html).toContain('Buy Now');

  // React: className used for img inside card
  expect(react).toContain('<img src="https://example.com/hero.jpg"');
  expect(react).toContain('className="wmd-image"');

  // Tailwind: image has utility classes
  expect(tailwind).toContain('<img src="https://example.com/hero.jpg"');
  expect(tailwind).toContain('class="max-w-full h-auto rounded-lg shadow-md"');
}
