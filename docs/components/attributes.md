::: layout {.sidebar-main}

![[_sidebar.md]]

::: main

# Attributes & Classes

Any wiremd element accepts `{...}` after it to add classes, attributes, and modifiers.

## CSS Classes

Add `.classname` to attach a CSS class:

::: demo
[Primary]{.primary} [Danger]{.danger} [Large]{.large}
:::

> **TODO:** `{.primary}` and `{.danger}` on buttons are applied as raw CSS classes, not as the `variant` property. Only the `*` shorthand (`[Button]*`) reliably sets `variant: 'primary'` and gets full style treatment. Custom classes like `.large` are passed through but have no built-in CSS definition.

## Key-value Attributes

Add `key:value` pairs for HTML attributes:

::: demo
Email
[_____________________________]{type:email required}
:::

## Combining Classes and Attributes

::: demo
[Submit]{.primary type:submit disabled}
:::

> **TODO:** `{type:submit}` on buttons is **not implemented** — the `type` property is defined in the AST but never parsed from attributes or rendered to HTML. `{disabled}` on buttons is also silently ignored; use `{:disabled}` (state syntax) instead. The example above does not fully render as intended.

## On Containers

Attributes on `:::` containers add classes to the wrapper element:

::: demo

::: card {.featured}
### Featured Plan
The most popular choice for growing teams.
[Get Started]*
:::

:::

## On Headings

::: demo
## Section Title {.muted}
:::

## On Grid Items

Use `{.col-span-N}` on `###` headings inside a grid:

::: demo

::: grid-3 card

### Starter {.col-span-1}
$9/mo

### Pro {.col-span-2}
$29/mo — spans two columns

:::

:::

## Common Modifiers

| Modifier | Effect |
|----------|--------|
| `{.primary}` | Primary variant (blue) |
| `{.secondary}` | Secondary variant |
| `{.danger}` | Danger / destructive |
| `{disabled}` | Disabled state on inputs/textarea — **TODO:** use `{:disabled}` for buttons |
| `{required}` | Required field marker (inputs and textarea only) |
| `{.col-span-N}` | Grid column span |
| `{.left}` / `{.right}` / `{.center}` | Alignment in row/grid |
| `{type:email}` | Input type |
| `{rows:N}` | Textarea row count |
| `{placeholder:"..."}` | Input placeholder text (**TODO:** quoted values with spaces may not parse correctly — prefer `{placeholder:hint}` without quotes for single words) |

## Syntax

```
[Button]{.classname}
[Button]{.class1 .class2}
[Input]{type:email required}
[Input]{.primary type:submit disabled}
::: container {.classname}
## Heading {.muted}
### Grid item {.col-span-2}
```

:::

:::
