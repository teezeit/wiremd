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

### Nesting / Components (regressions/nesting/components)
- [✅ card-columns-form-controls][19]
- [✅ card-tabs-columns][20]
- [✅ columns-tabs-cards][21]
- [✅ tabs-cards-rows][22]
- [✅ tabs-columns-nested-cards][23]

## Doc-derived fixtures

### Buttons (apps/docs/components/buttons.md)
- [✅ basic][24]
- [✅ variants][25]
- [✅ disabled][26]
- [✅ sizes][27]
- [✅ with-icons][28]

### Button Links (apps/docs/components/button-links.md)
- [✅ basic][29]
- [✅ in-context][30]
- [✅ with-attributes][31]
- [✅ navigation-use-case][32]

### Inputs (apps/docs/components/inputs.md)
- [✅ basic][33]
- [✅ required][34]
- [✅ input-types][35]
- [✅ with-placeholder][36]
- [✅ error-state][37]
- [✅ number-constraints][38]
- [✅ textarea-columns][39]
- [✅ disabled][40]
- [✅ full-form-example][41]

### Textarea Select (apps/docs/components/textarea-select.md)
- [✅ textarea][42]
- [✅ textarea-required][43]
- [✅ select-dropdown][44]
- [✅ select-required][45]
- [✅ navigation-select][46]
- [✅ action-select][47]
- [✅ combined-example][48]

### Checkboxes Radio (apps/docs/components/checkboxes-radio.md)
- [✅ checkboxes][49]
- [✅ switches][50]
- [✅ in-a-form][51]
- [✅ radio-buttons][52]
- [✅ inline-options][53]

### Icons (apps/docs/components/icons.md)
- [✅ basic-usage][54]
- [✅ basic-usage-2][55]
- [✅ basic-usage-3][56]

### Badges (apps/docs/components/badges.md)
- [✅ variants][57]
- [✅ inline-with-text][58]
- [✅ in-a-table][59]
- [✅ count-badges][60]

### Columns (apps/docs/components/columns.md)
- [✅ layout-columns-no-card-chrome][61]
- [✅ card-columns][62]
- [✅ column-spanning][63]
- [✅ two-column-layout][64]
- [✅ alignment][65]

### Row (apps/docs/components/row.md)
- [✅ basic-row][66]
- [✅ row-with-alignment][67]
- [✅ row-with-alignment-2][68]
- [✅ split-layouts][69]
- [✅ mixed-content][70]
- [✅ mixed-content-2][71]
- [✅ mixed-content-3][72]
- [✅ search-and-filters][73]
- [✅ toolbar-pattern][74]

### Cards (apps/docs/components/cards.md)
- [✅ card][75]
- [✅ card-columns][76]
- [✅ hero][77]
- [✅ modal][78]
- [📝 section][79] — not sure what section is supposed to do
- [📝 footer][80] — not sure what this component actually does
- [✅ empty-state][81]
- [✅ loading-state][82]
- [✅ error-state][83]

### Tabs (apps/docs/components/tabs.md)
- [✅ basic-tabs][84]
- [✅ settings-pattern][85]

### Page Layouts (apps/docs/components/page-layouts.md)
- [✅ top-nav-layout][86]
- [✅ top-nav-with-right-aligned-actions][87]
- [✅ sidebar-layout][88]
- [✅ sidebar-with-sections][89]
- [✅ navbar-sidebar-layout][90]

### Navigation (apps/docs/components/navigation.md)
- [✅ navbar][91]
- [✅ active-state][92]
- [✅ with-icon-and-buttons][93]
- [✅ navigation-select][94]
- [✅ breadcrumbs][95]
- [✅ sidebar-nav][96]
- [✅ pagination][97]

### Tables (apps/docs/components/tables.md)
- [✅ basic-table][98]
- [✅ with-badges][99]
- [✅ data-table-with-actions][100]
- [✅ column-alignment][101]

### Alerts (apps/docs/components/alerts.md)
- [✅ default][102]
- [✅ variants][103]
- [✅ variants-2][104]
- [✅ variants-3][105]
- [✅ with-inline-content-on-opener][106]

