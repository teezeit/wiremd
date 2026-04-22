# wiremd Syntax Guide

This guide covers the wiremd syntax for creating UI wireframes.

## Standard Markdown

wiremd supports **all standard CommonMark Markdown**. Everything below works exactly as expected:

| Syntax | Example |
|--------|---------|
| Headings | `# H1`, `## H2`, `### H3` … `###### H6` |
| Bold | `**bold**` |
| Italic | `*italic*` |
| Code (inline) | `` `code` `` |
| Link | `[text](url)` |
| Image | `![alt](image.jpg)` |
| Unordered list | `- item` |
| Ordered list | `1. item` |
| Blockquote | `> quoted text` |
| Table | `\| col \| col \|` with `---` separator row |
| Horizontal rule | `---` |
| Fenced code block | ` ``` ` … ` ``` ` |

wiremd adds UI components on top — standard Markdown is never broken.

## Basic Syntax

### Headings

Headings define sections and structure:

```markdown
# Page Title
## Section Heading
### Subsection
```

### Buttons

Square brackets create buttons:

```markdown
[Click Me]
[Submit]*
[Submit]{variant:primary}   # Explicit form of primary
[Cancel]{variant:secondary}
[Delete]{variant:danger}
```

### Text Inputs

Underscores create text inputs:

```markdown
[_____________________________]
[_____________________________]{type:email required}
[_____________________________]{placeholder:"Enter your name"}
```

### Textareas

Stacked brackets create textareas:

```markdown
[                             ]
[                             ]
[_____________________________]{rows:5}
```

### Dropdowns/Select

Bracket followed by a list creates a dropdown:

```markdown
Country
[Select a country___________v]
- United States
- Canada
- United Kingdom
```

## Advanced Features

### Classes and Attributes

Add classes with `.classname` (passed through to the rendered HTML element):

```markdown
[Login]{.large}
```

Add attributes with `key:value`:

```markdown
[Email]{type:email required}
```

Combine both:

```markdown
[_____________________________]{type:email required state:error}
```

For button variants, use the `variant` key instead of class syntax — `{.primary}` on a button adds a raw CSS class, not a styled variant:

```markdown
[Submit]*                   # Primary button — preferred
[Submit]{variant:primary}   # Equivalent explicit form
[Delete]{variant:danger}    # Danger variant
[Submit]{state:disabled}    # Disabled state
```

### Badges / Pills

Pipe delimiters create inline badges for status labels, counts, and tags:

```markdown
|Active|
|Active|{.success}
|3|{.warning}
|Failed|{.error}
|New|{.primary}
```

Variants: `success` (green), `warning` (yellow), `error` (red), `primary` (blue). No variant = neutral gray.

Mix with surrounding text:

```markdown
Status: |Active|{.success}

| Name  | Status              |
|-------|---------------------|
| Alice | \|Active\|{.success} |
```

> **Note:** Pipes conflict with Markdown table syntax. Inside a table cell, escape the pipe delimiters with backslashes: `\|Active\|`.

### Inline Containers

Group elements inline with `[[...]]`:

```markdown
[[ Logo | Home | Products | About ]]
```

### Block Containers

Group elements in blocks with `:::`:

```markdown
::: hero
# Welcome
Try our product today
[Get Started]*
:::
```

Containers can be nested — blank lines between blocks let remark separate them:

```markdown
::: modal

::: card

Are you sure you want to delete this item?

[Cancel] [Delete]{variant:danger}

:::

:::
```

Place inline content directly on the opener line to inject it as the first child of the container:

```markdown
::: alert Warning: this action cannot be undone

[Cancel] [Confirm]{variant:danger}

:::
```

### Tabs

`::: tabs` creates a tabbed panel. Child `::: tab Label` containers become tab panels. The first tab is active by default.

```markdown
::: tabs

::: tab Profile
Name
[_____________________________]{required}
:::

::: tab Notifications
- [ ] Email alerts
- [ ] SMS alerts
:::

::: tab Security
[Change Password]
:::

:::
```

### Grid Layouts

`::: grid-N` creates an N-column layout. Child `###` headings become grid items.

**Pure layout grid** — no visual styling on items, useful for form columns or multi-column text:

```markdown
::: grid-2

### Details
Name
[_____________________________]{required}

### Address
Street
[_____________________________]{required}

:::
```

**Card grid** — add `card` to render items with card chrome:

```markdown
::: grid-3 card

### Fast
Lightning quick performance

### Secure
Enterprise-grade security

### Scalable
Grows with your needs

:::
```

### Demo Blocks

`::: demo` renders any wiremd content as a side-by-side split: **left** shows the live rendered components, **right** shows the raw source. Write it once — no duplication needed.

```markdown
::: demo
## Login Form

Username
[_____________________________]{required}

Password
[*****________________________]{required}

- [ ] Remember me

[Sign In]*
[Forgot Password?]
:::
```

