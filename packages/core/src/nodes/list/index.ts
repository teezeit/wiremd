import type { NodeDefinition } from '../_contract.js';
import { renderListHTML } from './html.js';
import { renderListReact } from './react.js';
import { renderListTailwind } from './tailwind.js';

export const list: NodeDefinition<'list'> = {
  type: 'list',
  render: { html: renderListHTML, react: renderListReact, tailwind: renderListTailwind },
};
