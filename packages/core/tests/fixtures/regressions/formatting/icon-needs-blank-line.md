<!-- regression: `:icon:` on a line directly above content with badges/buttons
     fails to render as an icon — it gets absorbed into the surrounding
     paragraph as text. The same syntax with a blank line after IS
     recognized. The parser shouldn't depend on a paragraph break here. -->
::: row
:user: 
John Doe |Admin|{.warning}
[Edit] [Remove]{.danger}

:::
