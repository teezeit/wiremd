import { describe, expect, it } from 'vitest';
import { parseFileHint, basenameFromPath } from '../src/file-hint.js';

describe('basenameFromPath', () => {
  it('extracts filename from a Unix path', () => {
    expect(basenameFromPath('/Users/tobias/Desktop/wireframe.md')).toBe('wireframe.md');
  });

  it('extracts filename from a Windows path', () => {
    expect(basenameFromPath('C:\\Users\\tobias\\Desktop\\wireframe.md')).toBe('wireframe.md');
  });

  it('handles a bare filename with no directory', () => {
    expect(basenameFromPath('wireframe.md')).toBe('wireframe.md');
  });

  it('handles a trailing slash gracefully', () => {
    expect(basenameFromPath('/some/dir/')).toBe('dir');
  });
});

describe('parseFileHint', () => {
  it('returns the path from a ?file= query param', () => {
    expect(parseFileHint('?file=/Users/tobias/wireframe.md')).toBe('/Users/tobias/wireframe.md');
  });

  it('returns the path when other params are present', () => {
    expect(parseFileHint('?style=clean&file=/tmp/test.md')).toBe('/tmp/test.md');
  });

  it('returns null when ?file= is absent', () => {
    expect(parseFileHint('?style=clean')).toBeNull();
  });

  it('returns null for an empty search string', () => {
    expect(parseFileHint('')).toBeNull();
  });

  it('returns null for a plain hash-only URL', () => {
    expect(parseFileHint('#code=abc')).toBeNull();
  });

  it('decodes percent-encoded paths', () => {
    expect(parseFileHint('?file=%2FUsers%2Ftobias%2Fmy%20file.md')).toBe('/Users/tobias/my file.md');
  });
});
