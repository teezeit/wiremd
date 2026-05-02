---
name: wireframe
description: >-
  Create and render wireframes using wiremd — converts Markdown into visual HTML mockups.
  Trigger whenever the user wants to wireframe, mockup, prototype, or sketch a UI screen:
  from a description, Jira ticket, PRD, existing React/JSX, or rough idea. Also trigger on:
  "draw a login page", "show what this would look like", "create a mockup", "design a screen for X",
  "sketch the UI", "prototype this flow", "document this component as a wireframe", or any request
  to render or preview a .md wireframe file.
---

# Wireframe

wiremd converts plain Markdown with extended syntax into visual wireframes — 7 styles, no design tools needed.

## Authoring convention

Use plain semantic tokens for UI intent and combine them in one brace block:
`[Delete]{danger large disabled}`, `::: row {right}`, `::: column Summary {span-2 right}`,
`((Done)){success}`, `[Email___]{type:email error}`.

Use key-value attributes for explicit props such as `type:email`, `rows:4`, and
`placeholder:"Search..."`. Use dot-prefixed tokens only as raw CSS class escape hatches,
not in normal examples.

## Step 1 — Choose a rendering mode

Ask this single question first, before anything else:

**How do you want to view the wireframe?**

- **display** — rendered HTML saved to disk + shown as an artifact in Claude's panel. Works everywhere.
- **editor** — live browser editor with auto-refresh. Chrome, Edge, or Safari 16.4+. Best for iterating.
- **serve** — local dev server at `localhost:PORT`. Any browser. Only when Claude runs on your machine.

Wait for the answer, then read `${CLAUDE_PLUGIN_ROOT}/references/<mode>.md` and follow it completely.
