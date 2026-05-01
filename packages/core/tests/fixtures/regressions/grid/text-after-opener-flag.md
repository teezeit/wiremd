<!-- regression: free text after the `card` flag on a `::: grid-N card`
     opener line should be ignored or rejected. Currently the trailing
     text consumes the `card` flag, so the grid renders without card
     chrome. -->
::: grid-3 card extra trailing text
### Fast
content
### Simple
content
### Flexible
content

:::
