import type { NodeDefinition } from '../_contract.js';
import { renderSeparatorHTML } from './html.js';
import { renderSeparatorReact } from './react.js';
import { renderSeparatorTailwind } from './tailwind.js';

export const separator: NodeDefinition<'separator'> = {
  type: 'separator',
  render: {
    html: renderSeparatorHTML,
    react: renderSeparatorReact,
    tailwind: renderSeparatorTailwind,
  },
};
