import type { NodeDefinition } from '../_contract.js';
import { renderBreadcrumbsHTML } from './html.js';

// React/Tailwind have no breadcrumbs renderer historically — they fall
// through to the legacy "Unknown node type" comment, which is what the
// fixtures snapshot. We omit those targets so the dispatcher continues
// to fall through.
export const breadcrumbs: NodeDefinition<'breadcrumbs'> = {
  type: 'breadcrumbs',
  render: { html: renderBreadcrumbsHTML },
};
