# wiremd

> Mermaid for wireframes — describe a screen, get a wireframe. Saved as `textfile.md`.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green)](https://nodejs.org/)

wiremd converts Markdown with extended wireframing syntax into visual mockups. Describe a screen in plain English — Claude writes and renders it. Or write the Markdown directly. 10× cheaper and faster than AI image-based design tools. Every wireframe is a `.md` file: version-controlled, diff-able, readable by any LLM.

## Why wiremd?

- **10× cheaper than Claude Design** — text in, wireframe out, no image generation
- **Plain text** — `.md` files live in Git, diff cleanly, and open in any editor
- **LLM-native** — Claude reads the spec directly, no screenshots or translation layer
- **Share anywhere** — embed in Notion, link in Jira, paste in Slack
- **7 visual styles** — sketch, clean, wireframe, material, tailwind, brutal
- **Portable** — VS Code extension, CLI, web editor, or programmatic API

## Quick Example

### Contact Form

Create a `contact.md` file:

```markdown
## Contact Form

Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Message
[_____________________________]{rows:5}

[Submit]* [Cancel]
```

Generate a wireframe:

```bash
wiremd contact.md --style sketch
```

This renders into a styled HTML wireframe with a form, inputs, and buttons.

![wiremd web editor screenshot](https://teezeit.github.io/wiremd/assets/guides/guide-screenshot-webeditor.png)

### Columns Layout

Create a `features.md` file:

```markdown
::: columns-3 card
::: column
### :rocket: Fast
Lightning quick performance

:::
::: column
### :shield: Secure
Bank-level security

:::
::: column
### :gear: Flexible
Fully customizable

:::
:::
```

Generate a wireframe:

```bash
wiremd features.md --style sketch
```

This creates a responsive 3-column layout with icons and descriptions.

## Features

- ✅ **Markdown-first** - Valid markdown that degrades gracefully
- ✅ **Full markdown support** - Headings, text formatting, lists, links, images, blockquotes, code blocks, tables
- ✅ **Columns layouts** - Responsive multi-column layouts (2, 3, 4, 5 columns) with explicit `::: columns-N` / `::: column` syntax
- ✅ **Visual syntax** - Looks like what it renders
- ✅ **Fast to write** - Intuitive shortcuts for common patterns
- ✅ **Extensible** - Add classes and attributes as needed
- ✅ **Multiple outputs** - HTML, JSON, React (JSX/TSX), Tailwind CSS, Figma (via plugin)
- ✅ **7 visual styles** - sketch (Balsamiq-inspired), clean, wireframe, tailwind, material, brutal, none
- ✅ **Full CLI tool** - Watch mode, live-reload dev server, style switching
- ✅ **Rich examples** - Showcase files demonstrating all styles
- ✅ **Framework renderers** - React, Tailwind CSS classes (Vue, Svelte coming soon)
- ✅ **VS Code extension** - Live preview with real-time updates and style switching

## Project Structure

wiremd is a pnpm + Turborepo monorepo. The published `wiremd` npm package lives in `packages/core/`; everything else (frontend apps, VS Code extension, Figma plugin, Claude skill) consumes it via `"wiremd": "workspace:*"`.

```
wiremd/
├── packages/
│   └── core/                 # published "wiremd" npm package — parser, renderers, CLI
├── apps/
│   ├── docs/                 # VitePress documentation site         :5173
│   ├── editor/               # web editor (Vite + Monaco)            :5174
│   └── landing/              # marketing site (Vite + Vue)           :5175
├── extensions/
│   ├── vscode/               # VS Code live-preview extension
│   ├── figma/                # imports wiremd JSON into Figma
│   └── skills/wireframe/     # Claude skill (plugin marketplace)
├── scripts/                  # build-bundle, sync-versions, package-skill
├── pnpm-workspace.yaml
└── turbo.json
```

```mermaid
graph LR
  core["<b>packages/core</b><br/>library + CLI<br/>publishes <code>wiremd</code> on npm"]

  subgraph apps["apps/"]
    landing["landing :5175"]
    docs["docs :5173"]
    editor["editor :5174"]
  end

  subgraph consumers["extensions/"]
    vscode["vscode/"]
    figma["figma/"]
    skill["skills/wireframe/"]
  end

  core --> apps
  core --> consumers
```

### Inside the core pipeline

`packages/core` turns Markdown into HTML / React / Tailwind / JSON. Parse and render are decoupled by the `WiremdNode` AST in the middle.

```mermaid
graph LR
  md["<b>Markdown</b><br/>(.md + wiremd syntax)"]

  subgraph parser["packages/core/src/parser/"]
    direction TB
    remark["remark + wiremd plugins<br/><small>remark-containers,<br/>remark-inline-containers</small>"]
    mdast["MDAST"]
    transformer["transformer.ts<br/><small>walks MDAST</small>"]
    remark --> mdast --> transformer
  end

  ast["<b>WiremdNode tree</b><br/><small>discriminated union,<br/>~44 node types</small>"]

  subgraph render["packages/core/src/{renderer,nodes}/"]
    direction TB
    dispatcher["renderer/&lt;target&gt;-renderer.ts<br/><small>dispatcher (registry-first)</small>"]
    registry[("nodes/_registry.ts<br/><small>~30 NodeDefinition entries</small>")]
    module["nodes/&lt;type&gt;/<br/>html.ts · react.ts · tailwind.ts<br/><small>self-contained per node type</small>"]
    dispatcher -->|"lookup node.type"| registry
    registry -->|"def.render.{html,react,tailwind}"| module
  end

  styles["renderer/styles/&lt;theme&gt;.ts<br/><small>7 themes + _structural.ts</small>"]

  out_html["HTML"]
  out_react["React / JSX"]
  out_tw["Tailwind HTML"]
  out_json["JSON"]

  md --> parser
  parser --> ast
  ast --> dispatcher
  module --> out_html
  module --> out_react
  module --> out_tw
  ast --> out_json
  styles -. "prepended for HTML output" .-> out_html
```

**Adding a new component** = drop one folder, register it once:

```
src/nodes/<your-type>/
  index.ts        # exports NodeDefinition<'<your-type>'>
  html.ts         # (node, ctx) => string
  react.ts        # optional — falls through to "Unknown node" comment if absent
  tailwind.ts     # optional
```

Then add one line to `nodes/_registry.ts`. The dispatcher looks up `node.type` in the registry; recursion through children is handled by calling back into `renderNode(child, ctx)` from inside your render function.

```bash
pnpm install           # install all workspaces in one shot
pnpm turbo run dev     # start all three frontend apps concurrently
pnpm turbo run build   # build everything (core first, then apps/extensions)
pnpm turbo run test    # run the full test suite
```

Run a single workspace: `pnpm --filter wiremd run build` (the core library) or `pnpm --filter wiremd-editor run dev` (the editor app).

## Installation

### npm
```bash
npm install -g wiremd
```

### yarn
```bash
yarn global add wiremd
```

### pnpm
```bash
pnpm add -g wiremd
```

### Homebrew (macOS)
```bash
brew install teezeit/wiremd/wiremd
```

### From Source
```bash
git clone https://github.com/teezeit/wiremd.git
cd wiremd
pnpm install
pnpm turbo run build
pnpm --filter wiremd exec npm link    # exposes the `wiremd` CLI globally
```

## Use with Claude

Install the wireframe plugin once — works on Claude Code, Claude Desktop, and claude.ai:

```text
/plugin marketplace add teezeit/wiremd
/plugin install wireframe@wiremd
```

Then just ask: *"Wireframe a login screen with email, password, and a forgot password link."*

Three modes depending on your setup:

| Mode | What you see | Skill |
|------|--------------|-------|
| **Only Claude** | HTML artifact in Claude's panel | `/wireframe:display` |
| **Claude + Editor** | Live browser tab — both sides read/write the `.md` | `/wireframe:editor` |
| **Only Editor** | Paste Claude's output into the web editor | — |

**Claude Desktop (zip upload):** Download [wireframe-skill.zip](https://github.com/teezeit/wiremd/releases/latest/download/wireframe-skill.zip) → Settings → Capabilities → Skills → Upload skill.

**VS Code:** Install the **[Wiremd extension](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview)** from the VS Code Marketplace — live preview as you type, no Claude required.

Full guide: [teezeit.github.io/wiremd/guide/claude](https://teezeit.github.io/wiremd/guide/claude)

## CLI Usage

```bash
# Generate HTML with default sketch style
wiremd wireframe.md

# Output to specific file
wiremd wireframe.md -o output.html

# Use alternative styles
wiremd wireframe.md --style clean      # Modern minimal
wiremd wireframe.md --style wireframe  # Traditional grayscale
wiremd wireframe.md --style tailwind   # Utility-first with purple accents
wiremd wireframe.md --style material   # Google Material Design
wiremd wireframe.md --style brutal     # Neo-brutalism style
wiremd wireframe.md --style none       # Unstyled semantic HTML

# Watch mode with live-reload dev server
wiremd wireframe.md --watch --serve 3000

# Generate different output formats
wiremd wireframe.md --format json      # JSON AST output
wiremd wireframe.md --format react     # React/JSX component
wiremd wireframe.md --format tailwind  # HTML with Tailwind CSS classes
```

## Exporting to Figma

wiremd designs can be imported into Figma as fully editable, native Figma designs using the **wiremd Figma Plugin**.

### Quick Start

1. **Generate JSON from your wiremd file:**
   ```bash
   wiremd your-mockup.md --format json -o mockup.json
   ```

2. **Install the Figma Plugin:**
   - Open Figma → Plugins → Browse plugins
   - Search for "wiremd Importer"
   - Click Install

3. **Import to Figma:**
   - Open the wiremd Importer plugin
   - Paste your JSON
   - Choose a visual theme (Sketch, Clean, Wireframe, or Minimal)
   - Click "Import to Figma"

Your wiremd design will appear as a new Figma page with:
- Native Figma frames and text nodes
- Auto-layout for responsive designs
- Fully editable components
- Professional styling based on your chosen theme

### Visual Themes

- **Sketch** - Balsamiq-style hand-drawn look (perfect for brainstorming)
- **Clean** - Modern, polished design (great for presentations)
- **Wireframe** - Traditional grayscale (ideal for specifications)
- **Minimal** - Bare-bones styling (customize yourself)

### What Gets Imported

✅ All layout components (containers, grids, navigation)
✅ Form elements (buttons, inputs, selects, checkboxes, radios)
✅ Content (headings, paragraphs, lists, tables, code blocks)
✅ Proper spacing, padding, and auto-layout constraints
✅ Theme-specific styling (colors, fonts, shadows)

See [extensions/figma/README.md](./extensions/figma/README.md) for complete documentation.

## Using in Obsidian

wiremd has a native **Obsidian plugin** that brings live wireframe previews directly into your notes.

### Features

- **Live Preview**: Automatically render wiremd code blocks as interactive previews in Obsidian
- **7 Visual Styles**: Switch between sketch, clean, wireframe, tailwind, material, brutal, or none
- **Quick Style Switching**: Click the style badge to instantly change preview styles
- **Export Functionality**: Export wiremd previews as standalone HTML files
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **Command Palette Integration**: Access all features via Obsidian commands

### Installation

1. **Clone the plugin** into your Obsidian vault's plugins folder:
   ```bash
   cd /path/to/your/vault/.obsidian/plugins/
   git clone https://github.com/teezeit/wiremd-obsidian.git wiremd-preview
   cd wiremd-preview
   npm install
   npm run build
   ```

2. **Enable the plugin** in Obsidian:
   - Open Settings → Community Plugins
   - Turn off "Safe mode" if needed
   - Click "Reload" to refresh the plugins list
   - Find "Wiremd Preview" and toggle it on

3. **Create wiremd blocks** in your notes:
   ````markdown
   ```wiremd
   ## Login Form

   Username
   [____________________________]

   Password
   [****************************]

   [Sign In]{.primary} [Cancel]
   ```
   ````

The plugin will automatically render a live preview with your chosen style!

### Available Commands

- **Set style** - Change the rendering style (7 commands for each style)
- **Toggle auto-preview** - Enable/disable automatic rendering
- **Refresh previews** - Manually refresh all wiremd previews
- **Export as HTML** - Export current wiremd block as standalone HTML
- **Export all styles** - Export in all 7 styles at once
- **Copy to clipboard** - Copy rendered HTML to clipboard

See the [wiremd-obsidian repository](https://github.com/teezeit/wiremd-obsidian) for complete documentation.

## Programmatic API

```typescript
import { parse, renderToHTML, renderToJSON, renderToReact, renderToTailwind } from '@eclectic-ai/wiremd';

// Parse markdown to AST
const ast = parse(`
  ## Contact Form

  ![Logo](logo.png)

  Name
  [_____________________________]
  [Submit]{.primary}
`);

// Render to HTML with visual style
const html = renderToHTML(ast, { style: 'sketch' });

// Render to JSON
const json = renderToJSON(ast, { pretty: true });

// Render to React component (TypeScript)
const reactComponent = renderToReact(ast, {
  typescript: true,
  componentName: 'ContactForm'
});

// Render to HTML with Tailwind CSS classes
const tailwindHTML = renderToTailwind(ast, { pretty: true });
```

## Documentation

**Not sure where to start?** → [Getting Started](./apps/docs/guide/getting-started.md)

### 📖 Learning & Reference

| Document | Description | Best For |
|----------|-------------|----------|
| **[Syntax Showcase](./apps/docs/examples/demo-blocks.md)** | Comprehensive interactive guide with live examples | Learning by example, copying patterns |
| **[Syntax Guide](./apps/docs/guide/overview.md)** | User-friendly tutorial with best practices | Structured learning |
| **[FAQ](./apps/docs/reference/faq.md)** | Common questions and troubleshooting | Solving problems, known issues |

📖 **[📚 View Full Documentation →](https://teezeit.github.io/wiremd)** - Complete documentation site with interactive examples

### 🚀 Getting Started

| Document | Description |
|----------|-------------|
| **[🌐 Live Documentation Site](https://teezeit.github.io/wiremd)** | Full docs with interactive examples |
| **[🚀 Getting Started](https://teezeit.github.io/wiremd/guide/getting-started)** | Installation and first steps |
| **[📝 Syntax Reference](https://teezeit.github.io/wiremd/reference/syntax)** | Complete syntax guide |
| **[🎮 Interactive Editor](https://teezeit.github.io/wiremd/editor)** | Try wiremd in your browser |
| **[⚙️ API Documentation](https://teezeit.github.io/wiremd/api/)** | Programmatic API reference |
| **[🔌 Framework Integrations](https://teezeit.github.io/wiremd/guide/integrations)** | Next.js, React, Vite, Express |
| **[🔧 Troubleshooting](https://teezeit.github.io/wiremd/guide/troubleshooting)** | Common issues and solutions |
| **[🎨 Live Showcases](https://teezeit.github.io/wiremd/showcases/)** | Examples in all 7 styles |
| **[📂 Example Files](./apps/docs/examples/)** | Local wiremd files to explore |

### 🔧 Technical Documentation

| Document | Description |
|----------|-------------|
| **[API Documentation (Local)](./apps/docs/api/index.md)** | Local API reference |
| **[Project Plan](./.github/dev-docs/markdown-mockup-project-plan.md)** | Development roadmap |
| **[CLAUDE.md](./CLAUDE.md)** | Repo overview for AI assistants — monorepo layout, commands, architecture |

### 🤝 Contributing

| Document | Description |
|----------|-------------|
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Contribution guidelines |
| **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** | Community guidelines |
| **[SECURITY.md](./SECURITY.md)** | Security policy |

## Development Status

### ✅ Completed (Phase 1-2)
- [x] Research existing solutions
- [x] Create test corpus with 20 UI patterns
- [x] Lock v0.1 syntax specification
- [x] Complete TypeScript implementation
- [x] Parser with full syntax support
- [x] AST transformer with 40+ node types
- [x] HTML renderer with 7 visual styles
- [x] JSON output
- [x] 641+ passing tests
- [x] Full-featured CLI tool with watch mode and live-reload
- [x] Rich example showcase demonstrating all styles
- [x] React component renderer (JSX/TSX output)
- [x] Tailwind CSS class renderer

### 🚧 In Progress (Phase 3)
- [x] Documentation site ✅ **[Live Now!](https://teezeit.github.io/wiremd)**
- npm package publishing

### 📋 Coming Soon (Phase 4+)
- Framework-specific renderers (Vue, Svelte)
- Interactive web playground with live editor

See [Project Plan](./.github/dev-docs/markdown-mockup-project-plan.md) for full roadmap.

## Contributing

Contributions are welcome! Phase 1-2 are complete with a working parser, renderer, and CLI. Feel free to:

- Report bugs or request features via [GitHub Issues](https://github.com/teezeit/wiremd/issues)
- Submit pull requests for improvements
- Add new visual styles or examples
- Improve documentation

Please check the [Project Plan](./.github/dev-docs/markdown-mockup-project-plan.md) for upcoming features.

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/teezeit/wiremd.git
cd wiremd

# Install dependencies (pnpm is enforced — `preinstall` blocks npm/yarn)
pnpm install

# Run all tests
pnpm turbo run test

# Build everything
pnpm turbo run build

# Type check
pnpm turbo run typecheck

# Iterate on the core library only
pnpm --filter wiremd run test:watch
```

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full feature checklist, plugin maintenance, and release process.

## License

MIT License - See [LICENSE](./LICENSE) for details.

## Community & Support

- **Issues & Bugs** - [GitHub Issues](https://github.com/teezeit/wiremd/issues)
- **Discussions** - [GitHub Discussions](https://github.com/teezeit/wiremd/discussions)
- **Security** - See [SECURITY.md](./SECURITY.md)
- **Changelog** - [CHANGELOG.md](./CHANGELOG.md)

## Credits

Created by [teezeit](https://github.com/teezeit)

Inspired by:
- [Balsamiq](https://balsamiq.com) - Pioneering rapid wireframing
- [Mermaid](https://mermaid.js.org) - Markdown-inspired diagramming
- [PlantUML Salt](https://plantuml.com/salt) - Text-based GUI mockups
- [Markdown-UI](https://github.com/jjuliano/markdown-ui) - Markdown to UI components

---

**Status:** Phase 1-2 Complete (Core + CLI) | **Version:** 0.1.5 | **Node:** ≥18.0.0

Made with ❤️ for designers and developers who love plain text
