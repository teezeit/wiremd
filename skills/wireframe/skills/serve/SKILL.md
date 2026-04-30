---
name: serve
description: >-
  Live dev server for wiremd files — starts --serve --watch for hot-reload in
  any local browser. For wiremd developers using Claude Code on their own machine.
  Do NOT use in Cowork or remote agent sessions (server binds to Claude's host,
  not the user's browser).
---

# Wireframe — Dev Server

Starts a local wiremd server with hot-reload. The user opens `http://localhost:PORT`
in any browser — no File System Access API, no external URL.

**Only works when Claude Code runs on the user's own machine.**
If you're in a remote or Cowork session, use `/wireframe:editor` instead.

## Workflow

```bash
wiremd <file-or-folder> --serve 3001 --watch
```

Tell the user to open `http://localhost:3001`. Every `.md` save triggers a reload.

For a folder (multi-page):
```bash
wiremd wireframes/ --serve 3001 --watch
```

Port `3001` is the default — use a different port if it's taken.

---

## Style

Default to `wireframe`. Pass `-s <style>` to override.

```bash
wiremd wireframes/ --serve 3001 --watch -s clean
```

---

## Syntax

Full reference: `${CLAUDE_PLUGIN_ROOT}/skills/editor/references/syntax.md`
