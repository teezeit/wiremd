![[_sidebar.md]]
# Page Layouts

wiremd supports three common page structure patterns: top nav, sidebar + main, and the combined navbar + sidebar + main used in most dashboards.

---

## Top Nav Layout

Place a `[[ ... ]]` navbar above your content. No wrapper container needed — the navbar sits at the top of the page.

::: demo
[[ Acme | [Home](./index.md) | Products | Pricing | [Login] | [Sign Up]* ]]

## Welcome to Acme

Build faster with our platform.

::: columns-3 card
::: column Feature One
Description of the first feature goes here.

:::
::: column Feature Two
Description of the second feature goes here.

:::
::: column Feature Three
Description of the third feature goes here.

:::
:::

:::

## Top Nav with Right-aligned Actions

Use a `::: row` with `{.right}` to push actions to the right inside a card or section:

::: demo
[[ App | [Dashboard] | [Projects] | [Team] | [Settings] | [Logout] ]]

::: row {.right}
[+ New Project]*
:::

## Projects

| Name | Status | Updated |
|------|--------|---------|
| Alpha | ((Active)){.success} | Today |
| Beta | ((Review)){.warning} | Yesterday |
| Gamma | ((Draft)) | 3 days ago |

:::

---

## Sidebar Layout

Place a `::: sidebar` block before page content to create a two-column layout with a fixed sidebar and a main content area.

::: demo
::: sidebar
**App**

[Dashboard]*
[Projects]
[Settings]

:::
## Dashboard

Welcome back! Here's what's happening.

:::

## Sidebar with Sections

::: demo
::: sidebar
**Acme Co.**

#### Workspace
[Overview]*
[Projects]
[Tasks]
[Calendar]

#### Team
[Members]
[Roles]

---

[Logout]

:::
## Overview

::: columns-3 card
::: column Tasks Done
**48** this week

:::
::: column In Progress
**12** open

:::
::: column Upcoming
**5** due today

:::
:::

:::

---

## Navbar + Sidebar Layout

The most common dashboard pattern: combine a top navbar with a `::: sidebar` below it.

::: demo
[[ App | [Dashboard] | [Notifications] | [Settings] | [JD] ]]

::: sidebar
#### Main
[Dashboard]*
[Projects]
[Tasks]

#### Admin
[Users]
[Billing]

---

[Logout]

:::
## Dashboard

::: columns-3 card
::: column Revenue
**$12,400**
+8% this month

:::
::: column Users
**1,240**
+23 this week

:::
::: column Open Tasks
**34**
5 due today

:::
:::

:::

---

## Reusing Layouts

For multi-page wireframes, extract the sidebar to a shared file and include it on every page:

```
![[_sidebar.md]]
```

Full page pattern:

```
![[_sidebar.md]]
Page content here.
```

---

## Syntax Reference

```
[[ Brand | Link | Link | [Action]* ]]    top navbar

::: sidebar                            sidebar + main
nav content
:::
page content

[[ Brand | Nav | [Action]* ]]           navbar + sidebar + main
::: sidebar
nav content
:::
page content
```
