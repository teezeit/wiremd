import type { NodeDefinition } from '../_contract.js';
import { renderRadioGroupHTML } from './html.js';
import { renderRadioGroupReact } from './react.js';
import { renderRadioGroupTailwind } from './tailwind.js';

export const radioGroup: NodeDefinition<'radio-group'> = {
  type: 'radio-group',
  render: {
    html: renderRadioGroupHTML,
    react: renderRadioGroupReact,
    tailwind: renderRadioGroupTailwind,
  },
};
