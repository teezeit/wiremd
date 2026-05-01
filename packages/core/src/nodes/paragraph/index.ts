import type { NodeDefinition } from '../_contract.js';
import { renderParagraphHTML } from './html.js';
import { renderParagraphReact } from './react.js';
import { renderParagraphTailwind } from './tailwind.js';

export const paragraph: NodeDefinition<'paragraph'> = {
  type: 'paragraph',
  render: {
    html: renderParagraphHTML,
    react: renderParagraphReact,
    tailwind: renderParagraphTailwind,
  },
};
