import type { NodeDefinition } from '../_contract.js';
import { renderSwitchHTML } from './html.js';
import { renderSwitchReact } from './react.js';
import { renderSwitchTailwind } from './tailwind.js';

export const switchNode: NodeDefinition<'switch'> = {
  type: 'switch',
  render: { html: renderSwitchHTML, react: renderSwitchReact, tailwind: renderSwitchTailwind },
};
