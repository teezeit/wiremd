[← All Wireframes](index.html)

# wiremd Component Library

Visual reference for all wiremd syntax. Each section shows the code then the rendered output.

---

## Buttons

```markdown
[Default]   [Primary]*   [Secondary]{.secondary}   [Danger]{variant:danger}   [Loading...]{state:loading}   [Disabled]{state:disabled}
```

**Rendered:**

[Default]   [Primary]*   [Secondary]{.secondary}   [Danger]{variant:danger}   [Loading...]{state:loading}   [Disabled]{state:disabled}

---

## Text Inputs

Label must be directly above the input — no blank line between them.

```markdown
Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Phone
[_____________________________]{type:tel}

Password
[*****************************]{type:password required}

Search
[Search products...]{type:search}
```

**Rendered:**

Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Phone
[_____________________________]{type:tel}

Password
[*****************************]{type:password required}

Search
[Search products...]{type:search}

---

## Textarea

```markdown
Message
[Your message here...]{rows:5}
```

**Rendered:**

Message
[Your message here...]{rows:5}

---

## Input States

```markdown
Username
[taken_username]{state:error}

Subscription
[Pro plan]{state:disabled}
```

**Rendered:**

Username
[taken_username]{state:error}

Subscription
[Pro plan]{state:disabled}

---

## Dropdown / Select

```markdown
Role
[Select role_________________v]

Topic
[Select a topic______________v]
- General inquiry
- Sales
- Technical support
- Partnership
```

**Rendered:**

Role
[Select role_________________v]

Topic
[Select a topic______________v]
- General inquiry
- Sales
- Technical support
- Partnership

---

## Checkboxes

```markdown
- [ ] Unchecked option
- [x] Checked option
- [ ] Another option
```

**Rendered:**

- [ ] Unchecked option
- [x] Checked option
- [ ] Another option

---

## Radio Buttons

```markdown
- ( ) Option A
- (*) Option B (selected)
- ( ) Option C
```

**Rendered:**

- ( ) Option A
- (*) Option B (selected)
- ( ) Option C

---

## Icons

```markdown
:home:  :user:  :gear:  :bell:  :search:  :check:  :x:  :shield:  :rocket:  :chart:  :edit:  :trash:  :plus:  :arrow-right:  :logo:
```

**Rendered:**

:home:  :user:  :gear:  :bell:  :search:  :check:  :x:  :shield:  :rocket:  :chart:  :edit:  :trash:  :plus:  :arrow-right:  :logo:

---

## Navigation Bar

The brand (`:logo:` item) gets `margin-right: auto` — everything after it is pushed to the right edge.

```markdown
[[ :logo: JAM | Home | *Sessions* | Library | :user: XP 790 ]]
```

**Rendered:**

[[ :logo: JAM | Home | *Sessions* | Library | :user: XP 790 ]]

---

## Breadcrumbs

```markdown
[[ Home > Section > Current Page ]]
```

**Rendered:**

[[ Home > Section > Current Page ]]

---

## Tab Bar

Bold = active tab. Plain links for inactive tabs.

```markdown
**Overview** · [Details](details.html) · [Reviews](reviews.html) · [FAQ](faq.html)
```

**Rendered:**

