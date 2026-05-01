import type { NodeDefinition } from '../_contract.js';
import { renderCodeHTML } from './html.js';
import { renderCodeReact } from './react.js';
import { renderCodeTailwind } from './tailwind.js';

export const code: NodeDefinition<'code'> = {
  type: 'code',
  render: { html: renderCodeHTML, react: renderCodeReact, tailwind: renderCodeTailwind },
};
