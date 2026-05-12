# Wireframe — Dev Server

Starts a local wiremd server with hot-reload. The user opens `http://localhost:PORT`
in any browser — no File System Access API, no external URL.

**Only works when Claude Code runs on the user's own machine.**
If you're in a remote or co-work session, re-run `/wireframe` and select **display** or **editor** mode instead.

## Workflow

```bash
wiremd <file-or-folder> --serve --watch
```

Tell the user to open the `http://localhost:PORT` address printed by the CLI. Every `.md` save triggers a reload.

For a folder (multi-page):
```bash
wiremd wireframes/ --serve --watch
```

Port `3000` is the default. If it is busy, wiremd tries the next ports up to 10 times. If you pass an explicit port, wiremd uses exactly that port and fails if it is taken.

---

## Style

Default to `wireframe`. Pass `-s <style>` to override.

```bash
wiremd wireframes/ --serve --watch -s clean
```

See `${CLAUDE_PLUGIN_ROOT}/references/styles.md` for descriptions.

---

## Syntax

Full reference: `${CLAUDE_PLUGIN_ROOT}/references/syntax.md`
