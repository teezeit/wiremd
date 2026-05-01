import type { NodeDefinition } from '../_contract.js';
import { renderRadioHTML } from './html.js';
import { renderRadioReact } from './react.js';
import { renderRadioTailwind } from './tailwind.js';

export const radio: NodeDefinition<'radio'> = {
  type: 'radio',
  render: { html: renderRadioHTML, react: renderRadioReact, tailwind: renderRadioTailwind },
};
