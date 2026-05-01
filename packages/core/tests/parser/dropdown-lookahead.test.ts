/**
 * Isolated parse tests for the dropdown lookahead — the only cross-sibling
 * peek in the transformer. Pins the contract that:
 *   - a `[Choice___v]` paragraph followed by a list peeks at the list,
 *   - a `[Choice___v]` paragraph WITHOUT a following list does not consume,
 *   - a non-dropdown paragraph never peeks.
 *
 * These exercise transformParagraph through the public dispatcher
 * (`transformNode`) using crafted MDAST, rather than full markdown parsing.
 */

import { describe, it, expect } from 'vitest';
import { mdastFor, runTransform } from '../lib/transform-test-helpers.js';

describe('transformParagraph — dropdown lookahead', () => {
  it('consumes the trailing list when the paragraph is a dropdown', () => {
    const mdast = mdastFor('[Choose option___v]\n- A\n- B\n');
    const [paragraph, list] = mdast.children;
    const { node, cursor } = runTransform(paragraph, [paragraph, list]);

    expect(node).not.toBeNull();
    expect(node!.type).toBe('select');
    const select = node as any;
    expect(select.options.map((o: any) => o.label)).toEqual(['A', 'B']);
    expect(cursor).toBe(1); // consumed the list sibling
  });

  it('does not consume when the dropdown has no following list', () => {
    const mdast = mdastFor('[Choose option___v]\n');
    const [paragraph] = mdast.children;
    const { node, cursor } = runTransform(paragraph, [paragraph]);

    expect(node!.type).toBe('select');
    expect((node as any).options).toEqual([]);
    expect(cursor).toBe(0); // nothing consumed
  });

  it('does not consume when the trailing sibling is not a list', () => {
    const mdast = mdastFor('[Choose option___v]\n\nFollow-up paragraph.\n');
    const [paragraph, follow] = mdast.children;
    const { node, cursor } = runTransform(paragraph, [paragraph, follow]);

    expect(node!.type).toBe('select');
    expect(cursor).toBe(0);
  });

  it('does not peek for non-dropdown paragraphs even when followed by a list', () => {
    const mdast = mdastFor('Plain text.\n- A\n- B\n');
    const [paragraph, list] = mdast.children;
    const { node, cursor } = runTransform(paragraph, [paragraph, list]);

    expect(node!.type).toBe('paragraph');
    expect(cursor).toBe(0); // contract: only dropdown paragraphs consume
  });
});