**Overview** · [Details](#) · [Reviews](#) · [FAQ](#)

---

## Card

```markdown
::: card
### Card Title
Card body content with supporting text. Can contain any wiremd elements.

[Primary Action]* [Cancel]
:::
```

**Rendered:**

::: card
### Card Title
Card body content with supporting text. Can contain any wiremd elements.

[Primary Action]* [Cancel]
:::

---

## Hero

```markdown
::: hero
## Welcome to the Platform

Get started in minutes. No setup required.

[Get Started]* [Learn More]
:::
```

**Rendered:**

::: hero
## Welcome to the Platform

Get started in minutes. No setup required.

[Get Started]* [Learn More]
:::

---

## Alerts

```markdown
::: alert success
Changes saved successfully.
:::

::: alert info
Your trial expires in 3 days.
:::

::: alert warning
This action cannot be undone.
:::

::: alert error
Something went wrong. Please try again.
:::
```

**Rendered:**

::: alert success
Changes saved successfully.
:::

::: alert info
Your trial expires in 3 days.
:::

::: alert warning
This action cannot be undone.
:::

::: alert error
Something went wrong. Please try again.
:::

---

## Modal

```markdown
::: modal
## Confirm Delete

Are you sure you want to delete **Project Alpha**? This cannot be undone.

[Delete]{variant:danger} [Cancel]
:::
```

**Rendered:**

::: modal
## Confirm Delete

Are you sure you want to delete **Project Alpha**? This cannot be undone.

[Delete]{variant:danger} [Cancel]
:::

---

## Sidebar

```markdown
::: sidebar
:logo: **JAM**

- [Dashboard](#)
- **[Sessions](#)**
- [Library](#)
- [Settings](#)
:::
```

**Rendered:**

::: sidebar
:logo: **JAM**

- [Dashboard](#)
- **[Sessions](#)**
- [Library](#)
- [Settings](#)
:::

---

## Footer

```markdown
::: footer
© 2025 Acme Corp · [Privacy](#) · [Terms](#) · [Contact](#)
:::
```

**Rendered:**

::: footer
© 2025 Acme Corp · [Privacy](#) · [Terms](#) · [Contact](#)
:::

---

## Nested Containers

```markdown
::: card
### System Status

::: alert success
All systems operational.
:::

Last checked 2 minutes ago.
:::
```

**Rendered:**

::: card
### System Status

::: alert success
All systems operational.
:::

Last checked 2 minutes ago.
:::

---

## Sidebar-Main Layout

```markdown
::: layout {.sidebar-main}
## Sidebar {.sidebar}
:logo: **JAM**

- [Dashboard](#)
- **[Sessions](#)**
- [Library](#)
- [Settings](#)

## Main {.main}
### Page Title

Main content area. The sidebar is a fixed 200px panel; this area is fluid.

| Column A | Column B | Column C |
|----------|----------|----------|
| Data     | Data     | Data     |
| Data     | Data     | Data     |

:::
```

**Rendered:**

::: layout {.sidebar-main}
## Sidebar {.sidebar}
:logo: **JAM**

- [Dashboard](#)
- **[Sessions](#)**
- [Library](#)
- [Settings](#)

## Main {.main}
### Page Title

Main content area. The sidebar is a fixed 200px panel; this area is fluid.

| Column A | Column B | Column C |
|----------|----------|----------|
| Data     | Data     | Data     |
| Data     | Data     | Data     |

:::

---

## Grid — 2 columns

```markdown
## Highlights {.grid-2}

### :check: Benefit One
Short description of the first benefit.

### :check: Benefit Two
Short description of the second benefit.
```

**Rendered:**

## Highlights {.grid-2}

### :check: Benefit One
Short description of the first benefit.

### :check: Benefit Two
Short description of the second benefit.

##

---

## Grid — 3 columns

```markdown
## Features {.grid-3}

### :rocket: Fast
Blazing fast performance with no compromises.

### :shield: Secure
Enterprise-grade security built in from day one.

### :gear: Flexible
Works with any stack, any team, any workflow.
```

**Rendered:**

## Features {.grid-3}

### :rocket: Fast
Blazing fast performance with no compromises.

### :shield: Secure
Enterprise-grade security built in from day one.

### :gear: Flexible
Works with any stack, any team, any workflow.

##

---

## Grid — 4 columns

```markdown
## Stats {.grid-4}

### 12,400
Active users

### 98.9%
Uptime SLA

### 4.2s
Avg. session time

### 340
Sessions today
```

**Rendered:**

## Stats {.grid-4}

### 12,400
Active users

### 98.9%
Uptime SLA

### 4.2s
Avg. session time

### 340
Sessions today

##

---

## Table

```markdown
| Name    | Role   | Status  | Actions          |
|---------|--------|---------|------------------|
| Alice   | Admin  | Active  | [Edit] [Remove]  |
| Bob     | Member | Invited | [Edit] [Remove]  |
| Charlie | Viewer | Active  | [Edit] [Remove]  |
```

**Rendered:**

| Name    | Role   | Status  | Actions          |
|---------|--------|---------|------------------|
| Alice   | Admin  | Active  | [Edit] [Remove]  |
| Bob     | Member | Invited | [Edit] [Remove]  |
| Charlie | Viewer | Active  | [Edit] [Remove]  |

---

## Badges / Pills

```markdown
Status `active`

Notifications `3`

Plan `Pro`   Seats `12 / 20`
```

**Rendered:**

Status `active`

Notifications `3`

Plan `Pro`   Seats `12 / 20`

---

## Annotations

```markdown
> **Loading state:** Spinner + "Loading sessions…" text, centred in the content area.

> **Empty state:** Illustration + "No sessions yet" heading + [Start Session]* button.

> **Design question:** Should this be a modal or an inline expansion panel?

> **Note:** This section is only visible to users with Admin role.
```

**Rendered:**

> **Loading state:** Spinner + "Loading sessions…" text, centred in the content area.

> **Empty state:** Illustration + "No sessions yet" heading + [Start Session]* button.

> **Design question:** Should this be a modal or an inline expansion panel?

> **Note:** This section is only visible to users with Admin role.

---

## Full Form Example

```markdown
::: card
## Create Account

First name
[_____________________________]{required}

Last name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Password
[*****________________________]{type:password required}

Role
[Select role_________________v]
- Admin
- Editor
- Viewer

- [x] Send me product updates
- [ ] Agree to terms and conditions

[Create Account]* [Cancel]
:::
```

**Rendered:**

::: card
## Create Account

First name
[_____________________________]{required}

Last name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

Password
[*****________________________]{type:password required}

Role
[Select role_________________v]
- Admin
- Editor
- Viewer

- [x] Send me product updates
- [ ] Agree to terms and conditions

[Create Account]* [Cancel]
:::
