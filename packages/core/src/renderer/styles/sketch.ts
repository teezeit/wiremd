/**
 * wiremd sketch style — extracted from src/renderer/styles.ts
 */

export function getSketchStyle(prefix: string): string {
  return `
/* wiremd Sketch Style - Balsamiq-inspired hand-drawn mockups */
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: 'Kalam', 'Comic Sans MS', 'Marker Felt', 'Chalkboard', cursive, sans-serif;
  background-color: #fafafa;
  background-image: radial-gradient(circle, #c8c8c8 1px, transparent 1px);
  background-size: 20px 20px;
  color: #333;
  padding: 20px;
  margin: 0;
  line-height: 1.6;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: bold;
  margin: 1em 0 0.5em;
  line-height: 1.3;
}

.${prefix}h1 { font-size: 2em; text-decoration: underline; }
.${prefix}h2 { font-size: 1.75em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.5em 0;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  transform: rotate(-0.5deg);
  transition: all 0.1s;
}

.${prefix}button:hover {
  transform: rotate(-0.5deg) translateY(-2px);
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: #87CEEB;
  border-color: #4682B4;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #DDD;
  border-color: #999;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: #FFB6C1;
  border-color: #DC143C;
}

.${prefix}button[disabled], .${prefix}button.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.${prefix}button.${prefix}loading::after {
  content: '...';
  animation: loading 1s infinite;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border: 2px solid #000;
  border-radius: 12px;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  background: #f0f0f0;
  transform: rotate(-0.3deg);
}
.${prefix}badge-primary { background: #87CEEB; border-color: #4682B4; }
.${prefix}badge-success { background: #90EE90; border-color: #228B22; }
.${prefix}badge-warning { background: #FFE4B5; border-color: #DAA520; }
.${prefix}badge-error { background: #FFB6C1; border-color: #DC143C; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 8px 12px;
  margin: 4px 0;
  font-family: inherit;
  font-size: 14px;
  background: #fff;
  border: 2px solid #666;
  border-radius: 4px;
  transform: rotate(0.3deg);
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: 2px solid #4682B4;
  outline-offset: 2px;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
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
  user-select: none;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.2em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.2em;
}

/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
  transform: rotate(-0.3deg);
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE6CC 100%);
  text-align: center;
  padding: 48px 24px;
}

.${prefix}container-modal {
  position: relative;
  max-width: 500px;
  margin: 32px auto;
  border-width: 4px;
}

/* Radio Groups */
.${prefix}radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
}

.${prefix}radio-group-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}

.${prefix}radio-group-inline .${prefix}radio {
  margin: 0;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.2em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.2em;
}

/* Navigation */
.${prefix}nav {
  background: #87CEEB;
  border: 3px solid #4682B4;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: bold;
  font-size: 1.2em;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 14px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 6px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
  transform: rotate(0.3deg);
  transition: all 0.1s;
}

.${prefix}nav-item:hover {
  transform: rotate(0.3deg) translateY(-1px);
  box-shadow: 2px 3px 0 rgba(0,0,0,0.15);
  background: #f8f8f8;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
  transform: rotate(0.3deg);
}

.${prefix}nav .${prefix}button {
  margin: 0;
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
  color: #4682B4;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
  color: #222;
}

.${prefix}breadcrumb-sep {
  color: #888;
  font-size: 1.1em;
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
  box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
}
.${prefix}container-sidebar .${prefix}button {
  display: block;
  width: 100%;
  text-align: left;
  margin: 0;
}
.${prefix}container-sidebar .${prefix}h4 {
  margin: 12px 0 4px;
  font-size: 0.85em;
  opacity: 0.6;
  text-transform: uppercase;
}
.${prefix}container-sidebar .${prefix}separator {
  margin: 8px 0;
}

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
.${prefix}layout-main {
  min-width: 0;
}
.${prefix}layout-main > :first-child {
  margin-top: 0;
}

/* Grid */
.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 24px;
  margin: 24px 0;
  align-items: center;
}

.${prefix}grid-2 { grid-template-columns: repeat(2, 1fr); }
.${prefix}grid-3 { grid-template-columns: repeat(3, 1fr); }
.${prefix}grid-4 { grid-template-columns: repeat(4, 1fr); }

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }

.${prefix}grid-item-card {
  background: #fff;
  border: 2px solid #666;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  transform: rotate(0.5deg);
}
.${prefix}grid-item-card:nth-child(even) { transform: rotate(-0.5deg); }

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
  border-left: 4px solid #666;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  color: #555;
}

/* Code */
.${prefix}code-inline {
  background: #FFF3CD;
  border: 1px solid #FFC107;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.${prefix}code-block {
  background: #FFF3CD;
  border: 2px solid #FFC107;
  border-radius: 6px;
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
  border-top: 3px dashed #666;
  margin: 24px 0;
}

/* Table */
.${prefix}table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 3px solid #000;
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.${prefix}table th, .${prefix}table td {
  border: 2px solid #666;
  padding: 8px 12px;
  text-align: left;
}

.${prefix}table th {
  background: #DDD;
  font-weight: bold;
}

/* Table cell alignment - more specific to override th/td defaults */
.${prefix}table .${prefix}align-left {
  text-align: left !important;
}

.${prefix}table .${prefix}align-center {
  text-align: center !important;
}

.${prefix}table .${prefix}align-right {
  text-align: right !important;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #fff;
  border: 2px solid #87CEEB;
  border-radius: 8px;
  padding: 32px;
  margin: 16px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '⟳';
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
  animation: spin 1.5s linear infinite;
  transform-origin: center;
}

.${prefix}container-empty-state {
  background: #f5f5f5;
  border: 2px dashed #999;
  border-radius: 8px;
  padding: 48px 32px;
  margin: 16px 0;
  text-align: center;
  color: #666;
}

.${prefix}container-empty-state::before {
  content: '📭';
  display: block;
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.${prefix}container-error-state {
  background: #FFE6E6;
  border: 3px solid #DC143C;
  border-radius: 8px;
  padding: 32px;
  margin: 16px 0;
  text-align: center;
}

.${prefix}container-error-state::before {
  content: '⚠️';
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
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

  .${prefix}nav-content {
    flex-direction: column;
    align-items: stretch;
  }

  .${prefix}brand {
    margin-right: 0;
  }
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Tabs */
.${prefix}tabs { margin: 12px 0; }
.${prefix}tab-headers { border-bottom-color: #666; }
.${prefix}tab-header { color: #666; }
.${prefix}tab-header:hover { color: #000; }
.${prefix}tab-header.${prefix}active { border-bottom-color: #000; color: #000; }
`;
}
