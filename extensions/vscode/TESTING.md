# VS Code Extension — Testing Guide

Manual testing playbook for the wiremd VS Code extension (`extensions/vscode/`).

## Setup

All commands run from the wiremd monorepo root.

```bash
# 1. Install all workspaces
pnpm install

# 2. Build the core library + bundle the extension
pnpm turbo run build
pnpm --filter wiremd-preview run bundle

# 3. Launch VS Code with the dev extension loaded
code --extensionDevelopmentPath=$(pwd)/extensions/vscode .
```

The `bundle` script copies `apps/docs/components`, `apps/docs/examples`, and `apps/docs/reference` into `extensions/vscode/docs/`, and `extensions/skills/` into `extensions/vscode/skills/`. If the component-docs panel or skill installer behave unexpectedly, re-run `pnpm --filter wiremd-preview run bundle`.

## Test fixture

Create a markdown file in any folder open in the dev VS Code window:

````markdown
# My Wireframe

[[ Logo | Home | About | Contact | [Sign In] ]]

::: hero
> # Welcome to Our App
> The best way to manage your projects
> [Get Started] [Learn More]{.outline}
:::

::: columns-3
::: column Fast
⚡ Lightning quick performance
:::

::: column Secure
🔒 Bank-level security
:::

::: column Simple
✨ Easy to use interface
:::
:::

## Contact Form

Name
[_____________________________]

Email
[_____________________________]{type:email}

Message
[_____________________________]{rows:5}

[Submit]*
````

## Open the preview

- `Cmd+K V` (Mac) / `Ctrl+K V` (Win/Linux), or
- Right-click editor → **Open Wiremd Preview to the Side**, or
- `Cmd+Shift+P` → **Wiremd: Open Preview to the Side**

## Test matrix

### Basic preview
- [ ] Preview opens
- [ ] Content renders in the default `sketch` style
- [ ] Layout looks correct (columns, hero, form)

### Live refresh
- [ ] Editing the markdown updates the preview within `wiremd.refreshDelay` ms
- [ ] Debouncing works — no per-keystroke flicker
- [ ] No lag on a 1000-line file

### Style switching
- [ ] Style dropdown shows all 7 styles (sketch, clean, wireframe, material, tailwind, brutal, none)
- [ ] Each style visibly differs

### Viewport switching
- [ ] Full / Desktop (1440) / Laptop (1024) / Tablet (768) / Mobile (375) all work

### Comments toggle
- [ ] `<!-- comment text -->` renders as a yellow callout when comments are on
- [ ] Toggling off hides callouts but does not modify the source file
- [ ] Comment count badge in the toolbar updates correctly

### Component docs panel
- [ ] **?** button opens the component reference inside the WebView
- [ ] All component pages from `apps/docs/components/` are present

### Claude skill installer
- [ ] First-launch prompt offers to install the Claude skill
- [ ] **Install Skill** copies `extensions/skills/wireframe/` into the workspace at `.claude/skills/wireframe/`
- [ ] **Not Now** dismisses without copying
- [ ] Command palette → **Wiremd: Install Wiremd Claude Skill** still works after dismissal

### Error handling
- [ ] Invalid wiremd shows the error overlay
- [ ] Error message is dismissable
- [ ] Preview recovers when the markdown is fixed

### Multi-file
- [ ] Switching between two open `.md` files updates the preview to the active document
- [ ] Closing the source document closes/keeps the preview consistently

## Configuration test

`.vscode/settings.json`:

```json
{
  "wiremd.defaultStyle": "clean",
  "wiremd.autoRefresh": true,
  "wiremd.refreshDelay": 500,
  "wiremd.showErrorOverlay": true
}
```

Verify each setting takes effect after `Developer: Reload Window`.

## Debugging

### Extension Host log
**View → Output**, then pick **Extension Host** in the dropdown. Look for activation, command registration, and bundling errors.

### WebView DevTools
`Cmd+Shift+P` → **Developer: Open Webview Developer Tools** while the preview panel is focused. Inspect the rendered HTML and check the JS console for errors.

### Reload after a change
After editing extension source, run `pnpm --filter wiremd-preview run bundle` (or have `cd extensions/vscode && pnpm run dev` watching), then `Cmd+Shift+P` → **Developer: Reload Window**.

## Packaging an installable .vsix

```bash
pnpm --filter wiremd-preview run package
# → extensions/vscode/wiremd-preview-<version>.vsix
```

Install locally:

```bash
code --install-extension extensions/vscode/wiremd-preview-<version>.vsix
```

## Automated testing

There is no `@vscode/test-electron` harness today. Adding one would require:

- A test workspace fixture
- VSCode test runner setup
- Mocked file-system fixtures for the preview-provider tests

For now, run `pnpm --filter wiremd run test` for the core library (which the extension imports) and rely on this manual checklist for the extension-host-specific behaviour.

## CI

The `ci.yml` workflow only builds and lints the extension; there is no extension-host test run. Marketplace publishing happens in `publish.yml` on the `release: published` event — see [`CONTRIBUTING.md`](../../CONTRIBUTING.md#release-process) for the full pipeline.
