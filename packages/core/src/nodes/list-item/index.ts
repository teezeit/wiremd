import type { NodeDefinition } from '../_contract.js';
import { renderListItemHTML } from './html.js';
import { renderListItemReact } from './react.js';
import { renderListItemTailwind } from './tailwind.js';

export const listItem: NodeDefinition<'list-item'> = {
  type: 'list-item',
  render: {
    html: renderListItemHTML,
    react: renderListItemReact,
    tailwind: renderListItemTailwind,
  },
};
