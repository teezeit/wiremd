# wiremd Quick Reference

> **One-page syntax reference for experienced users**

## Component Syntax

| Component | Syntax | Example |
|-----------|--------|---------|
| **Button** | `[Text]` | `[Click Me]` |
| **Primary Button** | `[Text]*` or `[Text]{primary}` | `[Submit]*` |
| **Text Input** | `[___]` | `[Name___________]` |
| **Email Input** | `[___]{type:email}` | `[Email___]{type:email required}` |
| **Password** | `[***]` or `{type:password}` | `[********]{type:password}` |
| **Textarea** | `[...]{rows:N}` | `[Message...]{rows:5}` |
| **Dropdown** | `[Text___v]` + list | `[Select...v]` |
| **Checkbox** | `- [ ]` / `- [x]` | `- [x] Agree` |
| **Radio** | `- ( )` / `- (*)` | `- (*) Option 1` |
| **Icon** | `:name:` | `:home: :user: :settings:` |
| **Nav Bar** | `[[ A \| B \| C ]]` | `[[ Home \| About \| [Login] ]]` |
| **Nav Link** | `[[ [Text](url) \| ... ]]` | `[[ [About](./about.md) \| ... ]]` |
| **Breadcrumbs** | `[[ A > B > C ]]` | `[[ Home > Products > Item ]]` |
| **Button Link** | `[[Text](url)]` | `[[About](./about.md)]` |
| **Primary Button Link** | `[[Text](url)]*` | `[[Get Started](./start.md)]*` |

## Containers

| Container | Syntax | Usage |
|-----------|--------|-------|
| **Generic** | `::: type ... :::` | Any container block |
| **Card** | `::: card ... :::` | Card component |
| **Hero** | `::: hero ... :::` | Hero section |
| **Alert** | `::: alert {success} ... :::` | variants: `success`, `warning`, `error` |
| **Modal** | `::: modal ... :::` | Dialog/modal |
| **Sidebar** | `::: sidebar ... :::` | Sidebar navigation |
| **Footer** | `::: footer ... :::` | Footer section |

## Layouts

| Layout | Syntax | Notes |
|--------|--------|-------|
| **Columns (layout only)** | `::: columns-3` with `::: column` children | Equal columns, no styling on items |
| **Columns (card chrome)** | `::: columns-3 card` with `::: column` children | Items rendered as styled cards |
| **2 Columns** | `::: columns-2` | |
| **3 Columns** | `::: columns-3` | |
| **4 Columns** | `::: columns-4` | |
| **Row** | `::: row` … `:::` | Horizontal flex row, children auto-wrapped |
| **Row (aligned)** | `::: row {right}` / `::: row {bottom}` … `:::` | Horizontal or vertical row alignment |
| **Tabs** | `::: tabs` with `::: tab Label` children | Tabbed panels |
| **Column title** | `::: column Billing address` | Renders a heading at the top of the column |
| **Col span** | `::: column {span-2}` | Item spans 2 columns |
| **Column alignment** | `::: column {right}` / `::: column {center}` / `::: column {top}` / `::: column {bottom}` inside `::: columns-N` | Aligns that column |

Columns are defined by explicit `::: column` child containers inside the `::: columns-N` container.

`::: columns-N` is pure layout — use it for form columns, multi-column text, etc. Add `card` when items should have card chrome (features, pricing, team members).

## Attributes

| Attribute Type | Syntax | Example |
|----------------|--------|---------|
| **Semantic token** | `{name}` | `{danger large disabled}` |
| **Key-Value** | `{key:value}` | `{type:email required}` |
| **State** | `{disabled}` / `{loading}` | `{disabled}` |
| **Combined** | `{primary large disabled}` | `{primary large disabled}` |
| **Raw CSS class** | `{.classname}` | `{.custom-card}` |

Plain tokens describe UI intent and are normalized before rendering. Key-value attributes are explicit props. Dot-prefixed tokens pass through as raw CSS classes for integrations or custom styling.

## Input Types

```markdown
{type:text}      # Default
{type:email}     # Email
{type:password}  # Password
{type:tel}       # Telephone
{type:url}       # URL
{type:number}    # Number
{type:date}      # Date
{type:time}      # Time
{type:search}    # Search
{type:file}      # File upload
{type:color}     # Color picker
```

