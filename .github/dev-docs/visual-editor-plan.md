# Visual Editor — Design Plan

Wireframe: https://tobiashoelzer.com/wiremd/editor/?p=VQWDn3ew5WQrbcONS8jQi

## Overview

Rebuild of the wiremd web editor targeting UX/PM users who don't want to write markdown directly. Inspired by Excalidraw (tool palette, contextual toolbar, clean canvas-first) and Mermaid (split panel, template gallery).

## Architecture decisions

- **Editor**: Monaco (multi-model for multi-file support — wiremd's `resolveIncludes()` makes multi-file a real user need, not a power-user edge case)
- **Multi-file**: file tree in left sidebar, each file is a Monaco model; no StackBlitz dependency
- **Renderer**: existing wiremd core (`renderToHTML`) — no change
- **Comments panel**: built into wiremd HTML renderer via `<!-- @wireframe: ... -->` annotations — no separate implementation needed
- **Collaboration**: existing `/projects` API (`POST /api/projects`, `PUT /api/projects/:id`)

## Layout

```
[ ☰ logo ]                          [ Share* ] [ Comments ]
─────────────────────────────────────────────────────────────
[ 👁 / edit* ]  │
[ Templates* ]  │   Preview canvas (preview mode: full-width, sidebar collapsed)
[ dismiss  ]    │   Edit mode: component selected → bottom border indicator
                │
[ card          │
  tabs:         │
  + Insert │ Markdown ]
```

### Sidebar tabs

- **+ Insert**: search + component categories (Layout / Form / Content) — hidden in preview mode
- **Markdown**: Monaco editor + component docs panel

### Mode toggle (`👁 / edit`) — top of sidebar

- **Preview (default)**: sidebar collapses, full canvas, all HTML interactions live (links, tabs, toggles)
- **Edit**: clicks capture components, selected component shows bottom-border indicator, bottom toolbar appears, sidebar collapses

### Bottom toolbar (edit mode, component selected)

```
[ edit ]{secondary}  [ copy ]  [ trash ]  /  [ ↑ ]  [ ↓ ]  /  [ 💬 ]
──────────────────────────────────────────────────────────────────────
[ + Add below ]*
```

- **edit** → jumps to markdown editor at that component's line (cursor sync)
- **copy** → duplicates component in markdown
- **trash** → removes component
- **↑ / ↓** → reorders component in markdown stack
- **💬** → inserts `<!-- @wireframe: @user  -->` at component, opens markdown editor at that line
- **+ Add below** → opens/focuses Insert tab

## Screens & modals

### Loading screen — with recent file
Modal over blank canvas:
```
Edit File in Browser
CONTINUE WITH A RECENT FILE
[ dashboard.md ]*
[ login.md ]*
───
[ Skip ]
```

### Loading screen — no recent file
→ go directly to blank canvas (default template preloaded)

### Hamburger menu `☰`
```
[ Reset ]
[ Open from file ]
[ Save to... ]       ← opens Save to modal
[ Live Collaboration ]
[ Export to link ]
───
Style: [ Sketch ]* [ Clean ] [ Material ] [ Brutalist ]
───
[ GitHub ]
[ About ]
```

### Save to modal
```
Save to
Format: [ Markdown .md ]* [ HTML ] [ Tailwind ] [ React / JSX ]
→ opens native file save dialog
[ Save ]* [ Cancel ]
```

### Share button states
- Default: `[ Share ]*`
- Live session active: `[ ⟳ Share ]*` (sync icon communicates status via color + tooltip)

### Sharing modal — no active session
```
Live Collaboration                    ((saves to cloud))
Start a session — URL becomes a shareable project ID.
[ Start Live Session ]*
───
Copy Link
Markdown encoded in URL — works offline, no account needed.
[ Copy Link ]
───
Export
[ Markdown ] [ HTML ] [ Tailwind ] [ React / JSX ]
```

### Sharing modal — live session active
```
Active session:
wiremd.com/editor/?p=VQWDn3ew
[ Copy project link ]  [ Stop Session ]{danger}
```

### Live session joined state (recipient)
```
((● Live session)) You're editing with @tobias — [ Copy link ] [ Leave ]{danger}
```

### Template gallery (triggered by `[ Load from Templates ]`)
Same layout as + Insert sidebar — search + categories:
- Auth: Sign In, Sign Up, Reset Password
- Dashboard: Overview, Analytics, Data Table
- Marketing: Landing Page, Pricing, Blog Post
- Utility: Settings, Profile, Empty State

Right panel: preview of selected template + `[ Load this template ]*`

## Version roadmap

### v1 — Rewrite baseline
Editor + renderer + style switcher. Clean foundation, no legacy debt.

### v2 — File operations + sharing
- Open from local file / save to local file (native dialog)
- Copy link (markdown encoded in URL)
- Live collaboration (existing `/projects` API, new sharing modal UI)

### v3 — Templates + UX polish
- Template gallery
- Loading screen (recent file / blank canvas)
- Redesigned sharing modal

### v4 — Edit mode (bridges to non-markdown users)
- Preview / Edit mode toggle
- Component selection (bottom border indicator)
- Bottom toolbar: edit / copy / trash / ↑↓ / comment / add below
- Markdown ↔ preview cursor sync (clicking component jumps editor to that line)

> GUI-first features (drag-to-insert component library, AI prompt bar) are deferred post-v4.
