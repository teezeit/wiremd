/**
 * TransformContext — explicit lookahead/consumption contract for MDAST → wiremd transforms.
 *
 * Replaces the implicit `nextNode` parameter and post-hoc `i++` patterns in `processNodeList`.
 * Every transform function now receives a `ctx` object with first-class `peekNext()` and
 * `consumeNext()` operations. Recursion uses `transformChild` / `transformChildren` so child
 * lookahead can never accidentally reach into grandparent siblings.
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { ParseOptions, WiremdNode } from '../types.js';

/**
 * Per-iteration parser context. Built fresh for each sibling step in `processNodeList`,
 * and built in an "isolated" form (empty siblings) for transforms that walk their own
 * children directly without cross-sibling lookahead.
 */
export interface TransformContext {
  /** Parse options (resolveIncludes, basePath, etc.) propagated through every transform. */
  readonly options: ParseOptions;

  /**
   * Peek at the next sibling MDAST node without consuming it.
   * Returns `null` at end-of-list or on an isolated context.
   */
  peekNext(): unknown | null;

  /**
   * Consume the next sibling so the driving loop in `processNodeList` skips it.
   * Pair with `peekNext()` whenever a transform absorbs the lookahead into its output.
   */
  consumeNext(): void;

  /**
   * Transform a single child MDAST node. Recurses through the dispatcher with an
   * isolated context so the child cannot peek at the parent's siblings.
   */
  transformChild(mdast: unknown): WiremdNode | null;

  /**
   * Transform a list of child MDAST nodes through the standard sibling-aware driver.
   * Use this for container children where dropdown-with-options and similar
   * cross-sibling patterns must continue to work.
   */
  transformChildren(mdastList: unknown[]): WiremdNode[];

  /** Shared helpers exposed so transform functions don't re-import internals. */
  parseAttributes(attrString: string): Record<string, unknown>;
  extractTextContent(node: unknown): string;
  isHtmlCommentNode(node: unknown): boolean;
}

/**
 * Internal handle returned by `makeContext`. The driving loop reads `getCursor()`
 * after each step to learn how many siblings the transform consumed.
 */
export interface ContextHandle {
  ctx: TransformContext;
  /** Returns the cursor position after any `consumeNext()` calls. */
  getCursor(): number;
}

/**
 * Wiring required by `makeContext`. Passed in from `transformer.ts` so the
 * context module stays decoupled from the concrete transform functions.
 */
export interface ContextDeps {
  transformNode: (mdast: unknown, ctx: TransformContext) => WiremdNode | null;
  processNodeList: (mdastList: unknown[], options: ParseOptions) => WiremdNode[];
  parseAttributes: (attrString: string) => Record<string, unknown>;
  extractTextContent: (node: unknown) => string;
  isHtmlCommentNode: (node: unknown) => boolean;
}

/**
 * Build a sibling-aware context for the position `startIndex` in `siblings`.
 * Use this inside `processNodeList` once per iteration.
 */
export function makeContext(
  siblings: unknown[],
  startIndex: number,
  options: ParseOptions,
  deps: ContextDeps,
): ContextHandle {
  let cursor = startIndex;

  const ctx: TransformContext = {
    options,
    peekNext: () => {
      const next = siblings[cursor + 1];
      return next === undefined ? null : next;
    },
    consumeNext: () => {
      cursor++;
    },
    transformChild: (mdast) => deps.transformNode(mdast, makeIsolatedContext(options, deps).ctx),
    transformChildren: (mdastList) => deps.processNodeList(mdastList as unknown[], options),
    parseAttributes: deps.parseAttributes,
    extractTextContent: deps.extractTextContent,
    isHtmlCommentNode: deps.isHtmlCommentNode,
  };

  return {
    ctx,
    getCursor: () => cursor,
  };
}

/**
 * Build a context with no sibling visibility — `peekNext()` always returns `null`
 * and `consumeNext()` is a no-op. Use for transforms that walk a single child
 * directly (e.g. blockquote children, table cells) where cross-sibling lookahead
 * isn't part of the contract.
 */
export function makeIsolatedContext(
  options: ParseOptions,
  deps: ContextDeps,
): ContextHandle {
  let cursor = 0;
  const ctx: TransformContext = {
    options,
    peekNext: () => null,
    consumeNext: () => {
      cursor++;
    },
    transformChild: (mdast) => deps.transformNode(mdast, ctx),
    transformChildren: (mdastList) => deps.processNodeList(mdastList as unknown[], options),
    parseAttributes: deps.parseAttributes,
    extractTextContent: deps.extractTextContent,
    isHtmlCommentNode: deps.isHtmlCommentNode,
  };
  return { ctx, getCursor: () => cursor };
}
