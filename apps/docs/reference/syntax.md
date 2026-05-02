# Syntax Reference

Complete wiremd syntax — all components, attributes, and patterns in one place.

For component-by-component docs with live previews, see the [Components](/components/) section.

---

## Disambiguation

How the parser decides what `[...]` is:

```
[Text](url)      → Link       (has a URL)
[Text]{switch}   → Switch     (explicit switch attribute)
[Text]           → Button     (no URL, no underscores)
[Text___v]       → Dropdown   (underscores + trailing v)
[___]            → Text input (underscores, no v)
[***]            → Password   (asterisks)
```

---

## Buttons

```markdown
[Default]
[Primary]*                     ← asterisk shorthand
[Primary]{primary}
[Secondary]{secondary}
[Danger]{danger}
[Loading...]{loading}
[Disabled]{disabled}
```

Group buttons on the same line: `[Save]* [Cancel] [Reset]`

> **Advanced:** `{variant:danger}` and `{state:disabled}` are still accepted. Dot-prefixed tokens like `{.my-button}` are raw CSS classes.

---

## Modifier Model

Use plain tokens for UI intent:

```markdown
[Delete]{danger large disabled}
::: row {right}
::: column Summary {span-2 center}
((Done)){success}
```

Use key-value attributes when you need explicit properties:

```markdown
[Delete]{variant:danger state:disabled}
[Email___________]{type:email required}
```

Use dot-prefixed tokens only as raw CSS class hooks:

```markdown
[Button]{.my-button}
::: card {.highlight-card}
```

Semantic tokens are normalized before rendering; raw CSS classes pass through unchanged.

---

## Inputs & Forms

**Critical rule:** Label text must be directly above the input — no blank line between them.

```markdown
Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Phone
[_____________________________]{type:tel}

Website
[_____________________________]{type:url}

Age
[_____________________________]{type:number min:18 max:120}

Date
[_____________________________]{type:date}

Search
[Search products...]{type:search}

Password
[********]{type:password required}

Attachment
[_____________________________]{type:file}

Message
[Your message here...]{rows:5}

[Submit]* [Cancel]
```

### Input types

| Type | Attribute |
|------|-----------|
| Text (default) | `{type:text}` |
| Email | `{type:email}` |
| Password | `{type:password}` |
| Tel | `{type:tel}` |
| URL | `{type:url}` |
| Number | `{type:number}` |
| Date | `{type:date}` |
| Time | `{type:time}` |
| Search | `{type:search}` |
| File upload | `{type:file}` |
| Color picker | `{type:color}` |

### Input states

```markdown
[Field value]{error}
[Field value]{disabled}
```

### Textarea

```markdown
Message
[Your message here...]{rows:5}

Notes
[Your notes...]{rows:5 cols:40}
```

### Dropdowns

```markdown
Role
[Select role_________________v]
- Admin
- Editor
- Viewer
```

The list items directly following a dropdown become its options.

Dropdown behavior depends on the option syntax:

```markdown
Plan
[Select plan_________________v]
- Free
- Pro
- Enterprise

Workspace
[Workspace___________________v]
- [Acme Inc](./acme.md)
- [Personal](./personal.md)

Actions
[Actions_____________________v]
- [Duplicate]
- [Archive]
```

Plain text options render as a normal select. Markdown link options render as a navigation select and carry `href` on each option. Button-style options render as an action select for command-menu wireframes.

### Checkboxes & radios

```markdown
- [ ] Unchecked option
- [x] Checked option

[Notifications]{switch}
[Dark mode]{switch checked}
[Auto-save]{switch disabled}

- ( ) Radio option A
- (*) Radio option B (selected)
- ( ) Radio option C
```

---

## Navigation

```markdown
# Simple nav
[[ Home | Products | About | Contact ]]

# With logo, active item, and action buttons
[[ :logo: Brand | Home | *Active Page* | About | [Sign In] | [Get Started]* ]]

# Breadcrumbs (use > separator)
[[ Home > Section > Current Page ]]

# Cross-page links (requires wiremd ≥ 0.1.7)
[[ *Home* | [About](./about.md) | [Contact](./contact.md) ]]
```

> **Version note:** Cross-page hrefs inside `[[ ]]` require wiremd ≥ 0.1.7. Earlier versions silently drop URLs and render every item as `href="#"`.

