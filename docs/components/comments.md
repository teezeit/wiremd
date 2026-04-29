::: layout {.sidebar-main}

![[_sidebar.md]]

::: main

# Inline Comments

Use standard HTML comment syntax to annotate any component. Comments render as yellow sticky-note callouts in the preview.

## Basic usage

Place a comment on the line directly above the component you want to annotate.

::: demo
<!-- Is this the right CTA? -->
[Sign Up]*
:::

## Inside a container

Inside a `:::` block, the comment pins to the specific child that follows it — not the container.

::: demo
::: card
### Login

<!-- Is "Login" or "Sign In" the right label? -->
[Login]*
:::
:::

## Multiple comments on one component

Stack comments above the same component to create a thread. Each `<!-- -->` becomes a separate callout.

::: demo
<!-- Should this be "Sign In" instead? @tobias -->
<!-- Agreed — let's align with the marketing copy @sara -->
[Login]*
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

Comment text is freeform — any text is valid.

Comments are shown by default everywhere. To hide them:

- **Editor** — use the **Comments** toggle in the preview toolbar
- **VS Code** — click **💬 Comments On/Off** in the preview toolbar
- **CLI** — pass `--hide-comments` to strip them from output

```bash
# CLI hides comments by default — use --show-comments to include them
wiremd my-screen.md --show-comments -o annotated-output.html
```

:::

:::
