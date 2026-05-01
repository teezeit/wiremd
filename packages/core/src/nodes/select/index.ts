import type { NodeDefinition } from '../_contract.js';
import { renderSelectHTML } from './html.js';
import { renderSelectReact } from './react.js';
import { renderSelectTailwind } from './tailwind.js';

export const select: NodeDefinition<'select'> = {
  type: 'select',
  render: { html: renderSelectHTML, react: renderSelectReact, tailwind: renderSelectTailwind },
};
