import type { NodeDefinition } from '../_contract.js';
import { renderRowHTML } from './html.js';
import { renderRowReact } from './react.js';
import { renderRowTailwind } from './tailwind.js';

export const row: NodeDefinition<'row'> = {
  type: 'row',
  render: { html: renderRowHTML, react: renderRowReact, tailwind: renderRowTailwind },
};
