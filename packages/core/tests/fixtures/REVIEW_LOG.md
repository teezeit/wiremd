<!-- Auto-seeded by `pnpm review:log`. Re-runs MERGE — your verdicts and
     comments are preserved. REVIEW.html reads/writes this file via the
     FS Access API; hand-edits are fine but keep the row pattern intact. -->

# Snapshot review log

Legend: ⏳ todo | ✅ OK | ❌ failing (.expected-fail.invariants.ts) | 📝 noted (.notes.md) | 🚧 known issue (KNOWN_ISSUES.md)

## Regression fixtures

### Accordion (regressions/accordion)
- [✅ basic][1]
- [✅ card][2]
- [✅ exclusive][3]
- [✅ open-item][4]
- [✅ rich-content][5]

### Columns (regressions/columns)
- [📝 col-span-large][6]
- [✅ text-after-opener-flag][7]

### Containers / Closer (regressions/containers/closer)
- [✅ blank-line-before-list][8]
- [✅ closer-after-heading][9]
- [✅ closer-after-paragraph][10]
- [✅ nested-card][11]
- [✅ no-blank-line-before-list][12]
- [✅ text-before-nested-opener][13]

### Containers / Indented-opener (regressions/containers/indented-opener)
- [✅ 4-spaces-nested][14]
- [✅ tabs-indented-content][15]

### Containers (regressions/containers)
- [✅ tabs-empty-label][16]

### Formatting (regressions/formatting)
- [✅ closer-with-trailing-space][17]
- [✅ crlf-line-endings][18]
- [✅ icon-needs-blank-line][19]
- [✅ inline-nav-needs-blank-line][20]
- [✅ leading-bom][21]
- [✅ multiple-blanks-between][22]
- [✅ opener-no-blank-after][23]
- [✅ siblings-no-blank-between][24]
- [✅ trailing-whitespace-opener][25]

### Images (regressions/images)
- [✅ image-in-card][26]
- [✅ image-standalone][27]

### Inline (regressions/inline)
- [✅ text-after-button][28]

### Nesting / Components (regressions/nesting/components)
- [✅ card-columns-form-controls][29]
- [✅ card-tabs-columns][30]
- [✅ columns-tabs-cards][31]
- [✅ tabs-cards-rows][32]
- [✅ tabs-columns-nested-cards][33]

## Doc-derived fixtures

### Buttons (apps/docs/components/buttons.md)
- [✅ basic][34]
- [✅ variants][35]
- [✅ disabled][36]
- [✅ sizes][37]
- [✅ with-icons][38]

### Button Links (apps/docs/components/button-links.md)
- [✅ basic][39]
- [✅ in-context][40]
- [✅ with-attributes][41]
- [✅ navigation-use-case][42]

### Inputs (apps/docs/components/inputs.md)
- [✅ basic][43]
- [✅ required][44]
- [✅ input-types][45]
- [✅ with-placeholder][46]
- [✅ error-state][47]
- [✅ number-constraints][48]
- [✅ textarea-columns][49]
- [✅ disabled][50]
- [✅ full-form-example][51]

### Textarea Select (apps/docs/components/textarea-select.md)
- [✅ textarea][52]
- [✅ textarea-required][53]
- [✅ select-dropdown][54]
- [✅ select-required][55]
- [✅ navigation-select][56]
- [✅ action-select][57]
- [✅ combined-example][58]

### Checkboxes Radio (apps/docs/components/checkboxes-radio.md)
- [✅ checkboxes][59]
- [✅ switches][60]
- [✅ in-a-form][61]
- [✅ radio-buttons][62]
- [✅ inline-options][63]

### Icons (apps/docs/components/icons.md)
- [✅ basic-usage][64]
- [✅ basic-usage-2][65]
- [✅ basic-usage-3][66]

### Badges (apps/docs/components/badges.md)
- [✅ variants][67]
- [✅ inline-with-text][68]
- [✅ in-a-table][69]
- [✅ count-badges][70]

