/**
 * Structural CSS shared across all themes.
 *
 * These rules are required for behavioral correctness (tabs visibility,
 * row layout, comment annotations, demo block grid) and are emitted in
 * front of every theme's CSS by the dispatcher in ./index.ts.
 *
 * Extracted from src/renderer/styles.ts.
 */

export function getStructuralCSS(prefix: string): string {
  // Reset browser link defaults for buttons rendered as <a> tags via [[Text](url)] syntax
  const linkButtonReset = `a.${prefix}button { text-decoration: none; color: inherit; }\n`;

  // Structural rules shared across themes — required for tabs visibility toggling
  const tabsStructural = `
.${prefix}tab-headers { display: flex; gap: 0; border-bottom: 2px solid #e0e0e0; margin-bottom: 12px; }
.${prefix}tab-header { display: inline-block; padding: 8px 16px; border: none; border-bottom: 2px solid transparent; margin-bottom: -2px; font-size: 14px; font-weight: 500; color: #888; background: transparent; cursor: pointer; font-family: inherit; transition: color 0.15s; }
.${prefix}tab-header:hover { color: #333; }
.${prefix}tab-header.${prefix}active { border-bottom-color: currentColor; color: #333; font-weight: 600; }
.${prefix}tab-panel[hidden] { display: none; }
.${prefix}tab-panels { padding: 12px 0; }
`;

  // Structural rules for row layout and alignment — shared across all themes
  const rowStructural = `
.${prefix}row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.${prefix}row > .${prefix}grid-item { flex: 0 1 auto; min-width: 0; }
.${prefix}row.${prefix}right { justify-content: flex-end; }
.${prefix}row.${prefix}center { justify-content: center; }
.${prefix}align-left { margin-right: auto; }
.${prefix}align-right { margin-left: auto; }
.${prefix}align-center { margin: auto; }
.${prefix}align-top { align-self: start; }
.${prefix}align-bottom { align-self: end; }
.${prefix}row.${prefix}align-top { align-items: flex-start; }
.${prefix}row.${prefix}align-bottom { align-items: flex-end; }
.${prefix}container-hero .${prefix}row { justify-content: center; }
.${prefix}container-sidebar .${prefix}row,
.${prefix}layout-sidebar .${prefix}row { display: block; }
.${prefix}container-sidebar .${prefix}row > .${prefix}grid-item,
.${prefix}layout-sidebar .${prefix}row > .${prefix}grid-item { display: block; width: 100%; }
.${prefix}row > .${prefix}grid-item > .${prefix}input,
.${prefix}row > .${prefix}grid-item > .${prefix}select { display: inline-block; width: auto; }
.${prefix}button.${prefix}small { padding: 4px 10px; font-size: 0.875em; }
.${prefix}button.${prefix}large { padding: 12px 24px; font-size: 1.125em; }
`;

  const demoStructural = `
.${prefix}demo { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #d0d0d0; border-radius: 6px; overflow: hidden; margin: 1rem 0; }
.${prefix}demo-preview { padding: 1.5rem; border-right: 1px solid #d0d0d0; }
.${prefix}demo-code { background: #f6f8fa; overflow: auto; display: flex; flex-direction: column; }
.${prefix}demo-code-toolbar { display: flex; justify-content: flex-end; padding: 0.5rem 0.75rem 0; }
.${prefix}demo-copy { background: none; border: 1px solid #ccc; border-radius: 4px; padding: 2px 8px; font-size: 0.75em; color: #666; cursor: pointer; font-family: inherit; }
.${prefix}demo-copy:hover { background: #e8e8e8; color: #333; }
.${prefix}demo-code pre { margin: 0; padding: 0.75rem 1.5rem 1.25rem; font-size: 0.8em; font-family: 'Courier New', Courier, monospace; line-height: 1.6; white-space: pre; }
.${prefix}demo-code code { display: block; color: #444; }
`;

  const commentStructural = `
.${prefix}comment {
  display: block;
  background: #fffde7;
  border: 1px solid #f9a825;
  border-left: 4px solid #f9a825;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 0.82em;
  color: #5d4037;
  font-style: italic;
  margin-bottom: 6px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.4;
  white-space: pre-wrap;
}
.${prefix}comment::before { content: '💬 '; font-style: normal; }
`;

  const commentPanelStructural = `
.${prefix}annotated { position: relative; outline: 2px solid #f9a825; outline-offset: 3px; border-radius: 3px; }
.${prefix}tab-header-annotated { position: relative; }
.${prefix}tab-header-annotated::after {
  content: ''; position: absolute; top: 4px; right: 4px;
  width: 7px; height: 7px; background: #f9a825; border-radius: 50%;
  pointer-events: none;
}
.${prefix}comment-badge {
  position: absolute; top: -10px; right: -10px;
  width: 20px; height: 20px; background: #f9a825; color: #fff;
  border-radius: 50%; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.25); cursor: default;
}
/* body.wmd-root is (0,1,1); use two classes + element (0,2,1) to win regardless of order */
body.${prefix}root.${prefix}has-comments { padding-right: 276px; }
.${prefix}comments-panel {
  position: fixed; top: 0; right: 0; width: 260px; height: 100vh;
  overflow-y: auto; background: #fff; border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 12px rgba(0,0,0,0.08); padding: 16px 14px;
  z-index: 200; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;
}
.${prefix}comments-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px; font-weight: 600; font-size: 0.82em; color: #333;
  border-bottom: 1px solid #f0f0f0; padding-bottom: 10px;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.${prefix}comments-panel-count {
  background: #f9a825; color: #fff; border-radius: 10px;
  padding: 1px 7px; font-size: 11px; font-weight: 700;
  letter-spacing: 0; text-transform: none;
}
.${prefix}comment-card {
  display: flex; gap: 10px; margin-bottom: 10px; padding: 10px;
  background: #fffde7; border: 1px solid #f9a825; border-radius: 6px;
}
.${prefix}comment-card-badge {
  flex-shrink: 0; width: 20px; height: 20px; background: #f9a825; color: #fff;
  border-radius: 50%; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1; margin-top: 2px;
}
.${prefix}comment-card-body { display: flex; flex-direction: column; min-width: 0; }
.${prefix}comment-msg { font-size: 0.82em; color: #5d4037; line-height: 1.45; font-style: italic; }
.${prefix}comment-msg-divider { height: 1px; background: #f0c040; margin: 6px 0; opacity: 0.6; }
`;

  return (
    linkButtonReset +
    tabsStructural +
    rowStructural +
    demoStructural +
    commentStructural +
    commentPanelStructural
  );
}
