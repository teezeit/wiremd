# column span > 4 doesn't span as expected (renderer/CSS gap)

The parser correctly captures `{span-5}` on a `::: column` opener and
normalizes it to the `col-span-5` class on the grid-item node. The AST is
right. The visual output is wrong if a style doesn't define CSS rules for
`wmd-col-span-5`, `wmd-col-span-6`, etc.

This is a **renderer/styles concern**, not a parser concern. The fixture
stays as a contract that the AST-side support exists. To fix the visual
output, add CSS rules in `styles.ts` for `col-span-5` through whatever
maximum column count we want to support.

Cross-reference: `KNOWN_ISSUES.md` (renderer-side gaps for higher col-spans).
