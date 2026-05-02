/**
 * wiremd wireframe style — extracted from src/renderer/styles.ts
 */

export function getWireframeStyle(prefix: string): string {
  return `
/* wiremd Wireframe Style - Traditional grayscale wireframes */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: Arial, Helvetica, sans-serif;
  background: #f0f0f0;
  color: #000;
  padding: 30px;
  margin: 0;
  line-height: 1.5;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: bold;
  margin: 1.2em 0 0.6em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.${prefix}h1 { font-size: 2em; }
.${prefix}h2 { font-size: 1.75em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.6em 0;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  background: repeating-linear-gradient(
    45deg,
    #ddd,
    #ddd 10px,
    #ccc 10px,
    #ccc 20px
  );
  border: 2px solid #000;
  border-radius: 0;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: repeating-linear-gradient(
    45deg,
    #888,
    #888 10px,
    #777 10px,
    #777 20px
  );
  color: #fff;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #fff;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: repeating-linear-gradient(
    45deg,
    #666,
    #666 10px,
    #555 10px,
    #555 20px
  );
  color: #fff;
}

.${prefix}button[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 1px 8px;
  margin: 0 2px;
  border: 1px solid #666;
  border-radius: 10px;
  font-size: 11px;
  font-weight: bold;
  background: #e0e0e0;
  color: #333;
}
.${prefix}badge-primary { background: #c8d8e8; border-color: #4a6a8a; }
.${prefix}badge-success { background: #c8e8c8; border-color: #4a7a4a; }
.${prefix}badge-warning { background: #e8e0c0; border-color: #8a7a40; }
.${prefix}badge-error { background: #e8c8c8; border-color: #8a4a4a; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 6px 10px;
  margin: 4px 0;
  font-family: inherit;
  font-size: 13px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 0;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #999;
  font-style: italic;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f0f0f0;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 80px;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  cursor: pointer;
}

.${prefix}switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 6px 0;
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
  width: 38px;
  height: 20px;
  flex: 0 0 38px;
  align-items: center;
  border: 2px solid #000;
  border-radius: 0;
  background: #fff;
}

.${prefix}switch-thumb {
  position: absolute;
  left: 2px;
  width: 14px;
  height: 14px;
  border: 2px solid #000;
  border-radius: 50%;
  background: #fff;
}

.${prefix}switch input[type="checkbox"]:checked + .${prefix}switch-track .${prefix}switch-thumb {
  left: 18px;
  background: #000;
}

.${prefix}switch input[type="checkbox"]:disabled + .${prefix}switch-track,
.${prefix}switch:has(input[type="checkbox"]:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1em;
  line-height: 1;
  margin: 0 4px;
  vertical-align: middle;
}

/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fff;
  border: 3px solid #000;
  padding: 24px;
  margin: 16px 0;
}

.${prefix}container-hero {
  background: repeating-linear-gradient(
    0deg,
    #fafafa,
    #fafafa 2px,
    #fff 2px,
    #fff 4px
  );
  text-align: center;
  padding: 48px 24px;
}

.${prefix}container-modal {
  max-width: 500px;
  margin: 32px auto;
  border-width: 4px;
}

/* Navigation */
.${prefix}nav {
  background: repeating-linear-gradient(
    90deg,
    #e0e0e0,
    #e0e0e0 2px,
    #d0d0d0 2px,
    #d0d0d0 4px
  );
  border: 2px solid #000;
  padding: 12px 16px;
  margin: 16px 0;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000;
  text-decoration: none;
  font-weight: normal;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #666;
  border-radius: 3px;
}

.${prefix}nav-item:hover {
  background: #f5f5f5;
  border-color: #000;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
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
  color: #555;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
  color: #000;
}

.${prefix}breadcrumb-sep {
  color: #999;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f5f5f5;
  border: 1px solid #aaa;
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
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }

.${prefix}grid-item-card {
  background: #fff;
  border: 2px solid #000;
  padding: 16px;
}

/* Lists */
.${prefix}list {
  margin: 12px 0;
  padding-left: 24px;
}

.${prefix}list-item {
  margin: 4px 0;
}

/* Blockquote */
.${prefix}blockquote {
  border-left: 4px solid #000;
  padding-left: 16px;
  margin: 16px 0;
  background: #f5f5f5;
  padding: 12px 16px;
}

/* Code */
.${prefix}code-inline {
  background: #e0e0e0;
  border: 1px solid #000;
  padding: 2px 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.${prefix}code-block {
  background: #f0f0f0;
  border: 2px solid #000;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
}

.${prefix}code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Separator */
.${prefix}separator {
  border: none;
  border-top: 2px solid #000;
  margin: 24px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: repeating-linear-gradient(
    0deg,
    #fff,
    #fff 2px,
    #f5f5f5 2px,
    #f5f5f5 4px
  );
  border: 2px solid #000;
  padding: 40px;
  margin: 16px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '⟳';
  display: block;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  animation: spin 2s linear infinite;
}

.${prefix}container-empty-state {
  background: #fff;
  border: 2px dashed #666;
  padding: 60px 40px;
  margin: 16px 0;
  text-align: center;
  color: #666;
}

.${prefix}container-empty-state::before {
  content: '[EMPTY]';
  display: block;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  color: #999;
}

.${prefix}container-error-state {
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    #f0f0f0 10px,
    #f0f0f0 20px
  );
  border: 3px solid #000;
  padding: 40px;
  margin: 16px 0;
  text-align: center;
}

.${prefix}container-error-state::before {
  content: '⚠';
  display: block;
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #000;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}
