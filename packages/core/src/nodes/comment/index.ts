import type { NodeDefinition } from '../_contract.js';
import { renderCommentHTML } from './html.js';
import { renderCommentReact } from './react.js';
import { renderCommentTailwind } from './tailwind.js';

export const comment: NodeDefinition<'comment'> = {
  type: 'comment',
  render: {
    html: renderCommentHTML,
    react: renderCommentReact,
    tailwind: renderCommentTailwind,
  },
};
