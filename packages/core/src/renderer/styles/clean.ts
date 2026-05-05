/**
 * wiremd clean style — extracted from src/renderer/styles.ts
 */

export function getCleanStyle(prefix: string): string {
  return `
/* wiremd Clean Style - Minimal modern wireframes */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  padding: 40px;
  margin: 0;
  line-height: 1.6;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: 600;
  margin: 1.5em 0 0.75em;
  color: #000;
  letter-spacing: -0.02em;
}

.${prefix}h1 { font-size: 2.5em; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.3em; }
.${prefix}h2 { font-size: 2em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.75em 0;
  color: #4a4a4a;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 10px 20px;
  margin: 6px;
  background: #f5f5f5;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.${prefix}button:hover {
  background: #e8e8e8;
  border-color: #b0b0b0;
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: #0066cc;
  color: #fff;
  border-color: #0052a3;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}primary:hover {
  background: #0052a3;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #fff;
  border: 2px solid #d0d0d0;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: #dc3545;
  color: #fff;
  border-color: #c82333;
}

.${prefix}button[disabled], .${prefix}button.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: #e5e7eb;
  color: #374151;
}
.${prefix}badge-primary { background: #dbeafe; color: #1d4ed8; }
.${prefix}badge-success { background: #d1fae5; color: #065f46; }
.${prefix}badge-warning { background: #fef3c7; color: #92400e; }
.${prefix}badge-error { background: #fee2e2; color: #991b1b; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 10px 12px;
  margin: 6px 0;
  font-family: inherit;
  font-size: 14px;
  background: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #e0e0e0;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 100px;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.${prefix}switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 8px 0;
  cursor: pointer;
}

.${prefix}switch input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.${prefix}switch-track {
  position: relative;
  display: inline-flex;
  width: 36px;
  height: 20px;
  flex: 0 0 36px;
  align-items: center;
  border: 1px solid #999;
  border-radius: 999px;
  background: #f4f4f4;
}

.${prefix}switch-thumb {
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border: 1px solid #888;
  border-radius: 50%;
  background: #fff;
  transition: left 0.15s ease;
}

.${prefix}switch input[type="checkbox"]:checked + .${prefix}switch-track {
  border-color: #0066cc;
  background: #0066cc;
}

.${prefix}switch input[type="checkbox"]:checked + .${prefix}switch-track .${prefix}switch-thumb {
  left: 17px;
  border-color: #fff;
}

.${prefix}switch input[type="checkbox"]:disabled + .${prefix}switch-track,
.${prefix}switch:has(input[type="checkbox"]:disabled) {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin: 0 4px;
  vertical-align: middle;
  color: #666;
}


/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 32px;
  margin: 24px 0;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  text-align: center;
  padding: 60px 32px;
}

.${prefix}container-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.${prefix}container-modal {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

/* Radio Groups */
.${prefix}radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
}

.${prefix}radio-group-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.${prefix}radio-group-inline .${prefix}radio {
  margin: 0;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.1em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.25em;
}

/* Navigation */
.${prefix}nav {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px 24px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: 600;
  font-size: 1.25em;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  transition: all 0.2s;
}

.${prefix}nav-item:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.${prefix}nav-item.${prefix}active {
  background: #343a40;
  color: #fff;
  border-color: #343a40;
  pointer-events: none;
  cursor: default;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
}

.${prefix}breadcrumb-item a {
  color: #495057;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: 600;
  color: #212529;
}

.${prefix}breadcrumb-sep {
  color: #adb5bd;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f0f8ff;
  border: 2px solid #4682B4;
  border-radius: 8px;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }
.${prefix}layout-main > :first-child { margin-top: 0; }

/* Grid */
.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 24px;
  margin: 32px 0;
  align-items: center;
}

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }
.${prefix}col-span-5 { grid-column: span 5; }
.${prefix}col-span-6 { grid-column: span 6; }
.${prefix}col-span-7 { grid-column: span 7; }
.${prefix}col-span-8 { grid-column: span 8; }
.${prefix}col-span-9 { grid-column: span 9; }
.${prefix}col-span-10 { grid-column: span 10; }
.${prefix}col-span-11 { grid-column: span 11; }
.${prefix}col-span-12 { grid-column: span 12; }

.${prefix}grid-item-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.2s;
}
.${prefix}grid-item-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Lists */
.${prefix}list {
  margin: 16px 0;
  padding-left: 28px;
}

.${prefix}list-item {
  margin: 6px 0;
}

/* Blockquote */
.${prefix}blockquote {
  border-left: 3px solid #0066cc;
  padding-left: 20px;
  margin: 20px 0;
  color: #4a4a4a;
}

/* Code */
.${prefix}code-inline {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #d63384;
}

.${prefix}code-block {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
}

.${prefix}code-block code {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #1a1a1a;
}

/* Separator */
.${prefix}separator {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 32px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #f5f7fa;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 40px;
  margin: 24px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.${prefix}container-empty-state {
  background: #fafafa;
  border: 1px dashed #d0d0d0;
  border-radius: 8px;
  padding: 60px 40px;
  margin: 24px 0;
  text-align: center;
  color: #888;
}

.${prefix}container-empty-state::before {
  content: '📭';
  display: block;
  font-size: 72px;
  margin-bottom: 20px;
  opacity: 0.4;
  filter: grayscale(30%);
}

.${prefix}container-error-state {
  background: #fff5f5;
  border: 1px solid #dc3545;
  border-radius: 8px;
  padding: 40px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
}

.${prefix}container-error-state::before {
  content: '⚠️';
  display: block;
  font-size: 48px;
  margin-bottom: 20px;
}

/* Required input indicator */
.${prefix}input[required], .${prefix}textarea[required], .${prefix}select[required] {
  border-left: 2px solid #f59e0b;
}

/* Table-cell alignment (scoped so flex margin: auto rules don't apply) */
td.${prefix}align-left, th.${prefix}align-left { text-align: left; }
td.${prefix}align-center, th.${prefix}align-center { text-align: center; }
td.${prefix}align-right, th.${prefix}align-right { text-align: right; }

/* Alert containers */
.${prefix}container-alert {
  border-left: 3px solid #3b82f6;
  background: #eff6ff;
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
  color: #1e3a8a;
}
.${prefix}container-alert.${prefix}success {
  border-left-color: #10b981;
  background: #d1fae5;
  color: #065f46;
}
.${prefix}container-alert.${prefix}warning {
  border-left-color: #f59e0b;
  background: #fef3c7;
  color: #92400e;
}
.${prefix}container-alert.${prefix}error {
  border-left-color: #ef4444;
  background: #fee2e2;
  color: #991b1b;
}

/* Button size variants */
.${prefix}button.${prefix}small { padding: 4px 10px; font-size: 0.875rem; }
.${prefix}button.${prefix}large { padding: 12px 24px; font-size: 1.125rem; }

/* Error state on inputs and other elements */
.${prefix}state-error {
  border-color: #ef4444;
  color: #b91c1c;
}

/* Responsive */
@media (max-width: 768px) {
  body.${prefix}root {
    padding: 20px;
  }

  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: stretch;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Accordion */
.${prefix}accordion-summary { color: #1a1a1a; }
.${prefix}accordion-summary:hover { background: #f5f5f5; border-radius: 4px; }
.${prefix}accordion-summary::before { color: #999; }
.${prefix}accordion.${prefix}card { border-color: #e0e0e0; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.${prefix}accordion.${prefix}card .${prefix}accordion-item { border-bottom-color: #e0e0e0; }
.${prefix}accordion.${prefix}card .${prefix}accordion-body { border-top-color: #e0e0e0; }
`;
}
