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
 * emits each physical control line as its own sibling block: text →
 * `paragraph`, same-line controls → `row`.
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

  it('splits text\\n[Button] [Button] into [paragraph, row]', () => {
    const ast = parse('Description prose here.\n[Save] [Cancel]*\n');
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0].type).toBe('paragraph');
    const second = ast.children[1] as any;
    expect(second.type).toBe('row');
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

  it('preserves physical lines when every line is buttons', () => {
    const ast = parse('[Save]*\n[Cancel]\n');
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0].type).toBe('row');
    expect(ast.children[1].type).toBe('row');
    expect((ast.children[0] as any).children[0].children[0]).toMatchObject({ type: 'button', content: 'Save' });
    expect((ast.children[1] as any).children[0].children[0]).toMatchObject({ type: 'button', content: 'Cancel' });
  });
});
