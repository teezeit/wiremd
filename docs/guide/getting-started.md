# Getting Started with wiremd

This guide will help you get started with wiremd, a text-first UI design tool for creating wireframes using Markdown syntax.

## Choose your path

| Path | Best for | What you need |
|------|----------|---------------|
| [VS Code extension](./vscode.md) | Designers, PMs, anyone who prefers a GUI | VS Code |
| [Using with Claude](./claude.md) | Describe screens in plain English | Claude Code or claude.ai |
| CLI (this page) | Developers, scripting, build pipelines | Node.js 18+ |

---

## Installation

Install wiremd using your preferred package manager:

```bash
# npm
npm install wiremd

# yarn
yarn add wiremd

# pnpm
pnpm add wiremd
```

For global CLI access:

```bash
npm install -g wiremd
```

## Your First Wireframe

Create a new file called `my-wireframe.md`:

```markdown
## Login Form

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

[Login]{.primary} [Forgot Password?]{.link}
```

### Render to HTML

Using the CLI:

```bash
wiremd my-wireframe.md -o login.html
```

Using the API:

```typescript
import { parse, renderToHTML } from 'wiremd';
import { readFileSync, writeFileSync } from 'fs';

const markdown = readFileSync('my-wireframe.md', 'utf-8');
const ast = parse(markdown);
const html = renderToHTML(ast);
writeFileSync('login.html', html);
```

## Basic Concepts

wiremd components — forms, inputs, buttons, layout containers, navigation bars, and more — are expressed with a small set of Markdown extensions: brackets create inputs and buttons (`[...]`), curly-brace attributes set properties (`{type:email}`), classes apply styles (`{.primary}`), and triple-colon fences group elements into containers (`:::`). See the [syntax reference](../reference/syntax.md) for the full picture.

## Visual Styles

wiremd ships with 7 visual styles: `sketch`, `clean`, `wireframe`, `material`, `tailwind`, `brutal`, and `none`. Pass `--style <name>` to pick one (default is `sketch`). See the [styles reference](../reference/styles.md) for descriptions and examples.

```bash
wiremd my-wireframe.md --style clean
```

## Watch Mode

For rapid iteration, use watch mode with live-reload:

```bash
wiremd my-wireframe.md --watch --serve 3000
```

Open http://localhost:3000 in your browser. Changes to your markdown file will automatically reload.

## Next Steps

- [Learn the complete syntax](../reference/syntax.md)
- [Explore examples](../examples/)
- [Read API documentation](../api/)
- [Quick reference card](../reference/quick-reference.md)
