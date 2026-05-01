import type { NodeDefinition } from '../_contract.js';
import { renderBrandHTML } from './html.js';
import { renderBrandReact } from './react.js';
import { renderBrandTailwind } from './tailwind.js';

export const brand: NodeDefinition<'brand'> = {
  type: 'brand',
  render: { html: renderBrandHTML, react: renderBrandReact, tailwind: renderBrandTailwind },
};
