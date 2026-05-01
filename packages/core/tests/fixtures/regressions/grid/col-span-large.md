<!-- regression: `{.col-span-N}` for N > 4 doesn't actually span N columns
     in the rendered output (caps at some lower value). The AST should
     carry the requested span; renderer/CSS should honor it. -->
::: grid-7 card
### Starter {.col-span-5}
spans five
### Pro {.col-span-1}
spans one

:::
