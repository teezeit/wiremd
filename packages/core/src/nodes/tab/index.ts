import type { NodeDefinition } from '../_contract.js';
import { renderTabHTML } from './html.js';

export const tab: NodeDefinition<'tab'> = {
  type: 'tab',
  render: { html: renderTabHTML },
};
