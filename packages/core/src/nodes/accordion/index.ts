import type { NodeDefinition } from '../_contract.js';
import { renderAccordionHTML } from './html.js';

export const accordion: NodeDefinition<'accordion'> = {
  type: 'accordion',
  render: { html: renderAccordionHTML },
};
