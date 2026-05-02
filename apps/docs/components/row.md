![[_sidebar.md]]
# Row

`::: row` creates a horizontal flex row. Use it to align buttons, filters, or any inline elements.

## Basic Row
::: demo
::: row
[All]* [Active] [Archived]
:::
:::

## Row with Alignment

Add `{right}` or `{center}` to align all content.
::: demo
::: row {right}
[Export] [+ New Item]*
:::
:::
::: demo
::: row {center}
Page 1 of 12   [← Prev] [Next →]
:::
:::

## Vertical Alignment

Add `{top}` or `{bottom}` to align mixed-height row items on the cross axis.
::: demo
::: row {bottom}
[Notes...]{rows:3}

[Cancel] [Save]*
:::
:::

## Split Layouts

Use columns when one side needs to stay left while another side aligns right.
::: demo
::: columns-2
::: column
[All]* [Active] [Archived]

:::
::: column {right}
[+ New Item]*
:::
:::
:::

## Mixed Content

Text, badges, icons, and buttons can be combined freely in a row.
::: demo
::: row
Inbox ((24)){primary}
:::
:::
::: demo
::: row
:check:

All systems operational ((Live)){success}
:::
:::
::: demo
::: row
:user:

John Doe ((Admin)){warning}

[Edit] [Remove]{danger}
:::
:::

## Search and Filters
::: demo
::: row
[Search___________]{type:search} [All Teams_______] [This Week_______]
:::
:::

## Toolbar Pattern

Use a row for a simple toolbar. For a title on the left and actions on the right, use `::: columns-2` with an aligned column item.
::: demo
::: columns-2
::: column
**Projects** ((12)){primary}

:::
::: column {right}
[Filter] [Sort] [+ New Project]*
:::
:::
:::

## Syntax

```
::: row
[A] [B] [C]           implicit items, left-aligned
:::
::: row {right}       right-align all content
::: row {center}      center all content
::: row {bottom}      bottom-align mixed-height items

::: columns-2           split left/right content into columns
::: column
[A] [B] [C]
:::
::: column {right}
[Save]*
:::
:::
```
