/**
 * wiremd material style — extracted from src/renderer/styles.ts
 */

export function getMaterialStyle(prefix: string): string {
  return `
/* Material Design Inspired Style */
body {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  margin: 0;
  padding: 20px;
}

/* Typography - Material Design Type Scale */
.${prefix}h1 {
  font-size: 2.125rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 0 1rem 0;
  letter-spacing: 0;
}

.${prefix}h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1.5rem 0 1rem 0;
  letter-spacing: 0.0075em;
}

.${prefix}h3 {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1.25rem 0 0.75rem 0;
  letter-spacing: 0.0125em;
}

.${prefix}h4 {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1rem 0 0.5rem 0;
  letter-spacing: 0.015em;
}

.${prefix}paragraph {
  color: rgba(0, 0, 0, 0.6);
  margin: 0.75rem 0;
  font-size: 1rem;
  letter-spacing: 0.00938em;
}

/* Material Buttons */
.${prefix}button {
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: transparent;
  color: #6200ee;
  position: relative;
  overflow: hidden;
}

.${prefix}button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(98, 0, 238, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.${prefix}button:hover::before {
  width: 300px;
  height: 300px;
}

.${prefix}button:hover {
  background: rgba(98, 0, 238, 0.04);
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #6200ee;
  color: white;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 1px 5px 0px rgba(0,0,0,0.12);
}

.${prefix}button-primary::before {
  background: rgba(255, 255, 255, 0.2);
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #6200ee;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  color: rgba(0, 0, 0, 0.26);
  background: rgba(0, 0, 0, 0.12);
  cursor: not-allowed;
  box-shadow: none;
}

/* Button States */
.${prefix}state-loading {
  background: #e8eaf6 !important;
  color: #6200ee !important;
  position: relative;
  padding-left: 2.5rem;
}

.${prefix}state-loading::after {
  content: '';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid #6200ee;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.${prefix}state-error {
  background: #b00020 !important;
  color: white !important;
}

.${prefix}state-success {
  background: #00c853 !important;
  color: white !important;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Material Chips / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 12px;
  margin: 0 2px;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.01786em;
  background: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
}
.${prefix}badge-primary { background: #e8eaf6; color: #6200ee; }
.${prefix}badge-success { background: #e8f5e9; color: #1b5e20; }
.${prefix}badge-warning { background: #fff8e1; color: #e65100; }
.${prefix}badge-error { background: #fce4ec; color: #b00020; }

/* Material Form Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 1rem;
  background: transparent;
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-bottom: 2px solid #6200ee;
  margin-bottom: -1px;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: rgba(0, 0, 0, 0.42);
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.02);
  border-bottom-color: rgba(0, 0, 0, 0.26);
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px;
  padding: 12px;
}

.${prefix}textarea:focus {
  border: 2px solid #6200ee;
  margin: -1px;
}

.${prefix}select {
  cursor: pointer;
}

/* Checkboxes and Radios - Material Style */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6200ee;
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
  border-radius: 999px;
  background: #9e9e9e;
}

.${prefix}switch-thumb {
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.35);
}

.${prefix}switch input[type="checkbox"]:checked + .${prefix}switch-track {
  background: #bb86fc;
}

.${prefix}switch input[type="checkbox"]:checked + .${prefix}switch-track .${prefix}switch-thumb {
  left: 16px;
  background: #6200ee;
}

.${prefix}switch input[type="checkbox"]:disabled + .${prefix}switch-track,
.${prefix}switch:has(input[type="checkbox"]:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Material Cards - Elevation System */
.${prefix}container-card {
  background: white;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 1px 3px 0px rgba(0,0,0,0.12);
  padding: 16px;
  margin: 16px 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.${prefix}container-card:hover {
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2),
              0px 3px 4px 0px rgba(0,0,0,0.14),
              0px 1px 8px 0px rgba(0,0,0,0.12);
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #6200ee 0%, #3700b3 100%);
  color: white;
  border-radius: 4px;
  padding: 48px 24px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 6px 10px 0px rgba(0,0,0,0.14),
              0px 1px 18px 0px rgba(0,0,0,0.12);
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: white;
}

.${prefix}container-modal {
  background: white;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),
              0px 24px 38px 3px rgba(0,0,0,0.14),
              0px 9px 46px 8px rgba(0,0,0,0.12);
  padding: 24px;
  margin: 24px auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #212121;
  color: rgba(255, 255, 255, 0.87);
  padding: 24px;
  margin-top: 48px;
  border-radius: 4px;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: rgba(255, 255, 255, 0.87);
}

.${prefix}container-section {
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Material Alerts */
.${prefix}container-alert {
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
  display: flex;
  align-items: center;
}

.${prefix}container-alert.${prefix}warning {
  background: #fff3e0;
  color: #e65100;
}

.${prefix}container-alert.${prefix}error {
  background: #ffebee;
  color: #c62828;
}

.${prefix}container-alert.${prefix}success {
  background: #e8f5e9;
  color: #2e7d32;
}

/* Material Navigation - App Bar Style */
.${prefix}nav {
  background: #6200ee;
  color: white;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
  margin-bottom: 24px;
  border-radius: 4px;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
}

.${prefix}nav-item {
  display: inline-block;
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 0.875rem;
  font-weight: 500;
}

.${prefix}nav-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.${prefix}nav-item.${prefix}active {
  background: #1565c0;
  color: #fff;
  border-color: #1565c0;
}

.${prefix}brand {
  font-weight: 500;
  font-size: 1.25rem;
  color: white;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Material Lists */
.${prefix}list {
  margin: 16px 0;
  padding: 0;
  list-style: none;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
}

.${prefix}list-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.${prefix}list-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.${prefix}list-item:last-child {
  border-bottom: none;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.875rem;
}

.${prefix}breadcrumb-item a {
  color: #1565c0;
  text-decoration: none;
}

.${prefix}breadcrumb-item a:hover {
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}breadcrumb-sep {
  color: rgba(0, 0, 0, 0.38);
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #fafafa;
  border-right: 1px solid #e0e0e0;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.54); }
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
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.54); }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }
.${prefix}layout-main > :first-child { margin-top: 0; }

/* Material Grid */
.${prefix}grid {
  display: grid;
  gap: 16px;
  margin: 24px 0;
  align-items: center;
}

.${prefix}grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.${prefix}grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.${prefix}grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Material Tables */
.${prefix}table {
  width: 100%;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
  margin: 16px 0;
}

.${prefix}table th {
  background: #fafafa;
  padding: 16px;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.${prefix}table td {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}table tr:last-child td {
  border-bottom: none;
}

.${prefix}table tr:hover {
  background: rgba(0, 0, 0, 0.04);
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

/* Material Icons */
.${prefix}icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 24px 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
}

.${prefix}code {
  background: rgba(98, 0, 238, 0.12);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Roboto Mono", monospace;
  font-size: 0.875rem;
  color: #6200ee;
}

.${prefix}blockquote {
  border-left: 4px solid #6200ee;
  padding-left: 16px;
  margin: 16px 0;
  color: rgba(0, 0, 0, 0.6);
  font-style: italic;
}

/* Form group */
.${prefix}container-form-group {
  margin: 16px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: white;
  border-radius: 4px;
  padding: 48px 32px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 24px;
  border: 3px solid rgba(98, 0, 238, 0.2);
  border-top-color: #6200ee;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.${prefix}container-empty-state {
  background: #fafafa;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 64px 32px;
  margin: 24px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.38);
}

.${prefix}container-empty-state::before {
  content: '📭';
  display: block;
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.${prefix}container-error-state {
  background: #ffebee;
  border-radius: 4px;
  padding: 48px 32px;
  margin: 24px 0;
  text-align: center;
  color: #c62828;
  box-shadow: 0px 1px 3px 0px rgba(198, 40, 40, 0.2);
}

.${prefix}container-error-state::before {
  content: '⚠️';
  display: block;
  font-size: 48px;
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid-2,
  .${prefix}grid-3,
  .${prefix}grid-4 {
    grid-template-columns: 1fr;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 12px 0;
  }

  .${prefix}nav {
    height: auto;
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 8px;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}
