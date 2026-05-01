/**
 * wiremd brutal style — extracted from src/renderer/styles.ts
 */

export function getBrutalStyle(prefix: string): string {
  return `
/* Neo-Brutalism Style */
body {
  font-family: "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: #fffcf2;
  color: #000000;
  line-height: 1.4;
  margin: 0;
  padding: 20px;
}

/* Typography - Bold and Aggressive */
.${prefix}h1 {
  font-size: 3rem;
  font-weight: 900;
  color: #000000;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 3px 3px 0 #ffd93d;
}

.${prefix}h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: #000000;
  margin: 1.5rem 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.${prefix}h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #000000;
  margin: 1.25rem 0 0.75rem 0;
  text-transform: uppercase;
}

.${prefix}h4 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #000000;
  margin: 1rem 0 0.5rem 0;
  text-transform: uppercase;
}

.${prefix}paragraph {
  color: #000000;
  margin: 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
}

/* Brutal Buttons */
.${prefix}button {
  padding: 12px 24px;
  border: 3px solid #000000;
  border-radius: 0;
  font-weight: 900;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.1s ease;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: #ffffff;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  position: relative;
}

.${prefix}button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #ffd93d;
  color: #000000;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #ffcc00;
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 4px 4px 0 #000000 !important;
}

/* Button States */
.${prefix}state-loading {
  background: #bcf0da !important;
  color: #000000 !important;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.${prefix}state-error {
  background: #ff6b6b !important;
  color: #000000 !important;
}

.${prefix}state-success {
  background: #6bcf7f !important;
  color: #000000 !important;
}

/* Brutal Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border: 2px solid #000000;
  border-radius: 0;
  font-size: 12px;
  font-weight: 700;
  background: #ffffff;
  color: #000000;
  box-shadow: 2px 2px 0 #000000;
}
.${prefix}badge-primary { background: #c0d8f0; }
.${prefix}badge-success { background: #6bcf7f; }
.${prefix}badge-warning { background: #ffd700; }
.${prefix}badge-error { background: #ff6b6b; }

/* Brutal Forms */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 12px;
  border: 3px solid #000000;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 600;
  background: #ffffff;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  transition: all 0.1s ease;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
  background: #ffd93d;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #666666;
  font-weight: 600;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e0e0e0;
  box-shadow: none;
  transform: none !important;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
}

.${prefix}select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='square'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  padding-right: 40px;
}

/* Brutal Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  cursor: pointer;
  font-weight: 600;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 3px solid #000000;
  accent-color: #ffd93d;
}

/* Brutal Cards and Containers */
.${prefix}container-card {
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 8px 8px 0 #000000;
  padding: 24px;
  margin: 24px 0;
  transition: all 0.1s ease;
}

.${prefix}container-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 #000000;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
  color: #000000;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 48px 32px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 12px 12px 0 #000000;
  position: relative;
  overflow: hidden;
}

.${prefix}container-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.05) 10px,
    rgba(0, 0, 0, 0.05) 20px
  );
  pointer-events: none;
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: #000000;
  position: relative;
}

.${prefix}container-modal {
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 12px 12px 0 #000000;
  padding: 32px;
  margin: 32px auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #000000;
  color: #ffffff;
  padding: 32px;
  margin-top: 48px;
  border: 3px solid #000000;
  box-shadow: 8px 8px 0 #ffd93d;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: #ffffff;
  font-weight: 600;
}

.${prefix}container-section {
  padding: 24px 0;
  border-bottom: 3px solid #000000;
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Brutal Alerts */
.${prefix}container-alert {
  padding: 16px 20px;
  border: 3px solid #000000;
  border-radius: 0;
  margin: 20px 0;
  box-shadow: 6px 6px 0 #000000;
  font-weight: 600;
}

.${prefix}container-alert.${prefix}warning {
  background: #ffeb3b;
  color: #000000;
}

.${prefix}container-alert.${prefix}error {
  background: #ff6b6b;
  color: #000000;
}

.${prefix}container-alert.${prefix}success {
  background: #6bcf7f;
  color: #000000;
}

/* Brutal Navigation */
.${prefix}nav {
  background: #ffd93d;
  border: 3px solid #000000;
  padding: 16px 20px;
  box-shadow: 6px 6px 0 #000000;
  margin-bottom: 32px;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000000;
  text-decoration: none;
  padding: 10px 20px;
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 4px 4px 0 #000000;
  transition: all 0.1s ease;
  font-size: 0.875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.${prefix}nav-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
  background: #ffffff;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
  transform: translate(4px, 4px);
  box-shadow: none;
}

.${prefix}brand {
  font-weight: 900;
  font-size: 1.5rem;
  color: #000000;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* Brutal Lists */
.${prefix}list {
  margin: 20px 0;
  padding: 0;
  list-style: none;
  border: 3px solid #000000;
  background: #ffffff;
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}list-item {
  padding: 16px 20px;
  border-bottom: 3px solid #000000;
  color: #000000;
  font-weight: 600;
  transition: all 0.1s ease;
}

.${prefix}list-item:hover {
  background: #ffd93d;
  padding-left: 28px;
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
  font-size: 0.9em;
  font-weight: bold;
}

.${prefix}breadcrumb-item a {
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  background: #000000;
  color: #ffffff;
  padding: 0 4px;
}

.${prefix}breadcrumb-sep {
  color: #000000;
  font-weight: bold;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #fff;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 #000;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; font-weight: 900; text-transform: uppercase; }
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
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; font-weight: 900; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Brutal Grid */
.${prefix}grid {
  display: grid;
  gap: 24px;
  margin: 32px 0;
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

.${prefix}grid > * {
  border: 3px solid #000000;
  background: #ffffff;
  padding: 20px;
  box-shadow: 6px 6px 0 #000000;
}

/* Brutal Tables */
.${prefix}table {
  width: 100%;
  background: #ffffff;
  border: 3px solid #000000;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 8px 8px 0 #000000;
  margin: 20px 0;
}

.${prefix}table th {
  background: #ffd93d;
  padding: 16px;
  text-align: left;
  font-weight: 900;
  font-size: 0.875rem;
  color: #000000;
  border-bottom: 3px solid #000000;
  border-right: 3px solid #000000;
  text-transform: uppercase;
}

.${prefix}table th:last-child {
  border-right: none;
}

.${prefix}table td {
  padding: 16px;
  border-bottom: 3px solid #000000;
  border-right: 3px solid #000000;
  font-size: 0.875rem;
  font-weight: 600;
  color: #000000;
}

.${prefix}table td:last-child {
  border-right: none;
}

.${prefix}table tr:last-child td {
  border-bottom: none;
}

.${prefix}table tr:hover td {
  background: #bcf0da;
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

/* Brutal Icons */
.${prefix}icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  font-weight: 900;
}

/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 3px solid #000000;
  margin: 32px 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border: 3px solid #000000;
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}code {
  background: #ffd93d;
  padding: 4px 8px;
  border: 2px solid #000000;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #000000;
}

.${prefix}blockquote {
  border-left: 6px solid #000000;
  padding-left: 20px;
  margin: 20px 0;
  color: #000000;
  font-weight: 600;
  font-style: normal;
  background: linear-gradient(to right, rgba(255, 217, 61, 0.2), transparent);
}

/* Button group */
.${prefix}container-button-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 20px 0;
}

/* Form group */
.${prefix}container-form-group {
  margin: 20px 0;
}

.${prefix}container-form-group .${prefix}input:not(:last-child),
.${prefix}container-form-group .${prefix}textarea:not(:last-child),
.${prefix}container-form-group .${prefix}select:not(:last-child) {
  margin-bottom: 16px;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #ffffff;
  border: 3px solid #000000;
  padding: 56px 40px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 8px 8px 0 #000000;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '⟳';
  display: block;
  font-size: 64px;
  font-weight: 900;
  margin-bottom: 24px;
  animation: spin 1.5s ease-in-out infinite;
  color: #ffd93d;
  text-shadow: 3px 3px 0 #000000;
}

.${prefix}container-empty-state {
  background: #f5f5f5;
  border: 3px dashed #000000;
  padding: 72px 40px;
  margin: 32px 0;
  text-align: center;
  color: #666666;
  font-weight: 600;
}

.${prefix}container-empty-state::before {
  content: '[EMPTY]';
  display: block;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0.3em;
  margin-bottom: 24px;
  color: #999999;
  text-transform: uppercase;
}

.${prefix}container-error-state {
  background: #ff6b6b;
  border: 3px solid #000000;
  padding: 56px 40px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 8px 8px 0 #000000;
  color: #000000;
  font-weight: 600;
}

.${prefix}container-error-state::before {
  content: '⚠';
  display: block;
  font-size: 72px;
  font-weight: 900;
  margin-bottom: 24px;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}h1 {
    font-size: 2rem;
  }

  .${prefix}h2 {
    font-size: 1.75rem;
  }

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
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 12px;
    font-size: 1.25rem;
  }

  .${prefix}container-card,
  .${prefix}container-modal {
    box-shadow: 6px 6px 0 #000000;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}
