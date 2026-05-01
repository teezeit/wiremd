/**
 * Isolated parse tests for inline rich content inside paragraphs.
 *
 * Bug: `transformParagraph`'s rich-content path used to embed inline strong
 * /emphasis/code/link as raw HTML *string literals* in a `text` node's
 * content (e.g. `<strong>App</strong>`). This worked for the HTML renderer
 * (which detected tags and passed them through), but the React/Tailwind
 * renderers escaped the literals to `&lt;strong&gt;…&lt;/strong&gt;`,
 * rendering as visible text.
 *
 * Fix: emit proper child nodes — `text` with a `mark: 'strong' | 'em' | 'code'`
 * field for inline marks, dedicated `code` (inline) nodes, and dedicated
 * `link` nodes. Renderers wrap based on the field.
 */

import { describe, it, expect } from 'vitest';
import { parse } from '../../src/parser/index.js';

describe('inline rich content in paragraphs', () => {
  it('emits **strong** as a marked text node, not an HTML literal', () => {
    const ast = parse('Hello **World**.\n');
    const para = ast.children[0] as any;
    expect(para.type).toBe('paragraph');
    expect(Array.isArray(para.children)).toBe(true);
    const strong = para.children.find((c: any) => c.type === 'text' && c.mark === 'strong');
    expect(strong).toBeDefined();
    expect(strong.content).toBe('World');
    // No raw HTML tags in any text content.
    for (const c of para.children) {
      if (c.type === 'text') expect(c.content).not.toMatch(/<\/?strong>/);
    }
  });

  it('emits *emphasis* as a marked text node', () => {
    const ast = parse('See *important* note.\n');
    const para = ast.children[0] as any;
    const em = para.children.find((c: any) => c.type === 'text' && c.mark === 'em');
    expect(em).toBeDefined();
    expect(em.content).toBe('important');
  });

  it('emits inline `code` as a code node, not an HTML literal', () => {
    const ast = parse('Run `npm test`.\n');
    const para = ast.children[0] as any;
    const code = para.children.find((c: any) => c.type === 'code');
    expect(code).toBeDefined();
    expect(code.value).toBe('npm test');
    expect(code.inline).toBe(true);
  });

  it('emits [link](url) as a link node, not an HTML literal', () => {
    const ast = parse('See [docs](https://example.com) for more.\n');
    const para = ast.children[0] as any;
    const link = para.children.find((c: any) => c.type === 'link');
    expect(link).toBeDefined();
    expect(link.href).toBe('https://example.com');
    const linkText = link.children.find((c: any) => c.type === 'text');
    expect(linkText.content).toBe('docs');
  });

  it('mixes plain text and marks correctly', () => {
    const ast = parse('Plain **bold** more *italic* text.\n');
    const para = ast.children[0] as any;
    expect(para.type).toBe('paragraph');
    const types = para.children.map((c: any) => `${c.type}${c.mark ? `:${c.mark}` : ''}`);
    expect(types).toContain('text:strong');
    expect(types).toContain('text:em');
  });
});
