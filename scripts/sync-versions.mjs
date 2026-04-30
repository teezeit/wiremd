#!/usr/bin/env node
/**
 * Propagates the root package.json version to vscode-extension/package.json
 * and skills/wireframe/.claude-plugin/plugin.json.
 *
 * Run via: npm run sync-versions
 * Also wired as the npm `version` lifecycle hook so `npm version <bump>` keeps
 * all four artifacts in sync automatically.
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

const rootPkg = readJSON(resolve(ROOT, 'package.json'));
const { version } = rootPkg;

const extPkgPath = resolve(ROOT, 'vscode-extension/package.json');
const extPkg = readJSON(extPkgPath);
extPkg.version = version;
writeJSON(extPkgPath, extPkg);
console.log(`vscode-extension/package.json → ${version}`);

const pluginPath = resolve(ROOT, 'skills/wireframe/.claude-plugin/plugin.json');
const plugin = readJSON(pluginPath);
plugin.version = version;
writeJSON(pluginPath, plugin);
console.log(`skills/wireframe/.claude-plugin/plugin.json → ${version}`);
