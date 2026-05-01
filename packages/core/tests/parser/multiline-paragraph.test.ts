/**
 * Isolated parse tests for the multi-line paragraph splitter.
 *
 * Bug: a paragraph with mixed button lines and free-text lines (no blank
 * line between) used to collapse into a single `paragraph` node containing
 * an inline button child, OR into a `form-group` container that wrapped
 * label-text plus buttons together. Authors expect a button line to
 * terminate its line — buttons should appear as siblings of the text, not
 * as inline children of it.
 *
 * Fix: `transformParagraph` may now return `WiremdNode[]`. When the input
 * paragraph contains both pure-button lines and pure-text lines (and no
 * form-element lines like inputs/dropdowns/textareas), the transform
 * groups consecutive same-kind lines and emits each group as its own
 * sibling block: text → `paragraph`, button(s) → `button` or
 * `button-group`.
 */

import { describe, it, expect } from 'vitest';
import { parse } from '../../src/parser/index.js';

describe('multi-line paragraph splitter', () => {
  it('splits [Button]\\nfree text into [button, paragraph]', () => {
    const ast = parse('[Action]*\nthis text should be a separate paragraph\n');
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0].type).toBe('button');
    expect((ast.children[0] as any).content).toBe('Action');
    expect(ast.children[1].type).toBe('paragraph');
    expect((ast.children[1] as any).content).toContain('separate paragraph');
  });

  it('splits text\\n[Button] [Button] into [paragraph, button-group]', () => {
    const ast = parse('Description prose here.\n[Save] [Cancel]*\n');
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0].type).toBe('paragraph');
    const second = ast.children[1] as any;
    expect(second.type).toBe('container');
    expect(second.containerType).toBe('button-group');
    expect(second.children).toHaveLength(2);
  });

  it('does not split when the paragraph contains a form element (input)', () => {
    // Label + input → still a form-group, NOT siblings.
    const ast = parse('Username\n[_____________]\n');
    expect(ast.children).toHaveLength(1);
    const fg = ast.children[0] as any;
    expect(fg.type).toBe('container');
    expect(fg.containerType).toBe('form-group');
  });

  it('does not split when the paragraph contains a textarea ({rows:N})', () => {
    // The textarea attribute pattern shouldn't be misclassified as a button line.
    const ast = parse('Message\n[Write your message...]{rows:4}\n');
    expect(ast.children).toHaveLength(1);
    const fg = ast.children[0] as any;
    expect(fg.type).toBe('container');
    expect(fg.containerType).toBe('form-group');
    const textarea = fg.children.find((c: any) => c.type === 'textarea');
    expect(textarea).toBeDefined();
  });

  it('does not split when the paragraph contains a dropdown', () => {
    const ast = parse('Choose\n[option_____v]\n');
    expect(ast.children).toHaveLength(1);
    const fg = ast.children[0] as any;
    expect(fg.type).toBe('container');
    expect(fg.containerType).toBe('form-group');
  });

  it('preserves the multi-line all-buttons path (no split when every line is buttons)', () => {
    const ast = parse('[Save]*\n[Cancel]\n');
    expect(ast.children).toHaveLength(1);
    const bg = ast.children[0] as any;
    expect(bg.type).toBe('container');
    expect(bg.containerType).toBe('button-group');
    expect(bg.children).toHaveLength(2);
  });
});
