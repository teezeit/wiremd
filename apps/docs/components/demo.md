![[_sidebar.md]]
# Demo Blocks

`::: demo` renders wiremd content as a split pane — rendered output on the left, raw source on the right. Write once, no duplication.

## Basic Usage
::: demo
[Primary]* [Secondary] [Danger]{variant:danger}
:::

## With a Form
::: demo
Email
[_____________________________]{type:email required}

Password
[_____________________________]{type:password required}

[Sign In]* [Forgot password?]
:::

## With Columns
::: demo
::: columns-3 card
::: column Free
$0/mo
[Get Started]

:::
::: column Pro
$12/mo
[Start Trial]*

:::
::: column Enterprise
Custom
[Contact Sales]
:::
:::
:::

## Syntax

```
::: demo
...any wiremd content...
:::
```

Works with any wiremd component: buttons, inputs, columns, tabs, badges, navigation, cards. The source pane always shows exactly what you typed.

> **Note:** `::: demo` is rendered by the wiremd CLI and VS Code extension. It is not rendered by VitePress — this page itself is served via `wiremd --serve`.
