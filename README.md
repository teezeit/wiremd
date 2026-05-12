# wiremd

> Mermaid for wireframes — describe a screen, get a wireframe. Every mockup is a plain `.md` file.

[![npm](https://img.shields.io/npm/v/@eclectic-ai/wiremd)](https://www.npmjs.com/package/@eclectic-ai/wiremd)
[![CI](https://github.com/teezeit/wiremd/actions/workflows/ci.yml/badge.svg)](https://github.com/teezeit/wiremd/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VS Code](https://img.shields.io/badge/VS%20Code-Extension-blue)](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview)

wiremd converts Markdown with extended wireframing syntax into visual HTML mockups. Write a screen description, Claude renders it. Or write the Markdown directly. Every wireframe is version-controlled, diff-able, and readable by any LLM — no image generation required.

![wiremd web editor](https://raw.githubusercontent.com/teezeit/wiremd/main/apps/docs/assets/guides/guide-screenshot-webeditor.png)

## Getting started

```bash
npm install -g @eclectic-ai/wiremd   # installs the 'wiremd' CLI
```

```bash
wiremd login.md --style sketch --serve 3000
```

Open `http://localhost:3000` — the preview live-reloads as you edit.

![wiremd CLI serve mode](https://raw.githubusercontent.com/teezeit/wiremd/main/apps/docs/assets/guides/guide-serve-cli.png)

> [!TIP]
> Not sure where to start? The [interactive editor](https://tobiashoelzer.com/wiremd/editor/) runs in the browser — no install needed.

## Syntax

wiremd extends standard Markdown with concise UI primitives. Everything is still valid Markdown.

```markdown
## Login

Email
[email@example.com___]{type:email}

Password
[____________]{type:password}

[Sign in]* [Forgot password?]{ghost}

---

Don't have an account? [Create one]
```

| Syntax | Renders as |
|--------|-----------|
| `[Label]*` | Primary button |
| `[Label]{danger}` | Danger button |
| `[___]` / `[Hint___]` | Text input with optional placeholder |
| `[Options___v]` | Select dropdown |
| `[ ]` / `[x]` | Checkbox |
| `[Label]{switch}` | Toggle switch |
| `((Badge)){success}` | Status badge |
| `:icon-name:` | Tabler icon |
| `::: columns-3` | Multi-column layout |
| `::: accordion` | Collapsible sections |
| `::: tabs` | Tabbed panels |
| `<!-- note -->` | Annotation callout |

Full reference: [teezeit.github.io/wiremd/reference/syntax](https://teezeit.github.io/wiremd/reference/syntax)

## Visual styles

Seven built-in themes — switch with `--style`:

| Style | Description |
|-------|-------------|
| `sketch` | Comic Sans, hand-drawn look (default) |
| `clean` | Modern minimal |
| `wireframe` | Traditional grayscale |
| `material` | Google Material Design |
| `tailwind` | Utility-first with purple accents |
| `brutal` | Neo-brutalism |
| `none` | Unstyled semantic HTML |

## CLI

```bash
# Render a single file
wiremd login.md

# Choose a style and output path
wiremd login.md --style clean -o login.html

# Serve a file with live-reload
wiremd login.md --serve 3000 --watch

# Render every .md file in a directory
wiremd screens/

# Serve an entire directory
wiremd screens/ --serve 3000 --watch

# Output JSON AST
wiremd login.md --format json
```

## Use with Claude

**Claude Code:**
```bash
npx skills add teezeit/wiremd/extensions/skills
```

**Claude Desktop (Cowork):** download [wireframe-skill.zip](https://github.com/teezeit/wiremd/releases/latest/download/wireframe-skill.zip) → Settings → Plugins → + Add → Upload (`.zip`) (recommended), or Settings → Skills → + Add → Upload (`.zip`).

> [!NOTE]
> Rendering requires CLI execution — wiremd works fully in Claude Code and Claude Desktop Cowork. Claude Desktop chat and claude.ai can write wiremd Markdown but cannot render it.

Then ask: *"Wireframe a login screen with email, password, and a forgot password link."*

Three modes depending on your setup:

| Mode | What you see |
|------|-------------|
| **display** | HTML artifact in Claude's panel — works everywhere |
| **editor** | Live browser tab with hot-reload — best for iterating |
| **serve** | Local dev server — any browser, Claude on your machine |

Full guide: [teezeit.github.io/wiremd/guide/claude](https://teezeit.github.io/wiremd/guide/claude)

## VS Code extension

Install **[Wiremd](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview)** from the VS Code Marketplace. Live preview updates as you type, no Claude required.

```bash
code --install-extension eclectic-ai.wiremd-preview
```

## Programmatic API

```typescript
import { parse, renderToHTML, renderToReact, renderToTailwind, renderToJSON } from '@eclectic-ai/wiremd';

const ast = parse(`
## Contact Form

Name [___]
Email [email@example.com___]{type:email}

[Send]*
`);

const html = renderToHTML(ast, { style: 'clean' });
const jsx  = renderToReact(ast, { typescript: true, componentName: 'ContactForm' });
const tw   = renderToTailwind(ast);
const json = renderToJSON(ast, { pretty: true });
```

## Migrating from v0.3 or earlier

If your wiremd files use the old `## {.grid}` / `## {.row}` syntax or `|pill|` notation, run the migration script:

```bash
python3 scripts/migrate-v0.4.py          # all .md files under cwd
python3 scripts/migrate-v0.4.py src/     # specific directory
python3 scripts/migrate-v0.4.py page.md  # single file
```

See [CHANGELOG.md](./CHANGELOG.md) for the full list of breaking changes in v0.4.

## Exporting to Figma

Generate JSON from your wiremd file, then use the **wiremd Figma Plugin** to import it as native, editable Figma frames:

```bash
wiremd your-mockup.md --format json -o mockup.json
```

See [extensions/figma/README.md](./extensions/figma/README.md).

## Project structure

wiremd is a pnpm + Turborepo monorepo. The published `@eclectic-ai/wiremd` npm package lives in `packages/core/`; everything else consumes it via workspace dependencies.

```
wiremd/
├── packages/core/          # published npm package — parser, renderers, CLI
├── apps/
│   ├── docs/               # VitePress documentation site       :5173
│   ├── editor/             # web editor (React + CodeMirror)    :5174
│   └── landing/            # marketing site (Vue)               :5175
├── extensions/
│   ├── vscode/             # VS Code live-preview extension
│   ├── figma/              # imports wiremd JSON into Figma
│   └── skills/wireframe/   # Claude skill
└── scripts/                # build-bundle, sync-versions, package-skill
```

```bash
pnpm install             # install all workspaces
pnpm turbo run dev       # start all dev servers concurrently
pnpm turbo run build     # build everything (core first, then apps)
pnpm turbo run test      # run the full test suite
pnpm turbo run typecheck
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the feature checklist, fixture corpus conventions, and release process.

```bash
git clone https://github.com/teezeit/wiremd.git
cd wiremd
pnpm install
pnpm --filter @eclectic-ai/wiremd run test:watch
```

## Credits

Created by [teezeit](https://github.com/teezeit).  
Inspired by [Mermaid](https://mermaid.js.org), [Balsamiq](https://balsamiq.com), and [PlantUML Salt](https://plantuml.com/salt).
