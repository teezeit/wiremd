import type { NodeDefinition } from '../_contract.js';
import { renderInputHTML } from './html.js';
import { renderInputReact } from './react.js';
import { renderInputTailwind } from './tailwind.js';

export const input: NodeDefinition<'input'> = {
  type: 'input',
  render: { html: renderInputHTML, react: renderInputReact, tailwind: renderInputTailwind },
};
