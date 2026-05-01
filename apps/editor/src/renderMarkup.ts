import { parse, renderToHTML, countCommentThreads } from '@eclectic-ai/wiremd';

export type StyleName =
  | 'sketch'
  | 'clean'
  | 'wireframe'
  | 'none'
  | 'tailwind'
  | 'material'
  | 'brutal';

export type RenderMarkupResult =
  | {
      html: string;
      commentCount: number;
      error: null;
    }
  | {
      html: '';
      error: string;
    };

export function renderMarkup(markdown: string, style: StyleName, showComments = true): RenderMarkupResult {
  try {
    const ast = parse(markdown);
    const commentCount = countCommentThreads(ast);
    const html = renderToHTML(ast, {
      style,
      inlineStyles: true,
      pretty: true,
      showComments,
      cursorSync: true,
    });

    return {
      html,
      commentCount,
      error: null,
    };
  } catch (err) {
    return {
      html: '',
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
