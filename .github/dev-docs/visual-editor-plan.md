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
- **Collaboration**: `/projects` API with pessimistic locks, steal/leave flow, and lock-enforced writes — v3 partially wired
- **Testing**: vitest + @testing-library/react, 252 editor-v2 tests covering the current user stories
- **Linting**: Oxlint (type-aware, `pnpm lint`)
- **Formatting**: no formatter configured yet — candidate: Prettier or dprint
- **Editor theming**: VitePress-matched palette (`rgba(60,60,67,…)` text, `#f6f6f7` soft bg, `#ffffff` surfaces); CodeMirror uses a custom light theme matching the same variables; `oneDark` removed

## Layout (implemented)

```
[ ☰ ]  [ ✏ ]                          wiremd    [ Share* ] [ 💬 ]
────────────────────────────────────────────────────────────────────
[ + Components | Markdown ]  │
                         │   Preview canvas (sidebar collapses in preview mode)
  CodeMirror editor      │
                         │
```

- **☰** hamburger: Reset, Open from file, Save to…, Style switcher, Live Collaboration, GitHub, Docs
- **✏** edit toggle: shows/hides sidebar (on = edit mode, off = preview mode)
- **Sidebar tabs**: `+ Components` (currently starts with Load Template) | `Markdown` (CodeMirror editor)
- **Share modal**: Shareable link flow (Export to link → Generating → URL field + Copy link) + Live Collaboration start/active-session flow
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
- Components/Markdown sidebar tabs
- Comments toggle
- Light theme matching landing/docs VitePress palette
- 252 editor-v2 tests

### v2 — File operations + sharing ✅ Done
- Open from local file (FileSystem Access API, manual, no auto-sync)
- Save to file (save-as only)
- Share modal: Shareable link (Export to link → URL field → Copy)
- Preview scroll position preserved across re-renders

### v3 — Templates + collaboration 🚧 In progress
- Template loading — basic Components → Load Template flow is built; category browsing and preview pane are not yet built
- Startup recent-file/loading screen — skipped; app restores local autosave content or falls back to the default example
- Live collaboration — wired with `/projects`, session URLs, lock acquire/steal/leave, read-only non-holder editor, and API write enforcement

### v4 — Edit mode (bridges to non-markdown users)
- `data-wmd-id` attributes injected into rendered HTML for click-to-source mapping
- Component selection in preview (click → bottom border indicator)
- Bottom toolbar: edit / copy / trash / ↑↓ / comment / add below
- Markdown ↔ preview cursor sync (click component → jump editor to that line)
- `+ Components` component library beyond templates

> GUI-first features (drag-to-insert, AI prompt bar) are deferred post-v4.
> Multi-file support (react-arborist installed) is also post-v4.

## Hamburger menu (implemented)

```
[ Reset ]
[ Open from file ]       ← FileSystem Access API (disabled if unsupported)
[ Save to… ]             ← save-as dialog
[ Live Collaboration ]   ← opens Share modal live-session flow
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
[ Start Live Session ]  →  [session URL field] [Copy link] [Leave Session]
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
- **+ Add below** → open Components tab
