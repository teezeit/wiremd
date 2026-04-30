/**
 * Tests for the plugin CLI bundle at extensions/skills/wireframe/bin/wiremd.js.
 * This file is committed to git (required for the git-subdir plugin pull).
 * The standalone CLI and .vsix are uploaded to GitHub Releases, not tested here.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, writeFileSync, unlinkSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { tmpdir } from 'os';

const BUNDLE     = resolve(__dirname, '../../../extensions/skills/wireframe/bin/wiremd.js');
const TMP_INPUT  = resolve(__dirname, '../tmp-bundle-test-input.md');
const TMP_OUTPUT = resolve(__dirname, '../tmp-bundle-test-output.html');

const MD = `# Test Page\n\n[Click Me]*\n\nEmail\n[_____________________________]{type:email}\n`;

describe('cli-bundle', () => {
  beforeEach(() => {
    writeFileSync(TMP_INPUT, MD, 'utf-8');
  });

  afterEach(() => {
    [TMP_INPUT, TMP_OUTPUT].forEach(f => { try { unlinkSync(f); } catch {} });
  });

  it('plugin bundle exists at extensions/skills/wireframe/bin/wiremd.js', () => {
    expect(existsSync(BUNDLE)).toBe(true);
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
    const result = execSync(`node "${BUNDLE}" --version`, {
      encoding: 'utf-8',
      cwd: tmpdir(),
    });
    expect(result.trim()).toMatch(/\d+\.\d+\.\d+/);
  });
});
