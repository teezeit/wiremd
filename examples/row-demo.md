# Row Layout Demo
---
## Default Behaviour Witout any {row} class


[Both Buttons] [+ In the same line]* [Search___________________________] [Select_______v]

[Search___________________________]
[Select_______v]


[Buttons underneath each other]
[+ without empty line in between]*

[+ New Item]*


---

## Basic Row — items at start (default)

## Toolbar {.row}

:check: All systems operational:

[All]* [Active]
[Archived]

[Search__________________________]


##

---

## Row aligned right

## Actions {.row .right}

:check: All systems operational:

[All]* [Active]
[Archived]

[Search__________________________]

##

---

## Row centered

## Status {.row .center}

:check: All systems operational:

[All]* [Active]
[Archived]

[Search__________________________]


##

---

## Row inside a card


::: card

### User Management

## Card Toolbar {.row}

[All Users]* [Admins]
[Inactive] [+ Invite User]*


##

| Name | Role | Status |
|------|------|--------|
| Alice | Admin | Active |
| Bob | Editor | Active |
| Carol | Viewer | Inactive |

:::

##
---

## Grid with aligned items (### {.left} / {.right})

## Layout {.grid-2}

### {.left}
[All]* [Active] [Archived]

### {.right}
[+ New Item]*

##


---

## Tabs with row toolbar inside each panel

## Settings {.tabs}

### General {.active}

#### Tab Toolbar {.row}

#####
[Name_____________________________]{required}
[Email_____________________________]{type:email required}

##### {.right}
[Save Changes]*

####

| Name | Role | Status |
|------|------|--------|
| Alice | Admin | Active |
| Bob | Editor | Active |
| Carol | Viewer | Inactive |


### Notifications

##### Notif Toolbar {.row .right}

[Save]*

#####

- [x] Email notifications
- [ ] SMS notifications
- [x] In-app alerts

[Save]*


