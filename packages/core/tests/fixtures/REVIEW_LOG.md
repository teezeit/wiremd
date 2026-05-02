<!-- Auto-seeded by `pnpm review:log`. Re-runs MERGE — your verdicts and
     comments are preserved. REVIEW.html reads/writes this file via the
     FS Access API; hand-edits are fine but keep the row pattern intact. -->

# Snapshot review log

Legend: ⏳ todo | ✅ OK | ❌ failing (.expected-fail.invariants.ts) | 📝 noted (.notes.md) | 🚧 known issue (KNOWN_ISSUES.md)

## Regression fixtures

### Columns (regressions/columns)
- [📝 col-span-large][1]
- [✅ text-after-opener-flag][2]

### Containers / Closer (regressions/containers/closer)
- [✅ blank-line-before-list][3]
- [✅ closer-after-heading][4]
- [✅ closer-after-paragraph][5]
- [✅ nested-card][6]
- [✅ no-blank-line-before-list][7]
- [✅ text-before-nested-opener][8]

### Formatting (regressions/formatting)
- [✅ closer-with-trailing-space][9]
- [✅ crlf-line-endings][10]
- [✅ icon-needs-blank-line][11]
- [✅ inline-nav-needs-blank-line][12]
- [✅ leading-bom][13]
- [✅ multiple-blanks-between][14]
- [✅ opener-no-blank-after][15]
- [✅ siblings-no-blank-between][16]
- [✅ trailing-whitespace-opener][17]

### Inline (regressions/inline)
- [✅ text-after-button][18]

## Doc-derived fixtures

### Buttons (apps/docs/components/buttons.md)
- [✅ basic][19]
- [✅ variants][20]
- [✅ disabled][21]
- [✅ sizes][22]
- [✅ with-icons][23]

### Button Links (apps/docs/components/button-links.md)
- [✅ basic][24]
- [✅ in-context][25]
- [✅ with-attributes][26]
- [✅ navigation-use-case][27]

### Inputs (apps/docs/components/inputs.md)
- [✅ basic][28]
- [✅ required][29]
- [✅ input-types][30]
- [✅ with-placeholder][31]
- [✅ error-state][32]
- [✅ number-constraints][33]
- [✅ textarea-columns][34]
- [✅ disabled][35]
- [✅ full-form-example][36]

### Textarea Select (apps/docs/components/textarea-select.md)
- [✅ textarea][37]
- [✅ textarea-required][38]
- [✅ select-dropdown][39]
- [✅ select-required][40]
- [✅ combined-example][41]

### Checkboxes Radio (apps/docs/components/checkboxes-radio.md)
- [✅ checkboxes][42]
- [✅ switches][43]
- [✅ in-a-form][44]
- [✅ radio-buttons][45]
- [✅ inline-options][46]

### Icons (apps/docs/components/icons.md)
- [✅ basic-usage][47]
- [✅ basic-usage-2][48]
- [✅ basic-usage-3][49]

### Badges (apps/docs/components/badges.md)
- [✅ variants][50]
- [✅ inline-with-text][51]
- [✅ in-a-table][52]
- [✅ count-badges][53]

### Columns (apps/docs/components/columns.md)
- [✅ layout-columns-no-card-chrome][54]
- [✅ card-columns][55]
- [✅ column-spanning][56]
- [✅ two-column-layout][57]
- [✅ alignment][58]

### Row (apps/docs/components/row.md)
- [✅ basic-row][59]
- [✅ row-with-alignment][60]
- [✅ row-with-alignment-2][61]
- [✅ split-layouts][62]
- [✅ mixed-content][63]
- [✅ mixed-content-2][64]
- [✅ mixed-content-3][65]
- [✅ search-and-filters][66]
- [✅ toolbar-pattern][67]

### Cards (apps/docs/components/cards.md)
- [✅ card][68]
- [✅ card-columns][69]
- [✅ hero][70]
- [✅ modal][71]
- [📝 section][72] — not sure what section is supposed to do
- [📝 footer][73] — not sure what this component actually does
- [✅ empty-state][74]
- [✅ loading-state][75]
- [✅ error-state][76]

### Tabs (apps/docs/components/tabs.md)
- [✅ basic-tabs][77]
- [✅ settings-pattern][78]

### Page Layouts (apps/docs/components/page-layouts.md)
- [✅ top-nav-layout][79]
- [✅ top-nav-with-right-aligned-actions][80]
- [✅ sidebar-layout][81]
- [✅ sidebar-with-sections][82]
- [✅ navbar-sidebar-layout][83]

### Navigation (apps/docs/components/navigation.md)
- [✅ navbar][84]
- [✅ active-state][85]
- [✅ with-icon-and-buttons][86]
- [✅ breadcrumbs][87]
- [✅ sidebar-nav][88]
- [✅ pagination][89]

