::: layout {.sidebar-main}

![[_sidebar.md]]

::: main

# Buttons

Square brackets create a button. Add `*` for primary variant.

## Basic

::: demo
[Cancel] [Save]*
:::

## Variants

::: demo
[Default] [Primary]* [Secondary]{.secondary} [Danger]{.danger}
:::

## Disabled

> **TODO:** `{disabled}` sets `props.disabled` but renderer checks `props.state === 'disabled'` — fix renderer or unify

::: demo
[Submit]{disabled}
:::

## Sizes & Custom Classes

> **TODO:** `{.large}` / `{.small}` classes are applied but no CSS rules exist for them

::: demo
[Small]{.small} [Default] [Large]{.large}
:::

## With Icons

::: demo
[:search: Search] [+ New Item]* [Delete]{.danger}
:::

## Syntax

```
[Label]            default button
[Label]*           primary button
[Label]{.danger}   danger variant
[Label]{disabled}  disabled state
[A] [B] [C]        button group (inline)
```

:::

:::
