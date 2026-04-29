---
name: wireframe
description: >-
  Create and render wireframes using wiremd — a text-first tool that converts Markdown into visual
  HTML mockups. Use this skill whenever the user wants to wireframe, mockup, prototype, or sketch
  a UI screen — from a description, Jira ticket, PRD, existing React/JSX, or rough idea. Also
  trigger on: "draw a login page", "show what this would look like", "create a mockup", "design
  a screen for X", "sketch the UI", "prototype this flow", "document this component as a
  wireframe", or any request to render or preview a .md wireframe file. When in doubt, use this
  skill — it's better to invoke it unnecessarily than to miss it.
---

# Wireframe Skill

Write a wiremd `.md` file, render it, and iterate. wiremd converts plain Markdown with extended
syntax into visual wireframes — 7 styles, no design tools needed.

## Step 0 — Choose mode (ask this first, alone, before anything else)

**STOP. Ask only this question before proceeding. Do not show the rest of the form yet. Do not install anything. Do not write any files.**

Ask the user:

> **How would you like to view the wireframe?**
> 1. **Browser editor** — I write the `.md` file to disk; you open it in the wiremd web editor at `tobiashoelzer.com/wiremd/editor` (Chrome/Edge/Safari 16.4+). Live-refreshes as I edit. No install needed.
> 2. **CLI / local dev** — wiremd is (or will be) installed on your machine. I render to HTML or start a watch server.
> 3. **Chat only** — no filesystem access. I hand you the `.md` to paste into the editor yourself.

Wait for the user to pick a mode. **Do not proceed until they answer.**

Once the user picks a mode, show the rest of the form:

- **Single page or multi-page prototype?**
- **Which visual style fits best?** (sketch / clean / wireframe / material / tailwind / brutal)
- **Which key components should it include?**
- **Got a spec, ticket, or component to base it on?** *(optional)*

**Hard rules — never break these:**
- NEVER install wiremd or run any CLI commands unless the user explicitly picks Mode 2.
- NEVER suggest the `tobiashoelzer.com` editor URL unless the user picks Mode 1.
- NEVER default to any mode — always wait for explicit user selection.

---

## Mode 1 — Local (default, no install)

Claude writes the `.md` file to disk. The user opens the wiremd web editor, which uses the File System Access API to open that exact file and auto-refresh on every save (≤500ms, no page reload). The user can also edit directly in the browser — changes write back to disk immediately.

**Steps:**
1. Write the `.md` file to a sensible path (e.g. `./wireframes/screen-name.md`)
2. Generate and share the `?file=` hint URL:
   ```bash
   node -e "const u=new URL('https://tobiashoelzer.com/wiremd/editor/');u.searchParams.set('file',process.argv[1]);console.log(u.toString())" /full/path/to/wireframe.md
   ```
3. Tell the user: "Open that URL in Chrome, Edge, or Safari 16.4+ → click **Open File** in the modal → grant access. The wireframe will appear and update live as I edit."
4. Iterate — edit the `.md` file, the browser refreshes automatically.

**Browser requirements:** Chrome, Edge, or Safari 16.4+. Firefox shows an explanatory notice.

---

## Mode 2 — CLI (bundled, no install)

The plugin ships a pre-built self-contained CLI at `bin/wiremd.js` (inside the plugin folder). Node.js can run it directly — no npm install needed.

To find `PLUGIN_DIR`: look for the `wireframe` plugin folder in Claude's local agent sessions or plugin cache. It contains `bin/wiremd.js`.

**Do NOT use `--serve` in Cowork/remote agents.** The server binds to Claude's sandbox host — the user's browser can't reach it. Use the static HTML workflow below instead.

### Single-page
```bash
node $PLUGIN_DIR/bin/wiremd.js screen.md -o screen.html -s clean
```
Share the HTML path. After each iteration, re-render and ask the user to refresh.

