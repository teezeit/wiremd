/**
 * Radio buttons in the same group must share a `name` attribute so that
 * the browser enforces single-selection. Currently each `<input type=
 * "radio">` is emitted without any `name`, so all options can be checked
 * simultaneously — defeating the semantic of a radio group.
 *
 * The AST already has a `radio-group` node type; this is either a parser
 * gap (radios not wrapped in a group) or a renderer gap (group's name
 * not propagated to children). Either way, the contract on the rendered
 * HTML is the same: every radio gets a non-empty name, and all radios
 * within a group share that name.
 */

import { expect } from 'vitest';
import type { DocumentNode } from '../../../../../src/types.js';

interface InvariantsArgs { ast: DocumentNode; html: string; react: string; tailwind: string; }

export function check({ html }: InvariantsArgs) {
  // Every rendered radio input must carry a name attribute.
  const radios = html.match(/<input[^>]*type="radio"[^>]*>/g) ?? [];
  expect(radios.length).toBeGreaterThan(1);
  const names = radios.map((tag) => {
    const m = tag.match(/\sname="([^"]+)"/);
    return m ? m[1] : null;
  });
  expect(names.every((n) => n !== null && n.length > 0)).toBe(true);

  // All radios in this single-group fixture share the same name.
  const unique = new Set(names);
  expect(unique.size).toBe(1);
}
