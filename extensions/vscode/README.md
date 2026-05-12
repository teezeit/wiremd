<p align="center">
  <img src="./icon.png" alt="Wiremd" width="80" />
</p>

# Wiremd Live Preview

> Live wireframe preview for `.md` files — see your mockup update as you type, directly in VS Code. Part of [wiremd](https://tobiashoelzer.com/wiremd/).

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/eclectic-ai.wiremd-preview)](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/eclectic-ai.wiremd-preview)](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![VS Code extension showing wiremd preview alongside markdown](https://teezeit.github.io/wiremd/assets/guides/guide-screenshot-vscode.png)

wiremd converts Markdown with extended wireframing syntax into visual HTML mockups. This extension adds a live preview panel that updates as you type — no CLI, no browser tab, no extra setup.

## Installation

Search for **Wiremd** in the VS Code Extensions sidebar, or:

```bash
code --install-extension eclectic-ai.wiremd-preview
```

> [!NOTE]
> The extension bundles its own copy of the wiremd core library — no `npm install` or project setup needed. Open any `.md` file and it works.

## Usage

Open a `.md` file and launch the preview with any of:

- `Cmd+K V` / `Ctrl+K V` — open preview to the side
- Command Palette → **Wiremd: Open Preview to the Side**
- Click the preview icon in the editor title bar

The preview updates live as you edit. Switch styles and viewport sizes from the toolbar inside the preview panel.

## Claude skill

On first preview open, the extension prompts you to install the wiremd Claude skill into your workspace (`.claude/skills/wireframe/`). This lets Claude Code generate and edit wireframes for you directly from chat.

You can also install or update it manually via Command Palette → **Install Wiremd Claude Skill**.

## Component reference

Command Palette → **Open Quick Reference** opens the full wiremd component docs as a panel inside VS Code — buttons, inputs, tables, layouts, and more, all rendered with live examples. No browser needed.

## Styles

Seven built-in visual themes, switchable from the preview toolbar:

| Style | Description |
|-------|-------------|
| `sketch` | Balsamiq-inspired hand-drawn look (default) |
| `clean` | Modern minimal |
| `wireframe` | Traditional grayscale |
| `material` | Google Material Design |
| `tailwind` | Utility-first with purple accents |
| `brutal` | Neo-brutalism |
| `none` | Unstyled semantic HTML |

## Responsive preview

Test at different viewport widths from the toolbar:

| Preset | Width |
|--------|-------|
| Full | panel width |
| Desktop | 1440px |
| Laptop | 1024px |
| Tablet | 768px |
| Mobile | 375px |

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `wiremd.defaultStyle` | `"sketch"` | Default visual style |
| `wiremd.autoRefresh` | `true` | Auto-refresh on file change |
| `wiremd.refreshDelay` | `300` | Debounce delay in ms |
| `wiremd.showErrorOverlay` | `true` | Show error overlay on syntax issues |

## Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Wiremd: Open Preview | — | Open in current column |
| Wiremd: Open Preview to the Side | `Cmd+K V` | Open alongside editor |
| Wiremd: Refresh Preview | — | Force refresh |
| Wiremd: Change Preview Style | — | Switch visual theme |
| Wiremd: Change Preview Viewport | — | Switch viewport size |
| Wiremd: Open Quick Reference | — | Component docs panel |
| Wiremd: Install Claude Skill | — | Install skill into workspace |

## CLI

The extension is the easiest way to preview wiremd files in VS Code, but you can also use the CLI for batch rendering or live-reload in any browser:

```bash
npm install -g @eclectic-ai/wiremd
wiremd my-screen.md --serve 3000 --watch
```

## Related

- [wiremd docs](https://teezeit.github.io/wiremd) — full syntax reference and examples
- [Web editor](https://tobiashoelzer.com/wiremd/editor/) — browser-based editor, no install needed
- [wiremd on npm](https://www.npmjs.com/package/@eclectic-ai/wiremd) — programmatic API and CLI

## Development

The extension lives at `extensions/vscode/` inside the [wiremd monorepo](https://github.com/teezeit/wiremd). See [`DEVELOPMENT.md`](./DEVELOPMENT.md) for the full contributor workflow.

```bash
# From monorepo root
pnpm install
pnpm --filter wiremd run dev          # core watcher
cd extensions/vscode && pnpm run dev  # extension watcher

# Load dev build into VS Code
code --extensionDevelopmentPath=$(pwd)/extensions/vscode .
```
