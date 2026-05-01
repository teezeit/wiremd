import type { NodeDefinition } from '../_contract.js';
import { renderHeadingHTML } from './html.js';
import { renderHeadingReact } from './react.js';
import { renderHeadingTailwind } from './tailwind.js';

export const heading: NodeDefinition<'heading'> = {
  type: 'heading',
  render: { html: renderHeadingHTML, react: renderHeadingReact, tailwind: renderHeadingTailwind },
};
