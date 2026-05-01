import type { NodeDefinition } from '../_contract.js';
import { renderBlockquoteHTML } from './html.js';
import { renderBlockquoteReact } from './react.js';
import { renderBlockquoteTailwind } from './tailwind.js';

export const blockquote: NodeDefinition<'blockquote'> = {
  type: 'blockquote',
  render: {
    html: renderBlockquoteHTML,
    react: renderBlockquoteReact,
    tailwind: renderBlockquoteTailwind,
  },
};
