# Visual Editor — Design Plan

Wireframe: https://tobiashoelzer.com/wiremd/editor/?p=VQWDn3ew5WQrbcONS8jQi

## Overview

Rebuild of the wiremd web editor targeting UX/PM users who don't want to write markdown directly. Inspired by Excalidraw (tool palette, contextual toolbar, clean canvas-first) and Mermaid (split panel, template gallery).

## Architecture decisions

- **Editor**: CodeMirror 6 (replaced Monaco — lighter, no workers, better fit for markdown-only editing)
- **Framework**: React 19 + Vite 6 (`apps/editor-v2/`)
- **File tree**: react-arborist installed, not yet wired (multi-file is post-v4)
- **Renderer**: existing wiremd core (`renderToHTML`) — no change
- **File operations**: FileSystem Access API, manual open/save (no auto-sync by design)
- **Sharing**: URL hash encoding via lz-string, on-demand only (not on every keystroke)
- **Collaboration**: `/projects` API with pessimistic locks — steal/leave flow, API write enforcement, lock state resets on session end
- **Session identity**: `unique-names-generator` adjective+animal names (e.g. "Blue Fox"), persisted in localStorage, Avatar component (color-coded initials)
- **Testing**: vitest + @testing-library/react — 261 editor-v2 tests + 54 API tests = 315 total
- **Linting**: Oxlint (type-aware, `pnpm lint`)
- **Editor theming**: VitePress-matched palette (`rgba(60,60,67,…)` text, `#f6f6f7` soft bg, `#ffffff` surfaces); CodeMirror custom light theme; `oneDark` removed

## Layout (implemented)

```
[ ☰ ]  [ ✏ ]  [🟤 Red Bear · is already editing]     wiremd    [ Live Session● ] [ 💬 ]
────────────────────────────────────────────────────────────────────────────────────────
[ + Components | Markdown ]  │
  [🔒 Red Bear is already    │   Preview canvas (collapses in preview mode)
   editing · 2m ago  🔒  🔓] │
  CodeMirror editor (striped │
  when locked)               │
```

- **☰** hamburger: Reset, Open from file, Save to…, Live Collaboration, Style switcher, GitHub, Docs, Identity (You are: [avatar] name)
- **✏** edit toggle: always just shows/hides editor panel — no lock logic
- **Lock status pill**: shows `[avatar] Name · is already editing` or `[avatar] Name · (you) is editing` when in a live session
- **Live Session button**: replaces Share when session active — users icon + "Live Session" + green dot badge
- **Sidebar tabs**: `+ Components` (Template Gallery + Component Library) | `Markdown` (CodeMirror editor)
- **Sidebar lock banner**: `[avatar] Name · is already editing · 2m ago` | 🔒 | `[🔓 Steal edit]{primary}` — shown when someone else holds the lock
- **Editor**: striped diagonal background when locked; CodeMirror read-only enforced
- **Share modal**: Shareable link flow + Live Collaboration start/active-session flow
- **Theme**: VitePress-matched palette, header matches landing nav

## Scroll preservation

Preview iframe reports scroll via `postMessage` (`wiremd-scroll`) on scroll (100ms debounce). On re-render, `Preview.tsx` restores via `wiremd-set-scroll` after iframe `load`.

## Version roadmap

### v1 — Rewrite baseline ✅ Done
- CodeMirror 6 editor with wiremd syntax highlighting
- wiremd renderer + all 7 styles
- URL hash share (on-demand: Export to link → generate → copy)
- Edit/Preview mode toggle (pencil button)
- Components/Markdown sidebar tabs
- Comments toggle with badge
- No cursor jump on re-render (React.memo + lastEmittedValue ref)
- Preview scroll preserved across re-renders
- Light theme matching landing/docs VitePress palette

### v2 — File operations + sharing ✅ Done
- Open from local file (FileSystem Access API, manual, no auto-sync)
- Save As modal with format selector (md, html, react, tailwind, json)
- Share modal: Shareable link (Export to link → URL field → Copy link)
- Auto-save to localStorage (Excalidraw style, 1s debounce)
- Conflict modal: shared link vs locally saved work
- Preview scroll position preserved across re-renders

### v3 — Collaboration ✅ Done (loading screen skipped — replaced by auto-save)

