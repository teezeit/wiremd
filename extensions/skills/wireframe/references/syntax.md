# wiremd Syntax Reference

> Complete syntax for the wiremd fork at `external-packages/wiremd`.
> Quick lookup for Claude when authoring wireframes.

---

## Disambiguation rules

```markdown
[Text](url)      → Link (has a URL)
[Text]           → Button (no URL, no underscores)
[Text___v]       → Dropdown (ends in 'v' with underscores)
[___]            → Text input (underscores, no 'v')
[***]            → Password input (asterisks)
```

---

## Buttons

```markdown
[Default]
[Primary]*                     ← asterisk shorthand
[Primary]{.primary}            ← class form
[Secondary]{.secondary}
[Outline]{.outline}
[Danger]{variant:danger}
[Loading...]{state:loading}
[Disabled]{state:disabled}
```

Group buttons on the same line: `[Save]* [Cancel] [Reset]`

---

## Inputs & Forms

**Critical rule:** Label text must be directly above the input — no blank line between them.

```markdown
## Contact Form

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

Message
[Your message here...]{rows:5}

[Submit]* [Cancel]
```

### Input states

```markdown
[Field value]{state:error}
[Field value]{state:disabled}
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

### Checkboxes & Radios

```markdown
- [ ] Unchecked option
- [x] Checked option

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
```

**Version note:** Cross-page hrefs inside `[[ ]]` — e.g. `[[ *Home* | [About](./about.md) | [Contact](./contact.md) ]]` — require wiremd ≥ 0.1.7. Earlier versions silently drop the URL and render every item as `href="#"`. Run `wiremd --version` if you're unsure.

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

::: alert success
Changes saved successfully.
:::

::: alert info
Your trial ends in 3 days.
:::

::: alert warning
This action cannot be undone.
:::

::: alert error
Something went wrong. Please try again.
:::

::: modal
## Confirm Delete
Are you sure you want to delete this item?

[Delete]{variant:danger}  [Cancel]
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

### Nested containers (now supported)

Containers can be nested — the parser handles them recursively:

```markdown
::: card
### Stats

::: alert success
All systems operational.
:::

View details below.

:::
```

A common real-world pattern — card with a header row and content:

```markdown
::: card

::: columns-2
::: column Sprint: Q2 Onboarding

:::
::: column .right

Started: Apr 1 · ((Due: Apr 30)){.warning}

:::
:::

Before you can pitch to a decision maker, you need to get past the gatekeeper.

((Prospecting and Outreach))

:::
```

Tabs can contain grids, rows, and any other containers:

```markdown
::: tabs

::: tab Overview

::: row {.right}
[Search_______________]{type:search}
[All Teams___________v]

- All Teams
- Team A

:::

::: columns-3 card
::: column :chart: Sessions
**163**
:::
::: column :user: Active Users
**42**
:::
::: column :star: Avg Score
**87%**
:::
:::

:::

::: tab Details
Content here.
:::

:::
```

**Note:** When the last line inside a container has inline code spans, bold, or links, add a blank line before the closing `:::` to avoid parser ambiguity.

---

## Sidebar layout

Two-column layout with a fixed 200px sidebar and fluid main area:

```markdown
::: sidebar