---

## Tabs

`::: tabs` creates a tabbed panel. Child `::: tab Label` containers become the tab panels:

```markdown
::: tabs
::: tab Overview
Content for overview tab
:::
::: tab Details
Content for details tab
:::
:::
```

For a simple switcher without panels, keep the buttons on one line and use `*` to mark the active item:

```markdown
[Overview]* [Details] [Raw Data]
```

---

## Containers

```markdown
::: card
### Card Title
Content here
:::
::: hero
## Big Headline
Supporting text

[Get Started]*  [Learn More]
:::
::: modal
## Confirm Delete
Are you sure you want to delete this item?

[Delete]{danger}  [Cancel]
:::
::: sidebar
#### Section

[[Home](#)]
[[Settings](#)]
[[Logout](#)]
:::
::: footer
© 2025 Company · [Privacy](#) · [Terms](#)
:::
```

### Alerts

> **Not yet implemented.** Alerts parse correctly but have no dedicated renderer — they fall back to an unstyled `<div>`. Variants are not visually distinguished. The syntax below documents the intended behavior.

```markdown
::: alert
Your session will expire in 10 minutes.
:::
::: alert {success}
Changes saved successfully.
:::
::: alert {warning}
This action cannot be undone.
:::
::: alert {error}
Something went wrong.
:::
::: alert {warning} Storage limit reached
Upgrade your plan to continue uploading.

[Upgrade Now]* [Dismiss]
:::
```

### Nested containers

Containers can be nested — the parser handles them recursively:

```markdown
::: card
::: columns-2
::: column Sprint: Q2 Onboarding

:::
::: column {right}

Started: Apr 1 · ((Due: Apr 30)){warning}
:::
:::

Before you can pitch to a decision maker, you need to get past the gatekeeper.
:::
```

> **⚠️ Gotcha:** When the last line inside a container has inline code, bold, or links, add a blank line before the closing `:::` to avoid parser ambiguity.

---

## Sidebar layout

Two-column layout with a fixed sidebar and fluid main area:

```markdown
::: sidebar
[[Dashboard](#)]
[[Sessions](#)]
[[Settings](#)]
:::
### Page Title

Content for the main area.
```

---

## Row

`::: row` lays out its children horizontally — filter toolbars, search+action bars, and action rows:

```markdown
::: row
[Search_______________]{type:search}
[All Teams___________v]
- All Teams
- Team A
- Team B
:::
```

Right-align content with `{right}`:

```markdown
::: row {right}
[+ New Item]*
:::
```

---

## Columns

Columns use explicit `::: column` child containers inside a `::: columns-N` container. Put a title on the opener, like `::: column Billing address`, to render a heading at the top of that column.
Supported widths: `columns-2`, `columns-3`, `columns-4`, `columns-5`.

**Layout only** — equal columns, no card chrome. Use for metrics and KPI rows:

```markdown
::: columns-3
::: column Revenue
**$124,500**
↑ 8% vs last period

:::
::: column Users
**3,842**
↑ 12% vs last period

:::
::: column Conversion
**4.2%**
↓ 0.3% vs last period
:::
:::
```

**Columns of cards** — each item gets card styling. Use for feature lists, channel breakdowns:

```markdown
::: columns-3 card
::: column :rocket: Organic
**42%** of traffic

:::
::: column :chart: Paid
**31%** of traffic

:::
::: column :bell: Email
**27%** of traffic
:::
:::
```

### Section header with right-aligned action

The most common `columns-2` pattern — title left, button right:

```markdown
::: columns-2
::: column Recent Sessions

:::
::: column {right}

[View All]*
:::
:::
```

### Column alignment

Add `right`, `left`, or `center` to a `::: column` opener to align that column's content horizontally. Add `top` or `bottom` for vertical alignment within the grid row:

```markdown
::: column {right}
::: column {left}
::: column {center}
::: column {top}
::: column {bottom}
```

### Column spans

```markdown
::: column Featured Item {span-2}
Spans two columns.
:::

```markdown
::: column Featured Item {span-2}
Spans two columns.
:::
```
```

---

## Icons

Use `:name:` anywhere — headings, nav, buttons, table cells, body text:

