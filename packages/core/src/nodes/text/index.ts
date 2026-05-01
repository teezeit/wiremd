import type { NodeDefinition } from '../_contract.js';
import { renderTextHTML } from './html.js';
import { renderTextReact } from './react.js';
import { renderTextTailwind } from './tailwind.js';

export const text: NodeDefinition<'text'> = {
  type: 'text',
  render: { html: renderTextHTML, react: renderTextReact, tailwind: renderTextTailwind },
};
