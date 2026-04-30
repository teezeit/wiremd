/**
 * Verifies the wireframe skill has the structure the VS Code extension expects.
 *
 * The extension's installClaudeSkill command:
 *   1. Checks for SKILL.md at skills/wireframe/SKILL.md before copying
 *   2. Copies the entire skills/wireframe/ directory to .claude/skills/wireframe/
 *
 * If these files are missing or misplaced the install silently fails or errors.
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const SKILL_ROOT = resolve(__dirname, '../skills/wireframe');

describe('skill structure', () => {
  it('SKILL.md exists at plugin root (required by VS Code extension install check)', () => {
    expect(existsSync(resolve(SKILL_ROOT, 'SKILL.md'))).toBe(true);
  });

  it('SKILL.md has name and description frontmatter', () => {
    const content = readFileSync(resolve(SKILL_ROOT, 'SKILL.md'), 'utf-8');
    expect(content).toContain('name:');
    expect(content).toContain('description:');
  });

  it('commands/wireframe.md exists (the /wireframe slash command)', () => {
    expect(existsSync(resolve(SKILL_ROOT, 'commands/wireframe.md'))).toBe(true);
  });

  it('commands/wireframe.md has allowed-tools frontmatter', () => {
    const content = readFileSync(resolve(SKILL_ROOT, 'commands/wireframe.md'), 'utf-8');
    expect(content).toContain('allowed-tools:');
  });

  it('bin/wiremd.js exists (bundled CLI)', () => {
    expect(existsSync(resolve(SKILL_ROOT, 'bin/wiremd.js'))).toBe(true);
  });

  it('.claude-plugin/plugin.json exists and has a name', () => {
    const pluginPath = resolve(SKILL_ROOT, '.claude-plugin/plugin.json');
    expect(existsSync(pluginPath)).toBe(true);
    const plugin = JSON.parse(readFileSync(pluginPath, 'utf-8'));
    expect(plugin.name).toBe('wireframe');
  });

  const expectedRefs = [
    'display.md',
    'editor.md',
    'serve.md',
    'syntax.md',
    'styles.md',
    'quick-reference.md',
    'rendering-modes.md',
    'multi-page.md',
    'vscode.md',
  ];

  for (const ref of expectedRefs) {
    it(`references/${ref} exists`, () => {
      expect(existsSync(resolve(SKILL_ROOT, 'references', ref))).toBe(true);
    });
  }

  it('references/examples/ has at least one .md file', () => {
    const dashboardPath = resolve(SKILL_ROOT, 'references/examples/dashboard.md');
    expect(existsSync(dashboardPath)).toBe(true);
  });
});
