import type { NodeDefinition } from '../_contract.js';
import { renderLinkHTML } from './html.js';
import { renderLinkReact } from './react.js';
import { renderLinkTailwind } from './tailwind.js';

export const link: NodeDefinition<'link'> = {
  type: 'link',
  render: { html: renderLinkHTML, react: renderLinkReact, tailwind: renderLinkTailwind },
};
