import type { NodeDefinition } from '../_contract.js';
import { renderCheckboxHTML } from './html.js';
import { renderCheckboxReact } from './react.js';
import { renderCheckboxTailwind } from './tailwind.js';

export const checkbox: NodeDefinition<'checkbox'> = {
  type: 'checkbox',
  render: {
    html: renderCheckboxHTML,
    react: renderCheckboxReact,
    tailwind: renderCheckboxTailwind,
  },
};
