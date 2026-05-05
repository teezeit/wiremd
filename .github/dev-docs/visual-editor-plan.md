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
- **Collaboration**: existing `/projects` API (`POST /api/projects`, `PUT /api/projects/:id`) — wired in v3
- **Testing**: vitest + @testing-library/react, 98 tests covering all user stories
- **Linting**: Oxlint (type-aware, `pnpm lint`)
- **Formatting**: no formatter configured yet — candidate: Prettier or dprint
- **Editor theming**: VitePress-matched palette (`rgba(60,60,67,…)` text, `#f6f6f7` soft bg, `#ffffff` surfaces); CodeMirror uses a custom light theme matching the same variables; `oneDark` removed

## Layout (implemented)

```
[ ☰ ]  [ ✏ ]                          wiremd    [ Share* ] [ 💬 ]
────────────────────────────────────────────────────────────────────
[ + Insert | Markdown ]  │
                         │   Preview canvas (sidebar collapses in preview mode)
  CodeMirror editor      │
                         │
```

- **☰** hamburger: Reset, Open from file, Save to…, Style switcher, Live Collab (stub), GitHub, Docs
- **✏** edit toggle: shows/hides sidebar (on = edit mode, off = preview mode)
- **Sidebar tabs**: `+ Insert` (placeholder, v4) | `Markdown` (CodeMirror editor)
- **Share modal**: Shareable link flow (Export to link → Generating → URL field + Copy link) + Live Collab stub
- **Theme**: VitePress-matched palette (white/grey/black), floating header

## Scroll preservation

Preview iframe reports scroll position via `postMessage` (`wiremd-scroll`) on scroll (100ms debounce).
On re-render, `Preview.tsx` restores position via `wiremd-set-scroll` after iframe `load`.

## Version roadmap

### v1 — Rewrite baseline ✅ Done
- CodeMirror 6 editor with wiremd syntax highlighting
- wiremd renderer + all 7 styles
- URL hash share (on-demand: generate → copy)
- Edit/Preview mode toggle
- Insert/Markdown sidebar tabs (Insert is placeholder)
- Comments toggle
- Light theme matching landing/docs VitePress palette
- 98 tests

### v2 — File operations + sharing ✅ Done
- Open from local file (FileSystem Access API, manual, no auto-sync)
- Save to file (save-as only)
- Share modal: Shareable link (Export to link → URL field → Copy) + Live Collab stub
- Preview scroll position preserved across re-renders

### v3 — Templates + collaboration
- Template gallery (Load from Templates button, category browsing, preview pane)
- Loading screen (recent file / blank canvas on first open)
- Live collaboration — wire up existing `/projects` API (project-controller.ts already in apps/editor)

### v4 — Edit mode (bridges to non-markdown users)
- `data-wmd-id` attributes injected into rendered HTML for click-to-source mapping
- Component selection in preview (click → bottom border indicator)
- Bottom toolbar: edit / copy / trash / ↑↓ / comment / add below
- Markdown ↔ preview cursor sync (click component → jump editor to that line)
- `+ Insert` component library (currently placeholder)

> GUI-first features (drag-to-insert, AI prompt bar) are deferred post-v4.
> Multi-file support (react-arborist installed) is also post-v4.

## Hamburger menu (implemented)

```
[ Reset ]
[ Open from file ]       ← FileSystem Access API (disabled if unsupported)
[ Save to… ]             ← save-as dialog
[ Live Collaboration ]   ← stub (soon)
───
Style: [ Sketch ]* [ Clean ] [ Wireframe ] [ Material ] [ Tailwind ] [ Brutal ] [ None ]
───
[ GitHub ]
[ Docs ]
```

## Share modal (implemented)

```
Share
─────────────────────────────
Shareable link
Generates a link with your current wireframe encoded in the URL.
Changes made after sharing won't be reflected — this is a snapshot.

[ Export to link ]   →  Generating…  →  [url field (scrollable)] [Copy link] / [Copied! ✓]

─────────────────────────────
Live Collaboration             ((saves to cloud))
Start a session — URL becomes a shareable project ID.
[ Start Live Session ]  (disabled — coming soon)
```

## Bottom toolbar — v4 (not yet built)

```
[ edit ]{secondary}  [ copy ]  [ trash ]  /  [ ↑ ]  [ ↓ ]  /  [ 💬 ]
──────────────────────────────────────────────────────────────────────
[ + Add below ]*
```

- **edit** → jump to that component's line in the markdown editor
- **copy** → duplicate component in markdown
- **trash** → remove component
- **↑ / ↓** → reorder in markdown stack
- **💬** → insert comment annotation, open editor at that line
- **+ Add below** → open Insert tab
