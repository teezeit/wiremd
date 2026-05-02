<!-- Auto-seeded by `pnpm review:log`. Re-runs MERGE — your verdicts and
     comments are preserved. REVIEW.html reads/writes this file via the
     FS Access API; hand-edits are fine but keep the row pattern intact. -->

# Snapshot review log

Legend: ⏳ todo | ✅ OK | ❌ failing (.expected-fail.invariants.ts) | 📝 noted (.notes.md) | 🚧 known issue (KNOWN_ISSUES.md)

## Regression fixtures

### Containers / Closer (regressions/containers/closer)
- [✅ blank-line-before-list][1]
- [✅ closer-after-heading][2]
- [✅ closer-after-paragraph][3]
- [✅ nested-card][4]
- [✅ no-blank-line-before-list][5]
- [✅ text-before-nested-opener][6]

### Formatting (regressions/formatting)
- [✅ closer-with-trailing-space][7]
- [✅ crlf-line-endings][8]
- [✅ icon-needs-blank-line][9]
- [✅ inline-nav-needs-blank-line][10]
- [✅ leading-bom][11]
- [✅ multiple-blanks-between][12]
- [✅ opener-no-blank-after][13]
- [✅ siblings-no-blank-between][14]
- [✅ trailing-whitespace-opener][15]

### Grid (regressions/grid)
- [✅ col-span-large][16]
- [✅ text-after-opener-flag][17]

### Inline (regressions/inline)
- [✅ text-after-button][18]

## Doc-derived fixtures

### Buttons (apps/docs/components/buttons.md)
- [✅ basic][19]
- [✅ variants][20]
- [✅ disabled][21]
- [✅ sizes-custom-classes][22]
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
- [✅ in-a-form][43]
- [✅ radio-buttons][44]
- [✅ inline-options][45]

### Icons (apps/docs/components/icons.md)
- [✅ basic-usage][46]
- [✅ basic-usage-2][47]
- [✅ basic-usage-3][48]

### Badges (apps/docs/components/badges.md)
- [✅ variants][49]
- [✅ inline-with-text][50]
- [✅ in-a-table][51]
- [✅ count-badges][52]

### Columns (apps/docs/components/columns.md)
- [✅ layout-columns-no-card-chrome][53]
- [✅ card-columns][54]
- [✅ column-spanning][55]
- [✅ two-column-layout][56]
- [✅ alignment][57]

### Row (apps/docs/components/row.md)
- [✅ basic-row][58]
- [✅ row-with-alignment][59]
- [✅ row-with-alignment-2][60]
- [✅ split-layouts][61]
- [✅ mixed-content][62]
- [✅ mixed-content-2][63]
- [✅ mixed-content-3][64]
- [✅ search-and-filters][65]
- [✅ toolbar-pattern][66]

### Cards (apps/docs/components/cards.md)
- [✅ card][67]
- [✅ card-grid][68]
- [✅ hero][69]
- [✅ modal][70]
- [📝 section][71] — not sure what section is supposed to do
- [📝 footer][72] — not sure what this component actually does
- [✅ empty-state][73]
- [✅ loading-state][74]
- [✅ error-state][75]

### Tabs (apps/docs/components/tabs.md)
- [✅ basic-tabs][76]
- [✅ settings-pattern][77]

### Page Layouts (apps/docs/components/page-layouts.md)
- [✅ top-nav-layout][78]
- [✅ top-nav-with-right-aligned-actions][79]
- [✅ sidebar-layout][80]
- [✅ sidebar-with-sections][81]
- [✅ navbar-sidebar-layout][82]

### Navigation (apps/docs/components/navigation.md)
- [✅ navbar][83]
- [✅ active-state][84]
- [✅ with-icon-and-buttons][85]
- [✅ breadcrumbs][86]
- [✅ sidebar-nav][87]
- [✅ pagination][88]

### Tables (apps/docs/components/tables.md)
- [✅ basic-table][89]
- [✅ with-badges][90]
- [✅ data-table-with-actions][91]
- [✅ column-alignment][92]

