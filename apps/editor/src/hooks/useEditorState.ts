import { useState } from 'react';
import type { StyleName } from '../lib/renderMarkup';

export function useEditorState(initialMarkdown: string) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [style, setStyle] = useState<StyleName>('sketch');
  const [showComments, setShowComments] = useState(true);

  return { markdown, setMarkdown, style, setStyle, showComments, setShowComments };
}
