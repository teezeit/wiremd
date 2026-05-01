# Column titles should be left-aligned in clean/wireframe

In the rendered output, column titles inside a section/grid are
center-aligned (or default text-align), but a left-aligned default
reads better for typical content.

**Type:** renderer/styles concern.
**Action:** add `text-align: left` to `wmd-h3` (or grid-item-heading)
in the `clean` and `wireframe` styles.
