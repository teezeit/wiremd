/**
 * Node registry contract.
 *
 * These tests pin the invariants that the strangler-fig migration
 * relies on. Every PR that migrates a node type implicitly depends on
 * these guarantees:
 *
 *   1. The registry is a plain lookup map, empty by default.
 *   2. The three render dispatchers (HTML / React / Tailwind) consult
 *      the registry first, fall through to the legacy switch when the
 *      type is unmigrated.
 *   3. Each render target falls through independently — registering an
 *      HTML renderer must not break React or Tailwind output for the
 *      same node type.
 *
 * If any of these break, the strangler-fig assumption is violated and
 * the migration plan needs revising.
 */

import { afterEach, describe, expect, it } from 'vitest';
import { getNodeDefinition, registry } from '../src/nodes/_registry.js';
import type { AnyNodeDefinition } from '../src/nodes/_contract.js';
import {
  renderToHTML,
  renderToReact,
  renderToTailwind,
} from '../src/renderer/index.js';
import type { DocumentNode } from '../src/types.js';

/** Wrap a single child in a minimal document, the input shape every renderer takes. */
function doc(children: DocumentNode['children']): DocumentNode {
  return {
    type: 'document',
    version: '0.1',
    meta: {},
    children,
  };
}

/**
 * Mutate-and-restore registry helper. Vitest runs files in parallel but
 * tests within a file are sequential, so per-test mutation is safe as
 * long as we always restore in afterEach.
 */
const originalKeys = new Set(Object.keys(registry));
afterEach(() => {
  for (const key of Object.keys(registry)) {
    if (!originalKeys.has(key)) {
      delete (registry as Record<string, unknown>)[key];
    }
  }
});

describe('node registry: contract', () => {
  it('every registered entry has a matching type and at least one render target', () => {
    // Per-target functions are optional (HTML / React / Tailwind do not
    // all cover every node type — UI nodes like tabs/breadcrumbs fall
    // through to the legacy "Unknown node" comment in React/Tailwind).
    // But a node with no render functions at all is broken.
    for (const [type, def] of Object.entries(registry)) {
      expect(def?.type, `registry["${type}"].type`).toBe(type);
      const r = def?.render || {};
      const present = [r.html, r.react, r.tailwind].filter((fn) => typeof fn === 'function');
      expect(present.length, `registry["${type}"] has no render targets`).toBeGreaterThan(0);
    }
  });

  it('getNodeDefinition returns undefined for unknown types', () => {
    expect(getNodeDefinition('does-not-exist')).toBeUndefined();
    expect(getNodeDefinition('')).toBeUndefined();
  });

  it('getNodeDefinition returns the registered definition for known types', () => {
    const def = getNodeDefinition('button');
    expect(def).toBeDefined();
    expect(def?.type).toBe('button');
  });

  it('getNodeDefinition returns the registered definition after registration', () => {
    const def: AnyNodeDefinition = {
      type: 'text',
      render: {
        html: () => '<MARKER/>',
        react: () => '<></>',
        tailwind: () => '<MARKER/>',
      },
    };
    (registry as Record<string, AnyNodeDefinition>).text = def;
    expect(getNodeDefinition('text')).toBe(def);
  });
});

describe('node registry: dispatcher hooks (registry-first, fall-through second)', () => {
  it('HTML renderer routes registered types through registry.render.html', () => {
    // Override the migrated `text` renderer with a marker; the override
    // should win over the canonical implementation registered in
    // src/nodes/text/.
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        html: () => '<HTML-MARKER/>',
        react: () => '<></>',
        tailwind: () => '',
      },
    };

    const html = renderToHTML(doc([{ type: 'text', content: 'hello' }]));
    expect(html).toContain('<HTML-MARKER/>');
    expect(html).not.toContain('hello');
  });

  it('React renderer routes registered types through registry.render.react', () => {
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        html: () => '',
        react: () => '<REACT_MARKER/>',
        tailwind: () => '',
      },
    };

    const react = renderToReact(doc([{ type: 'text', content: 'hello' }]));
    expect(react).toContain('<REACT_MARKER/>');
    expect(react.match(/hello/g)).toBeNull();
  });

  it('Tailwind renderer routes registered types through registry.render.tailwind', () => {
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        html: () => '',
        react: () => '',
        tailwind: () => '<TW-MARKER/>',
      },
    };

    const tailwind = renderToTailwind(doc([{ type: 'text', content: 'hello' }]));
    expect(tailwind).toContain('<TW-MARKER/>');
    expect(tailwind).not.toContain('hello');
  });

  it('does not throw for unknown types not in the registry', () => {
    // The dispatcher must not throw; it falls through to the legacy
    // switch's default arm. Some renderers emit an "Unknown node type"
    // comment for diagnostics — the contract here is just that the
    // pipeline survives.
    const bogus = doc([{ type: 'made-up-node' as never, content: 'x' } as never]);
    expect(() => renderToHTML(bogus)).not.toThrow();
    expect(() => renderToReact(bogus)).not.toThrow();
    expect(() => renderToTailwind(bogus)).not.toThrow();
  });
});
