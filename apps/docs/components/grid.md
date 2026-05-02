![[_sidebar.md]]
# Columns

`::: columns-N` creates an N-column layout. Child `::: column` blocks become column items.

## Layout Columns (no card chrome)

Useful for multi-column forms or content — no visual borders on items.
::: demo
::: columns-2
::: column
### Billing address
First name
[_____________________________]{required}

Last name
[_____________________________]{required}

:::
::: column
### Shipping address
First name
[_____________________________]{required}

Last name
[_____________________________]{required}
:::
:::
:::

## Card Columns

Add `card` after the column count to give each item card styling.
::: demo
::: columns-3 card
::: column
### Fast
Renders in milliseconds. Works in any editor.

:::
::: column
### Simple
Plain Markdown syntax. No new tools to learn.

:::
::: column
### Flexible
7 styles. Outputs HTML, React, JSON, or Tailwind.
:::
:::
:::

## Column Spanning

Add `.span-N` to a `::: column` opener to span multiple columns.
::: demo
::: columns-3 card
::: column .span-1
### Starter
$9 / month

:::
::: column .span-2
### Pro
$29 / month — most popular, spans two columns
:::
:::
:::

## Two-column Layout
::: demo
::: columns-2 card
::: column
### What you get
- Unlimited wireframes
- 7 visual styles
- VS Code extension
- CLI tool

:::
::: column
### What you don't need
- Figma licence
- Design skills
- Build step
:::
:::
:::

## Alignment

Add `.left`, `.right`, or `.center` to a `::: column` opener to align that column. Useful for action bars: filters on the left, primary action on the right.
::: demo
::: columns-2
::: column

[reset] [Search___________]{type:search}

:::
::: column .right

[+ New Sprint]*
:::
:::
:::

## Syntax

```
::: columns-2
::: column First column
:::
::: column Second column
:::

::: columns-3 card     three columns with card borders
::: column Item title {.span-2}
spans 2 columns
:::
::: column .right      shrink column and push to right edge
:::
::: column .left       push to left edge
:::
::: column .center     center
:::
```

:::
:::
:::
