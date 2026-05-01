import type { NodeDefinition } from '../_contract.js';
import { renderBadgeHTML } from './html.js';
import { renderBadgeReact } from './react.js';
import { renderBadgeTailwind } from './tailwind.js';

export const badge: NodeDefinition<'badge'> = {
  type: 'badge',
  render: { html: renderBadgeHTML, react: renderBadgeReact, tailwind: renderBadgeTailwind },
};
