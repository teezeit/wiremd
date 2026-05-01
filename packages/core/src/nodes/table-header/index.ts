import type { NodeDefinition } from '../_contract.js';
import { renderTableHeaderHTML } from './html.js';
import { renderTableHeaderReact } from './react.js';
import { renderTableHeaderTailwind } from './tailwind.js';

export const tableHeader: NodeDefinition<'table-header'> = {
  type: 'table-header',
  render: {
    html: renderTableHeaderHTML,
    react: renderTableHeaderReact,
    tailwind: renderTableHeaderTailwind,
  },
};
