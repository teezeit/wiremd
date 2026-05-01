import type { NodeDefinition } from '../_contract.js';
import { renderGridItemHTML } from './html.js';
import { renderGridItemReact } from './react.js';
import { renderGridItemTailwind } from './tailwind.js';

export const gridItem: NodeDefinition<'grid-item'> = {
  type: 'grid-item',
  render: {
    html: renderGridItemHTML,
    react: renderGridItemReact,
    tailwind: renderGridItemTailwind,
  },
};
