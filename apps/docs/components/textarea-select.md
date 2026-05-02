![[_sidebar.md]]
# Textarea & Select

## Textarea

Use `{rows:N}` to create a multi-line text area.
::: demo
Message
[Write your message here...]{rows:4}
:::

## Textarea — Required
::: demo
Bio
[Tell us about yourself...]{rows:3 required}
:::

## Select / Dropdown

A bracket line followed by a list creates a dropdown. The bracket content is the placeholder label.
::: demo
Country
[Select country            v]
- United States
- United Kingdom
- Germany
- France
:::

Select behavior depends on the option syntax:

| Option syntax | Rendered pattern | Use for |
|---------------|------------------|---------|
| `- Admin` | Plain select | Choosing a value |
| `- [Jira](./jira.md)` | Navigation select | App, workspace, project, or page switching |
| `- [Archive]` | Action select | Compact action menus in wireframes |

## Select — Required
::: demo
Role
[Select a role             v]{required}
- Admin
- Editor
- Viewer
:::

## Navigation Select

Use Markdown links for options when the select should navigate. This keeps the component modeled as a `select`, while each option carries its destination.
::: demo
Workspace
[Workspace                 v]
- [Acme Inc](./acme.md)
- [Personal](./personal.md)
- [Create workspace](./new-workspace.md)
:::

This pattern is useful for app switchers, workspace switchers, project switchers, and compact page navigation.

## Action Select

Use button-style options when the select represents commands rather than values or links. Renderers expose these as action options for prototyping.
::: demo
Project actions
[Actions                   v]
- [Duplicate]
- [Archive]
- [Delete]
:::

## Combined Example
::: demo
## Feedback

Category
[Select category           v]
- Bug report
- Feature request
- General feedback

Description
[Describe the issue...]{rows:5 required}

[Submit Feedback]* [Cancel]
:::

## Syntax

```
[Placeholder...]{rows:4}           textarea
[Placeholder...]{rows:4 required}  required textarea

[Select label              v]      dropdown opener
- Option 1                         followed by list
- Option 2

[Workspace                 v]      navigation select
- [Acme Inc](./acme.md)            linked options
- [Personal](./personal.md)

[Actions                   v]      action select
- [Duplicate]                      action options
- [Archive]
```
