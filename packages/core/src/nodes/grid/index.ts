import type { NodeDefinition } from '../_contract.js';
import { renderGridHTML } from './html.js';
import { renderGridReact } from './react.js';
import { renderGridTailwind } from './tailwind.js';

export const grid: NodeDefinition<'grid'> = {
  type: 'grid',
  render: { html: renderGridHTML, react: renderGridReact, tailwind: renderGridTailwind },
};
