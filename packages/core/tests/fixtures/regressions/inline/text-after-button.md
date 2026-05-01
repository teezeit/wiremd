<!-- regression: text on the line immediately following a `[Button]` is
     folded into the same paragraph as the button. Authors expect a button
     to terminate its line; the parser treats button + text as one block. -->
::: card
[Action]*
this text should be a separate paragraph below the button

:::