### Multi-page (Cowork) — navigable without a server
Write all pages as `.md` files in one folder, then render and rewrite links in one step:

```bash
# Render every .md to .html
for f in wireframes/*.md; do
  node $PLUGIN_DIR/bin/wiremd.js "$f" -o "${f%.md}.html" -s clean
done

# Rewrite .md hrefs → .html so page-to-page links work via file://
sed -i 's|href="\./\([^"]*\)\.md"|href="./\1.html"|g' wireframes/*.html
```

The user opens `wireframes/index.html` — nav links between pages work natively in the browser. After each edit cycle, re-run both commands and the user refreshes.

### Create from a description or spec
1. Understand the screen's purpose — what does the user accomplish here?
2. Sketch structure top-to-bottom: nav → layout → content sections → forms/data → off-screen elements (modals)
3. Write the wiremd `.md` file(s) using the quick reference below
4. Render with the bundled CLI and share the HTML path(s) with the user

### Document an existing component or screen
1. Read the JSX/TSX component tree — focus on structure, not logic
2. Map components to wiremd equivalents (see `references/syntax.md` → Component mapping table)
3. Write top-to-bottom following visual flow
4. **Capture:** layout, navigation, form fields/labels, button labels, table columns, states
5. **Skip:** exact colors, event handlers, API calls, business logic

---

## Before you render (Mode 2)

**1. Locate the bundle.** Run `node $PLUGIN_DIR/bin/wiremd.js --version` to confirm it responds. The bundled version is always current — no version check needed.

**2. Single page or multi-page?** Ask the user up front. For multi-page, scaffold from the start — don't bolt on later:

- `_nav.md` shared across all pages via `![[_nav.md]]`
- `_sidebar.md` if using sidebar layout
- one `.md` per page at top level

See `references/multi-page.md` for folder layout, cross-page link syntax, and the rebuild recipe.

**3. Which render route does this environment support?**

- **Cowork / remote agent** → static HTML workflow above. No `--serve`. Re-render + user refreshes each iteration.
- **User on local terminal** → `--serve PORT --watch` for live iteration. Never share `localhost` URLs from Claude's host.
- **User picked Mode 1** → write `.md`, share `?file=` URL, browser editor live-refreshes.
- **User picked Mode 3** → hand off the `.md` for the user to paste into the editor.

---

## Rendering

```bash
# Cowork / remote agent — static file, no server (user opens HTML and refreshes each iteration)
node $PLUGIN_DIR/bin/wiremd.js my-screen.md -o output.html -s clean

# Local terminal — live preview with hot reload (only when Claude runs on the user's own machine)
node $PLUGIN_DIR/bin/wiremd.js my-screen.md --style clean --serve 3001 --watch

# VS Code: Cmd+Shift+P → "wiremd: Open Preview" (live preview while editing)
# See references/vscode.md for extension install steps
```

In Cowork: share the HTML file path — the user opens it directly. Re-render after each edit and ask them to refresh.
On local: tell the user to open `http://localhost:3001`.

To screenshot and verify from the CLI:
```bash
npx playwright screenshot --browser chromium --full-page "file://$(pwd)/output.html" /tmp/wf-check.png
```
Then read the PNG with the Read tool.

---

## Style picker

Default to `clean` unless the user specifies otherwise. See `references/styles.md` for full descriptions.

| Style | Best for |
|-------|----------|
| `sketch` | Early ideation, lo-fi client presentations |
| `clean` | Stakeholder review, internal handoff (default) |
| `wireframe` | Low-fidelity explorations, documentation |
| `material` | Material Design apps |
| `tailwind` | Tailwind-based products, indigo/purple palette |
| `brutal` | Bold, high-contrast concepts |
| `none` | Custom CSS, embedding elsewhere |

---

## Quick reference

For the full syntax including all attributes, edge cases, and disambiguation rules, read `references/syntax.md`.

