![[_sidebar.md]]
# Badges

Double parentheses create inline badges. Add a variant token to control colour.

## Variants
::: demo
((Default)) ((Primary)){primary} ((Success)){success} ((Warning)){warning} ((Error)){error}
:::

## Inline with Text
::: demo
Status: ((Active)){success}

Plan: ((Pro)){primary}

Build: ((Failing)){error}

Review: ((Pending)){warning}
:::

## In a Table

The `((Label))` syntax works inside table cells without escaping.
::: demo
| Feature | Status |
|---------|--------|
| Auth | ((Done)){success} |
| API | ((In Progress)){warning} |
| Docs | ((Planned)) |
:::

## Count Badges
::: demo
Inbox ((12)){primary}

Alerts ((3)){error}

Updates ((New)){success}
:::

## Syntax

```
((Label))             neutral grey
((Label)){primary}    blue
((Label)){success}    green
((Label)){warning}    yellow
((Label)){error}      red

((Label)){success}    inside table cell
```