### Images (apps/docs/components/images.md)
- [✅ basic-usage][71]
- [❌ inside-a-card][72] — overflow of image error
- [❌ with-width-and-height][73] — should not render width and height
- [❌ in-a-grid][74]

### Columns (apps/docs/components/columns.md)
- [✅ layout-columns-no-card-chrome][75]
- [✅ card-columns][76]
- [✅ column-spanning][77]
- [✅ two-column-layout][78]
- [✅ alignment][79]
- [✅ vertical-alignment][80]

### Row (apps/docs/components/row.md)
- [✅ basic-row][81]
- [✅ row-with-alignment][82]
- [✅ row-with-alignment-2][83]
- [✅ vertical-alignment][84]
- [✅ vertical-alignment-2][85]
- [✅ split-layouts][86]
- [✅ mixed-content][87]
- [✅ mixed-content-2][88]
- [✅ mixed-content-3][89]
- [✅ search-and-filters][90]
- [✅ toolbar-pattern][91]

### Alignment (apps/docs/components/alignment.md)
- [✅ horizontal-row][92]
- [✅ horizontal-row-2][93]
- [✅ horizontal-row-3][94]
- [✅ horizontal-column][95]
- [✅ vertical-row][96]
- [✅ vertical-row-2][97]
- [✅ vertical-column][98]

### Cards (apps/docs/components/cards.md)
- [✅ card][99]
- [✅ card-columns][100]
- [✅ hero][101]
- [✅ modal][102]
- [📝 section][103] — not sure what section is supposed to do
- [📝 footer][104] — not sure what this component actually does
- [✅ empty-state][105]
- [✅ loading-state][106]
- [✅ error-state][107]

### Tabs (apps/docs/components/tabs.md)
- [✅ basic-tabs][108]
- [✅ settings-pattern][109]

### Accordion (apps/docs/components/accordion.md)
- [✅ basic-accordion][110]
- [✅ with-card-border][111]
- [✅ pre-expanded-item][112]
- [✅ exclusive-one-open-at-a-time][113]
- [✅ rich-content][114]

### Page Layouts (apps/docs/components/page-layouts.md)
- [✅ top-nav-layout][115]
- [✅ top-nav-with-right-aligned-actions][116]
- [✅ sidebar-layout][117]
- [✅ sidebar-with-sections][118]
- [✅ navbar-sidebar-layout][119]

### Navigation (apps/docs/components/navigation.md)
- [✅ navbar][120]
- [✅ active-state][121]
- [✅ with-icon-and-buttons][122]
- [✅ navigation-select][123]
- [✅ breadcrumbs][124]
- [✅ sidebar-nav][125]
- [✅ pagination][126]

### Tables (apps/docs/components/tables.md)
- [✅ basic-table][127]
- [✅ with-badges][128]
- [✅ data-table-with-actions][129]
- [✅ column-alignment][130]

### Alerts (apps/docs/components/alerts.md)
- [✅ default][131]
- [✅ variants][132]
- [✅ variants-2][133]
- [✅ variants-3][134]
- [✅ with-inline-content-on-opener][135]

### Comments (apps/docs/components/comments.md)
- [✅ basic-usage][136]
- [✅ threads-multiple-comments-on-one-element][137]
- [✅ annotating-a-whole-card][138]
- [✅ annotating-a-whole-card-2][139] — test should be called annotate item inside a card
- [✅ annotating-a-whole-column][140]
- [✅ comments-between-tabs][141]
- [✅ multiline-comments][142]

### Attributes (apps/docs/components/attributes.md)
- [✅ semantic-modifiers][143]
- [✅ key-value-attributes][144]
- [✅ combining-classes-and-attributes][145]
- [✅ on-column-items][146]

### Demo (apps/docs/components/demo.md)
- [✅ basic-usage][147]
- [✅ with-a-form][148]
- [✅ with-columns][149]

