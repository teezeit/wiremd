import type { NodeDefinition } from '../_contract.js';
import { renderIconHTML } from './html.js';
import { renderIconReact } from './react.js';
import { renderIconTailwind } from './tailwind.js';

export const icon: NodeDefinition<'icon'> = {
  type: 'icon',
  render: { html: renderIconHTML, react: renderIconReact, tailwind: renderIconTailwind },
};
