::: columns-2
::: column
<!-- logo - link to landing page -->
[☰] :logo: **wiremd**
:::
::: column {right}
 [Share]{primary} [:chat: comments]
:::
:::

::: columns-4
::: column {top span-2}
> visible on load
[Load from Templates]* [dismiss]

<!-- toggle mode right bound -->
[:eye:] / [edit]*


::: card
::: tabs
::: tab + Insert
<!--hidden while in preview mode - active in edit mode -->
#### + Insert Component
[Search components...________]

---
**Layout**



::: demo
::: card
this is how a card works
[action]* [action]

:::
::: 

::: demo
::: tabs
::: tab settings
this is a settings tab
:::
::: tab components
:::
:::
::: 

::: demo
...
::: 
---

**Actions**

::: demo
[Default] [Primary]* [Secondary]{secondary} [Danger]{danger}
:::

** Inputs
::: demo
[text input ____]
:::
::: demo
[selector___v]
- option 1
- option 2
- ...

:::



---

**Content**

> content components

---
> Click to insert at cursor
> Drag to reorder in preview
:::
::: tab Markdown
::: card 
### Files
```
- index.md
- _components
  - insert-components.md
  - _sidebar.md
  - bottom-toolbar.md
```
:::
::: card
markdown editor
:::
::: card
component documentation
:::
:::
:::
:::


:::
::: column {top span-2}
<!-- sidebar collapses, full canvas, links/tabs/toggles are live -->
> Preview mode (default)
::: card
> Links, tabs, toggles are live — full prototype interaction
> No editing affordances visible

# Sign In

Continue to your workspace.

Email
[name@company.com_______________]{type:email required}

Password
[••••••••••••••••••••••••]{type:password required}

[Keep me signed in]{switch checked}

[Sign In]* [Forgot password?]
:::

---
> Edit mode — component selected
::: card
> Clicks capture components · selected component shows outline · sidebar stays open

# Sign In

Continue to your workspace.

Email
[name@company.com_______________]{type:email required}

Password
[••••••••••••••••••••••••]{type:password required}

[Keep me signed in]{switch checked}

<!-- @wireframe: selected component shown with outline -->
[Sign In]* [Forgot password?]
:::

((----- component selector cursor - bottom border i think is easiest)){primary}

<!-- bottom toolbar — docked, always same position, never overlaps content -->
::: card
> Bottom toolbar — appears when component selected in edit mode

<!-- edit: open markdown editor -->
<!-- copy: duplicate component -->
<!-- trash: remove component -->
<!-- up/down arrows: move in stack -->
<!-- chat: insert comment component and open markdown editor -->
 [:edit:]{secondary} [:copy:] [:trash:] / [:arrow-up:] [:arrow-down:] / [:chat:]

 ---
 <!-- open/focus insert component menu -->
 [:plus: Add below]*

:::
:::
:::

---
# Modals

::: columns-4
::: column {span-1 top} Hamburger Menu
::: card
## ☰
[Reset]
[Open from file]
[Save to...]
[Live Collaboration]
[Export to link]

---
Style: [Sketch]{primary} [Clean] [Material] [Brutalist]

---
[GitHub]
[About]
:::
:::
::: column {span-1 top} Share button
**Default:**
[Share]{primary}

**Live session active:**
[⟳ Share]{primary}
:::
::: column Sharing modal — no session
::: card
**Live Collaboration**
((saves to cloud)){primary}

Start a session — URL becomes a shareable project ID. Multiple people can edit simultaneously.

[Start Live Session]{primary}

---
**Copy Link**

Markdown encoded in URL — works offline, no account needed.

[Copy Link]

---
**Export**

[Markdown] [HTML] [Tailwind] [React / JSX]
:::
:::
::: column {top} Sharing modal — live active
::: card
Active session:

[wiremd.com/editor/?p=VQWDn3ew]

[Copy project link] [Stop Session]{danger}
:::
:::
:::

---
# Loading Screen

::: columns-2
::: column
## With recent file
::: card
### Edit File in Browser
((CONTINUE WITH A RECENT FILE))

[dashboard.md]*
[login.md]*

---
[Skip]
:::
:::
::: column {top}
## No recent file → canvas directly
:::
:::

---
# Save to modal
::: card
### Save to

**Format**

[Markdown .md]{primary} [HTML] [Tailwind] [React / JSX]

<!-- opens native file save dialog -->
[Save]{primary} [Cancel]
:::

---
# Template Gallery — Examples panel

::: columns-4
::: column {span-1}
::: card
**Templates** [dismiss]{secondary}

---
**Auth**

[Sign In]* [Sign Up]* [Reset Password]*

---
**Dashboard**

[Overview]* [Analytics]* [Data Table]*

---
**Marketing**

[Landing Page]* [Pricing]* [Blog Post]*

---
**Utility**

[Settings]* [Profile]* [Empty State]*
:::
:::
::: column {span-3}
::: card
> Preview of selected template · click to load into editor

# Dashboard — Overview
::: columns-4
::: column
::: card
**Users**
# 1,240
((+12%)){primary}
:::
:::
::: column
::: card
**Revenue**
# $8,400
((+5%)){primary}
:::
:::
::: column
::: card
**Churn**
# 2.1%
((−0.3%)){danger}
:::
:::
::: column
::: card
**Uptime**
# 99.9%
:::
:::
:::
[Load this template]{primary} [Preview full screen]
:::
:::
:::

---
# Live Session — Joined State
::: card
((● Live session)){primary} You're editing with @tobias — [Copy link] [Leave]{danger}
:::
