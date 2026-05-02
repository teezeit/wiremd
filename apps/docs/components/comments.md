![[_sidebar.md]]
# Inline Comments

Use standard HTML comment syntax to annotate components. Comments appear in a fixed side panel with numbered badges on annotated elements — keeping your wireframe clean while surfacing reviewer notes.

## Basic usage

Place a comment on the line directly above the component you want to annotate. The annotated element gets a yellow outline and a numbered badge; the comment text appears in the side panel.

::: demo
<!-- Is this the right CTA? -->
[Sign Up]*
:::

## Threads — multiple comments on one element

Stack consecutive comments above the same component to create a thread. All messages group into a single panel card with dividers.

::: demo
<!-- Should this be "Sign In" instead? @tobias -->
<!-- Agreed — let's align with the marketing copy. @sara -->
[Login]*
:::

## Annotating a whole card

Place the comment **above** the `:::card` block to outline the entire card. A comment **inside** the block annotates only the specific child that follows it.

::: demo
<!-- Does this card need a footer action? -->
::: card
### Free Plan
1 user · 5 projects

[Get Started]

:::
:::
::: demo
::: card
### Pro Plan
<!-- Is $12/mo the right price point? @tobias -->
**$12/mo** · unlimited

[Start Trial]*

:::
:::

## Annotating a whole grid column

Place the comment above the column heading to outline that column.

::: demo
::: grid-2
### Current design

The existing layout. Works but feels dated.

<!-- Needs a full rethink — too much whitespace. @sara -->
### Proposed design

Tighter spacing, stronger hierarchy.

:::
:::

## Comments between tabs

A comment placed between `:::tab` blocks annotates the tab that follows it.

::: demo
::: tabs
::: tab Overview
## Product Overview

[Get Started]*

:::

<!-- Do we need this tab at all? @tobias -->
::: tab Details
- Feature A
- Feature B

:::

:::
:::

## Multiline comments

::: demo
<!--
Long annotation spanning
multiple lines.
-->
[Submit]*
:::

## Toggling visibility

| Context | Default | How to toggle |
|---------|---------|---------------|
| Web editor | visible | "Show comments" toggle in preview toolbar |
| CLI serve (`--serve`) | visible | 💬 Comments button in toolbar |
| CLI static output | **hidden** | `--show-comments` flag |

```bash
wiremd my-screen.md -o output.html                    # comments hidden
wiremd my-screen.md --show-comments -o output.html    # comments visible
```
