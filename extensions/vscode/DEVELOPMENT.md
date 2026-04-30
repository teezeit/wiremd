# Wiremd VS Code Extension — Development Guide

The extension lives at `extensions/vscode/` inside the wiremd monorepo. It is a thin WebView wrapper around the `wiremd` core library; the preview pipeline is the same `parse() → renderToHTML()` flow used by the CLI.

## Architecture

### Key components

1. **Extension entry point** — `src/extension.ts`
   - Activates the extension on any markdown file
   - Registers commands (open preview, change style, change viewport, install Claude skill, …)
   - Wires up the status-bar item

2. **Preview provider** — `src/preview-provider.ts`
   - Owns the WebView panel
   - Handles file-change debouncing, style/viewport state, comment-toggle state
   - Renders wiremd content and posts errors back to the WebView

3. **WebView content**
   - HTML/CSS/JS injected into the panel
   - Communicates with the extension via `postMessage`
   - Handles user interactions (style/viewport switching, comments toggle, component-docs panel)

## Development setup

### Prerequisites

- Node.js 18+
- pnpm 9+ (`npm install -g pnpm` or `corepack enable`)
- VS Code 1.75+

### Install (from monorepo root)

```bash
pnpm install
```

This wires `wiremd: workspace:*` in `extensions/vscode/package.json` to `packages/core/` automatically — no manual symlink needed.

### Development workflow

1. **Uninstall any released Wiremd extension** from your VS Code Extensions sidebar to avoid conflicts with the dev build.

2. **Launch VS Code with the dev extension loaded** (run from the monorepo root):

   ```bash
   code --extensionDevelopmentPath=$(pwd)/extensions/vscode .
   ```

   This loads the dev build into your current window — no second window needed.

3. **Start both watchers in two terminals**:

   ```bash
   # Terminal 1 — core: rebuilds packages/core/dist/ on src/ changes
   pnpm --filter wiremd run dev

   # Terminal 2 — extension: rebundles whenever core/dist changes
   cd extensions/vscode && pnpm run dev
   ```

   The extension watcher (`extensions/vscode/scripts/watch.mjs`) tails `../../packages/core/dist/index.cjs` and triggers `pnpm bundle` only after vite finishes — no race condition.

4. **Reload the window**: `Cmd+Shift+P` → **Developer: Reload Window**.

### Building

```bash
# Bundle once (the same script vsce uses)
pnpm --filter wiremd-preview run bundle

# Package as a .vsix in extensions/vscode/
pnpm --filter wiremd-preview run package
```

The `bundle` script copies `apps/docs/components`, `apps/docs/examples`, `apps/docs/reference`, and `extensions/skills/` into `extensions/vscode/docs/` and `extensions/vscode/skills/` so the WebView can serve them, then esbuilds `src/extension.ts` and `src/preview-provider.ts` to `dist/`.

### Install the local build

```bash
code --install-extension extensions/vscode/wiremd-preview-<version>.vsix
```

## Architecture details

### Message passing

Extension → WebView:

```typescript
panel.webview.postMessage({
  type: 'error',
  message: 'Error message here'
});
```

WebView → Extension:

```typescript
vscode.postMessage({
  type: 'changeStyle',
  style: 'clean'
});
```

### State management

The WebView persists state across reloads:

```typescript
vscode.setState({ style: 'clean', viewport: 'mobile' });
const state = vscode.getState();
```

### Rendering pipeline

1. User edits a markdown file
2. `onDidChangeTextDocument` fires
3. Debounce timer waits for more changes
4. `refresh()` runs
5. Markdown is parsed via the `wiremd` library import
6. HTML is generated and injected into the WebView
7. WebView updates the preview

## Code structure

```
extensions/vscode/
├── src/
│   ├── extension.ts          # Main entry point
│   └── preview-provider.ts   # Preview logic + WebView
├── scripts/
│   └── watch.mjs             # Watches packages/core/dist for rebuilds
├── dist/                     # Bundled output (gitignored)
├── docs/                     # Copied from apps/docs at bundle time (gitignored)
├── skills/                   # Copied from extensions/skills at bundle time (gitignored)
├── package.json              # Extension manifest
├── tsconfig.json
├── vite.config.ts
└── turbo.json                # Package-scoped turbo config
```

## Extension manifest

Key fields in `package.json`:

- **`name`**: `wiremd-preview` (workspace name)
- **`publisher`**: `eclectic-ai` (Marketplace publisher)
- **`activationEvents`**: `onLanguage:markdown`
- **`contributes`**: commands, menus, keybindings, configuration
- **`main`**: `./dist/extension.js` (built by `bundle`)
- **`engines.vscode`**: `^1.75.0`

## WebView security

The WebView uses Content Security Policy to prevent XSS:

```typescript
webview.options = {
  enableScripts: true,
  localResourceRoots: [context.extensionUri]
};
```

## Performance considerations

1. **Debouncing** — updates are debounced (default 300 ms, configurable via `wiremd.refreshDelay`)
2. **Lazy rendering** — only re-render when the WebView is visible
3. **Resource disposal** — clean up listeners and timers when the panel closes

## Common issues

### WebView not updating
- Check `wiremd.autoRefresh` (default `true`)
- Check `wiremd.refreshDelay` (default 300 ms)
- Open WebView DevTools (`Cmd+Shift+P` → **Developer: Open Webview Developer Tools**) and look for JS errors

### Styles not loading
- Confirm `pnpm install` succeeded at the repo root (`extensions/vscode/node_modules/wiremd` should be a symlink to `packages/core`)
- Confirm the core was built: `pnpm --filter wiremd run build`
- Re-run the bundler: `pnpm --filter wiremd-preview run bundle`

### Extension not activating
- Check the activation events in `package.json`
- Verify the file is markdown (`editorLangId === 'markdown'`)
- Check the Extension Host log: **View → Output → Extension Host**

## Publishing

The `release.yml` workflow runs on tag push and creates the GitHub release; `publish.yml` runs on `release: published` and:

1. Runs `pnpm install --frozen-lockfile`
2. Runs `pnpm turbo run build`
3. Runs `pnpm --filter wiremd-preview run bundle`
4. Runs `pnpm --filter wiremd-preview run publish` (uses `VSCE_PAT` secret)
5. Attaches `wireframe-skill.zip` to the release

To cut an extension-only release without bumping the npm package:

```bash
cd extensions/vscode && npm version patch
git push && git push --tags
```

Then create a GitHub release for that tag manually — `publish.yml` fires and publishes the new `.vsix` to the Marketplace.

For a coordinated multi-artifact release (npm + extension + skill + CLI bundle), follow the full Release Process in [`CONTRIBUTING.md`](../../CONTRIBUTING.md#release-process).

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [WebView API guide](https://code.visualstudio.com/api/extension-guides/webview)
- [Publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension samples](https://github.com/microsoft/vscode-extension-samples)
