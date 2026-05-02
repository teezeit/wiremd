# Wireframe — Editor

Write a wiremd `.md` file, render it via the live web editor, and iterate.
The browser auto-refreshes every ~500ms when Claude saves a change.

## Step 0 — Gather requirements

Ask (all at once, before writing anything):

- **Single page or multi-page prototype?**
- **Which visual style?** (sketch / clean / wireframe / material / tailwind / brutal — default: `wireframe`)
- **Which key components should it include?**
- **Got a spec, ticket, or component to base it on?** *(optional)*

> **Wrong mode?** Want rendered HTML instead (no browser tab)? Re-run `/wireframe` and select **display**. Want a `localhost` dev server (any browser, including Firefox)? Select **serve** instead.

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

Default to `wireframe` unless the user specifies otherwise. See `${CLAUDE_PLUGIN_ROOT}/references/styles.md` for full descriptions.

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

For the full syntax including all attributes, edge cases, and disambiguation rules, read `${CLAUDE_PLUGIN_ROOT}/references/syntax.md`.

```markdown
# Navigation & breadcrumbs
[[ :logo: Brand | Home | *Active* | :user: Profile | [Sign Up]* ]]
[[ Home > Section > Current Page ]]

# Sidebar layout

::: sidebar

[[Dashboard](#)]
[[Reports](#)]

:::

### Page Title

# In-page tabs — keep buttons on one line, * marks the active tab
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
::: columns-2
::: column Section Title

:::
::: column .right

[+ Add Item]*

:::
:::

# KPI metric card
::: columns-3
::: column Total Revenue
**$124,500**
↑ 8% vs last period

:::
::: column Active Users
**3,842**
↑ 12% vs last period

:::
::: column Conversion
**4.2%**
↓ 0.3% vs last period

:::
:::

# Columns — layout only, equal columns, no card chrome
::: columns-3
::: column Revenue
$124,500
:::
::: column Users
3,842
:::
::: column Conversion
4.2%
:::
:::

# Columns of cards — each item gets card styling
::: columns-3 card
::: column :rocket: Organic
42% of traffic
:::
:::

# Table
| Name  | Role  | Status  | Actions         |
|-------|-------|---------|-----------------|
| Alice | Admin | Active  | [Edit] [Remove] |

# Icons — use anywhere in text, headings, nav, buttons
:home: :user: :gear: :chart: :bell: :shield: :rocket: :check: :x: :search: :edit: :trash: :plus:

# Badges / pills — inline status labels and counts
((Active)){.success}  ((Pending)){.warning}  ((Failed)){.error}  ((New)){.primary}  ((Draft))

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

# Comment ABOVE a container annotates the whole thing (card, column, tabs block)
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

A dashboard with sidebar, in-page tabs, metrics columns, card columns, and a data table.
See the renderable version at `${CLAUDE_PLUGIN_ROOT}/references/examples/dashboard.md`.

---

## Gotchas

1. **Label directly above input.** No blank line between label text and `[_____]` — it breaks the association.
2. **Blank line before `:::` when last line has inline elements.** Buttons, backtick code, bold, links, or list items on the final line of a container — add an empty line before `:::`.
3. **`[[ ]]` nav hrefs require wiremd ≥ 0.1.7.** Earlier versions silently drop the URL and every item renders as `href="#"`. Mixed static + clickable works in 0.1.7+: `[[ *Home* | [About](./about.md) | [Contact](./contact.md) ]]`.
4. **`:::accordion` doesn't exist.** Use `::: tabs` with `::: tab Label` children for tabbed panels. For a simple switcher, use `[Tab]*  [Other]`.
5. **Use `![[file.md]]` for includes, not `:::display`.** `:::display` is obsolete. `![[path/to/file.md]]` works in both the CLI and VS Code preview — path resolves relative to the current file.
6. **Sandbox `--serve` is unreachable from the user's browser.** `wiremd --serve PORT` binds to `localhost` on Claude's host, not the user's. When Claude is running in co-work/Desktop and the user is elsewhere, use **display** mode instead.
7. **Static HTML keeps `.md` hrefs — rewrite after build.** `wiremd x.md -o x.html` preserves `./page.md` link targets. For `file://` double-click delivery, rewrite with: `sed -i -E 's|href="\./([A-Za-z0-9_-]+)\.md"|href="./\1.html"|g' *.html`. On macOS without GNU sed, use `sed -i ''`.

---

## Reference files

- `${CLAUDE_PLUGIN_ROOT}/references/quick-reference.md` — one-page cheat sheet for all components
- `${CLAUDE_PLUGIN_ROOT}/references/syntax.md` — full syntax, all attributes, disambiguation rules, component mapping, gotchas
- `${CLAUDE_PLUGIN_ROOT}/references/styles.md` — style guide with visual descriptions and use cases
- `${CLAUDE_PLUGIN_ROOT}/references/multi-page.md` — folder layout, shared `_nav.md`, cross-page links, rebuild recipe for `.md`→`.html` handoff
- `${CLAUDE_PLUGIN_ROOT}/references/rendering-modes.md` — decision table: files-in-folder, dev server, screenshot, web-editor handoff
- `${CLAUDE_PLUGIN_ROOT}/references/vscode.md` — VS Code extension install and live-preview workflow
- `${CLAUDE_PLUGIN_ROOT}/references/examples/dashboard.md` — renderable dashboard wireframe
- `${CLAUDE_PLUGIN_ROOT}/references/examples/settings-form.md` — renderable settings/form wireframe
- `${CLAUDE_PLUGIN_ROOT}/references/examples/multi-page/` — minimal 2-page prototype demonstrating shared nav and cross-page links
