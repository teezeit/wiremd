<!-- regression: `{span-N}` for N > 4 doesn't actually span N columns
     in the rendered output (caps at some lower value). The AST should
     carry the requested span; renderer/CSS should honor it. -->
::: columns-7 card
::: column {span-5}
### Starter
spans five
:::
::: column {span-1}
### Pro
spans one

:::
:::
