# JAM Wireframes

Wireframe library for the JAM platform, authored in [wiremd](../../apps/wiremd) markdown and rendered to HTML.

---

## Directory structure

```
packages/wireframes/
  current/          ← snapshots of existing JAM screens
  future/           ← proposed new screens / iterations
  rendered/         ← generated HTML output (run render-all.sh)
  vscode-extension-playground/   ← sandbox for testing extension features
```

---

## Rendering

```bash
# Render everything + generate index
bash .claude/skills/wireframe/scripts/render-all.sh --style clean

# Live preview a single file
node apps/wiremd/bin/wiremd.js packages/wireframes/current/foo.md --watch --serve 3000 --style clean
```

Open `packages/wireframes/rendered/index.html` after a full render.

---

## VS Code extension

Install the custom wiremd preview extension:

```bash
code --install-extension /path/to/wiremd-preview-0.1.0.vsix
```

The extension ships two features beyond plain wiremd that are **only active inside VS Code** (not the CLI renderer).

### 1. Cross-file navigation

Link to another `.md` file using standard markdown link syntax:

```markdown
[Sign In](home.md)
[← Back](../current/dashboard.md)
```

Clicking the rendered link opens the target file in the editor and the preview follows automatically. Links pointing to `http` URLs or `#anchors` are left as-is.

### 2. Component includes — `:::display`

Splice the contents of another `.md` file into the current one before parsing:

```markdown
:::display _navbar.md:::
```

The extension resolves the path relative to the current file, reads it, and injects the raw markdown text before passing it to `wiremd`. The parser never sees the directive — it sees the inlined content instead.

Use this for shared components (nav bars, footers, repeated form sections):

```
vscode-extension-playground/
  _navbar.md        ← shared component (prefix _ by convention)
  login.md          ← :::display _navbar.md:::
  home.md           ← :::display _navbar.md:::
```

Relative paths work too:

```markdown
:::display ../shared/_footer.md:::
```

If the file can't be found, the directive is replaced with a visible warning blockquote rather than failing silently.

**Note:** `:::display` is a VS Code extension-only preprocessor. The CLI renderer does not expand it — using it in files intended for `render-all.sh` will produce a parse error.

---

## Playground

`vscode-extension-playground/` contains minimal working examples of both features:

| File | Purpose |
|------|---------|
| `_navbar.md` | Shared nav component |
| `login.md` | Login screen — `[Sign In](home.md)` navigates to home |
| `home.md` | Dashboard — uses `:::display _navbar.md:::` |

Open `login.md` in VS Code, open the wiremd preview (`Cmd+Shift+P` → *Wiremd: Open Preview*), and click Sign In to navigate.