### Index (apps/docs/components/index.md)
- [✅ demo][150]

[1]: ./REVIEW.html#fixture-regression-accordion-basic
[2]: ./REVIEW.html#fixture-regression-accordion-card
[3]: ./REVIEW.html#fixture-regression-accordion-exclusive
[4]: ./REVIEW.html#fixture-regression-accordion-open-item
[5]: ./REVIEW.html#fixture-regression-accordion-rich-content
[6]: ./REVIEW.html#fixture-regression-columns-col-span-large
[7]: ./REVIEW.html#fixture-regression-columns-text-after-opener-flag
[8]: ./REVIEW.html#fixture-regression-containers-closer-blank-line-before-list
[9]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-heading
[10]: ./REVIEW.html#fixture-regression-containers-closer-closer-after-paragraph
[11]: ./REVIEW.html#fixture-regression-containers-closer-nested-card
[12]: ./REVIEW.html#fixture-regression-containers-closer-no-blank-line-before-list
[13]: ./REVIEW.html#fixture-regression-containers-closer-text-before-nested-opener
[14]: ./REVIEW.html#fixture-regression-containers-indented-opener-4-spaces-nested
[15]: ./REVIEW.html#fixture-regression-containers-indented-opener-tabs-indented-content
[16]: ./REVIEW.html#fixture-regression-containers-tabs-empty-label
[17]: ./REVIEW.html#fixture-regression-formatting-closer-with-trailing-space
[18]: ./REVIEW.html#fixture-regression-formatting-crlf-line-endings
[19]: ./REVIEW.html#fixture-regression-formatting-icon-needs-blank-line
[20]: ./REVIEW.html#fixture-regression-formatting-inline-nav-needs-blank-line
[21]: ./REVIEW.html#fixture-regression-formatting-leading-bom
[22]: ./REVIEW.html#fixture-regression-formatting-multiple-blanks-between
[23]: ./REVIEW.html#fixture-regression-formatting-opener-no-blank-after
[24]: ./REVIEW.html#fixture-regression-formatting-siblings-no-blank-between
[25]: ./REVIEW.html#fixture-regression-formatting-trailing-whitespace-opener
[26]: ./REVIEW.html#fixture-regression-images-image-in-card
[27]: ./REVIEW.html#fixture-regression-images-image-standalone
[28]: ./REVIEW.html#fixture-regression-inline-text-after-button
[29]: ./REVIEW.html#fixture-regression-nesting-components-card-columns-form-controls
[30]: ./REVIEW.html#fixture-regression-nesting-components-card-tabs-columns
[31]: ./REVIEW.html#fixture-regression-nesting-components-columns-tabs-cards
[32]: ./REVIEW.html#fixture-regression-nesting-components-tabs-cards-rows
[33]: ./REVIEW.html#fixture-regression-nesting-components-tabs-columns-nested-cards
[34]: ./REVIEW.html#fixture-docs-buttons-basic
[35]: ./REVIEW.html#fixture-docs-buttons-variants
[36]: ./REVIEW.html#fixture-docs-buttons-disabled
[37]: ./REVIEW.html#fixture-docs-buttons-sizes
[38]: ./REVIEW.html#fixture-docs-buttons-with-icons
[39]: ./REVIEW.html#fixture-docs-button-links-basic
[40]: ./REVIEW.html#fixture-docs-button-links-in-context
[41]: ./REVIEW.html#fixture-docs-button-links-with-attributes
[42]: ./REVIEW.html#fixture-docs-button-links-navigation-use-case
[43]: ./REVIEW.html#fixture-docs-inputs-basic
[44]: ./REVIEW.html#fixture-docs-inputs-required
[45]: ./REVIEW.html#fixture-docs-inputs-input-types
[46]: ./REVIEW.html#fixture-docs-inputs-with-placeholder
[47]: ./REVIEW.html#fixture-docs-inputs-error-state
[48]: ./REVIEW.html#fixture-docs-inputs-number-constraints
[49]: ./REVIEW.html#fixture-docs-inputs-textarea-columns
[50]: ./REVIEW.html#fixture-docs-inputs-disabled
[51]: ./REVIEW.html#fixture-docs-inputs-full-form-example
[52]: ./REVIEW.html#fixture-docs-textarea-select-textarea
[53]: ./REVIEW.html#fixture-docs-textarea-select-textarea-required
[54]: ./REVIEW.html#fixture-docs-textarea-select-select-dropdown
[55]: ./REVIEW.html#fixture-docs-textarea-select-select-required
[56]: ./REVIEW.html#fixture-docs-textarea-select-navigation-select
[57]: ./REVIEW.html#fixture-docs-textarea-select-action-select
[58]: ./REVIEW.html#fixture-docs-textarea-select-combined-example
[59]: ./REVIEW.html#fixture-docs-checkboxes-radio-checkboxes
[60]: ./REVIEW.html#fixture-docs-checkboxes-radio-switches
[61]: ./REVIEW.html#fixture-docs-checkboxes-radio-in-a-form
[62]: ./REVIEW.html#fixture-docs-checkboxes-radio-radio-buttons
[63]: ./REVIEW.html#fixture-docs-checkboxes-radio-inline-options
[64]: ./REVIEW.html#fixture-docs-icons-basic-usage
[65]: ./REVIEW.html#fixture-docs-icons-basic-usage-2
[66]: ./REVIEW.html#fixture-docs-icons-basic-usage-3
[67]: ./REVIEW.html#fixture-docs-badges-variants
[68]: ./REVIEW.html#fixture-docs-badges-inline-with-text
[69]: ./REVIEW.html#fixture-docs-badges-in-a-table
[70]: ./REVIEW.html#fixture-docs-badges-count-badges
[71]: ./REVIEW.html#fixture-docs-images-basic-usage
[72]: ./REVIEW.html#fixture-docs-images-inside-a-card
[73]: ./REVIEW.html#fixture-docs-images-with-width-and-height
[74]: ./REVIEW.html#fixture-docs-images-in-a-grid
[75]: ./REVIEW.html#fixture-docs-columns-layout-columns-no-card-chrome
[76]: ./REVIEW.html#fixture-docs-columns-card-columns
[77]: ./REVIEW.html#fixture-docs-columns-column-spanning
[78]: ./REVIEW.html#fixture-docs-columns-two-column-layout
[79]: ./REVIEW.html#fixture-docs-columns-alignment
[80]: ./REVIEW.html#fixture-docs-columns-vertical-alignment
[81]: ./REVIEW.html#fixture-docs-row-basic-row
[82]: ./REVIEW.html#fixture-docs-row-row-with-alignment
[83]: ./REVIEW.html#fixture-docs-row-row-with-alignment-2
[84]: ./REVIEW.html#fixture-docs-row-vertical-alignment
[85]: ./REVIEW.html#fixture-docs-row-vertical-alignment-2
[86]: ./REVIEW.html#fixture-docs-row-split-layouts
[87]: ./REVIEW.html#fixture-docs-row-mixed-content
[88]: ./REVIEW.html#fixture-docs-row-mixed-content-2
[89]: ./REVIEW.html#fixture-docs-row-mixed-content-3
[90]: ./REVIEW.html#fixture-docs-row-search-and-filters
[91]: ./REVIEW.html#fixture-docs-row-toolbar-pattern
[92]: ./REVIEW.html#fixture-docs-alignment-horizontal-row
[93]: ./REVIEW.html#fixture-docs-alignment-horizontal-row-2
[94]: ./REVIEW.html#fixture-docs-alignment-horizontal-row-3
[95]: ./REVIEW.html#fixture-docs-alignment-horizontal-column
[96]: ./REVIEW.html#fixture-docs-alignment-vertical-row
[97]: ./REVIEW.html#fixture-docs-alignment-vertical-row-2
[98]: ./REVIEW.html#fixture-docs-alignment-vertical-column
[99]: ./REVIEW.html#fixture-docs-cards-card
[100]: ./REVIEW.html#fixture-docs-cards-card-columns
[101]: ./REVIEW.html#fixture-docs-cards-hero
[102]: ./REVIEW.html#fixture-docs-cards-modal
[103]: ./REVIEW.html#fixture-docs-cards-section
[104]: ./REVIEW.html#fixture-docs-cards-footer
[105]: ./REVIEW.html#fixture-docs-cards-empty-state
[106]: ./REVIEW.html#fixture-docs-cards-loading-state
[107]: ./REVIEW.html#fixture-docs-cards-error-state
[108]: ./REVIEW.html#fixture-docs-tabs-basic-tabs
[109]: ./REVIEW.html#fixture-docs-tabs-settings-pattern
[110]: ./REVIEW.html#fixture-docs-accordion-basic-accordion
[111]: ./REVIEW.html#fixture-docs-accordion-with-card-border
[112]: ./REVIEW.html#fixture-docs-accordion-pre-expanded-item
[113]: ./REVIEW.html#fixture-docs-accordion-exclusive-one-open-at-a-time
[114]: ./REVIEW.html#fixture-docs-accordion-rich-content
[115]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-layout
[116]: ./REVIEW.html#fixture-docs-page-layouts-top-nav-with-right-aligned-actions
[117]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-layout
[118]: ./REVIEW.html#fixture-docs-page-layouts-sidebar-with-sections
[119]: ./REVIEW.html#fixture-docs-page-layouts-navbar-sidebar-layout
[120]: ./REVIEW.html#fixture-docs-navigation-navbar
[121]: ./REVIEW.html#fixture-docs-navigation-active-state
[122]: ./REVIEW.html#fixture-docs-navigation-with-icon-and-buttons
[123]: ./REVIEW.html#fixture-docs-navigation-navigation-select
[124]: ./REVIEW.html#fixture-docs-navigation-breadcrumbs
[125]: ./REVIEW.html#fixture-docs-navigation-sidebar-nav
[126]: ./REVIEW.html#fixture-docs-navigation-pagination
[127]: ./REVIEW.html#fixture-docs-tables-basic-table
[128]: ./REVIEW.html#fixture-docs-tables-with-badges
[129]: ./REVIEW.html#fixture-docs-tables-data-table-with-actions
[130]: ./REVIEW.html#fixture-docs-tables-column-alignment
[131]: ./REVIEW.html#fixture-docs-alerts-default
[132]: ./REVIEW.html#fixture-docs-alerts-variants
[133]: ./REVIEW.html#fixture-docs-alerts-variants-2
[134]: ./REVIEW.html#fixture-docs-alerts-variants-3
[135]: ./REVIEW.html#fixture-docs-alerts-with-inline-content-on-opener
[136]: ./REVIEW.html#fixture-docs-comments-basic-usage
[137]: ./REVIEW.html#fixture-docs-comments-threads-multiple-comments-on-one-element
[138]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card
[139]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-card-2
[140]: ./REVIEW.html#fixture-docs-comments-annotating-a-whole-column
[141]: ./REVIEW.html#fixture-docs-comments-comments-between-tabs
[142]: ./REVIEW.html#fixture-docs-comments-multiline-comments
[143]: ./REVIEW.html#fixture-docs-attributes-semantic-modifiers
[144]: ./REVIEW.html#fixture-docs-attributes-key-value-attributes
[145]: ./REVIEW.html#fixture-docs-attributes-combining-classes-and-attributes
[146]: ./REVIEW.html#fixture-docs-attributes-on-column-items
[147]: ./REVIEW.html#fixture-docs-demo-basic-usage
[148]: ./REVIEW.html#fixture-docs-demo-with-a-form
[149]: ./REVIEW.html#fixture-docs-demo-with-columns
[150]: ./REVIEW.html#fixture-docs-index-demo