### Comments (apps/docs/components/comments.md)
- [✅ basic-usage][107]
- [✅ threads-multiple-comments-on-one-element][108]
- [✅ annotating-a-whole-card][109]
- [✅ annotating-a-whole-card-2][110] — test should be called annotate item inside a card
- [✅ annotating-a-whole-column][111]
- [✅ comments-between-tabs][112]
- [✅ multiline-comments][113]

### Attributes (apps/docs/components/attributes.md)
- [✅ semantic-modifiers][114]
- [✅ key-value-attributes][115]
- [✅ combining-classes-and-attributes][116]
- [✅ on-column-items][117]

### Demo (apps/docs/components/demo.md)
- [✅ basic-usage][118]
- [✅ with-a-form][119]
- [✅ with-columns][120]

### Index (apps/docs/components/index.md)
- [✅ demo][121]

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
[19]: ./REVIEW.html#fixture-regression-nesting-components-card-columns-form-controls
[20]: ./REVIEW.html#fixture-regression-nesting-components-card-tabs-columns
[21]: ./REVIEW.html#fixture-regression-nesting-components-columns-tabs-cards
[22]: ./REVIEW.html#fixture-regression-nesting-components-tabs-cards-rows
[23]: ./REVIEW.html#fixture-regression-nesting-components-tabs-columns-nested-cards
[24]: ./REVIEW.html#fixture-docs-buttons-basic
[25]: ./REVIEW.html#fixture-docs-buttons-variants
[26]: ./REVIEW.html#fixture-docs-buttons-disabled
[27]: ./REVIEW.html#fixture-docs-buttons-sizes
[28]: ./REVIEW.html#fixture-docs-buttons-with-icons
[29]: ./REVIEW.html#fixture-docs-button-links-basic
[30]: ./REVIEW.html#fixture-docs-button-links-in-context
[31]: ./REVIEW.html#fixture-docs-button-links-with-attributes
[32]: ./REVIEW.html#fixture-docs-button-links-navigation-use-case
[33]: ./REVIEW.html#fixture-docs-inputs-basic
[34]: ./REVIEW.html#fixture-docs-inputs-required
[35]: ./REVIEW.html#fixture-docs-inputs-input-types
[36]: ./REVIEW.html#fixture-docs-inputs-with-placeholder
[37]: ./REVIEW.html#fixture-docs-inputs-error-state
[38]: ./REVIEW.html#fixture-docs-inputs-number-constraints
[39]: ./REVIEW.html#fixture-docs-inputs-textarea-columns
[40]: ./REVIEW.html#fixture-docs-inputs-disabled
[41]: ./REVIEW.html#fixture-docs-inputs-full-form-example
[42]: ./REVIEW.html#fixture-docs-textarea-select-textarea
[43]: ./REVIEW.html#fixture-docs-textarea-select-textarea-required
[44]: ./REVIEW.html#fixture-docs-textarea-select-select-dropdown
[45]: ./REVIEW.html#fixture-docs-textarea-select-select-required
[46]: ./REVIEW.html#fixture-docs-textarea-select-navigation-select
[47]: ./REVIEW.html#fixture-docs-textarea-select-action-select
[48]: ./REVIEW.html#fixture-docs-textarea-select-combined-example
[49]: ./REVIEW.html#fixture-docs-checkboxes-radio-checkboxes
[50]: ./REVIEW.html#fixture-docs-checkboxes-radio-switches
[51]: ./REVIEW.html#fixture-docs-checkboxes-radio-in-a-form
[52]: ./REVIEW.html#fixture-docs-checkboxes-radio-radio-buttons
[53]: ./REVIEW.html#fixture-docs-checkboxes-radio-inline-options
[54]: ./REVIEW.html#fixture-docs-icons-basic-usage
[55]: ./REVIEW.html#fixture-docs-icons-basic-usage-2
[56]: ./REVIEW.html#fixture-docs-icons-basic-usage-3
[57]: ./REVIEW.html#fixture-docs-badges-variants
[58]: ./REVIEW.html#fixture-docs-badges-inline-with-text
[59]: ./REVIEW.html#fixture-docs-badges-in-a-table
[60]: ./REVIEW.html#fixture-docs-badges-count-badges
[61]: ./REVIEW.html#fixture-docs-columns-layout-columns-no-card-chrome
[62]: ./REVIEW.html#fixture-docs-columns-card-columns
[63]: ./REVIEW.html#fixture-docs-columns-column-spanning
[64]: ./REVIEW.html#fixture-docs-columns-two-column-layout
[65]: ./REVIEW.html#fixture-docs-columns-alignment
[66]: ./REVIEW.html#fixture-docs-row-basic-row
[67]: ./REVIEW.html#fixture-docs-row-row-with-alignment
[68]: ./REVIEW.html#fixture-docs-row-row-with-alignment-2
[69]: ./REVIEW.html#fixture-docs-row-split-layouts
[70]: ./REVIEW.html#fixture-docs-row-mixed-content
[71]: ./REVIEW.html#fixture-docs-row-mixed-content-2
[72]: ./REVIEW.html#fixture-docs-row-mixed-content-3
[73]: ./REVIEW.html#fixture-docs-row-search-and-filters
[74]: ./REVIEW.html#fixture-docs-row-toolbar-pattern
[75]: ./REVIEW.html#fixture-docs-cards-card
[76]: ./REVIEW.html#fixture-docs-cards-card-columns
[77]: ./REVIEW.html#fixture-docs-cards-hero
[78]: ./REVIEW.html#fixture-docs-cards-modal
[79]: ./REVIEW.html#fixture-docs-cards-section
[80]: ./REVIEW.html#fixture-docs-cards-footer
[81]: ./REVIEW.html#fixture-docs-cards-empty-state
[82]: ./REVIEW.html#fixture-docs-cards-loading-state
[83]: ./REVIEW.html#fixture-docs-cards-error-state
[84]: ./REVIEW.html#fixture-docs-tabs-basic-tabs
[85]: ./REVIEW.html#fixture-docs-tabs-settings-pattern
[86]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-layout
[87]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-with-right-aligned-actions
[88]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-layout
[89]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-with-sections
[90]: ./REVIEW.html#fixture-docs-page-layouts-navbar-sidebar-layout
[91]: ./REVIEW.html#fixture-docs-navigation-navbar
[92]: ./REVIEW.html#fixture-docs-navigation-active-state
[93]: ./REVIEW.html#fixture-docs-navigation-with-icon-and-buttons
[94]: ./REVIEW.html#fixture-docs-navigation-navigation-select
[95]: ./REVIEW.html#fixture-docs-navigation-breadcrumbs
[96]: ./REVIEW.html#fixture-docs-navigation-sidebar-nav
[97]: ./REVIEW.html#fixture-docs-navigation-pagination
[98]: ./REVIEW.html#fixture-docs-tables-basic-table
[99]: ./REVIEW.html#fixture-docs-tables-with-badges
[100]: ./REVIEW.html#fixture-docs-tables-data-table-with-actions
[101]: ./REVIEW.html#fixture-docs-tables-column-alignment
[102]: ./REVIEW.html#fixture-docs-alerts-default
[103]: ./REVIEW.html#fixture-docs-alerts-variants
[104]: ./REVIEW.html#fixture-docs-alerts-variants-2
[105]: ./REVIEW.html#fixture-docs-alerts-variants-3
[106]: ./REVIEW.html#fixture-docs-alerts-with-inline-content-on-opener
[107]: ./REVIEW.html#fixture-docs-comments-basic-usage
[108]: ./REVIEW.html#fixture-docs-comments-threads-multiple-comments-on-one-element
[109]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card
[110]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card-2
[111]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-column
[112]: ./REVIEW.html#fixture-docs-comments-comments-between-tabs
[113]: ./REVIEW.html#fixture-docs-comments-multiline-comments
[114]: ./REVIEW.html#fixture-docs-attributes-semantic-modifiers
[115]: ./REVIEW.html#fixture-docs-attributes-key-value-attributes
[116]: ./REVIEW.html#fixture-docs-attributes-combining-classes-and-attributes
[117]: ./REVIEW.html#fixture-docs-attributes-on-column-items
[118]: ./REVIEW.html#fixture-docs-demo-basic-usage
[119]: ./REVIEW.html#fixture-docs-demo-with-a-form
[120]: ./REVIEW.html#fixture-docs-demo-with-columns
[121]: ./REVIEW.html#fixture-docs-index-demo