**Live collaboration — fully wired:**
- Start Live Session: creates project, updates URL to `?p=<id>`, acquires lock
- Active session view in Share modal: URL field, Copy link, Stop/Leave Session
- Pessimistic locking: acquire, release, steal (force-unlock on leave)
- API write enforcement: `PUT /api/projects/:id` returns `403` with descriptive error if caller doesn't hold lock
- Lock status pill in header: avatar + name + "is already editing" / "(you) is editing"
- Sidebar lock banner: 3-col grid — user info | 🔒 | Steal edit (primary)
- Editor read-only + diagonal stripe pattern when not lock holder
- Session identity: unique name + session ID persisted in localStorage; Avatar (color-coded initials); IdentityTag component (shared in hamburger + Share modal)
- Lock state resets to `solo` immediately when session ends (all UI clears in one cascade)
- "Live Session" button replaces Share when session active (users icon + green dot corner badge)

**Loading screen:** replaced by localStorage auto-save — no file picker prompt on startup.

**Template Gallery — first-time user story:**
- As a first-time user with no shared link and no saved local work, I land in `+ Components` with the Template Gallery open so I can start visually instead of writing markdown first.
- The Landing Page template is the first gallery example and the default starter content in the preview.
- Template previews render with the active global visual style so the gallery matches the canvas.
- Clicking `Load` on a template replaces the markdown with that template and switches to the Markdown tab.
- Returning users with local autosave content, shared-link users, and conflict-modal users continue into the Markdown flow instead of being interrupted by the gallery.

**Component Library — insertion story:**
- Component cards live below the Template Gallery in `+ Components` and render with the active global visual style.
- Clicking `Add` inserts the component markdown into the current document without leaving the Components panel.
- Components insert at the last known Markdown cursor/selection; if no cursor is known, they append to the end.
- Each card keeps `Copy markdown` as a secondary action for users who prefer manual placement.
- Read-only shared-session users cannot `Load` or `Add`, but they can still copy snippets.

### v4 — Visual edit mode (bridges to non-markdown users)
- `data-wmd-id` attributes injected into rendered HTML for click-to-source mapping
- Component selection in preview (click → bottom border indicator)
- Bottom toolbar: edit / copy / trash / ↑↓ / comment / add below
- Markdown ↔ preview cursor sync (click component → jump editor to that line)
- `+ Components` component library follow-up: drag-to-insert, search, categories

> GUI-first features (drag-to-insert, AI prompt bar) are v4 work.
> Multi-file support (react-arborist installed) is post-v4.
> Lock/edit variable naming: "lock" used in code (precise CS term), "edit" used in UI strings (user-facing).

## Hamburger menu

```
[ Reset ]
[ Open from file ]       ← FileSystem Access API (disabled if unsupported)
[ Save to… ]             ← Save As modal with format selector
[ Live Collaboration ]   ← opens Share modal (only shown when not in session)
───
Style: [ Sketch ]* [ Clean ] [ Wireframe ] [ Material ] [ Tailwind ] [ Brutal ] [ None ]
───
[ GitHub ]
[ Docs ]
───
[avatar] You are / Blue Fox
```

## Share modal

```
Share
─────────────────────────────
Shareable link
[Export to link] → Generating… → [url field] [Copy link] / [Copied! ✓]

─────────────────────────────
Live Collaboration    saves to cloud

No session:
[👥 Start Live Session]

Active session:
● LIVE  [avatar] Blue Fox · You are
Active session — share this link...
[session url field] [Copy link]
[Leave Session]{danger}
```

## Collaboration lock flow

```
Solo (no ?p=):      pencil = toggle sidebar only; Share button shows
In session, free:   pencil = toggle sidebar; can acquire edit via keyboard/API
In session, mine:   pencil = toggle; header shows "(you) is editing"; editor active
In session, taken:  pencil = toggle; header shows "Red Bear is already editing";
                    sidebar shows banner with Steal edit; editor read-only + striped
Leave session:      force-unlock → URL cleared → lockState resets to solo instantly
```

## Bottom toolbar — v4 (not yet built)

```
[ edit ]{secondary}  [ copy ]  [ trash ]  /  [ ↑ ]  [ ↓ ]  /  [ 💬 ]
──────────────────────────────────────────────────────────────────────
[ + Add below ]*
```
