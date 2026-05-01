/**
 * Static registry of migrated node-type modules.
 *
 * Empty during the scaffold phase. As each node type is moved into
 * `nodes/<type>/`, its NodeDefinition is added here and the
 * corresponding case arms are deleted from the legacy parser/renderer
 * switch statements.
 *
 * Lookup is a plain object access; tree-shaking handles the rest.
 */

import type { AnyNodeDefinition } from './_contract.js';

export const registry: Partial<Record<string, AnyNodeDefinition>> = {
  // populated as each node type is migrated:
  //   button: button,
  //   container: container,
};

/**
 * Lookup helper. Returns `undefined` for unmigrated node types so
 * callers can fall through to legacy dispatch.
 */
export function getNodeDefinition(type: string): AnyNodeDefinition | undefined {
  return registry[type];
}
