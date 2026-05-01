/**
 * Uniform contract for wiremd node-type modules.
 *
 * Each node type (button, container, grid, …) is implemented as a
 * self-contained module under `nodes/<type>/` that exports a
 * NodeDefinition. The legacy parser/renderer dispatchers consult the
 * registry first; node types not yet migrated fall through to the
 * existing switch statements.
 *
 * The contract is intentionally split into per-target render functions
 * because the three render contexts (HTML, React, Tailwind) carry
 * different state. See html-renderer.ts / react-renderer.ts /
 * tailwind-renderer.ts for the canonical context shapes.
 */

import type { WiremdNode } from '../types.js';
import type { RenderContext as HtmlRenderContext } from '../renderer/html-renderer.js';
import type { ReactRenderContext } from '../renderer/react-renderer.js';
import type { TailwindRenderContext } from '../renderer/tailwind-renderer.js';

export type { HtmlRenderContext, ReactRenderContext, TailwindRenderContext };

/**
 * Type of one branch of the WiremdNode discriminated union, picked by
 * its `type` discriminant.
 */
export type NodeOfType<K extends WiremdNode['type']> = Extract<WiremdNode, { type: K }>;

/**
 * Parse half of the contract. Receives the relevant MDAST node plus a
 * lightweight TransformContext that exposes the shared helpers and
 * recursion closures from the legacy transformer.
 *
 * Some node types (e.g. select with following list) need lookahead;
 * the context exposes peek/consume primitives for that.
 */
export interface TransformContext {
  /** Recurse into a child MDAST node and return its wiremd node. */
  transformChild(mdast: unknown): WiremdNode | null;
  /** Recurse into a list of MDAST children. */
  transformChildren(mdast: unknown[]): WiremdNode[];
  /** Peek at the next sibling MDAST node without consuming it. */
  peekNext(): unknown | null;
  /** Mark the next sibling MDAST node as consumed (skipped by the dispatcher). */
  consumeNext(): void;
  /** Parse `{key=value key=value}` style attribute trailers. */
  parseAttributes(text: string): Record<string, unknown>;
  /** Extract plain text from any MDAST node. */
  extractTextContent(mdast: unknown): string;
}

/**
 * Render half of the contract. Each target receives its own context
 * type because the three renderers have genuinely different state
 * (HTML tracks comments + radio counter; React tracks indent +
 * className flag; Tailwind tracks only pretty + radio counter).
 *
 * NOTE: we keep ctx typing permissive (the legacy contexts) so node
 * modules can be migrated one at a time without forcing a wholesale
 * RenderContext refactor.
 */
export interface NodeRenderers<T extends WiremdNode> {
  html: (node: T, ctx: HtmlRenderContext) => string;
  react: (node: T, ctx: ReactRenderContext, indent?: number) => string;
  tailwind: (node: T, ctx: TailwindRenderContext) => string;
}

/**
 * The full contract for one node type.
 *
 * `parse` is optional during the strangler-fig migration — a node can
 * be migrated in the renderer registry first and pick up its parser
 * later. The dispatcher falls through to the legacy switch when
 * `parse` is missing.
 */
export interface NodeDefinition<K extends WiremdNode['type']> {
  type: K;
  parse?: (mdast: unknown, ctx: TransformContext) => NodeOfType<K> | NodeOfType<K>[] | null;
  render: NodeRenderers<NodeOfType<K>>;
}

/** Erase the type parameter for storage in the registry map. */
export type AnyNodeDefinition = NodeDefinition<WiremdNode['type']>;
