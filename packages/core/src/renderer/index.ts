/**
 * wiremd Renderer
 * Converts wiremd AST to HTML, JSON, React, or Tailwind
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { DocumentNode, WiremdNode, RenderOptions } from '../types.js';
import { renderChildrenList, renderCommentsPanel } from './html-renderer.js';
import { getStyleCSS } from './styles.js';
import * as ReactRenderer from './react-renderer.js';
import * as TailwindRenderer from './tailwind-renderer.js';

function countThreadsInChildren(children: WiremdNode[]): number {
  let count = 0;
  let inThread = false;
  for (const node of children) {
    if (node.type === 'comment') {
      if (!inThread) { count++; inThread = true; }
    } else {
      inThread = false;
      const kids = (node as any).children;
      if (Array.isArray(kids)) count += countThreadsInChildren(kids);
    }
  }
  return count;
}

/**
 * Count the number of comment threads in a wiremd AST.
 * Consecutive comments at the same level form a single thread.
 */
export function countCommentThreads(ast: DocumentNode): number {
  return countThreadsInChildren(ast.children);
}

/**
 * Render wiremd AST to HTML
 *
 * @param ast - wiremd AST (DocumentNode)
 * @param options - Render options
 * @returns HTML string
 *
 * @example
 * ```ts
 * import { parse } from 'markdown-mockup/parser';
 * import { renderToHTML } from 'markdown-mockup/renderer';
 *
 * const ast = parse('## Title\n[Button]*');
 * const html = renderToHTML(ast, { style: 'sketch' });
 * ```
 */
export function renderToHTML(
  ast: DocumentNode,
  options: RenderOptions = {}
): string {
  const {
    style = 'sketch',
    inlineStyles = true,
    pretty = true,
    classPrefix = 'wmd-',
    showComments = true,
    cursorSync = false,
  } = options;

  const collectedComments: Array<{ id: number; texts: string[] }> = [];
  const context = {
    style,
    classPrefix,
    inlineStyles,
    pretty,
    showComments,
    _comments: showComments ? collectedComments : undefined,
    _nextCommentId: null as number | null,
    _radioGroupCounter: { value: 0 },
  };

  // Render all children (comment nodes are intercepted and collected)
  const childrenHTML = renderChildrenList(ast.children, context);

  // Append fixed side panel when there are comments
  const panelHTML = showComments && collectedComments.length > 0
    ? renderCommentsPanel(collectedComments, classPrefix)
    : '';
  const bodyClass = showComments && collectedComments.length > 0
    ? `${classPrefix}root ${classPrefix}${style} ${classPrefix}has-comments`
    : `${classPrefix}root ${classPrefix}${style}`;

  // Build complete HTML document
  const css = inlineStyles ? getStyleCSS(style, classPrefix) : '';

  const p = classPrefix;
  const cursorCSS = cursorSync
    ? `[data-cursor-active]{background:rgba(99,102,241,.08)!important;border-radius:4px;}`
    : '';
  const cursorScript = cursorSync
    ? `<script>(function(){` +
      `function activateTab(panel){` +
        `var root=panel.closest('[data-wmd-tabs]');if(!root)return;` +
        `var idx=panel.getAttribute('data-wmd-tab-panel');` +
        `root.querySelectorAll('[data-wmd-tab-panel]').forEach(function(x){x.getAttribute('data-wmd-tab-panel')===idx?x.removeAttribute('hidden'):x.setAttribute('hidden','');});` +
        `root.querySelectorAll('[data-wmd-tab]').forEach(function(b){if(b.getAttribute('data-wmd-tab')===idx){b.classList.add('${p}active');}else{b.classList.remove('${p}active');b.removeAttribute('data-cursor-active');}});` +
      `}` +
      `window.addEventListener('message',function(e){` +
        `if(!e.data)return;` +
        `if(e.data.type==='wiremd-cursor-blur'){document.querySelectorAll('[data-cursor-active]').forEach(function(el){el.removeAttribute('data-cursor-active');});return;}` +
        `if(e.data.type==='wiremd-set-scroll'){window.scrollTo(0,e.data.scrollY);return;}` +
        `if(e.data.type!=='wiremd-cursor')return;` +
        `var line=e.data.line;` +
        `document.querySelectorAll('[data-cursor-active]').forEach(function(el){el.removeAttribute('data-cursor-active');});` +
        `var els=document.querySelectorAll('[data-source-line]');` +
        `var best=null,bestLine=0;` +
        `for(var i=0;i<els.length;i++){var l=parseInt(els[i].getAttribute('data-source-line'),10);if(l<=line&&l>bestLine){bestLine=l;best=els[i];}}` +
        `if(best){` +
          `best.setAttribute('data-cursor-active','');` +
          `var panel=best.closest('[data-wmd-tab-panel]');` +
          `if(panel)activateTab(panel);` +
          `best.scrollIntoView({behavior:'smooth',block:'nearest'});` +
        `}` +
      `});` +
      `var _st;window.addEventListener('scroll',function(){clearTimeout(_st);_st=setTimeout(function(){parent.postMessage({type:'wiremd-scroll',scrollY:window.scrollY},\"*\");},100);},true);` +
      `})();</script>`
    : '';

  const styleBlock = css || cursorCSS
    ? `<style>\n${css}${cursorCSS ? '\n' + cursorCSS : ''}\n  </style>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>wiremd Mockup</title>
  ${styleBlock}
</head>
<body class="${bodyClass}">
  ${childrenHTML}
  ${panelHTML}
  ${cursorScript}
</body>
</html>`;

  return pretty ? html : html.replace(/\n\s*/g, '');
}

