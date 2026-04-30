#!/usr/bin/env node
/**
 * Propagates the packages/core/package.json version to extensions/vscode/package.json
 * and extensions/skills/wireframe/.claude-plugin/plugin.json.
 *
 * Run via: pnpm run sync-versions
 * Also wired as the npm `version` lifecycle hook so `npm version <bump>` in
 * packages/core keeps all artifacts in sync automatically.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readJSON(file) {
  return JSON.parse(readFileSync(file, 'utf-8'));
}

function writeJSON(file, obj) {
  writeFileSync(file, JSON.stringify(obj, null, '\t') + '\n');
}

const corePkg = readJSON(resolve(ROOT, 'packages/core/package.json'));
const { version } = corePkg;

const extPkgPath = resolve(ROOT, 'extensions/vscode/package.json');
const extPkg = readJSON(extPkgPath);
extPkg.version = version;
writeJSON(extPkgPath, extPkg);
console.log(`extensions/vscode/package.json → ${version}`);

const pluginPath = resolve(ROOT, 'extensions/skills/wireframe/.claude-plugin/plugin.json');
const plugin = readJSON(pluginPath);
plugin.version = version;
writeJSON(pluginPath, plugin);
console.log(`extensions/skills/wireframe/.claude-plugin/plugin.json → ${version}`);
