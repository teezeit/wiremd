# wiremd

**Write wireframes like you write code.**

wiremd converts Markdown into visual UI mockups — no design tool, no drag-and-drop, no context switch. If you already prototype in your editor and document in Markdown, wiremd fits naturally into that workflow. It's built for developers who need to sketch a screen quickly, share it with a team, or generate a component scaffold, not for designers building pixel-perfect mockups.

## Example

A contact form in a few lines:

```markdown
## Contact Form

Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

[Submit]{.primary} [Cancel]
```

A page layout with navigation and a two-column grid:

```markdown
[[ nav | Logo | Home | About | [Sign in]* ]]

::: grid-2
::: card
## Recent Activity
Content here
:::
::: card
## Quick Actions
[New Project]* [Import]*
:::
:::
```

Both render to styled HTML in seconds.

## Get started

1. **Install** — `npm install -g wiremd` ([full install options](./guide/installation.md))
2. **Write** — create a `.md` file using [wiremd syntax](./reference/syntax.md)
3. **Render** — run `wiremd input.md --serve` to preview in the browser, or `wiremd input.md -o output.html` to export

## Key capabilities

- **Multiple output formats** — HTML, React/JSX, Tailwind, or JSON from the same source file
- **7 visual styles** — sketch, clean, wireframe, material, brutal, and more; switch with `--style`
- **VS Code extension** — live preview panel that updates on save, no terminal required
- **Claude integration** — describe a screen in plain English, Claude generates and renders the wireframe
- **CLI and programmatic API** — use as a build step, in scripts, or directly from Node

## Community

- [GitHub Repository](https://github.com/teezeit/wiremd)
- [Issue Tracker](https://github.com/teezeit/wiremd/issues)
- [Discussions](https://github.com/teezeit/wiremd/discussions)
- [Contributing Guide](./contributing/testing.md)

wiremd is open source under the [MIT License](../LICENSE).
