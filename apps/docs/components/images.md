![[_sidebar.md]]
# Images

Standard Markdown image syntax renders a visible `<img>` in all output formats.

## Basic Usage
::: demo
![Product screenshot](https://picsum.photos/seed/wiremd/600/300)
:::

## Inside a Card
::: demo
::: card
## Hero Card

![Feature preview](https://picsum.photos/seed/wiremd2/600/200)

A short description of the feature shown above.

[Learn More]* [Dismiss]
:::
:::

## With Width and Height

Use `{width:N height:N}` attributes to constrain dimensions.

::: demo
![Thumbnail](https://picsum.photos/seed/wiremd3/400/300){width:200 height:150}
:::

## In a Grid
::: demo
::: columns-3
![Photo 1](https://picsum.photos/seed/a/400/300)

![Photo 2](https://picsum.photos/seed/b/400/300)

![Photo 3](https://picsum.photos/seed/c/400/300)
:::
:::

## Syntax

```
![Alt text](https://example.com/image.jpg)
![Alt text](https://example.com/image.jpg){width:400}
![Alt text](https://example.com/image.jpg){width:400 height:300}
```

The `alt` text is passed through to the rendered `<img alt="...">` attribute. Use a meaningful description for accessibility.
