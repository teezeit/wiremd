![[_sidebar.md]]
# Alignment

Alignment tokens control how items are positioned inside `:::row` and `:::column` containers. They work on both axes and compose freely.

## Horizontal — Row

`{right}` and `{center}` justify all items in a row. The default is left.
::: demo
::: row
[Export] [Filter]
:::
:::
::: demo
::: row {center}
[Export] [Filter]
:::
:::
::: demo
::: row {right}
[Export] [Filter]
:::
:::

## Horizontal — Column

`{left}`, `{center}`, and `{right}` align a column's content within the grid.
::: demo
::: columns-3
::: column {left}
[Left]*
:::
::: column {center}
[Center]*
:::
::: column {right}
[Right]*
:::
:::
:::

## Vertical — Row

`{top}` and `{bottom}` control cross-axis alignment when items in a row have different heights. The default is `center`.
::: demo
::: row {top}
[Notes...]{rows:3}

[Cancel] [Save]*
:::
:::
::: demo
::: row {bottom}
[Notes...]{rows:3}

[Cancel] [Save]*
:::
:::

## Vertical — Column

`{top}` and `{bottom}` pin an individual column to the top or bottom of the row, regardless of sibling height.
::: demo
::: columns-2
::: column {top}
### Title
Short content here.

:::
::: column {bottom}
[Save]*
:::
:::
:::

## Syntax

```
::: row {right}         justify all items to the right
::: row {center}        center all items
::: row {top}           top-align all items (cross axis)
::: row {bottom}        bottom-align all items (cross axis)

::: column {left}       align column content to the left
::: column {center}     align column content to the center
::: column {right}      align column content to the right
::: column {top}        pin column to top of row
::: column {bottom}     pin column to bottom of row
```
