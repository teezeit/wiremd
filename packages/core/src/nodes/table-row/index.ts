import type { NodeDefinition } from '../_contract.js';
import { renderTableRowHTML } from './html.js';
import { renderTableRowReact } from './react.js';
import { renderTableRowTailwind } from './tailwind.js';

export const tableRow: NodeDefinition<'table-row'> = {
  type: 'table-row',
  render: {
    html: renderTableRowHTML,
    react: renderTableRowReact,
    tailwind: renderTableRowTailwind,
  },
};
