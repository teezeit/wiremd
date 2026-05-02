![[_sidebar.md]]
# Attributes

Any wiremd element accepts `{...}` after it to add modifiers, attributes, and advanced CSS classes.

## Semantic Modifiers

Use plain words for common UI intent:
::: demo
[Primary]* [Secondary]{secondary} [Danger]{danger} [Large]{large}
:::

## CSS Classes

Add `.classname` only when you intentionally want a raw CSS class:
```markdown
[Custom]{.featured}
```

## Key-value Attributes

Add `key:value` pairs for HTML attributes:
::: demo
Email
[_____________________________]{type:email required}
:::

## Combining Classes and Attributes
::: demo
[Submit]{primary disabled}
:::

> **Note:** `{type:submit}` on buttons is **not implemented** — the `type` property is defined in the AST but never parsed from attributes or rendered to HTML.

## On Containers

Attributes on `:::` containers add classes to the wrapper element:
```markdown
::: card {.featured}
### Featured Plan
The most popular choice for growing teams.
[Get Started]*
:::
```

## On Headings
```markdown
## Section Title {.muted}
```

## On Column Items

Use `span-N` on `::: column` openers inside columns:
::: demo
::: columns-3 card
::: column Starter {span-1}
$9/mo

:::
::: column Pro {span-2}
$29/mo — spans two columns
:::
:::
:::

## Common Modifiers

| Modifier | Effect |
|----------|--------|
| `{primary}` | Primary variant — use this or `[Button]*` |
| `{secondary}` | Secondary variant |
| `{danger}` | Danger / destructive variant |
| `{large}` / `{small}` | Button size |
| `{disabled}` | Disabled state |
| `{loading}` | Loading state |
| `{error}` / `{success}` / `{warning}` | Status state for inputs, badges, alerts, and similar status UI |
| `{required}` | Required field marker (inputs and textarea only) |
| `::: column {span-N}` | Column span |
| `{left}` / `{right}` / `{center}` on `::: row` or `::: column` | Alignment |
| `{type:email}` | Input type |
| `{rows:N}` | Textarea row count |
| `{placeholder:"..."}` | Input placeholder text (**TODO:** quoted values with spaces may not parse correctly — prefer `{placeholder:hint}` without quotes for single words) |

## How Modifiers Work

Modifiers are parsed left to right inside one `{...}` block. Most authors should use plain tokens because they describe UI intent:

```markdown
[Delete]{danger large disabled}
::: row {right}
::: column Summary {span-2 center}
((Done)){success}
```

For more explicit or integration-focused code, key-value attributes are still supported:

```markdown
[Delete]{variant:danger state:disabled}
[Email___________]{type:email required}
[Notes...]{rows:4 placeholder:"Internal note"}
```

Dot-prefixed tokens are raw CSS class hooks. Use them only when you want the rendered element to carry a custom class for downstream CSS or renderer-specific styling:

```markdown
[Button]{.my-button}
::: card {.highlight-card}
## Heading {.muted}
```

The parser normalizes semantic tokens before rendering. For example, `{danger}` on a button becomes the danger button variant, `{success}` on a badge becomes the success badge variant, and `{span-2 right}` on a column becomes the existing grid span and alignment classes. Dot-prefixed classes are not normalized; they pass through as authored.

## Syntax

```
[Button]{primary large disabled}
[Input]{type:email required}
::: column Column item {span-2 right}
[Button]{.custom-class}
:::
```

## Disambiguation rules

### Button vs. link

```
[Text](url)    link — has (url) after the brackets
[Text]         button — no (url)
```

### Input vs. button

```
[___________]  input — contains underscores
[***********]  password input — contains asterisks
[Text]         button — plain text, no underscores/asterisks
```

### Dropdown vs. input

```
[Select...v]   dropdown — ends with `v` after underscores
[___________]  text input
```

### Badge vs. table cell

```
((Active)){success}    badge — double-parentheses delimiters
| Active |            table cell — spaces and alignment dashes context
```

Inside a table cell, use the same badge syntax: `((Active)){success}`

### Container vs. raw HTML

```
::: card        wiremd container — processed by parser
:::

<div>           raw HTML — passed through unchanged
</div>
```

### Attribute placement

```
[Button]{.class}     immediately after element (preferred)
[Button] {.class}    one space is also valid
                     blank line before {}: NOT applied to element
```
