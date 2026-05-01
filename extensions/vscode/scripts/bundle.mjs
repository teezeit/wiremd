#!/usr/bin/env node
/**
 * Bundles the VS Code extension:
 *   1. Copies the wireframe Claude skill and selected docs trees into the
 *      extension directory so the WebView can serve them at runtime.
 *   2. esbuilds src/extension.ts and src/preview-provider.ts to dist/.
 *
 * Replaces a rm/cp/mkdir shell pipeline that worked on macOS/Linux but
 * failed on Windows runners ("The syntax of the command is incorrect").
 */
import { rmSync, cpSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root  = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo  = resolve(root, '../..');
const docs  = resolve(repo, 'apps/docs');

// Stage runtime assets the WebView serves
rmSync(resolve(root, 'skills'), { recursive: true, force: true });
cpSync(resolve(repo, 'extensions/skills'), resolve(root, 'skills'), { recursive: true });

rmSync(resolve(root, 'docs'), { recursive: true, force: true });
mkdirSync(resolve(root, 'docs'), { recursive: true });
for (const sub of ['components', 'examples', 'reference']) {
  cpSync(resolve(docs, sub), resolve(root, `docs/${sub}`), { recursive: true });
}

// esbuild the two entry points
const common = {
  bundle: true,
  external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  minify: true,
};

await Promise.all([
  build({ ...common, entryPoints: [resolve(root, 'src/extension.ts')],        outfile: resolve(root, 'dist/extension.js') }),
  build({ ...common, entryPoints: [resolve(root, 'src/preview-provider.ts')], outfile: resolve(root, 'dist/preview-provider.js') }),
]);