Works with any wiremd content: buttons, inputs, grids, tabs, badges, navigation. The code pane always reflects exactly what you wrote.

### Reuse Components

Inline another `.md` file with `![[path]]`:

```markdown
![[components/header.md]]
![[shared/nav.md]]
```

The path resolves relative to the current file. If the referenced file doesn't exist, a warning blockquote is rendered instead. Works in the CLI and the VS Code preview.

### Button Links

Wrap a Markdown link inside button brackets to make a clickable button that navigates:

```markdown
[[Go to Docs](./docs.md)]
[[Get Started](./start.md)]*
```

The `*` suffix makes it a primary button. The `variant` attribute works too:

```markdown
[[Sign Up](./signup.md)]{variant:secondary}
```

When using `wiremd --serve`, clicking a button link renders the target `.md` file in the same browser tab — no build step required. This is the recommended way to wire up multi-page navigation in prototypes.

**Column spanning** — `{.col-span-N}` on a child heading spans multiple columns:

```markdown
::: grid-3 card

### Starter {.col-span-1}
$9/mo

### Pro {.col-span-2}
$29/mo — most popular, spans two columns

:::
```

### Row Layout

`::: row` creates a horizontal flex row where each child becomes a flex item.

**Implicit items** — content directly inside `::: row` is auto-wrapped (no `###` needed):

```markdown
::: row
[All]* [Active] [Archived]
:::
```

**Explicit items** — use `###` headings when you need per-item alignment control:

```markdown
::: row

### {.left}
[All]* [Active] [Archived]

### {.right}
[+ New Item]*

:::
```

**Row-level alignment** — add `{.right}` or `{.center}` to the container to align all content:

```markdown
::: row {.right}
[Export] [+ New Item]*
:::

::: row {.center}
:check: All systems operational
:::
```

- `{.right}` → `justify-content: flex-end`
- `{.center}` → `justify-content: center`
- default → `justify-content: flex-start`

**Item-level alignment** — `{.left}` / `{.center}` / `{.right}` on `###` children uses the margin-push pattern. Works in both `::: row` and `::: grid-N`:

```markdown
::: grid-2

### {.left}
[All]* [Active]

### {.right}
[+ New Item]*

:::
```

## Component Examples

### Forms

```markdown
## Contact Form

Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Message
[                             ]
[                             ]
[_____________________________]{rows:5}

[Send]* [Cancel]
```

### Navigation

```markdown
[[ Logo | Home | Products | Pricing | About | [Login] ]]
```

### Cards

```markdown
::: card
### Product Name
This is a great product that solves your problems.
**$99/month**
[Buy Now]*
:::
```

### Tables

```markdown
| Feature | Basic | Pro |
|---------|-------|-----|
| Users   | 10    | Unlimited |
| Storage | 1GB   | 100GB |
```

## Styling

### Visual Styles

wiremd supports multiple visual styles:

```bash
wiremd file.md --style sketch    # Default Balsamiq-style
wiremd file.md --style clean     # Modern minimal
wiremd file.md --style wireframe # Traditional grayscale
wiremd file.md --style material  # Material Design
wiremd file.md --style tailwind  # Tailwind-inspired
wiremd file.md --style brutal    # Brutalist
```

### Custom Classes

Add custom classes to any element:

```markdown
## Header {.sticky .top}
[Button]{.btn .btn-primary .btn-lg}
```

## Best Practices

1. **Use semantic headings** - Maintain proper heading hierarchy
2. **Add labels** - Put text above inputs to label them
3. **Use attributes** - Specify input types and requirements
4. **Group related items** - Use containers to organize content
5. **Be consistent** - Follow the same patterns throughout

## Tips & Tricks

### Quick Buttons

```markdown
[Yes] [No] [Maybe]
```

### Password Input

```markdown
Password
[_____________________________]{type:password}
```

### Disabled State

```markdown
[Submit]{state:disabled}
```

### Icons (with text)

```markdown
[🔍 Search]
[❤️ Like]
[⚙️ Settings]
```

### Multi-column Layout

```markdown
::: grid-2

### Left Column
Content here

### Right Column
Content here

:::
```

## Common Problems

| Problem | Fix |
|---------|-----|
| Input has no label | Put label text directly above with no blank line |
| Dropdown shows no options | Add list items directly after the dropdown line |
| Grid not rendering | Use `###` headings for grid items inside `::: grid-N` |
| Button rendered as link | Remove the `(url)` — `[Text](url)` is a link, `[Text]` is a button |
| Attribute not applied | Put `{...}` immediately after element (space OK, blank line breaks association) |
| Include not resolving | Check path is relative to the current file and ends in `.md` |

## Next Steps

- [Quick Reference](./syntax.md)
- [API Documentation](../api/)
- [Examples Gallery](../examples/)
