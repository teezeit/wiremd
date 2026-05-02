/**
 * wiremd tailwind style — extracted from src/renderer/styles.ts
 */

export function getTailwindStyle(prefix: string): string {
  return `
/* Tailwind-Inspired Style */
body {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f9fafb;
  color: #111827;
  line-height: 1.5;
  margin: 0;
  padding: 20px;
}

/* Typography */
.${prefix}h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.${prefix}h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 1.5rem 0 1rem 0;
  letter-spacing: -0.025em;
}

.${prefix}h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 1.25rem 0 0.75rem 0;
}

.${prefix}h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin: 1rem 0 0.5rem 0;
}

.${prefix}paragraph {
  color: #6b7280;
  margin: 0.75rem 0;
  font-size: 1rem;
}

/* Buttons */
.${prefix}button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: #e5e7eb;
  color: #374151;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.${prefix}button:hover {
  background: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #6366f1;
  color: white;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #4f46e5;
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Button States */
.${prefix}state-loading {
  background: #e0e7ff !important;
  color: #6366f1 !important;
  position: relative;
  padding-left: 2.5rem;
}

.${prefix}state-loading::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid #6366f1;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.${prefix}state-error {
  background: #fef2f2 !important;
  color: #ef4444 !important;
  border: 1px solid #fca5a5;
}

.${prefix}state-success {
  background: #f0fdf4 !important;
  color: #22c55e !important;
  border: 1px solid #86efac;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 0.125rem 0.625rem;
  margin: 0 0.125rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #e5e7eb;
  color: #374151;
}
.${prefix}badge-primary { background: #dbeafe; color: #1d4ed8; }
.${prefix}badge-success { background: #d1fae5; color: #065f46; }
.${prefix}badge-warning { background: #fef3c7; color: #92400e; }
.${prefix}badge-error { background: #fee2e2; color: #991b1b; }

/* Forms */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.15s ease;
  color: #111827;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #9ca3af;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f9fafb;
  border-color: #e5e7eb;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
}

.${prefix}select {
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5rem;
  padding-right: 2.5rem;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #6366f1;
}

/* Cards and Containers */
.${prefix}container-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin: 1rem 0;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: white;
}

.${prefix}container-modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #1f2937;
  color: #e5e7eb;
  padding: 2rem;
  margin-top: 3rem;
  border-radius: 0.75rem;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: #e5e7eb;
}

.${prefix}container-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Alerts */
.${prefix}container-alert {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border-left: 4px solid;
}

.${prefix}container-alert.${prefix}warning {
  background: #fef3c7;
  border-left-color: #f59e0b;
  color: #92400e;
}

.${prefix}container-alert.${prefix}error {
  background: #fee2e2;
  border-left-color: #ef4444;
  color: #991b1b;
}

.${prefix}container-alert.${prefix}success {
  background: #d1fae5;
  border-left-color: #10b981;
  color: #065f46;
}

/* Navigation */
.${prefix}nav {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.${prefix}nav-item {
  display: inline-block;
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.${prefix}nav-item:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.${prefix}nav-item.${prefix}active {
  background: #7c3aed;
  color: #fff;
  border-color: #7c3aed;
}

.${prefix}brand {
  font-weight: 700;
  font-size: 1.125rem;
  color: #111827;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Lists */
.${prefix}list {
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.${prefix}list-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
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
  color: #2563eb;
  text-decoration: none;
}

.${prefix}breadcrumb-item a:hover {
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: 500;
  color: #111827;
}

.${prefix}breadcrumb-sep {
  color: #9ca3af;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; }
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
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }
.${prefix}layout-main > :first-child { margin-top: 0; }

/* Grid */
.${prefix}grid {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
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

/* Tables */
.${prefix}table {
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem 0;
  border-collapse: separate;
  border-spacing: 0;
}

.${prefix}table th {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
}

.${prefix}table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #4b5563;
}

.${prefix}table tr:last-child td {
  border-bottom: none;
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

/* Icons */
.${prefix}icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
}


/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.${prefix}code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;
  font-size: 0.875rem;
  color: #6366f1;
}

.${prefix}blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #4b5563;
  font-style: italic;
}

/* Button group */
.${prefix}container-button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

/* Form group */
.${prefix}container-form-group {
  margin: 1rem 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.${prefix}container-empty-state {
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  padding: 4rem 2rem;
  margin: 2rem 0;
  text-align: center;
  color: #6b7280;
}

.${prefix}container-empty-state::before {
  content: '📭';
  display: block;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.${prefix}container-error-state {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  color: #991b1b;
}

.${prefix}container-error-state::before {
  content: '⚠️';
  display: block;
  font-size: 3rem;
  margin-bottom: 1.5rem;
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
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}