```
:home:  :user:  :gear:  :chart:  :bell:  :shield:
:rocket:  :check:  :x:  :logo:  :search:  :edit:
:trash:  :plus:  :arrow-right:
```

---

## Badges / Pills

Double parentheses create inline status labels:

```markdown
((Active))
((Active)){success}
((3)){warning}
((Failed)){error}
((New)){primary}

Status: ((Active)){success}
```

Variants: `success` · `warning` · `error` · `primary` · (none = neutral gray)

> `((Label))` works inside Markdown table cells without escaping.

---

## Tables

```markdown
| Name    | Role   | Status  | Actions         |
|---------|--------|---------|-----------------|
| Alice   | Admin  | Active  | [Edit] [Remove] |
| Bob     | Member | Invited | [Edit] [Remove] |
```

---

## Progress bars

```markdown
Storage [##########________] 60%
Upload  [####______________] 20%
Done    [##################] 100%
```

---

## Annotations

Use blockquotes for design notes, open questions, and state descriptions:

```markdown
> **Loading state:** Spinner + "Loading..." text

> **Empty state:** Illustration + "No items yet" + [Add Item]*

> **Design question:** Should this be a modal or inline expansion?

> **Note:** Only visible to Admin users.
```

---

## Inline comments

HTML comments create a **fixed side panel** — the annotated element gets a yellow outline and numbered badge:

```markdown
<!-- Is this the right CTA? @tobias -->
[Sign Up]*

<!-- Stack consecutive comments → single thread with divider -->
<!-- Agreed — align with marketing copy. @sara -->
[Login]*

<!-- Comment ABOVE a container annotates the whole block -->
::: card
### Free Plan
[Get Started]
:::
::: card
<!-- Comment INSIDE annotates the specific child that follows -->
[Learn more]
:::
```

- Place the comment **above** what you want to annotate
- Comment **above** a container outlines the whole block; **inside** annotates the next child
- Consecutive comments above the same element group into one thread
- Toggle with 💬 in the toolbar, or pass `--show-comments` to the CLI

---

## File includes

Inline another `.md` file with Obsidian-style syntax:

```markdown
![[shared/nav.md]]
![[components/sidebar.md]]
```

Path resolves relative to the current file. Works in the CLI and VS Code preview. If the file doesn't exist, a warning blockquote renders in its place.

---

## Standard Markdown

All standard Markdown works: `# headings`, `**bold**`, `*italic*`, `` `code` ``, `[links](url)`, `![images](src)`, `- lists`, `1. ordered lists`, `> blockquotes`, `---` horizontal rules.

---

## Component mapping (JSX → wiremd)

| JSX / HTML | wiremd |
|-----------|--------|
| `<Button variant="primary">` | `[Label]*` |
| `<Button variant="secondary">` | `[Label]{secondary}` |
| `<Button variant="danger">` | `[Label]{danger}` |
| `<Button disabled>` | `[Label]{disabled}` |
| `<Input placeholder="...">` | `[placeholder___________]` |
| `<Input type="password">` | `[*********************]` |
| `<Textarea rows={4}>` | `[Placeholder...]{rows:4}` |
| `<Select>` / `<Combobox>` | `[Option___________v]` + list items |
| `<Checkbox>` | `- [ ] Label` / `- [x] Label` |
| `<Switch>` | `[Label]{switch}` / `[Label]{switch checked}` |
| `<RadioGroup>` | `- ( ) Option` / `- (*) Selected` |
| `<Table>` | markdown table |
| `<Card>` | `::: card` block |
| `<Dialog>` / `<Modal>` | `::: modal` at bottom of file |
| `<Alert variant="success">` | `::: alert {success}` |
| `<Badge>` / `<Chip>` | `((Label)){success}` |
| Flex row of cards | `::: columns-3 card` |
| Stats row (no card) | `::: columns-3` |
| Horizontal toolbar | `::: row` |
| Right-aligned action | `::: row {right}` |
| Section header + right action | `::: columns-2` with `::: column {right}` |
| `<Tabs>` | `::: tabs` with `::: tab Label` children |
| Loading state | `> **Loading state:** ...` |
| Empty state | `> **Empty state:** ...` |
| Error state | `::: alert {error}` or `{error}` on input |
| Sidebar + main | `::: sidebar` before page content |
