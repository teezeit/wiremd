/**
 * Container — node module.
 *
 * The recursion validator for the registry/strategy contract.
 * Container is the most-nested node type (11 subtypes) and uses
 * `renderChildrenList` (HTML), `renderNode` (React/Tailwind) for
 * deep recursion. If this fits cleanly the rest will too.
 */

import type { NodeDefinition } from '../_contract.js';
import { renderContainerHTML } from './html.js';
import { renderContainerReact } from './react.js';
import { renderContainerTailwind } from './tailwind.js';

export const container: NodeDefinition<'container'> = {
  type: 'container',
  render: {
    html: renderContainerHTML,
    react: renderContainerReact,
    tailwind: renderContainerTailwind,
  },
};
