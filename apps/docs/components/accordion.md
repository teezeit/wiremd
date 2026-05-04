![[_sidebar.md]]
# Accordion

`::: accordion` creates collapsible sections. Child `::: item Summary` containers become panels. All panels start collapsed by default.

## Basic Accordion

::: demo
::: accordion
::: item What is wiremd?
wiremd converts Markdown with wireframing syntax into HTML wireframes.
:::
::: item Can I export to React?
Yes. Use `--format react` or pass `{ format: 'react' }` to the API.
:::
::: item Is it free?
Yes, MIT licensed. See the LICENSE file for details.
:::
:::
:::

## With Card Border

Add `card` after `accordion` to give the whole component a bordered card look.

::: demo
::: accordion card
::: item Shipping
We ship within 2–3 business days to most regions.
:::
::: item Returns
30-day return policy, no questions asked. Start a return from your account page.
:::
::: item Payment methods
We accept all major credit cards, PayPal, and bank transfers.
:::
:::
:::

## Pre-expanded Item

Add `{open}` to any `:::item` to start it expanded.

::: demo
::: accordion
::: item Getting started
[Download CLI]* [Read docs]

Install with `npm install -g wiremd`, then run `wiremd input.md`.
:::
::: item Advanced usage {open}
Pass `--style sketch` for a hand-drawn look, or `--format react` to output JSX.

Run `wiremd --help` for all options.
:::
::: item VS Code extension
Install **wiremd** from the VS Code Marketplace for live preview on save.
:::
:::
:::

## Exclusive (one open at a time)

Add `{exclusive}` to the wrapper so opening one panel closes the others.

::: demo
::: accordion {exclusive}
::: item Personal plan
[Get started for free]*

Up to 5 wireframes per month.
:::
::: item Pro plan
[$12/month]*

Unlimited wireframes, VS Code extension, priority support.
:::
::: item Enterprise plan
[Contact sales]*

SSO, audit logs, dedicated support, custom limits.
:::
:::
:::

## Rich content

Accordion panels accept any wiremd content — forms, lists, tables, buttons.

::: demo
::: accordion card
::: item Contact us
Name
[_____________________________]

Email
[_____________________________]{type:email}

Message
[Tell us more...]{rows:3}

[Send message]*
:::
::: item FAQ
- What formats are supported? HTML, React, Tailwind, JSON.
- Is there a CLI? Yes, `wiremd input.md`.
- VS Code extension? Yes, install from the Marketplace.
:::
:::
:::

## Syntax

```
::: accordion
::: item Summary text
Panel body content here.
:::
::: item Another panel {open}
This panel starts expanded.
:::
:::
```

Modifiers on the wrapper:

| Modifier | Effect |
|---|---|
| `card` | Bordered outer wrapper + card chrome on each item |
| `{open}` | All panels start expanded |
| `{exclusive}` | Only one panel open at a time |

Modifier on `:::item`:

| Modifier | Effect |
|---|---|
| `{open}` | This panel starts expanded |
