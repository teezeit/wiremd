<!-- regression: text on the line directly before a nested `::: card` opener
     prevents the opener from being recognized — it gets folded into the
     preceding paragraph, and downstream closers are misaligned. -->
::: card
# Outer
some text directly before the inner opener
::: card
## Inner
[Action]*

:::

:::
