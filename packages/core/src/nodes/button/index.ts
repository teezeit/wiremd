/**
 * Button — node module.
 *
 * The first node migrated to the registry/strategy architecture. Parse
 * logic stays in src/parser/transformer.ts for now — button parsing is
 * tangled with paragraph parsing and dropdown lookahead, and is best
 * extracted in a later PR alongside the parser-side dispatch contract.
 */

import type { NodeDefinition } from '../_contract.js';
import { renderButtonHTML } from './html.js';
import { renderButtonReact } from './react.js';
import { renderButtonTailwind } from './tailwind.js';

export const button: NodeDefinition<'button'> = {
  type: 'button',
  render: {
    html: renderButtonHTML,
    react: renderButtonReact,
    tailwind: renderButtonTailwind,
  },
};
