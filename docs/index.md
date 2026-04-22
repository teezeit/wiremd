---
layout: home

hero:
  name: wiremd
  text: Design UI Mockups with Markdown
  tagline: The text-first wireframing tool. Create screens as fast as you can type — no clicking, no dragging, no design tool required.
  actions:
    - theme: brand
      text: Get started
      link: /guide/overview
    - theme: alt
      text: Browse components
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/teezeit/wiremd

features:
  - icon: 🖥️
    title: VS Code Extension
    details: Install from the marketplace, open any .md file, click the preview icon. No terminal needed.
    link: /guide/vscode
    linkText: Install extension
  - icon: 🤖
    title: Use with Claude
    details: Tell Claude what screen you want — it writes and renders the wireframe for you automatically.
    link: /guide/claude
    linkText: Learn more
  - icon: ⌨️
    title: CLI
    details: npm install -g wiremd, then wiremd file.md --style clean --serve 3001 --watch
    link: /guide/installation
    linkText: Install CLI
  - icon: 🎨
    title: 7 visual styles
    details: sketch, clean, wireframe, material, brutal, tailwind, none — switch with one flag.
    link: /components/styles
    linkText: See styles
  - icon: 🧩
    title: 40+ components
    details: Buttons, inputs, grids, tabs, navbars, cards, badges, alerts — all from plain text.
    link: /components/
    linkText: Browse components
  - icon: 📤
    title: Multiple output formats
    details: Export as HTML, React/JSX, Tailwind-classed HTML, or JSON — same source, any target.
    link: /api/
    linkText: API docs
  - icon: 🔀
    title: Version control friendly
    details: Plain text files work with git, PRs, and code review like any other source file.
  - icon: ⚡
    title: Fast
    details: Under 100ms parse time. Live reload on save with --watch.
  - icon: 📋
    title: Example gallery
    details: Ready-to-use templates for forms, dashboards, landing pages, and multi-page flows.
    link: /examples/
    linkText: Browse examples
---

## From Markdown to Mockup

Write a screen in plain text:

```markdown
## Login

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

[Sign In]* [Forgot password?]
```

Run `wiremd login.md --style clean --serve 3001` — open your browser, see a rendered mockup. Edit and save, the preview reloads instantly.

## wiremd vs the alternatives

|  | wiremd | Figma | Balsamiq |
|--|--------|-------|---------|
| Text-based input | ✓ | ✗ | ✗ |
| Works with git / version control | ✓ | partial | ✗ |
| No design tool or account needed | ✓ | ✗ | ✗ |
| AI-generated wireframes (Claude) | ✓ | ✗ | ✗ |
| VS Code integration | ✓ | ✗ | ✗ |
| Free and open source | ✓ | partial | ✗ |

## Ready to start?

Install the [VS Code extension](/guide/vscode) for the quickest path — no terminal, no setup.  
Or `npm install -g wiremd` and [follow the CLI guide](/guide/installation).
