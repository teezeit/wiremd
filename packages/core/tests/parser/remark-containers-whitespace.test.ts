/**
 * Isolated tests for remark-containers' resilience to opener/closer whitespace.
 *
 * Two related bugs:
 *   - `::: card   ` (trailing whitespace on the opener) made remark emit a
 *     hard `break` node, splitting the opener paragraph into multi-child
 *     and dropping the post-opener content.
 *   - `::: ` (trailing whitespace on the closer) made remark fold the entire
 *     run into one paragraph; CASE 1 in `collectContainer` recognized the
 *     closer line via `.trim()` but silently dropped any text after it.
 *
 * These fixtures pin the contract: openers/closers tolerate trailing spaces,
 * and post-closer text becomes a sibling node.
 */

import { describe, it, expect } from 'vitest';
import { parse } from '../../src/parser/index.js';

describe('remark-containers — opener/closer whitespace', () => {
  it('preserves opener-paragraph content when the opener line has trailing whitespace', () => {
    const ast = parse('::: card   \nInside the card.\n\n:::\n');
    expect(ast.children).toHaveLength(1);
    const card = ast.children[0] as any;
    expect(card.type).toBe('container');
    expect(card.containerType).toBe('card');
    expect(card.children.length).toBeGreaterThan(0);
    const para = card.children[0];
    expect(para.type).toBe('paragraph');
    expect(para.content ?? '').toContain('Inside the card');
  });

  it('emits text after a closer with trailing whitespace as a sibling paragraph', () => {
    const ast = parse('::: card\ninside\n::: \ntext after the closer\n');
    expect(ast.children).toHaveLength(2);
    const card = ast.children[0] as any;
    expect(card.type).toBe('container');
    expect(card.containerType).toBe('card');
    const trailing = ast.children[1] as any;
    expect(trailing.type).toBe('paragraph');
    expect(trailing.content ?? '').toContain('text after');
  });

  it('extracts inline-strong/emphasis content after the opener line', () => {
    // Trailing whitespace on opener line → hard break → opener paragraph
    // children are [text, break, strong, text]. The fix must recover the
    // strong/text post-opener content as a paragraph child of the container.
    const ast = parse('::: tab Pricing   \n**Free** — basic plan\n\n:::\n');
    const tab = ast.children[0] as any;
    expect(tab.type).toBe('tab');
    expect(tab.children.length).toBeGreaterThan(0);
    // Content paragraph should still reference the strong text.
    const stringified = JSON.stringify(tab.children);
    expect(stringified).toContain('Free');
  });
});
