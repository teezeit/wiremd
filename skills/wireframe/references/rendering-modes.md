# Rendering Modes

Triage by the tools Claude actually has in the current session — not by product
name. The same skill runs in Claude Code, Claude CLI inside VS Code, Claude
Desktop with filesystem + exec tools (e.g. Cowork), and chat-only Desktop, and
each supports a different subset of these routes.

## Decision table

| Claude can… | Render route | Command / action |
|---|---|---|
| Write files **and** run shell | **Files in folder** *(default)* — render `.html` into the user's folder; they open via `file://` or double-click | `wiremd x.md -o x.html --style sketch` (+ `.md`→`.html` sed rewrite if multi-page; see `multi-page.md`) |
| Write + shell, **and user runs Claude locally** on their own machine | **Dev server** — live reload while iterating. Only works when the user can reach `localhost` on the Claude host. | `wiremd x.md --style sketch --serve 3001 --watch --watch-pattern "*.md"` |
| Write + shell, **reviewer is non-technical (no VS Code)** | **Browser editor with `?file=` hint** — write the `.md`, generate a hint URL, share it. Reviewer links the file; Claude's edits auto-refresh within ~500ms. Requires Chrome/Edge/Safari 16.4+. | `node -e "const u=new URL('https://tobiashoelzer.com/wiremd/editor/');u.searchParams.set('file',process.argv[1]);console.log(u.toString())" /path/to/file.md` |
| Shell but no shared folder with user | **Screenshot for self-verification** — can't deliver to user this way, but useful to confirm Claude's own output renders correctly | `npx playwright screenshot --browser chromium --full-page "file://$(pwd)/out.html" /tmp/wf.png` (then read the PNG) |
| Chat only (no filesystem, no exec) | **Hand off to the web editor** — Claude writes the `.md`; user pastes it into the hosted editor for rendering | Share `https://tobiashoelzer.com/wiremd/editor` + the `.md` content |

## Browser editor with `?file=` hint

The live editor at `https://tobiashoelzer.com/wiremd/editor/` supports bidirectional file sync via the browser's File System Access API. Use this when the reviewer has no VS Code but can open a URL in Chrome, Edge, or Safari 16.4+.

**How it works:**

1. Claude writes the `.md` file to disk as usual
2. Claude generates a hint URL and hands it to the reviewer:
   ```bash
   node -e "const u=new URL('https://tobiashoelzer.com/wiremd/editor/');u.searchParams.set('file',process.argv[1]);console.log(u.toString())" /path/to/wireframe.md
   ```
3. Reviewer opens the URL → modal appears with the filename → clicks **Open File** → grants browser access
4. The browser polls the file every ~500ms; when Claude saves a change, the preview updates automatically
5. The reviewer can edit in the Monaco editor — changes write back to disk within 500ms

The `?file=` param is a hint only: it encodes the path so the browser can open the picker in the right folder (Desktop, Documents, etc.) and show the filename in the modal. After the file is linked, the param is stripped from the URL.

**Limitations:** Firefox doesn't support File System Access API. The modal shows a notice; the reviewer needs Chrome/Edge/Safari.

---

## Files-in-folder (the default)

Works anywhere Claude can both write files and invoke `wiremd`: Claude Code,
VS Code+terminal, Cowork with filesystem + code-execution tools. Claude renders
`.html` alongside the `.md` sources; the user opens them in their browser
(`open index.html`, double-click, or `file://` URL).

This is the safest default because it doesn't rely on the user being on the
same machine as Claude.

## Sandbox caveat for `--serve`

`wiremd --serve PORT` binds to `localhost:PORT` *on the machine Claude is
running on*. In Claude Code running on the user's own laptop, that's their
localhost — fine. In Cowork/Desktop when the Claude process is remote or
sandboxed, the URL is **unreachable from the user's browser**. Symptoms:
"connection refused", "site can't be reached", or a blank page.

Rules:

- Default to **Files-in-folder**.
- Only use `--serve` when the user is running the same Claude process locally
  and can reach its localhost.
- Never hand the user a `localhost:PORT` URL without first confirming they can
  actually reach it.

## Screenshot verification (any mode)

Useful for Claude to check its own output before replying:

```bash
npx playwright screenshot --browser chromium --full-page \
  "file://$(pwd)/out.html" /tmp/wf-check.png
```

Then read the PNG with the Read tool. Handy when iterating on a design the
user can't see directly (chat-only mode).
