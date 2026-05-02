# @eclectic-ai/wiremd

> Mermaid for wireframes — describe a screen, get a wireframe.

[![npm](https://img.shields.io/npm/v/@eclectic-ai/wiremd)](https://www.npmjs.com/package/@eclectic-ai/wiremd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green)](https://nodejs.org/)

wiremd converts Markdown with extended wireframing syntax into visual mockups. Every wireframe is a `.md` file: version-controlled, diff-able, readable by any LLM.

## Install

```bash
npm install @eclectic-ai/wiremd
```

CLI (global):

```bash
npm install -g @eclectic-ai/wiremd
wiremd input.md --style sketch --serve 3001 --watch
```

## Programmatic usage

```ts
import { parse, renderToHTML } from '@eclectic-ai/wiremd';

const md = `
## Login

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

[Sign In]* [Forgot password?]
`;

const ast = parse(md);
const html = renderToHTML(ast, { style: 'sketch' });
```

Subpath imports for tree-shaking:

```ts
import { parse } from '@eclectic-ai/wiremd/parser';
import { renderToHTML, renderToReact, renderToTailwind } from '@eclectic-ai/wiremd/renderer';
```

## Output formats

| Function | Output |
|---|---|
| `renderToHTML(ast, { style })` | Standalone HTML with embedded CSS |
| `renderToReact(ast)` | React/TSX component string |
| `renderToTailwind(ast)` | HTML with Tailwind classes |
| `renderToJSON(ast)` | Raw AST as JSON |

## Styles

`sketch` · `clean` · `wireframe` · `material` · `brutal` · `tailwind` · `none`

## Syntax

```markdown
## Screen title

::: columns-3 card
::: column
### Feature A
Description

:::
::: column
### Feature B
Description
:::
:::

Name
[_____________________________]

[Submit]* [Cancel]
```

Full syntax reference: [teezeit.github.io/wiremd](https://teezeit.github.io/wiremd/)

## VS Code extension

Install **Wiremd Live Preview** from the VS Code Marketplace for live preview as you type.

## License

MIT
