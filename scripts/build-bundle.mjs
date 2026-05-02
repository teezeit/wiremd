#!/usr/bin/env node
/**
 * Builds all release artifacts into releases/:
 *   releases/wiremd.js        — self-contained CLI (download & run with node)
 *   releases/wiremd.vsix      — VS Code extension (install via Extensions > ... > Install from VSIX)
 *
 * Also copies the CLI to the plugin:
 *   extensions/skills/wireframe/bin/wiremd.js
 */
import { mkdirSync, copyFileSync, readdirSync } from 'fs';
import { build } from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const releasesDir = resolve(root, 'releases');
const release    = resolve(releasesDir, 'wiremd.js');
const pluginBin  = resolve(root, 'extensions/skills/wireframe/bin/wiremd.js');
const pluginExec = resolve(root, 'extensions/skills/wireframe/bin/wiremd');
const extDir     = resolve(root, 'extensions/vscode');

mkdirSync(releasesDir, { recursive: true });
mkdirSync(resolve(root, 'extensions/skills/wireframe/bin'), { recursive: true });

// ── CLI bundle ─────────────────────────────────────────────────────────────
console.log('Building CLI bundle...');
await build({
  entryPoints: [resolve(root, 'packages/core/src/cli/index.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: release,
  external: ['fs', 'path', 'http', 'https', 'crypto', 'os', 'stream',
             'util', 'events', 'buffer', 'process', 'url', 'querystring',
             'fs/promises', 'child_process', 'net', 'tty', 'assert',
             'readline', 'module', 'worker_threads'],
  // import.meta.url is empty in CJS — call main() via footer instead
  footer: { js: '\nmain();' },
  minify: false,
  sourcemap: false,
});

copyFileSync(release, pluginBin);
copyFileSync(release, pluginExec);
console.log(`CLI bundle    → ${release}`);
console.log(`Plugin copy   → ${pluginBin}`);
console.log(`Plugin exec   → ${pluginExec}`);

// ── VS Code extension ──────────────────────────────────────────────────────
console.log('Building VS Code extension...');
execSync('npm run bundle', { cwd: extDir, stdio: 'inherit' });
execSync('npm run package', { cwd: extDir, stdio: 'inherit' });

const vsix = readdirSync(extDir).find(f => f.endsWith('.vsix'));
if (!vsix) throw new Error('vsce package produced no .vsix file');

copyFileSync(resolve(extDir, vsix), resolve(releasesDir, 'wiremd.vsix'));
console.log(`VS Code ext   → releases/wiremd.vsix`);
