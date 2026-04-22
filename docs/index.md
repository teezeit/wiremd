# wiremd

**Wireframes in plain text.**

Write a screen as Markdown, see it render as a visual mockup — no design tool, no drag-and-drop. Works in VS Code, through Claude, or from the command line.

```markdown
## Login

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

[Sign In]* [Forgot password?]
```

## Get started

**No terminal?**
[Install the VS Code extension](./guide/vscode.md) — open any `.md` file, click the preview icon. Done.

**Want to describe it?**
[Use Claude](./guide/claude.md) — tell Claude what screen you want, it writes and renders the wireframe for you.

**Developer / CLI:**
`npm install -g wiremd` then `wiremd file.md --serve 3001` — or see the [full install guide](./guide/installation.md).
