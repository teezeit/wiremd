import type { NodeDefinition } from '../_contract.js';
import { renderTableHTML } from './html.js';
import { renderTableReact } from './react.js';
import { renderTableTailwind } from './tailwind.js';

export const table: NodeDefinition<'table'> = {
  type: 'table',
  render: { html: renderTableHTML, react: renderTableReact, tailwind: renderTableTailwind },
};
