::: layout {.sidebar-main}

![[_sidebar.md]]

::: main

# Inputs

Underscores inside brackets create a text input. A label above the input binds to it as a form group.

## Basic

::: demo
Name
[_____________________________]
:::

## Required

::: demo
Email
[_____________________________]{required}
:::

## Input Types

::: demo
Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

Phone
[_____________________________]{type:tel}

Number
[_____________________________]{type:number}
:::

## With Placeholder

::: demo
Search
[_____________________________]{placeholder:"Search components..."}
:::

## Disabled

::: demo
Username
[_____________________________]{disabled}
:::

## Full Form Example

::: demo

## Create Account

First name
[_____________________________]{required}

Last name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Password
[_____________________________]{type:password required}

[Create Account]* [Cancel]

:::

## Syntax

```
[_____________________________]               basic input
[_____________________________]{required}     required field
[_____________________________]{type:email}   typed input
[_____________________________]{type:password}
[_____________________________]{placeholder:"hint text"}
[_____________________________]{disabled}
```

:::

:::