## Input Attributes

```markdown
{required}           # Required field
{required:true}      # Also valid
{disabled}           # Disabled
{loading}            # Loading
{error}              # Error state
{min:1 max:100}      # Number constraints
{rows:5}             # Textarea rows
{cols:60}            # Textarea columns
```

## Button Variants

```markdown
[Button]                    # Default
[Button]*                   # Primary (asterisk shorthand)
[Button]{danger}            # Danger/destructive
[Button]{disabled}          # Disabled
[Button]{loading}           # Loading
```

> **Advanced:** `{variant:danger}` and `{state:disabled}` are still accepted. Dot-prefixed tokens are raw CSS classes.

## Form Pattern

**⚠️ Critical Rule:** Label text must be **directly above** input (no blank line)

```markdown
## Contact Form

Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Message
[Your message...]{rows:5}

[Submit]* [Cancel]
```

## Navigation Patterns

```markdown
# Simple nav
[[ Home | Products | About | Contact ]]

# Nav with branding and buttons
[[ :logo: Brand | Home | Products | [Sign In] | [Get Started]* ]]

# Nav with active state
[[ Home | *Products* | About ]]

# Breadcrumbs
[[ Home > Products > Category > Item ]]
```

### Multi-file Navigation

When running `wiremd --serve`, clicking a button link navigates to and renders that `.md` file:

```markdown
# Shared navbar (paste in each page)
[[ :logo: MyApp | [Home](./home.md) | [About](./about.md) | [Contact](./contact.md)* ]]
```

The dev server (`--serve <port>`) redirects `/` to the entry file and renders any `.md` on demand — no build step needed between page navigations.

## Columns Pattern

```markdown
::: columns-3 card
::: column Feature 1
Description here

:::
::: column Feature 2
Description here

:::
::: column Feature 3
Description here

:::
:::
```

## Common Examples

### Login Form
```markdown
::: card
### Login

Email
[_____________________________]{type:email required}

Password
[********]{type:password required}

- [x] Remember me

[Log In]* [Forgot Password?]
:::
```

### Dashboard Header
```markdown
[[ :logo: Dashboard | Home | *Analytics* | Reports | :user: User ]]
```

### Alert Messages
```markdown
::: alert success
✅ Changes saved successfully!
:::

::: alert error
❌ Unable to save changes. Please try again.
:::
```

### Stats Columns
```markdown
::: columns-4 card
::: column Users
10,000+

:::
::: column Revenue
$45,231

:::
::: column Orders
1,234

:::
::: column Growth
+12.5%

:::
:::
```

## Standard Markdown

wiremd supports **all standard Markdown** syntax:

- Headings: `#` through `######`
- **Bold**: `**text**`
- *Italic*: `*text*`
- `Code`: `` `code` ``
- Links: `[text](url)`
- Images: `![alt](image.jpg)`
- Lists: `-` or `1.`
- Blockquotes: `>`
- Tables: `| col | col |`
- Horizontal rules: `---`

## Disambiguation Rules

```markdown
[Text](url)      # Link (has URL)
[Text]           # Button (no URL)
[___]            # Input (has underscores)
[***]            # Password input (has asterisks)
[Text___v]       # Dropdown (has 'v' suffix)
```

## Tips

1. **Input width**: Number of `_` characters suggests visual width
2. **Placeholder text**: Put text before underscores: `[Email___________]`
3. **Button rows**: Put related buttons on the same line: `[Save] [Cancel] [Reset]`
4. **Icons in text**: Use anywhere: `### :rocket: Fast Performance`
5. **Columns**: Use explicit `::: column` blocks inside `::: columns-N`
6. **Nested containers**: Containers can be nested inside each other
7. **Blank lines**: No blank line between label and field; add one before closing `:::` after a final list, button/link line, badge, bold text, or inline code

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Input has no label | Put label text directly above (no blank line) |
| Dropdown has no options | Add list items directly after dropdown |
| Columns not working | Use `::: column` child blocks inside `::: columns-N` |
| Closing `:::` renders as text | Add a blank line before the closing `:::` |
| Button looks wrong | Check for `(url)` - that makes it a link |
| Attributes ignored | Put `{...}` immediately after element (space OK) |