```markdown
# Navigation & breadcrumbs
[[ :logo: Brand | Home | *Active* | :user: Profile | [Sign Up]* ]]
[[ Home > Section > Current Page ]]

# Sidebar-main layout
::: layout {.sidebar-main}

::: sidebar

[[Dashboard](#)]
[[Reports](#)]

:::

::: main
### Page Title
:::

:::

# In-page tabs — use a button group, * marks the active tab
[Overview]* [Details] [Raw Data]

# Buttons
[Primary]* [Secondary]{.secondary} [Outline]{.outline}
[Danger]{variant:danger} [Disabled]{state:disabled} [Saving...]{state:loading}

# Inputs — label must be on the line DIRECTLY above (no blank line)
Email
[_____________________________]{type:email required}

Password
[*****************************]{type:password required}

Notes
[Your message here...]{rows:4}

Role
[Select role_____________v]
- Admin
- Editor
- Viewer

- [ ] Unchecked   - [x] Checked
- ( ) Option A    - (*) Option B (selected)

# Row — horizontal group of inputs, filters, or actions
::: row
[Search_______________]{type:search}
[All Teams___________v]
- All Teams
- Team A
:::

# Row, right-aligned
::: row {.right}
[+ New Item]*
:::

# Section header with right-aligned action — VERY COMMON PATTERN
::: grid-2
### Section Title

### {.right}

[+ Add Item]*

:::

# KPI metric card
::: grid-3
### Total Revenue
**$124,500**
↑ 8% vs last period

### Active Users
**3,842**
↑ 12% vs last period

### Conversion
**4.2%**
↓ 0.3% vs last period

:::

# Grid — layout only, equal columns, no card chrome
::: grid-3
### Revenue
$124,500
### Users
3,842
### Conversion
4.2%
:::

# Grid of cards — each item gets card styling
::: grid-3 card
### :rocket: Organic
42% of traffic
:::

# Table
| Name  | Role  | Status  | Actions         |
|-------|-------|---------|-----------------|
| Alice | Admin | Active  | [Edit] [Remove] |

# Icons — use anywhere in text, headings, nav, buttons
:home: :user: :gear: :chart: :bell: :shield: :rocket: :check: :x: :search: :edit: :trash: :plus:

# Badges / pills — inline status labels and counts
|Active|{.success}  |Pending|{.warning}  |Failed|{.error}  |New|{.primary}  |Draft|

# Card, alert
::: card
Content here
:::

::: alert success
Changes saved.
:::

# Inline comments — appear in a fixed side panel; annotated element gets yellow outline + numbered badge
<!-- Is this the right CTA? @tobias -->
[Sign Up]*

# Stack consecutive comments → one thread card with a divider in the panel
<!-- Should this be "Sign In"? @tobias -->
<!-- Agreed — align with marketing copy. @sara -->
[Login]*

# Comment ABOVE a container annotates the whole thing (card, grid column, tabs block)
<!-- Does this card need a footer action? -->
::: card
### Free Plan
[Get Started]
:::

# Comment INSIDE a container annotates the specific child that follows it
::: card
<!-- Is $12/mo the right price? -->
**$12/mo** · unlimited
[Start Trial]*
:::

# Annotations for states and design notes
> **Loading state:** spinner + "Loading..."
> **Empty state:** "No items yet" + [Add Item]*
> **Design note:** Only visible to Admin users.

# Modals go after --- at the bottom of the file
---
## Modals & Dialogs
> Not visible on page load.
::: modal
## Confirm Delete
Are you sure?

[Delete]{variant:danger} [Cancel]

:::
```

---

## Composite example

A dashboard with sidebar, in-page tabs, a metrics grid, a grid of cards, and a data table.
See the renderable version at `references/examples/dashboard.md`.