[[Dashboard](#)]
[[Sessions](#)]
[[Library](#)]
[[Settings](#)]

:::

### Page Title

Content for the main area goes here.

| Col A | Col B | Col C |
|-------|-------|-------|
| Data  | Data  | Data  |
```

---

## Row

`::: row` lays out its children horizontally. Use it for filter toolbars, search+action bars, or any group of inputs/buttons on one line.

```markdown
::: row
[Search_______________]{type:search}
[All Teams___________v]

- All Teams
- Team A
- Team B

:::
```

Add `{.right}` to push content to the right edge:

```markdown
::: row {.right}
[+ New Item]*
:::
```

Rows can be nested inside grids, cards, or tabs.

If a specific widget (search input, dropdown) fails to render inside `::: row`, confirm `wiremd --version` — several row edge cases were fixed in 0.1.7. Fallback: move the problem input out of the row and into block-level form layout.

---

## Columns

Columns use explicit `::: column` child containers inside a `::: columns-N` container. Put a title on the opener, like `::: column Billing address`, to render a heading at the top of that column.

**Layout only** (equal columns, no card chrome — use for metrics, stats, KPI rows):
```markdown
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
```

**Columns of cards** (each item gets card styling — use for feature lists, channel breakdowns):
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

Add `card` after the column count to get card chrome; omit it for plain layout columns.

Supported widths: `columns-2`, `columns-3`, `columns-4`, `columns-5`

### Section header with right-aligned action

The most common `columns-2` pattern: title on the left, action button on the right.

```markdown
::: columns-2
::: column Recent Sessions

:::
::: column .right

[View All]*

:::
:::
```

The `.right` modifier aligns the column's content to the right. A `::: column` can be empty or contain controls without a heading:

```markdown
::: columns-2
::: column

Left cell content with no heading.

:::
::: column .right

[+ New Item]*

:::
:::
```

### KPI metrics row

`::: column Title` + `**bold metric**` + supporting text is the standard pattern for stat/KPI columns:

```markdown
::: columns-3
::: column Total Revenue
**$124,500**
↑ 8% vs last period

:::
::: column Active Users
**3,842**
↑ 12% vs last period

:::
::: column Conversion Rate
**4.2%**
↓ 0.3% vs last period

:::
:::
```

### Column spans

```markdown
::: column Featured Item {.span-2}
Spans two columns.
:::
```

```markdown
::: column Featured Item {.span-2}
Spans two columns.
:::
```

---

## Icons

Use `:name:` anywhere — in headings, nav, buttons, table cells, text.

Common icons: `:home:` `:user:` `:gear:` `:chart:` `:bell:` `:shield:` `:rocket:` `:check:` `:x:` `:logo:` `:search:` `:edit:` `:trash:` `:plus:` `:arrow-right:`

---

## Badges / Pills

Double parentheses create inline status labels, counts, and tags:

```markdown
((Active))
((Active)){.success}
((3)){.warning}
((Failed)){.error}
((New)){.primary}
Status: ((Active)){.success}
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
| Charlie | Viewer | Active  | [Edit] [Remove] |
```

---

## Progress bars

Visual progress indicator using `#` for filled and `_` for empty:

```markdown
Storage [##########________] 60%
Upload  [####______________] 20%
Done    [##################] 100%
```

---

## Component mapping (JSX / HTML → wiremd)

| Component | wiremd |
|-----------|--------|
| `<Button variant="primary">` | `[Label]*` |
| `<Button variant="secondary">` | `[Label]{.secondary}` |
| `<Button variant="danger">` | `[Label]{variant:danger}` |
| `<Button disabled>` | `[Label]{state:disabled}` |
| `<Input placeholder="...">` | `[placeholder___________]` |
| `<Input type="password">` | `[*********************]` |
| `<Textarea rows={4}>` | `[Placeholder...]{rows:4}` |
| `<Select>` / `<Combobox>` | `[Option___________v]` + list items |
| `<Checkbox>` | `- [ ] Label` / `- [x] Label` |
| `<RadioGroup>` | `- ( ) Option` / `- (*) Selected` |
| `<Table>` | markdown table |
| `<Card>` | `:::card` block |
| `<Dialog>` / `<Modal>` | `:::modal` block at bottom of file |
| `<Alert variant="success">` | `:::alert success` |
| `<Badge>` / `<Chip>` / status pill | `((Label)){.variant}` |
| Flex row of cards | `::: columns-3 card` … `:::` |
| Stats row (no card) | `::: columns-3` … `:::` |
| Horizontal filter/toolbar | `::: row` … `:::` |
| Right-aligned action row | `::: row {.right}` … `:::` |
| Section header + right action | `::: columns-2` with `### Title` + `::: column .right` |
| `<Tabs>` | `::: tabs` with `::: tab Label` children |
| `<Tabs>` (multi-page) | one `.md` file per tab |
| Loading state | `> **Loading state:** spinner + "Loading..."` |
| Empty state | `> **Empty state:** "No items yet" + [Add Item]*` |
| Error state | `:::alert error` block or `{state:error}` on input |
| Sidebar + main | `::: sidebar` before page content |

---

## Annotations

Use blockquotes for design notes, open questions, and state descriptions:

```markdown
> **Loading state:** Spinner + "Loading sessions..." text

> **Empty state:** Illustration + "No sessions yet" + [Start Session]*

> **Design question:** Should this be a modal or inline expansion?

> **Note:** This panel is only visible to Admin users.
```

---

## Standard markdown

All standard markdown works: `# headings`, `**bold**`, `*italic*`, `` `code` ``, `[links](url)`, `![images](src)`, `- lists`, `1. ordered`, `> blockquotes`, `---` horizontal rules.

---

## Inline comments

Use standard HTML comments to annotate any component. Comments appear in a **fixed side panel**; the annotated element gets a yellow outline and a numbered badge.

```markdown
<!-- Is this the right CTA? @tobias -->
[Sign Up]*

<!-- Stack consecutive comments → single thread card with divider in the panel -->
<!-- Agreed — align with marketing copy. @sara -->
[Login]*

<!-- Comment ABOVE a container annotates the whole thing (yellow border on entire card) -->
::: card
### Free Plan
[Get Started]
:::

::: card
<!-- Comment INSIDE a container annotates the specific child that follows it -->
[Learn more]
:::
```

- Place the comment **above** what you want to annotate — it attaches to the next sibling element
- Comment **above** a `:::card`, `:::columns-2`, `:::tabs`, etc. outlines the whole block; comment **inside** annotates the specific child that follows
- Consecutive comments above the same element group into one thread card with dividers
- Comments between `:::tab` blocks annotate the tab that follows
- Comments before a column or row item annotate that item
- Multiline comments are supported: `<!--\nLine 1\nLine 2\n-->`
- The **💬 Comments** button in the CLI toolbar / editor / VS Code toggles visibility
- CLI static output: hidden by default; pass `--show-comments` to include them

---

## Visual styles (--style flag)

| Style | Description | Best for |
|-------|-------------|----------|
| `sketch` | Balsamiq-inspired hand-drawn (default) | Early-stage ideation |
| `clean` | Modern minimal | Stakeholder handoff, PM review |
| `wireframe` | Traditional grayscale with hatching | Low-fidelity explorations |
| `material` | Google Material Design with elevation | Material Design apps |
| `tailwind` | Utility-first with purple accents | Tailwind-based products |
| `brutal` | Bold brutalist style | Bold, high-contrast concepts |
| `none` | Unstyled semantic HTML | Custom CSS, embedding |

---

## File includes

Inline another `.md` file using Obsidian-style include syntax:

```markdown
![[shared/nav.md]]
![[components/sidebar.md]]
```

The path resolves relative to the current file. Works in both the CLI and the VS Code preview — content is spliced in before parsing. If the file doesn't exist, a warning blockquote is rendered in its place.

Useful for shared navigation, repeated components, or splitting a large wireframe into smaller files.
