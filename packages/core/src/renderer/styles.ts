/**
 * Backwards-compatible re-export shim.
 *
 * The old monolithic styles.ts has been split into per-theme files under
 * `./styles/`. This shim preserves the original import path
 * (`./styles.js`) for any consumer that still references it.
 *
 * Prefer importing from `./styles/index.js` directly.
 */

export { getStyleCSS } from './styles/index.js';
