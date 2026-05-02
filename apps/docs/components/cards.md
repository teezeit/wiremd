![[_sidebar.md]]
# Cards & Containers

Generic containers wrap content in a styled block. The container type controls its visual treatment.

---

## Card

A bordered box with padding. The most common container for grouping related content.

::: demo
::: card
### Getting Started
Everything you need to build your first wireframe in minutes.
[Read the guide] [View examples]*

:::

:::

## Card Columns

Add `card` after `::: columns-N` to apply card styling to each column item.

::: demo
::: columns-3 card
::: column Free
$0 / month
- 1 user
- 5 projects

[Get Started]

:::
::: column Pro
$12 / month
- 10 users
- Unlimited projects

[Start Trial]*

:::
::: column Enterprise
Custom pricing
- Unlimited users
- SLA support

[Contact Sales]

:::
:::

:::

---

## Hero

Full-width section with a gradient background. Ideal for page headers and landing sections.

::: demo
::: hero
# Build wireframes in Markdown

Prototype UIs with plain text — no design tools needed.

[Get Started]* [View Examples]

:::

:::

---

## Modal

A centred dialog panel. Use for confirmations, forms, and alerts.

::: demo
::: modal
### Delete project?

This will permanently delete **Acme Redesign** and all its files. This action cannot be undone.

[Cancel] [Delete]{danger}

:::

:::

---

## Section

A generic content block — lighter than a card, no border. Use for grouping page regions.

::: demo
::: section
## Recent Activity

| User | Action | Time |
|------|--------|------|
| Alice | Created project | 2 min ago |
| Bob | Left a comment | 15 min ago |
| Clara | Uploaded file | 1 hr ago |

:::

:::

---

## Footer

A footer bar, typically at the bottom of a page or card.

::: demo
::: footer
© 2025 Acme Inc. — [Privacy] [Terms] [Contact]
:::

:::

---

## Empty State

Shown when a list or page has no content yet.

::: demo
::: empty-state
### No projects yet

Create your first project to get started.

[+ New Project]*

:::

:::

---

## Loading State

Placeholder shown while content is being fetched.

::: demo
::: loading-state
Loading projects...
:::

:::

---

## Error State

Shown when something goes wrong.

::: demo
::: error-state
### Failed to load

Could not connect to the server. Check your connection and try again.

[Retry]*

:::

:::

---

## Syntax

```
::: card
::: hero
::: modal
::: section
::: footer
::: empty-state
::: loading-state
::: error-state
::: columns-3 card    card columns
::: column
::: columns-2         layout columns (no card chrome)
```
:::