```markdown
[[ :logo: AppName | Dashboard | *Reports* | :gear: Settings | :user: Account ]]
[[ Dashboard > Reports ]]

::: layout {.sidebar-main}

::: sidebar

#### Navigation

[[Overview](#)]
[[Reports](#)]
[[Analytics](#)]
[[Users](#)]

---

#### Filters

[Jan 2025____________v]
- Last 7 days
- Last 30 days
- This quarter

[Apply Filters]*

:::

::: main

### Monthly Reports

[Summary]* [Details] [Raw Data]

---

::: grid-3

### Total Revenue
$124,500

### Active Users
3,842

### Conversion Rate
4.2%

:::

---

::: grid-3 card

### :rocket: Organic Search
**42%** of traffic
↑ 12% vs last month

### :chart: Paid Ads
**31%** of traffic
↓ 3% vs last month

### :bell: Email
**27%** of traffic
↑ 8% vs last month

:::

---

## Recent Transactions

| Date   | Customer   | Amount | Status  |
|--------|------------|--------|---------|
| Jan 15 | Acme Corp  | $4,200 | Paid    |
| Jan 14 | Globex Inc | $1,850 | Pending |
| Jan 13 | Initech    | $3,100 | Paid    |

[Export CSV] [View All Transactions]*

:::

---

## Modals & Dialogs

> Not visible on page load.

::: modal
## Export Report

Format
[CSV_________v]
- CSV
- Excel
- PDF

[Export]* [Cancel]

:::
```

---

## Gotchas

1. **Label directly above input.** No blank line between label text and `[_____]` — it breaks the association.
2. **Blank line before `:::` when last line has inline elements.** Buttons, backtick code, bold, links, or list items on the final line of a container — add an empty line before `:::`.
3. **`[[ ]]` nav hrefs require wiremd ≥ 0.1.7.** Earlier versions silently drop the URL and every item renders as `href="#"`. Mixed static + clickable works in 0.1.7+: `[[ *Home* | [About](./about.md) | [Contact](./contact.md) ]]`.
4. **`:::accordion` doesn't exist.** Use `::: tabs` with `::: tab Label` children for tabbed panels. For a simple button-group switcher, use `[Tab]*  [Other]`.
5. **Use `![[file.md]]` for includes, not `:::display`.** `:::display` is obsolete. `![[path/to/file.md]]` works in both the CLI and VS Code preview — path resolves relative to the current file.
6. **Sandbox `--serve` is unreachable from the user's browser.** `wiremd --serve PORT` binds to `localhost` on Claude's host, not the user's. When Claude is running in Cowork/Desktop and the user is elsewhere, write HTML to a shared folder instead. See `references/rendering-modes.md`.
7. **Static HTML keeps `.md` hrefs — rewrite after build.** `wiremd x.md -o x.html` preserves `./page.md` link targets. For `file://` double-click delivery, rewrite with: `sed -i -E 's|href="\./([A-Za-z0-9_-]+)\.md"|href="./\1.html"|g' *.html`. On macOS without GNU sed, use `sed -i ''`.

---

## Reference files

- `references/quick-reference.md` — one-page cheat sheet for all components (copied from QUICK-REFERENCE.md at build time)
- `references/syntax.md` — full syntax, all attributes, disambiguation rules, component mapping, gotchas
- `references/styles.md` — style guide with visual descriptions and use cases
- `references/multi-page.md` — folder layout, shared `_nav.md`, cross-page links, rebuild recipe for `.md`→`.html` handoff
- `references/rendering-modes.md` — decision table: files-in-folder, dev server, screenshot, web-editor handoff
- `references/vscode.md` — VS Code extension install and live-preview workflow
- `references/examples/dashboard.md` — renderable dashboard wireframe (point user to this path)
- `references/examples/settings-form.md` — renderable settings/form wireframe (point user to this path)
- `references/examples/multi-page/` — minimal 2-page prototype (`_nav.md` + `index.md` + `detail.md`) demonstrating shared nav, cross-page links, and the render-and-open-html flow