### Tables (apps/docs/components/tables.md)
- [✅ basic-table][90]
- [✅ with-badges][91]
- [✅ data-table-with-actions][92]
- [✅ column-alignment][93]

### Alerts (apps/docs/components/alerts.md)
- [✅ default][94]
- [✅ variants][95]
- [✅ variants-2][96]
- [✅ variants-3][97]
- [✅ with-inline-content-on-opener][98]

### Comments (apps/docs/components/comments.md)
- [✅ basic-usage][99]
- [✅ threads-multiple-comments-on-one-element][100]
- [✅ annotating-a-whole-card][101]
- [✅ annotating-a-whole-card-2][102] — test should be called annotate item inside a card
- [✅ annotating-a-whole-column][103]
- [✅ comments-between-tabs][104]
- [✅ multiline-comments][105]

### Attributes (apps/docs/components/attributes.md)
- [✅ semantic-modifiers][106]
- [✅ key-value-attributes][107]
- [✅ combining-classes-and-attributes][108]
- [✅ on-column-items][109]

### Demo (apps/docs/components/demo.md)
- [✅ basic-usage][110]
- [✅ with-a-form][111]
- [✅ with-columns][112]

### Index (apps/docs/components/index.md)
- [✅ demo][113]

[1]: ./REVIEW.html#fixture-regression-columns-col-span-large
[2]: ./REVIEW.html#fixture-regression-columns-text-after-opener-flag
[3]: ./REVIEW.html#fixture-regression-containers-closer-blank-line-before-list
[4]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-heading
[5]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-paragraph
[6]: ./REVIEW.html#fixture-regression-containers-closer-nested-card
[7]: ./REVIEW.html#fixture-regression-containers-closer-no-blank-line-before-list
[8]: ./REVIEW.html#fixture-regression-containers-closer-text-before-nested-opener
[9]: ./REVIEW.html#fixture-regression-formatting-closer-with-trailing-space
[10]: ./REVIEW.html#fixture-regression-formatting-crlf-line-endings
[11]: ./REVIEW.html#fixture-regression-formatting-icon-needs-blank-line
[12]: ./REVIEW.html#fixture-regression-formatting-inline-nav-needs-blank-line
[13]: ./REVIEW.html#fixture-regression-formatting-leading-bom
[14]: ./REVIEW.html#fixture-regression-formatting-multiple-blanks-between
[15]: ./REVIEW.html#fixture-regression-formatting-opener-no-blank-after
[16]: ./REVIEW.html#fixture-regression-formatting-siblings-no-blank-between
[17]: ./REVIEW.html#fixture-regression-formatting-trailing-whitespace-opener
[18]: ./REVIEW.html#fixture-regression-inline-text-after-button
[19]: ./REVIEW.html#fixture-docs-buttons-basic
[20]: ./REVIEW.html#fixture-docs-buttons-variants
[21]: ./REVIEW.html#fixture-docs-buttons-disabled
[22]: ./REVIEW.html#fixture-docs-buttons-sizes
[23]: ./REVIEW.html#fixture-docs-buttons-with-icons
[24]: ./REVIEW.html#fixture-docs-button-links-basic
[25]: ./REVIEW.html#fixture-docs-button-links-in-context
[26]: ./REVIEW.html#fixture-docs-button-links-with-attributes
[27]: ./REVIEW.html#fixture-docs-button-links-navigation-use-case
[28]: ./REVIEW.html#fixture-docs-inputs-basic
[29]: ./REVIEW.html#fixture-docs-inputs-required
[30]: ./REVIEW.html#fixture-docs-inputs-input-types
[31]: ./REVIEW.html#fixture-docs-inputs-with-placeholder
[32]: ./REVIEW.html#fixture-docs-inputs-error-state
[33]: ./REVIEW.html#fixture-docs-inputs-number-constraints
[34]: ./REVIEW.html#fixture-docs-inputs-textarea-columns
[35]: ./REVIEW.html#fixture-docs-inputs-disabled
[36]: ./REVIEW.html#fixture-docs-inputs-full-form-example
[37]: ./REVIEW.html#fixture-docs-textarea-select-textarea
[38]: ./REVIEW.html#fixture-docs-textarea-select-textarea-required
[39]: ./REVIEW.html#fixture-docs-textarea-select-select-dropdown
[40]: ./REVIEW.html#fixture-docs-textarea-select-select-required
[41]: ./REVIEW.html#fixture-docs-textarea-select-combined-example
[42]: ./REVIEW.html#fixture-docs-checkboxes-radio-checkboxes
[43]: ./REVIEW.html#fixture-docs-checkboxes-radio-switches
[44]: ./REVIEW.html#fixture-docs-checkboxes-radio-in-a-form
[45]: ./REVIEW.html#fixture-docs-checkboxes-radio-radio-buttons
[46]: ./REVIEW.html#fixture-docs-checkboxes-radio-inline-options
[47]: ./REVIEW.html#fixture-docs-icons-basic-usage
[48]: ./REVIEW.html#fixture-docs-icons-basic-usage-2
[49]: ./REVIEW.html#fixture-docs-icons-basic-usage-3
[50]: ./REVIEW.html#fixture-docs-badges-variants
[51]: ./REVIEW.html#fixture-docs-badges-inline-with-text
[52]: ./REVIEW.html#fixture-docs-badges-in-a-table
[53]: ./REVIEW.html#fixture-docs-badges-count-badges
[54]: ./REVIEW.html#fixture-docs-columns-layout-columns-no-card-chrome
[55]: ./REVIEW.html#fixture-docs-columns-card-columns
[56]: ./REVIEW.html#fixture-docs-columns-column-spanning
[57]: ./REVIEW.html#fixture-docs-columns-two-column-layout
[58]: ./REVIEW.html#fixture-docs-columns-alignment
[59]: ./REVIEW.html#fixture-docs-row-basic-row
[60]: ./REVIEW.html#fixture-docs-row-row-with-alignment
[61]: ./REVIEW.html#fixture-docs-row-row-with-alignment-2
[62]: ./REVIEW.html#fixture-docs-row-split-layouts
[63]: ./REVIEW.html#fixture-docs-row-mixed-content
[64]: ./REVIEW.html#fixture-docs-row-mixed-content-2
[65]: ./REVIEW.html#fixture-docs-row-mixed-content-3
[66]: ./REVIEW.html#fixture-docs-row-search-and-filters
[67]: ./REVIEW.html#fixture-docs-row-toolbar-pattern
[68]: ./REVIEW.html#fixture-docs-cards-card
[69]: ./REVIEW.html#fixture-docs-cards-card-columns
[70]: ./REVIEW.html#fixture-docs-cards-hero
[71]: ./REVIEW.html#fixture-docs-cards-modal
[72]: ./REVIEW.html#fixture-docs-cards-section
[73]: ./REVIEW.html#fixture-docs-cards-footer
[74]: ./REVIEW.html#fixture-docs-cards-empty-state
[75]: ./REVIEW.html#fixture-docs-cards-loading-state
[76]: ./REVIEW.html#fixture-docs-cards-error-state
[77]: ./REVIEW.html#fixture-docs-tabs-basic-tabs
[78]: ./REVIEW.html#fixture-docs-tabs-settings-pattern
[79]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-layout
[80]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-with-right-aligned-actions
[81]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-layout
[82]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-with-sections
[83]: ./REVIEW.html#fixture-docs-page-layouts-navbar-sidebar-layout
[84]: ./REVIEW.html#fixture-docs-navigation-navbar
[85]: ./REVIEW.html#fixture-docs-navigation-active-state
[86]: ./REVIEW.html#fixture-docs-navigation-with-icon-and-buttons
[87]: ./REVIEW.html#fixture-docs-navigation-breadcrumbs
[88]: ./REVIEW.html#fixture-docs-navigation-sidebar-nav
[89]: ./REVIEW.html#fixture-docs-navigation-pagination
[90]: ./REVIEW.html#fixture-docs-tables-basic-table
[91]: ./REVIEW.html#fixture-docs-tables-with-badges
[92]: ./REVIEW.html#fixture-docs-tables-data-table-with-actions
[93]: ./REVIEW.html#fixture-docs-tables-column-alignment
[94]: ./REVIEW.html#fixture-docs-alerts-default
[95]: ./REVIEW.html#fixture-docs-alerts-variants
[96]: ./REVIEW.html#fixture-docs-alerts-variants-2
[97]: ./REVIEW.html#fixture-docs-alerts-variants-3
[98]: ./REVIEW.html#fixture-docs-alerts-with-inline-content-on-opener
[99]: ./REVIEW.html#fixture-docs-comments-basic-usage
[100]: ./REVIEW.html#fixture-docs-comments-threads-multiple-comments-on-one-element
[101]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card
[102]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card-2
[103]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-column
[104]: ./REVIEW.html#fixture-docs-comments-comments-between-tabs
[105]: ./REVIEW.html#fixture-docs-comments-multiline-comments
[106]: ./REVIEW.html#fixture-docs-attributes-semantic-modifiers
[107]: ./REVIEW.html#fixture-docs-attributes-key-value-attributes
[108]: ./REVIEW.html#fixture-docs-attributes-combining-classes-and-attributes
[109]: ./REVIEW.html#fixture-docs-attributes-on-column-items
[110]: ./REVIEW.html#fixture-docs-demo-basic-usage
[111]: ./REVIEW.html#fixture-docs-demo-with-a-form
[112]: ./REVIEW.html#fixture-docs-demo-with-columns
[113]: ./REVIEW.html#fixture-docs-index-demo
