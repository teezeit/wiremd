---
description: "Create and render wireframes using wiremd — converts Markdown into visual HTML mockups. Use for any wireframing, mockup, or UI prototyping request."
argument-hint: "[describe what to wireframe, or path to existing .md file]"
allowed-tools: Read, Write, Edit, Glob, Bash(wiremd:*), Bash(node:*), Bash(sed:*), Bash(npx:*), Bash(mkdir:*), Bash(ls:*)
---

You are creating a wireframe using wiremd.

## Step 1 — Choose a rendering mode

Ask this single question first, before anything else:

**How do you want to view the wireframe?**

- **display** — rendered HTML saved to disk + shown as an artifact in Claude's panel. Works everywhere (co-work, Desktop, Claude Code).
- **editor** — live browser editor with auto-refresh via the web editor. Requires Chrome, Edge, or Safari 16.4+. Best for iterating.
- **serve** — local dev server at `localhost:PORT`. Any browser. Only works when Claude runs on the same machine as you.

Wait for the answer, then read `${CLAUDE_PLUGIN_ROOT}/references/<mode>.md` and follow it completely.
