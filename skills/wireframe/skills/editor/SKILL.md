---
name: editor
description: >-
  Create and render wireframes using wiremd — live browser editor, auto-refreshes on every save.
  Use this skill whenever the user wants to wireframe, mockup, prototype, or sketch a UI screen —
  from a description, Jira ticket, PRD, existing React/JSX, or rough idea. Also trigger on:
  "draw a login page", "show what this would look like", "create a mockup", "design a screen for X",
  "sketch the UI", "prototype this flow", "document this component as a wireframe", or any request
  to render or preview a .md wireframe file. When in doubt, use this skill — it's better to invoke
  it unnecessarily than to miss it.
---

# Wireframe Skill

Write a wiremd `.md` file, render it, and iterate. wiremd converts plain Markdown with extended
syntax into visual wireframes — 7 styles, no design tools needed.

## Step 0 — Gather requirements

Ask (all at once, before writing anything):

- **Single page or multi-page prototype?**
- **Which visual style?** (sketch / clean / wireframe / material / tailwind / brutal — default: `wireframe`)
- **Which key components should it include?**
- **Got a spec, ticket, or component to base it on?** *(optional)*

> **Wrong mode?** Only want an artifact in Claude's panel (no browser tab)? Use `/wireframe:display`. Prefer a `localhost` dev server (any browser, including Firefox)? Use `/wireframe:serve`. No file access at all? Write markup in a fenced code block — user pastes it into the web editor.

---

## Workflow

1. Write the `.md` file to a sensible path (e.g. `./wireframes/screen-name.md`)
2. Generate and share the `?file=` hint URL:
   ```bash
   node -e "const u=new URL('https://teezeit.github.io/wiremd/editor/');u.searchParams.set('file',process.argv[1]);console.log(u.toString())" /full/path/to/wireframe.md
   ```
3. Tell the user: "Open that URL in Chrome, Edge, or Safari 16.4+ → click **Open File** in the modal → grant access. The wireframe will appear and update live as I edit."
4. Iterate — edit the `.md` file, the browser refreshes automatically.

**Browser requirements:** Chrome, Edge, or Safari 16.4+. Firefox shows an explanatory notice.

---

## Style picker

Default to `wireframe` unless the user specifies otherwise. See `references/styles.md` for full descriptions.

| Style | Best for |
|-------|----------|
| `sketch` | Early ideation, lo-fi client presentations |
| `clean` | Stakeholder review, internal handoff |
| `wireframe` | Low-fidelity explorations, documentation (default) |
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
