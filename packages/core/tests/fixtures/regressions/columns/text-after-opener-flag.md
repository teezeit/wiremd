<!-- regression: free text after the `card` flag on a `::: columns-N card`
     opener line should be ignored or rejected. Currently the trailing
     text consumes the `card` flag, so the grid renders without card
     chrome. -->
::: columns-3 card extra trailing text
::: column
### Fast
content
:::
::: column
### Simple
content
:::
::: column
### Flexible
content

:::
:::
