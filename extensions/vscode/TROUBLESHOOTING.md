# Troubleshooting

Common problems when developing or running the wiremd VS Code extension. All commands run from the monorepo root unless noted.

## "Command 'wiremd.openPreviewToSide' not found"

The extension didn't activate. In the **Extension Development Host** window:

1. Open the Output panel (`View → Output`) and select **Extension Host**. Look for `Wiremd extension activated` and any errors above it.
2. Reload the window: `Cmd+Shift+P` → **Developer: Reload Window**.
3. Confirm the bundle exists:
   ```bash
   ls extensions/vscode/dist/extension.js
   ls extensions/vscode/dist/preview-provider.js
   ```
4. If missing, rebuild:
   ```bash
   pnpm --filter wiremd-preview run bundle
   ```

## "Cannot find module 'wiremd'"

The extension's workspace dependency on `wiremd` (the core library) wasn't resolved. Re-run install from the repo root — `wiremd: workspace:*` is set up so pnpm wires `extensions/vscode/node_modules/wiremd` to `packages/core/`:

```bash
pnpm install
ls -la extensions/vscode/node_modules/wiremd  # should be a symlink → ../../../packages/core
```

If the core hasn't been built yet:

```bash
pnpm --filter wiremd run build
ls packages/core/dist/index.cjs               # should exist
```

## Preview opens but is blank or shows an error

- **Open WebView DevTools**: `Cmd+Shift+P` → **Developer: Open Webview Developer Tools** while the preview panel is focused. Check the JS console.
- **Confirm the markdown parses**: run the CLI on the same file: `pnpm --filter wiremd exec wiremd <file>.md -o /tmp/out.html`. If the CLI fails, the bug is in the parser, not the extension.
- **Check `wiremd.showErrorOverlay`**: with the overlay enabled, parser errors render as a banner inside the preview.

## Preview doesn't update on save

- **`wiremd.autoRefresh`** must be `true` (default).
- **`wiremd.refreshDelay`** is the debounce in ms (default 300). High values can feel like "nothing happens".
- The provider listens to `onDidChangeTextDocument`, not `onDidSaveTextDocument` — typing should trigger an update. If it doesn't, check the Extension Host log for thrown errors that broke the listener.

## TypeScript / build errors after pulling main

The core library and extension share types. If `tsc` complains:

```bash
# Rebuild core types first, then the extension
pnpm --filter wiremd run build
pnpm --filter wiremd-preview run bundle
```

## Bundle script fails copying `apps/docs/...` or `extensions/skills/`

The `bundle` script (in `extensions/vscode/package.json`) copies in the component reference and Claude skill so the WebView can serve them. Make sure those folders exist:

```bash
ls apps/docs/components apps/docs/examples apps/docs/reference
ls extensions/skills/wireframe
```

If you've checked out a partial worktree, run `pnpm install` to restore everything.

## Watcher doesn't rebundle after core changes

The extension watcher (`extensions/vscode/scripts/watch.mjs`) tails `packages/core/dist/index.cjs`. It only fires after vite rebuilds the core, so make sure both watchers are running:

```bash
# Terminal 1
pnpm --filter wiremd run dev

# Terminal 2
cd extensions/vscode && pnpm run dev
```

After it logs `done — reload VS Code window to pick up changes`, run **Developer: Reload Window**.

## Style change doesn't take effect

The selected style is persisted in `vscode.setState`. If switching the dropdown does nothing:

1. Open WebView DevTools and check for `postMessage` errors.
2. Run `Cmd+Shift+P` → **Wiremd: Change Preview Style** as a sanity check.
3. Force a re-render with **Wiremd: Refresh Preview**.

## Diagnostic info to include in a bug report

```bash
node -v
pnpm -v
code --version

# Tip of the lockfile + commit
git rev-parse HEAD
sha256sum pnpm-lock.yaml | head
```

Plus the **Extension Host** output and any errors from the WebView DevTools console.
