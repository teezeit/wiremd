---
name: wireframe
description: >-
  Create and render wireframes for the JAM platform using wiremd — a text-first wireframing tool that converts
  plain Markdown into visual HTML mockups. Use this skill whenever the user wants to: document existing app
  screens as markdown wireframes, create wireframes for new or redesigned features, generate a visual mockup
  of a Jira ticket, preview a proposed UI change, or build a wireframe library of current JAM pages.
  Always invoke for any wireframing, UI documentation, or "what should this screen look like" task —
  even if the user doesn't say the word "wireframe".
---

# Wireframe Skill

Turn JAM app screens into wiremd markdown, and wiremd markdown into visual HTML mockups.

## Two main workflows

### 1. Document an existing screen
Read the React/TSX source for a page or feature, extract its UI structure, and write a wiremd `.md` file
that represents what it actually looks like: navigation, layout, inputs, buttons, data, states.

### 2. Wireframe a future iteration
Given a feature description, Jira ticket, or PRD, create a wiremd `.md` file showing the proposed UI —
new screens, redesigned components, updated flows.

---

## Previewing wireframes

There are two ways to see rendered output. For a PM authoring wireframes, VS Code is the easiest path.

### Option A — VS Code extension (recommended for authoring)

The VS Code extension renders a live preview panel as you type. See `references/vscode.md` for install
steps and the full workflow.

**Rebuilding the extension** (after changes to `external-packages/wiremd`):
```bash
# Build the .vsix artefact
bash .claude/skills/wireframe/scripts/build-vscode-ext.sh

# Then install it in VS Code
code --install-extension external-packages/wiremd/vscode-extension/wiremd-preview-0.1.0.vsix --force
# Reload VS Code: Cmd+Shift+P → Developer: Reload Window
```

Once installed:
1. Open any `.md` file in `packages/wireframes/`
2. `Cmd+Shift+P` → **wiremd: Open Preview**
3. Edit the file — the preview updates live

### Option B — CLI hot reload (browser)

```bash
# Default (home.md, clean style, port 3001)
bash .claude/skills/wireframe/scripts/serve.sh

# Specific file
bash .claude/skills/wireframe/scripts/serve.sh packages/wireframes/future/my-feature.md

# With options
bash .claude/skills/wireframe/scripts/serve.sh packages/wireframes/current/login.md --style sketch --port 3002
```

### Option C — Render all + generate index

```bash
bash .claude/skills/wireframe/scripts/render-all.sh --style clean
# Then open: packages/wireframes/rendered/index.html
```

---

## Modifying wiremd source

The wiremd parser and renderer live in `external-packages/wiremd/src/`. After any change there you must
rebuild `dist/` before the CLI picks it up, and run tests to verify nothing broke.

**The local vite/vitest binaries inside `wiremd/node_modules/.bin/` are broken** (stale symlinks). Use the
workspace-level vitest and the esbuild script instead.

### Run tests

```bash
cd external-packages/wiremd
node ../../node_modules/vitest/vitest.mjs run
```

Tests live in `external-packages/wiremd/tests/renderer.test.ts`. Each new parser/renderer feature should
have a corresponding test there — assert on `renderToHTML(parse(md), { style: 'sketch' })`.

### Rebuild dist/ after source changes

```bash
bash .claude/skills/wireframe/scripts/build-wiremd.sh
```

This uses esbuild to bundle the TypeScript source into `dist/` (CJS). The script ends with
`wiremd --version` to confirm the binary loads correctly.

### What to rebuild after source changes

`build-wiremd.sh` is always required. What you rebuild next depends on how you're previewing:

| Preview method | After `build-wiremd.sh` |
|---|---|
| `serve.sh` (CLI) | Restart `serve.sh` — it loads dist once at startup |
| VS Code extension | Also run `build-vscode-ext.sh` + reinstall + Reload Window |
| `render-all.sh` | Nothing extra — re-run the script |

**VS Code extension rebuild:**
```bash
bash .claude/skills/wireframe/scripts/build-vscode-ext.sh
code --install-extension external-packages/wiremd/vscode-extension/wiremd-preview-0.1.0.vsix --force
# Cmd+Shift+P → Developer: Reload Window
```

---

## File organization

```
packages/wireframes/
  current/                       ← snapshot of existing JAM screens
  future/                        ← proposed new screens / iterations
  rendered/                      ← generated HTML output
    index.html
    current/
    future/
```

Use kebab-case filenames. For tabs/subpages, prefix with a number to control order — stripped from output:
```
current/
  organization-settings/
    01-general.md   → general.html
    02-login.md     → login.html
```

---

## wiremd syntax — quick reference

For the complete syntax (all button variants, input types, radio buttons, all themes, disambiguation rules,
include syntax), read `references/syntax.md`.

### Navigation bar
```markdown
[[ :logo: JAM | Home | *Active Page* | Library | :user: Profile | :gear: Settings ]]
[[ Home > Section > Current Page ]]
```

### Forms
```markdown
Name
[__________________________]{required}

Email
[__________________________]{type:email required}

Message
[Your message...]{rows:4}

Role
[Select role_____________v]

- [ ] Send me updates
- [x] Agree to terms

- ( ) Option A
- (*) Option B (selected)

[Save Changes]*          [Cancel]
```

### Buttons
```markdown
[Primary]*          [Secondary]{.secondary}          [Danger]{variant:danger}
[Loading...]{state:loading}     [Disabled]{state:disabled}
```

### Containers
```markdown
::: card
### Card Title
Content here
:::

::: alert success
Changes saved.
:::

::: alert error
Something went wrong.
:::

::: modal
## Confirm Action
[Confirm]*   [Cancel]
:::
```

