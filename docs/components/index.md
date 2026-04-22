::: layout {.sidebar-main}

![[_sidebar.md]]

::: main

# wiremd Components

wiremd converts Markdown with extended syntax into visual wireframes. Use these components to prototype UIs directly in your editor.

::: grid-3 card

### Components
Buttons, inputs, badges, tabs, alerts, navigation, cards, and tables — all from plain text.
[[Browse →](./buttons.md)]

### Layout
Arrange content with grid, row, and sidebar+main layouts.
[[Browse →](./grid.md)]

### Advanced
Button links, file includes, attributes and custom classes.
[[Browse →](./button-links.md)]

:::

## Best Practices

1. **Label inputs** — put label text on the line directly above the input, no blank line between them
2. **Use semantic headings** — `#` for page title, `##` for sections, `###` for grid/tab items
3. **Use `{variant:primary}` not `{.primary}`** — dot-class syntax adds raw CSS classes with no built-in styling
4. **Use `{state:disabled}` on buttons** — `{disabled}` is silently ignored on buttons; use `{state:disabled}` instead
5. **Group related items with containers** — `:::card`, `:::grid-N`, `:::row` to organise content
6. **One `:::` container can nest inside another** — track depth; the inner `:::` closes its own block only

## Quick Example

::: demo

## Sign In

Email
[_____________________________]{type:email required}

Password
[_____________________________]{type:password required}

- [ ] Remember me

[Sign In]* [Forgot password?]

:::

:::

:::
