/**
 * Helpers for isolated parse tests.
 *
 * Lets per-node tests call `transformNode(mdast, ctx)` directly against
 * crafted MDAST inputs instead of going through the full `parse(markdown)`
 * pipeline. Crafted MDAST also lets edge cases that natural markdown rarely
 * produces (empty-children containers, comment-interleaved grid items)
 * become trivial to express.
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { remarkWiremdContainers } from '../../src/parser/remark-containers.js';
import { remarkWiremdInlineContainers } from '../../src/parser/remark-inline-containers.js';
import { makeContext, type TransformContext } from '../../src/parser/_context.js';
import { __transformerInternals } from '../../src/parser/transformer.js';
import type { ParseOptions, WiremdNode } from '../../src/types.js';

/**
 * Run the same MDAST stage that `parse()` runs, but stop before the wiremd
 * transform. Returns the post-plugin MDAST root.
 */
export function mdastFor(markdown: string): any {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkWiremdInlineContainers)
    .use(remarkWiremdContainers);
  const tree = processor.parse(markdown);
  return processor.runSync(tree);
}

/**
 * Build a sibling-aware `TransformContext` over an explicit list of MDAST
 * siblings, with the cursor positioned at index 0 (so `peekNext()` returns
 * `siblings[1]`). Use this when a test needs to verify cross-sibling
 * peek/consume behavior.
 *
 * For tests that don't care about lookahead, pass a single-element array
 * (or `[mdastNode]`) and the context behaves like an isolated walk.
 */
export function makeTestContext(
  siblings: unknown[] = [],
  options: ParseOptions = {},
): { ctx: TransformContext; getCursor: () => number } {
  return makeContext(siblings, 0, options, __transformerInternals.ctxDeps);
}

/**
 * Apply a transform and return both the produced wiremd node and the cursor
 * position after the transform — so tests can assert on lookahead consumption
 * (`getCursor() === 0` means no consume; `=== 1` means one sibling consumed).
 */
export function runTransform(
  mdast: unknown,
  siblings: unknown[] = [mdast],
  options: ParseOptions = {},
): { node: WiremdNode | null; cursor: number } {
  const handle = makeTestContext(siblings, options);
  const node = __transformerInternals.transformNode(mdast as any, handle.ctx);
  return { node, cursor: handle.getCursor() };
}
