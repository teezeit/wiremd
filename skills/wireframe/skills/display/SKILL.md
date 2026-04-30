---
name: display
description: >-
  Render wireframes as HTML using the bundled wiremd CLI — shows the result as
  an artifact in Claude's panel AND saves the file for the user to open, share,
  or archive. Use for single-page and multi-page prototypes. Works in Claude
  Desktop, claude.ai, Claude Code, and any session with file system access.
---

# Wireframe — Display

Render wiremd `.md` files to HTML using the bundled CLI. No install needed —
`wiremd` is on PATH via the plugin's `bin/`.

## Step 0 — Gather requirements

Ask (all at once, before writing anything):

- **Single page or multi-page prototype?**
- **Which visual style?** (sketch / clean / wireframe / material / tailwind / brutal — default: `wireframe`)
- **Which key components should it include?**
- **Got a spec, ticket, or component to base it on?** *(optional)*

---

## Workflow

**1. Single page:**
```bash
wiremd screen.md -o screen.html -s wireframe
```
After rendering: show the HTML as an artifact in your panel AND share the file path so the user can open it in a browser or share it.

**2. Multi-page — navigable without a server:**
```bash
for f in wireframes/*.md; do
  wiremd "$f" -o "${f%.md}.html" -s wireframe
done
# macOS: sed -i '' — Linux: sed -i
sed -i '' 's|href="\./\([^"]*\)\.md"|href="./\1.html"|g' wireframes/*.html
```
Share the path to `wireframes/index.html`. Re-run after each edit cycle.

**After each iteration:** re-render, show updated artifact, user refreshes the file if they have it open.

---

## Multi-page scaffold

- `_nav.md` shared across all pages via `![[_nav.md]]`
- `_sidebar.md` if using sidebar layout
- one `.md` per page at top level

See `${CLAUDE_PLUGIN_ROOT}/skills/editor/references/multi-page.md`.

---

## Writing the wireframe

Full syntax reference: `${CLAUDE_PLUGIN_ROOT}/skills/editor/references/syntax.md`.

### From a description or spec
1. Understand the screen's purpose
2. Sketch structure top-to-bottom: nav → layout → content sections → forms/data → modals
3. Write the `.md` file(s) using the syntax reference

### From an existing component
1. Read the JSX/TSX component tree — focus on structure, not logic
2. Map to wiremd equivalents (see syntax.md → Component mapping)
3. Capture: layout, nav, form fields/labels, button labels, table columns, states
4. Skip: exact colors, event handlers, API calls, business logic

---

## Style picker

Default to `wireframe`. See `${CLAUDE_PLUGIN_ROOT}/skills/editor/references/styles.md`.

| Style | Best for |
|-------|----------|
| `sketch` | Early ideation, lo-fi client presentations |
| `clean` | Stakeholder review, internal handoff |
| `wireframe` | Low-fidelity explorations, documentation (default) |
| `material` | Material Design apps |
| `tailwind` | Tailwind-based products, indigo/purple palette |
| `brutal` | Bold, high-contrast concepts |

---

## Gotchas

1. **Static HTML keeps `.md` hrefs.** For multi-page `file://` delivery, run the sed rewrite above.
2. **Label directly above input.** No blank line between label text and `[_____]`.
3. **Blank line before `:::` when last child has inline elements.**

Full gotchas and syntax edge cases: `${CLAUDE_PLUGIN_ROOT}/skills/editor/references/syntax.md`.
