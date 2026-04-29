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

## Multiple comments on one component

Stack comments above the same component to create a thread. Each `<!-- -->` becomes a separate callout.

::: demo
<!-- Should this be "Sign In" instead? @tobias -->
<!-- Agreed — let's align with the marketing copy @sara -->
[Login]*
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

| Context | Default | Override |
|---------|---------|----------|
| Web editor | visible | "Show comments" toggle in preview toolbar |
| VS Code | visible | 💬 Comments On/Off button in preview toolbar |
| CLI | **hidden** | `--show-comments` flag |

```bash
# Comments are stripped from CLI output by default
wiremd my-screen.md -o output.html

# Pass --show-comments to include them
wiremd my-screen.md --show-comments -o annotated-output.html
```

:::

:::
