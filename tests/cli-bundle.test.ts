/**
 * Tests for the shipped CLI bundle at skills/wireframe/bin/wiremd.js.
 * This bundle must be self-contained (no npm install required) and is
 * committed to git so Claude Desktop can run it directly with `node`.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, writeFileSync, unlinkSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const RELEASE  = resolve(__dirname, '../releases/wiremd.js');
const VSIX     = resolve(__dirname, '../releases/wiremd.vsix');
const BUNDLE   = resolve(__dirname, '../skills/wireframe/bin/wiremd.js');
const TMP_INPUT = resolve(__dirname, '../tmp-bundle-test-input.md');
const TMP_OUTPUT = resolve(__dirname, '../tmp-bundle-test-output.html');

const MD = `# Test Page\n\n[Click Me]*\n\nEmail\n[_____________________________]{type:email}\n`;

describe('cli-bundle', () => {
  beforeEach(() => {
    writeFileSync(TMP_INPUT, MD, 'utf-8');
  });

  afterEach(() => {
    [TMP_INPUT, TMP_OUTPUT].forEach(f => { try { unlinkSync(f); } catch {} });
  });

  it('release file exists at releases/wiremd.js', () => {
    expect(existsSync(RELEASE)).toBe(true);
  });

  it('plugin copy exists at skills/wireframe/bin/wiremd.js', () => {
    expect(existsSync(BUNDLE)).toBe(true);
  });

  it('VS Code extension exists at releases/wiremd.vsix', () => {
    expect(existsSync(VSIX)).toBe(true);
  });

  it('release and plugin copy are identical', () => {
    const r = readFileSync(RELEASE);
    const b = readFileSync(BUNDLE);
    expect(r.equals(b)).toBe(true);
  });

  it('bundle is executable by node without any install step', () => {
    const result = execSync(`node "${BUNDLE}" --version`, { encoding: 'utf-8' });
    expect(result.trim()).toMatch(/\d+\.\d+\.\d+/);
  });

  it('bundle renders a markdown file to html', () => {
    execSync(`node "${BUNDLE}" "${TMP_INPUT}" -o "${TMP_OUTPUT}" -s clean`, {
      encoding: 'utf-8',
    });
    expect(existsSync(TMP_OUTPUT)).toBe(true);
    const html = readFileSync(TMP_OUTPUT, 'utf-8');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Click Me');
  });

  it('bundle --help shows usage without errors', () => {
    const result = execSync(`node "${BUNDLE}" --help`, { encoding: 'utf-8' });
    expect(result).toContain('wiremd');
    expect(result).toContain('--output');
    expect(result).toContain('--style');
  });

  it('bundle does not require node_modules next to it', () => {
    // Run from a temp directory that has no node_modules — proves self-contained
    const result = execSync(`node "${BUNDLE}" --version`, {
      encoding: 'utf-8',
      cwd: '/tmp',
    });
    expect(result.trim()).toMatch(/\d+\.\d+\.\d+/);
  });
});
