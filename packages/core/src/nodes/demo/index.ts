import type { NodeDefinition } from '../_contract.js';
import { renderDemoHTML } from './html.js';

export const demo: NodeDefinition<'demo'> = {
  type: 'demo',
  render: { html: renderDemoHTML },
};
