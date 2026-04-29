#!/usr/bin/env node
/**
 * Builds the self-contained CLI bundle.
 * Canonical output: releases/wiremd.js  (for manual download/install)
 * Plugin copy:      skills/wireframe/bin/wiremd.js  (picked up by the plugin)
 */
import { mkdirSync, copyFileSync } from 'fs';
import { build } from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const release = resolve(root, 'releases/wiremd.js');
const pluginBin = resolve(root, 'skills/wireframe/bin/wiremd.js');

mkdirSync(resolve(root, 'releases'), { recursive: true });
mkdirSync(resolve(root, 'skills/wireframe/bin'), { recursive: true });

console.log('Building CLI bundle...');
await build({
  entryPoints: [resolve(root, 'src/cli/index.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: release,
  // Only keep node built-ins external — inline everything else
  external: ['fs', 'path', 'http', 'https', 'crypto', 'os', 'stream',
             'util', 'events', 'buffer', 'process', 'url', 'querystring',
             'fs/promises', 'child_process', 'net', 'tty', 'assert',
             'readline', 'module', 'worker_threads'],
  // The source guards main() with import.meta.url which is empty in CJS.
  // Since this bundle is only ever run directly, call main() unconditionally.
  footer: { js: '\nmain();' },
  minify: false,
  sourcemap: false,
});

copyFileSync(release, pluginBin);
console.log(`Bundle written → ${release}`);
console.log(`Plugin copy   → ${pluginBin}`);
