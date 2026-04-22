import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { copyDirSync } from '../vscode-extension/src/utils.js';

describe('copyDirSync', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiremd-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('copies a flat directory of files', () => {
    const src = path.join(tmpDir, 'src');
    const dest = path.join(tmpDir, 'dest');
    fs.mkdirSync(src);
    fs.writeFileSync(path.join(src, 'a.txt'), 'hello');
    fs.writeFileSync(path.join(src, 'b.md'), '# Title');

    copyDirSync(src, dest);

    expect(fs.readFileSync(path.join(dest, 'a.txt'), 'utf8')).toBe('hello');
    expect(fs.readFileSync(path.join(dest, 'b.md'), 'utf8')).toBe('# Title');
  });

  it('copies nested subdirectories recursively', () => {
    const src = path.join(tmpDir, 'src');
    fs.mkdirSync(path.join(src, 'sub'), { recursive: true });
    fs.writeFileSync(path.join(src, 'root.txt'), 'root');
    fs.writeFileSync(path.join(src, 'sub', 'nested.txt'), 'nested');

    const dest = path.join(tmpDir, 'dest');
    copyDirSync(src, dest);

    expect(fs.readFileSync(path.join(dest, 'root.txt'), 'utf8')).toBe('root');
    expect(fs.readFileSync(path.join(dest, 'sub', 'nested.txt'), 'utf8')).toBe('nested');
  });

  it('creates dest directory if it does not exist', () => {
    const src = path.join(tmpDir, 'src');
    fs.mkdirSync(src);
    fs.writeFileSync(path.join(src, 'file.txt'), 'data');

    const dest = path.join(tmpDir, 'new', 'nested', 'dest');
    copyDirSync(src, dest);

    expect(fs.existsSync(dest)).toBe(true);
    expect(fs.readFileSync(path.join(dest, 'file.txt'), 'utf8')).toBe('data');
  });

  it('overwrites existing files in dest', () => {
    const src = path.join(tmpDir, 'src');
    const dest = path.join(tmpDir, 'dest');
    fs.mkdirSync(src);
    fs.mkdirSync(dest);
    fs.writeFileSync(path.join(src, 'file.txt'), 'new content');
    fs.writeFileSync(path.join(dest, 'file.txt'), 'old content');

    copyDirSync(src, dest);

    expect(fs.readFileSync(path.join(dest, 'file.txt'), 'utf8')).toBe('new content');
  });

  it('mirrors the wiremd skill directory structure', () => {
    const src = path.join(tmpDir, 'skill');
    fs.mkdirSync(path.join(src, 'references', 'examples'), { recursive: true });
    fs.writeFileSync(path.join(src, 'SKILL.md'), '# Skill');
    fs.writeFileSync(path.join(src, 'references', 'syntax.md'), '# Syntax');
    fs.writeFileSync(path.join(src, 'references', 'examples', 'demo.md'), '# Demo');

    const dest = path.join(tmpDir, '.claude', 'skills', 'wireframe');
    copyDirSync(src, dest);

    expect(fs.existsSync(path.join(dest, 'SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(dest, 'references', 'syntax.md'))).toBe(true);
    expect(fs.existsSync(path.join(dest, 'references', 'examples', 'demo.md'))).toBe(true);
  });
});
