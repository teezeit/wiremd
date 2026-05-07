import { describe, it, expect } from 'vitest';
import { lineFromOffset } from '../../src/lib/cursorSync';

describe('lineFromOffset', () => {
  it('offset 0 → line 1', () => {
    expect(lineFromOffset('hello world', 0)).toBe(1);
  });

  it('offset at start of line 3 → line 3', () => {
    const doc = 'line1\nline2\nline3';
    const offset = 'line1\nline2\n'.length;
    expect(lineFromOffset(doc, offset)).toBe(3);
  });

  it('offset mid-line stays on same line', () => {
    const doc = 'line1\nline2\nline3';
    expect(lineFromOffset(doc, 3)).toBe(1);
    expect(lineFromOffset(doc, 8)).toBe(2);
  });

  it('offset past end of doc → last line', () => {
    const doc = 'line1\nline2';
    expect(lineFromOffset(doc, 9999)).toBe(2);
  });

  it('empty doc → line 1', () => {
    expect(lineFromOffset('', 0)).toBe(1);
  });

  it('single line with no newlines → always line 1', () => {
    expect(lineFromOffset('hello', 3)).toBe(1);
  });

  it('offset exactly at newline character → previous line', () => {
    const doc = 'line1\nline2';
    expect(lineFromOffset(doc, 5)).toBe(1);
  });
});