### Alerts (apps/docs/components/alerts.md)
- [✅ default][93]
- [✅ variants][94]
- [✅ variants-2][95]
- [✅ variants-3][96]
- [✅ with-inline-content-on-opener][97]

### Comments (apps/docs/components/comments.md)
- [✅ basic-usage][98]
- [✅ threads-multiple-comments-on-one-element][99]
- [✅ annotating-a-whole-card][100]
- [✅ annotating-a-whole-card-2][101] — test should be called annotate item inside a card
- [✅ annotating-a-whole-grid-column][102]
- [✅ comments-between-tabs][103]
- [✅ multiline-comments][104]

### Attributes (apps/docs/components/attributes.md)
- [✅ css-classes][105]
- [✅ key-value-attributes][106]
- [✅ combining-classes-and-attributes][107]
- [✅ on-containers][108]
- [✅ on-headings][109]
- [✅ on-grid-items][110]

### Demo (apps/docs/components/demo.md)
- [✅ basic-usage][111]
- [✅ with-a-form][112]
- [✅ with-a-grid][113]

### Index (apps/docs/components/index.md)
- [✅ demo][114]

[1]: ./REVIEW.html#fixture-regression-containers-closer-blank-line-before-list
[2]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-heading
[3]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-paragraph
[4]: ./REVIEW.html#fixture-regression-containers-closer-nested-card
[5]: ./REVIEW.html#fixture-regression-containers-closer-no-blank-line-before-list
[6]: ./REVIEW.html#fixture-regression-containers-closer-text-before-nested-opener
[7]: ./REVIEW.html#fixture-regression-formatting-closer-with-trailing-space
[8]: ./REVIEW.html#fixture-regression-formatting-crlf-line-endings
[9]: ./REVIEW.html#fixture-regression-formatting-icon-needs-blank-line
[10]: ./REVIEW.html#fixture-regression-formatting-inline-nav-needs-blank-line
[11]: ./REVIEW.html#fixture-regression-formatting-leading-bom
[12]: ./REVIEW.html#fixture-regression-formatting-multiple-blanks-between
[13]: ./REVIEW.html#fixture-regression-formatting-opener-no-blank-after
[14]: ./REVIEW.html#fixture-regression-formatting-siblings-no-blank-between
[15]: ./REVIEW.html#fixture-regression-formatting-trailing-whitespace-opener
[16]: ./REVIEW.html#fixture-regression-grid-col-span-large
[17]: ./REVIEW.html#fixture-regression-grid-text-after-opener-flag
[18]: ./REVIEW.html#fixture-regression-inline-text-after-button
[19]: ./REVIEW.html#fixture-docs-buttons-basic
[20]: ./REVIEW.html#fixture-docs-buttons-variants
[21]: ./REVIEW.html#fixture-docs-buttons-disabled
[22]: ./REVIEW.html#fixture-docs-buttons-sizes-custom-classes
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
[43]: ./REVIEW.html#fixture-docs-checkboxes-radio-in-a-form
[44]: ./REVIEW.html#fixture-docs-checkboxes-radio-radio-buttons
[45]: ./REVIEW.html#fixture-docs-checkboxes-radio-inline-options
[46]: ./REVIEW.html#fixture-docs-icons-basic-usage
[47]: ./REVIEW.html#fixture-docs-icons-basic-usage-2
[48]: ./REVIEW.html#fixture-docs-icons-basic-usage-3
[49]: ./REVIEW.html#fixture-docs-badges-variants
[50]: ./REVIEW.html#fixture-docs-badges-inline-with-text
[51]: ./REVIEW.html#fixture-docs-badges-in-a-table
[52]: ./REVIEW.html#fixture-docs-badges-count-badges
[53]: ./REVIEW.html#fixture-docs-grid-layout-grid-no-card-chrome
[54]: ./REVIEW.html#fixture-docs-grid-card-grid
[55]: ./REVIEW.html#fixture-docs-grid-column-spanning
[56]: ./REVIEW.html#fixture-docs-grid-two-column-grid
[57]: ./REVIEW.html#fixture-docs-grid-alignment
[58]: ./REVIEW.html#fixture-docs-row-basic-row
[59]: ./REVIEW.html#fixture-docs-row-row-with-alignment
[60]: ./REVIEW.html#fixture-docs-row-row-with-alignment-2
[61]: ./REVIEW.html#fixture-docs-row-split-layouts
[62]: ./REVIEW.html#fixture-docs-row-mixed-content
[63]: ./REVIEW.html#fixture-docs-row-mixed-content-2
[64]: ./REVIEW.html#fixture-docs-row-mixed-content-3
[65]: ./REVIEW.html#fixture-docs-row-search-and-filters
[66]: ./REVIEW.html#fixture-docs-row-toolbar-pattern
[67]: ./REVIEW.html#fixture-docs-cards-card
[68]: ./REVIEW.html#fixture-docs-cards-card-grid
[69]: ./REVIEW.html#fixture-docs-cards-hero
[70]: ./REVIEW.html#fixture-docs-cards-modal
[71]: ./REVIEW.html#fixture-docs-cards-section
[72]: ./REVIEW.html#fixture-docs-cards-footer
[73]: ./REVIEW.html#fixture-docs-cards-empty-state
[74]: ./REVIEW.html#fixture-docs-cards-loading-state
[75]: ./REVIEW.html#fixture-docs-cards-error-state
[76]: ./REVIEW.html#fixture-docs-tabs-basic-tabs
[77]: ./REVIEW.html#fixture-docs-tabs-settings-pattern
[78]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-layout
[79]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-with-right-aligned-actions
[80]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-layout
[81]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-with-sections
[82]: ./REVIEW.html#fixture-docs-page-layouts-navbar-sidebar-layout
[83]: ./REVIEW.html#fixture-docs-navigation-navbar
[84]: ./REVIEW.html#fixture-docs-navigation-active-state
[85]: ./REVIEW.html#fixture-docs-navigation-with-icon-and-buttons
[86]: ./REVIEW.html#fixture-docs-navigation-breadcrumbs
[87]: ./REVIEW.html#fixture-docs-navigation-sidebar-nav
[88]: ./REVIEW.html#fixture-docs-navigation-pagination
[89]: ./REVIEW.html#fixture-docs-tables-basic-table
[90]: ./REVIEW.html#fixture-docs-tables-with-badges
[91]: ./REVIEW.html#fixture-docs-tables-data-table-with-actions
[92]: ./REVIEW.html#fixture-docs-tables-column-alignment
[93]: ./REVIEW.html#fixture-docs-alerts-default
[94]: ./REVIEW.html#fixture-docs-alerts-variants
[95]: ./REVIEW.html#fixture-docs-alerts-variants-2
[96]: ./REVIEW.html#fixture-docs-alerts-variants-3
[97]: ./REVIEW.html#fixture-docs-alerts-with-inline-content-on-opener
[98]: ./REVIEW.html#fixture-docs-comments-basic-usage
[99]: ./REVIEW.html#fixture-docs-comments-threads-multiple-comments-on-one-element
[100]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card
[101]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card-2
[102]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-grid-column
[103]: ./REVIEW.html#fixture-docs-comments-comments-between-tabs
[104]: ./REVIEW.html#fixture-docs-comments-multiline-comments
[105]: ./REVIEW.html#fixture-docs-attributes-css-classes
[106]: ./REVIEW.html#fixture-docs-attributes-key-value-attributes
[107]: ./REVIEW.html#fixture-docs-attributes-combining-classes-and-attributes
[108]: ./REVIEW.html#fixture-docs-attributes-on-containers
[109]: ./REVIEW.html#fixture-docs-attributes-on-headings
[110]: ./REVIEW.html#fixture-docs-attributes-on-grid-items
[111]: ./REVIEW.html#fixture-docs-demo-basic-usage
[112]: ./REVIEW.html#fixture-docs-demo-with-a-form
[113]: ./REVIEW.html#fixture-docs-demo-with-a-grid
[114]: ./REVIEW.html#fixture-docs-index-demo