### Sidebar-main layout (custom feature)
```markdown
::: layout {.sidebar-main}
## Sidebar {.sidebar}
- [Nav Item 1](#)
- **[Active Item](#)**

## Main {.main}
### Page Content
Content goes here.
:::
```

### Grid layouts
```markdown
## Section {.grid-3}

### :rocket: Feature One
Description

### :shield: Feature Two
Description

### :gear: Feature Three
Description
```
Supports `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto`.

### Tables
```markdown
| Name | Role | Status |
|------|------|--------|
| Alice | Admin | Active |
| Bob | Member | Invited |
```

### Icons
`:home:` `:user:` `:gear:` `:chart:` `:bell:` `:shield:` `:rocket:` `:check:` `:x:` `:logo:` `:search:`

---

## Known gotchas

**1. Blank line before closing `:::` with inline markdown**

If the last line inside a container has backtick code spans, bold, links, buttons, or a list item — add a blank line before `:::`. This applies broadly: any wiremd inline element on the final line can prevent the container from closing correctly.

```markdown
::: card
`8 registered` `1 pending`

:::

::: card
[Save]*   [Cancel]

:::

::: sidebar
- [Home](#)
- [Settings](#)

:::
```

**2. `[[ ]]` nav containers don't support link hrefs**

`[Text](url)` inside `[[ ]]` silently drops the href. For clickable tab bars use plain markdown:
```markdown
**Active Tab** · [Other Tab](other.html) · [Third Tab](third.html)
```

**3. `:::tabs` and `:::accordion` are not implemented**

Use the tab-per-file pattern (numbered `.md` files) instead.

**4. `:::display` is VS Code-only**

The `:::display ./file.md:::` include directive works in the VS Code preview but not in the CLI renderer.
Don't use it in wireframes you'll batch-render with `render-all.sh`.

---

## How to document an existing screen (workflow 1)

1. **Find the route** — read `apps/front/src/routes.tsx` for the complete list of pages (id, path, component).
2. **Read the component tree** — start from the page component under `apps/front/src/pages/` or
   `apps/front/src/features/`. Follow imports into sub-components. Focus on JSX structure, not logic.
3. **Map JSX → wiremd:**

   | JSX | wiremd |
   |-----|--------|
   | `<Button variant="primary">` | `[Label]*` |
   | `<Button variant="secondary">` | `[Label]{.secondary}` |
   | `<Input placeholder="...">` | `[placeholder___________]` |
   | `<Select>` / `<Combobox>` | `[Option____________v]` + list items |
   | `<Checkbox>` | `- [ ] Label` |
   | `<RadioGroup>` | `- ( ) Option` / `- (*) Selected` |
   | `<Table>` | markdown table with representative columns |
   | `<Card>` | `:::card` block |
   | `<Dialog>` / `<Modal>` | `:::modal` block (in "Modals & Dialogs" section at bottom) |
   | Flex row of cards / `<Grid cols={3}>` | `## Section {.grid-3}` |
   | `<Tabs>` | one `.md` file per tab |
   | Loading state | `> Loading state: spinner + "Loading..."` |
   | Empty state | `> Empty state: "No items yet" + [Add Item]*` |

4. **Write the wiremd file** top-to-bottom, following the visual flow. Always start with a back link:
   - Files directly in `current/` or `future/` → `[← All Wireframes](../index.html)`
   - Files in a route subdirectory → `[← All Wireframes](../../index.html)` (most common)

5. **Separate off-screen elements** — modals and dialogs at the bottom:
   ```markdown
   ---

   ## Modals & Dialogs

   > These elements are not visible on page load.

   ::: modal
   ## Dialog Title
   [Confirm]*   [Cancel]
   :::
   ```

6. **Add cross-links** to related screens:
   ```markdown
   > **Navigation:** [← Dashboard](../current/dashboard.html) | [Settings →](../current/settings.html)
   ```

7. **Render and verify:**
   - Live: `node external-packages/wiremd/bin/wiremd.js <file> --watch --serve 3000 --style clean`
   - Screenshot: `npx playwright screenshot --browser chromium --full-page "file://$(pwd)/packages/wireframes/rendered/current/<route>/<page>.html" /tmp/wf-check.png`
     then read the PNG with the Read tool.

**Capture:** layout, navigation, form fields/labels, button labels, section headings, table columns, states.
**Skip:** exact colors/typography, event handlers, API calls, business logic.

---

## How to wireframe a future iteration (workflow 2)

1. **Understand the goal** — read the Jira ticket, PRD, or description. What problem does this UI solve?
2. **Map the user flow** — what screens are involved? What's new vs. changed?
3. **Sketch in wiremd** — start with the nav and main content area, then fill in forms/data/actions.
4. **Annotate intent** with blockquotes:
   ```markdown
   > **Design question:** Should this be a modal or a new page?
   > **Note:** Only visible to Admin users.
   ```
5. **Render and share** — note the file path for the user to open.

---

## JAM app shell pattern

```markdown
[[ :logo: JAM | Home | Coaching | Library | :user: Profile | :gear: Settings ]]
[[ Parent > Current Page ]]

---

## Page Title
```

---

## After rendering

Tell the user exactly what to open:
- **Single file (hot reload):** `http://localhost:3000`
- **Single rendered file:** `open packages/wireframes/rendered/current/<name>.html`
- **Full library:** `open packages/wireframes/rendered/index.html`

Cross-links between screens must use paths relative to `packages/wireframes/rendered/` —
e.g. `current/settings.html` or `../future/new-feature.html`.
