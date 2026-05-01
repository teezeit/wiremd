/**
 * wiremd none style — extracted from src/renderer/styles.ts
 */

export function getNoneStyle(prefix: string): string {
  return `
/* wiremd None Style - Minimal semantic styling */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.${prefix}button {
  padding: 8px 16px;
  margin: 4px;
}

.${prefix}badge {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 12px;
  background: #e0e0e0;
}
.${prefix}badge-primary { background: #c0d8f0; }
.${prefix}badge-success { background: #c0e8c0; }
.${prefix}badge-warning { background: #f0e0c0; }
.${prefix}badge-error { background: #f0c0c0; }

.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin: 4px 0;
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
  color: inherit;
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
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
  padding: 8px;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 8px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 4px 0; }

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
.${prefix}layout-sidebar .${prefix}h4 { margin: 8px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 4px 0; }
.${prefix}layout-main { min-width: 0; }

.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.${prefix}nav-content {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  margin-right: auto;
  font-weight: bold;
}

/* State Containers */
.${prefix}container-loading-state,
.${prefix}container-empty-state,
.${prefix}container-error-state {
  padding: 40px;
  margin: 20px 0;
  text-align: center;
}

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
`;
}
