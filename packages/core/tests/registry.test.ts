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
  it('contains entries only for migrated node types', () => {
    // As nodes migrate, this assertion grows. The point is to keep an
    // explicit inventory so a stray accidental registration is caught.
    expect(Object.keys(registry).sort()).toEqual(['button']);
  });

  it('getNodeDefinition returns undefined for unmigrated/unknown types', () => {
    expect(getNodeDefinition('container')).toBeUndefined();
    expect(getNodeDefinition('does-not-exist')).toBeUndefined();
  });

  it('getNodeDefinition returns the registered definition for migrated types', () => {
    const def = getNodeDefinition('button');
    expect(def).toBeDefined();
    expect(def?.type).toBe('button');
    expect(typeof def?.render?.html).toBe('function');
    expect(typeof def?.render?.react).toBe('function');
    expect(typeof def?.render?.tailwind).toBe('function');
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
  it('HTML renderer prefers registry.render.html over the legacy switch', () => {
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        html: () => '<HTML-MARKER/>',
        react: () => '<></>',
        tailwind: () => '',
      },
    };

    const html = renderToHTML(doc([{ type: 'text', content: 'hello' }]));

    // Registry override wins: the marker appears.
    expect(html).toContain('<HTML-MARKER/>');
    // Legacy escape-and-emit path didn't also run.
    expect(html).not.toContain('hello');
  });

  it('React renderer prefers registry.render.react over the legacy switch', () => {
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
    // The legacy text path emits the literal content; with registry
    // override it must not also emit it.
    expect(react.match(/hello/g)).toBeNull();
  });

  it('Tailwind renderer prefers registry.render.tailwind over the legacy switch', () => {
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

  it('falls through to legacy when the registry has no entry for the node type', () => {
    // Registry is empty for 'text' here — legacy path must produce the literal content.
    const html = renderToHTML(doc([{ type: 'text', content: 'fallthrough' }]));
    expect(html).toContain('fallthrough');
  });

  it('per-target fall-through: registering only html leaves react/tailwind on the legacy path', () => {
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        html: () => '<H/>',
        // The contract type requires all three keys, but we can leave
        // the others as no-ops to prove the dispatcher checks each one
        // independently. (Real migrations will implement all three.)
        react: () => '',
        tailwind: () => '',
      },
    };

    const html = renderToHTML(doc([{ type: 'text', content: 'fallthrough-text' }]));
    expect(html).toContain('<H/>');
    expect(html).not.toContain('fallthrough-text');

    // Now flip: only react registered, html/tailwind no-op. The HTML
    // dispatcher still hits the registered no-op (because the key
    // exists), so to prove fall-through we must remove .html entirely.
    delete (registry as Record<string, AnyNodeDefinition>).text;
    (registry as Record<string, AnyNodeDefinition>).text = {
      type: 'text',
      render: {
        // @ts-expect-error — deliberately partial to test fall-through behavior
        html: undefined,
        react: () => '<R/>',
        // @ts-expect-error
        tailwind: undefined,
      },
    };

    const htmlAgain = renderToHTML(doc([{ type: 'text', content: 'fallthrough-html' }]));
    // No registered html → falls through to legacy → original content emitted.
    expect(htmlAgain).toContain('fallthrough-html');

    const reactAgain = renderToReact(doc([{ type: 'text', content: 'fallthrough-react' }]));
    expect(reactAgain).toContain('<R/>');
  });
});
