import type { NodeDefinition } from '../_contract.js';
import { renderTableCellHTML } from './html.js';
import { renderTableCellReact } from './react.js';
import { renderTableCellTailwind } from './tailwind.js';

export const tableCell: NodeDefinition<'table-cell'> = {
  type: 'table-cell',
  render: {
    html: renderTableCellHTML,
    react: renderTableCellReact,
    tailwind: renderTableCellTailwind,
  },
};
