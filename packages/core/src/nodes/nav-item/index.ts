import type { NodeDefinition } from '../_contract.js';
import { renderNavItemHTML } from './html.js';
import { renderNavItemReact } from './react.js';
import { renderNavItemTailwind } from './tailwind.js';

export const navItem: NodeDefinition<'nav-item'> = {
  type: 'nav-item',
  render: { html: renderNavItemHTML, react: renderNavItemReact, tailwind: renderNavItemTailwind },
};
