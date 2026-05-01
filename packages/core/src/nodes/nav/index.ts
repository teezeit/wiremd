import type { NodeDefinition } from '../_contract.js';
import { renderNavHTML } from './html.js';
import { renderNavReact } from './react.js';
import { renderNavTailwind } from './tailwind.js';

export const nav: NodeDefinition<'nav'> = {
  type: 'nav',
  render: { html: renderNavHTML, react: renderNavReact, tailwind: renderNavTailwind },
};
