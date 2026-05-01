import type { NodeDefinition } from '../_contract.js';
import { renderTabsHTML } from './html.js';

export const tabs: NodeDefinition<'tabs'> = {
  type: 'tabs',
  render: { html: renderTabsHTML },
};
