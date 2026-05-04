import type { NodeDefinition } from '../_contract.js';
import { renderAccordionItemHTML } from './html.js';

export const accordionItem: NodeDefinition<'accordion-item'> = {
  type: 'accordion-item',
  render: { html: renderAccordionItemHTML },
};
