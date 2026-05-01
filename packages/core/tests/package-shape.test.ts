/**
 * Package shape tests — green before migration, used as canary throughout.
 * After migration tests move to packages/core/tests/ and paths update accordingly.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MONOREPO_ROOT = resolve(ROOT, '../..');

describe('dist file existence', () => {
  const distFiles = [
    'dist/index.js',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/parser.js',
    'dist/parser.cjs',
    'dist/parser/index.d.ts',
    'dist/renderer.js',
    'dist/renderer.cjs',
    'dist/renderer/index.d.ts',
    'dist/cli/index.js',
    'bin/wiremd.js',
  ];

  for (const file of distFiles) {
    it(`${file} exists`, () => {
      expect(existsSync(resolve(ROOT, file))).toBe(true);
    });
  }
});

describe('CJS public API', () => {
  const require = createRequire(import.meta.url);
  const mod = require(resolve(ROOT, 'dist/index.cjs'));
  const exports = ['parse', 'renderToHTML', 'renderToReact', 'renderToJSON', 'renderToTailwind'];

  for (const name of exports) {
    it(`exports ${name}`, () => {
      expect(typeof mod[name]).toBe('function');
    });
  }
});

describe('ESM public API', () => {
  const exports = ['parse', 'renderToHTML', 'renderToReact', 'renderToJSON', 'renderToTailwind'];
  let mod: Record<string, unknown>;

  it('loads ESM entry', async () => {
    mod = await import(pathToFileURL(resolve(ROOT, 'dist/index.js')).href);
    expect(mod).toBeTruthy();
  });

  for (const name of exports) {
    it(`exports ${name}`, async () => {
      if (!mod) mod = await import(pathToFileURL(resolve(ROOT, 'dist/index.js')).href);
      expect(typeof mod[name]).toBe('function');
    });
  }
});

describe('bin entry point', () => {
  it('--version prints wiremd vX.Y.Z', () => {
    const out = execSync(`node ${resolve(ROOT, 'bin/wiremd.js')} --version`, { encoding: 'utf-8' });
    expect(out).toMatch(/wiremd v\d+\.\d+\.\d+/);
  });

  it('--help mentions --output and --style', () => {
    const out = execSync(`node ${resolve(ROOT, 'bin/wiremd.js')} --help`, { encoding: 'utf-8' });
    expect(out).toContain('--output');
    expect(out).toContain('--style');
  });
});

describe('version consistency', () => {
  it('core, vscode-extension, and plugin.json share the same version', () => {
    const corePkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));
    const extPkg = JSON.parse(readFileSync(resolve(MONOREPO_ROOT, 'extensions/vscode/package.json'), 'utf-8'));
    const plugin = JSON.parse(readFileSync(resolve(MONOREPO_ROOT, 'extensions/skills/wireframe/.claude-plugin/plugin.json'), 'utf-8'));

    expect(extPkg.version).toBe(corePkg.version);
    expect(plugin.version).toBe(corePkg.version);
  });
});
