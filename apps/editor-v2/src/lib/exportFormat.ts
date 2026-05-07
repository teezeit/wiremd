import { parse, renderToHTML, renderToReact, renderToTailwind, renderToJSON } from '@eclectic-ai/wiremd';
import type { StyleName } from './renderMarkup';

export type SaveFormat = 'markdown' | 'html' | 'react' | 'tailwind' | 'json';

export function filenameForFormat(format: SaveFormat): string {
  switch (format) {
    case 'markdown': return 'wireframe.md';
    case 'html':     return 'wireframe.html';
    case 'react':    return 'wireframe.tsx';
    case 'tailwind': return 'wireframe.tailwind.html';
    case 'json':     return 'wireframe.json';
  }
}

export async function renderForFormat(
  markdown: string,
  format: SaveFormat,
  style: StyleName,
): Promise<string> {
  if (format === 'markdown') return markdown;
  const ast = parse(markdown);
  switch (format) {
    case 'html':     return renderToHTML(ast, { style, inlineStyles: true, pretty: true });
    case 'react':    return renderToReact(ast, { style });
    case 'tailwind': return renderToTailwind(ast, { style });
    case 'json':     return renderToJSON(ast);
  }
}
