import type { NodeDefinition } from '../_contract.js';
import { renderImageHTML } from './html.js';
import { renderImageReact } from './react.js';
import { renderImageTailwind } from './tailwind.js';

export const image: NodeDefinition<'image'> = {
  type: 'image',
  render: { html: renderImageHTML, react: renderImageReact, tailwind: renderImageTailwind },
};
