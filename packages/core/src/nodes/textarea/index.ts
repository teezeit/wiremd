import type { NodeDefinition } from '../_contract.js';
import { renderTextareaHTML } from './html.js';
import { renderTextareaReact } from './react.js';
import { renderTextareaTailwind } from './tailwind.js';

export const textarea: NodeDefinition<'textarea'> = {
  type: 'textarea',
  render: {
    html: renderTextareaHTML,
    react: renderTextareaReact,
    tailwind: renderTextareaTailwind,
  },
};
