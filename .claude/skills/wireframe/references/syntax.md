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

**Note:** `[Text](url)` links inside `[[ ]]` blocks drop the href — all items render as `href="#"`. For clickable tab bars, use plain markdown links instead (see below).

---

## Tab bars (within a page)

Since `[[ ]]` doesn't support hrefs and `:::tabs` is not implemented, render tab navigation with plain markdown links:

```markdown
**Active Tab** · [Other Tab](other.html) · [Third Tab](third.html)
```

Bold = active tab. Plain links for inactive tabs. Tab links use just the filename since all tabs share the same directory.

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
- [Home](../home.html)
- [Settings](../settings.html)
- [Logout](#)
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

**Note:** When the last line inside a container has inline code spans, bold, or links, add a blank line before the closing `:::` to avoid parser ambiguity.

---

## Sidebar-main layout (custom feature)

Two-column layout with a fixed 200px sidebar and fluid main area:

```markdown
::: layout {.sidebar-main}
## Sidebar {.sidebar}
- [Dashboard](#)
- **[Sessions](#)**
- [Library](#)
- [Settings](#)

## Main {.main}
### Page Title

Content for the main area goes here.

| Col A | Col B | Col C |
|-------|-------|-------|
| Data  | Data  | Data  |

:::
```

The `## Sidebar {.sidebar}` and `## Main {.main}` headings are stripped from output — they serve only as section markers. Everything between them becomes the respective panel.

---

## Grids

Grid items are `###` headings (and their content) under a `## {.grid-N}` heading.

```markdown
## Features {.grid-3}

### :rocket: Fast
Blazing fast performance.

### :shield: Secure
Enterprise-grade security.

### :gear: Flexible
Works with any stack.
```

Supports: `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto` (auto-fit columns)

---

## Icons

Use `:name:` anywhere — in headings, nav, buttons, table cells, text.

Common icons: `:home:` `:user:` `:gear:` `:chart:` `:bell:` `:shield:` `:rocket:` `:check:` `:x:` `:logo:` `:search:` `:edit:` `:trash:` `:plus:` `:arrow-right:`

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

## Include files (VS Code extension only)

The VS Code preview supports splicing in other `.md` files:

```markdown
:::display ./shared-nav.md:::
```

This resolves before parsing — the contents of `shared-nav.md` are inlined. Useful for shared navigation or repeated components. The CLI does not support this directive.
