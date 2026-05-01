import { watch } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const distFile = path.join(root, '../../packages/core/dist/index.cjs');

// Initial bundle — ensures the extension is in a valid state before watching.
// Without this, vite's first watch-mode build deletes+recreates dist/ while we're
// still starting up, and the debounced watcher fires into a partially-written dist.
console.log('[wiremd-ext] initial bundle...');
try {
  execSync('npm run bundle', { cwd: root, stdio: 'inherit' });
  console.log('[wiremd-ext] ready — watching ../../packages/core/dist/index.cjs...');
} catch {
  console.error('[wiremd-ext] initial bundle failed — fix the error above and restart');
  process.exit(1);
}

let debounce;

watch(distFile, () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log('[wiremd-ext] detected wiremd rebuild, bundling...');
    try {
      execSync('npm run bundle', { cwd: root, stdio: 'inherit' });
      console.log('[wiremd-ext] done — reload VS Code window to pick up changes');
    } catch {
      console.error('[wiremd-ext] bundle failed');
    }
  }, 200);
});
