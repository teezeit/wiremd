![[_sidebar.md]]
# Buttons

Square brackets create a button. Add `*` for primary variant.

## Basic
::: demo
[Cancel] [Save]*
:::

## Variants
::: demo
[Default] [Primary]* [Secondary]{secondary} [Danger]{danger}
:::

## Disabled
::: demo
[Submit]{disabled}
:::

## Sizes

::: demo
[Small]{small} [Default] [Large]{large}
:::

## With Icons
::: demo
[:search: Search] [+ New Item]* [Delete]{danger}
:::

## Syntax

```
[Label]                      default button
[Label]*                     primary (preferred shorthand)
[Label]{primary}             primary
[Label]{secondary}           secondary
[Label]{danger}              danger/destructive
[Label]{disabled}            disabled
[Label]{loading}             loading
[Label]{large}               large
[Label]{small}               small
[A] [B] [C]                  inline action row
```

> **Advanced:** `{variant:primary}` / `{state:disabled}` still work. Dot-prefixed tokens like `{.primary}` are raw CSS classes.