/**
 * Render wiremd AST to JSON
 *
 * @param ast - wiremd AST (DocumentNode)
 * @param options - Render options
 * @returns JSON string
 */
export function renderToJSON(
  ast: DocumentNode,
  options: RenderOptions = {}
): string {
  const { pretty = true } = options;

  return JSON.stringify(ast, null, pretty ? 2 : 0);
}

/**
 * Render wiremd AST to React/JSX components
 *
 * @param ast - wiremd AST (DocumentNode)
 * @param options - Render options
 * @returns React component as JSX string
 *
 * @example
 * ```ts
 * import { parse } from '@eclectic-ai/wiremd/parser';
 * import { renderToReact } from '@eclectic-ai/wiremd/renderer';
 *
 * const ast = parse('## Title\n[Button]{.primary}');
 * const jsx = renderToReact(ast, { typescript: true });
 * ```
 */
export function renderToReact(
  ast: DocumentNode,
  options: RenderOptions & { typescript?: boolean; componentName?: string } = {}
): string {
  const {
    classPrefix = 'wmd-',
    typescript = true,
    componentName = 'WiremdComponent',
    showComments: _showComments = true, // accepted for API consistency; comment nodes are silent no-ops in JSX
  } = options;

  const context: ReactRenderer.ReactRenderContext = {
    classPrefix,
    typescript,
    useClassName: true,
    componentName,
    _radioGroupCounter: { value: 0 },
  };

  // Render all children
  const childrenJSX = ReactRenderer.renderChildrenList(ast.children, context, 1);

  // Build React component
  const typeAnnotation = typescript ? ': React.FC' : '';
  const importStatement = typescript
    ? "import React from 'react';\n\n"
    : "import React from 'react';\n\n";

  const component = `${importStatement}export const ${componentName}${typeAnnotation} = () => {
  return (
    <div className="${classPrefix}root">
${childrenJSX}
    </div>
  );
};`;

  return component;
}

/**
 * Render wiremd AST to HTML with Tailwind CSS classes
 *
 * @param ast - wiremd AST (DocumentNode)
 * @param options - Render options
 * @returns HTML string with Tailwind classes
 *
 * @example
 * ```ts
 * import { parse } from '@eclectic-ai/wiremd/parser';
 * import { renderToTailwind } from '@eclectic-ai/wiremd/renderer';
 *
 * const ast = parse('## Title\n[Button]{.primary}');
 * const html = renderToTailwind(ast);
 * ```
 */
export function renderToTailwind(
  ast: DocumentNode,
  options: RenderOptions = {}
): string {
  const {
    pretty = true,
    showComments: _showComments = true, // accepted for API consistency; comment nodes are silent no-ops in Tailwind output
  } = options;

  const context: TailwindRenderer.TailwindRenderContext = {
    pretty,
    _radioGroupCounter: { value: 0 },
  };

  // Render all children
  const childrenHTML = TailwindRenderer.renderChildrenList(ast.children, context);

  // Build complete HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>wiremd Mockup - Tailwind</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-6">
  ${childrenHTML}
</body>
</html>`;

  return pretty ? html : html.replace(/\n\s*/g, '');
}

/**
 * Render wiremd AST based on format option
 *
 * @param ast - wiremd AST (DocumentNode)
 * @param options - Render options
 * @returns Rendered output (HTML, JSON, React, or Tailwind string)
 */
export function render(ast: DocumentNode, options: RenderOptions = {}): string {
  const { format = 'html' } = options;

  if (format === 'json') {
    return renderToJSON(ast, options);
  }

  if (format === 'react') {
    return renderToReact(ast, options);
  }

  if (format === 'tailwind') {
    return renderToTailwind(ast, options);
  }

  return renderToHTML(ast, options);
}
