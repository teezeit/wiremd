import { describe, expect, it } from 'vitest';
import { parseFileHint, basenameFromPath, buildFileHintUrl, startInFromPath, stripFileHint } from '../src/file-hint.js';

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

  it('preserves spaces in the filename', () => {
    expect(basenameFromPath('/Users/tobias/my wireframe.md')).toBe('my wireframe.md');
  });

  it('preserves parentheses in the filename', () => {
    expect(basenameFromPath('/Users/tobias/wireframe (v2).md')).toBe('wireframe (v2).md');
  });

  it('preserves multiple dots in the filename', () => {
    expect(basenameFromPath('/path/to/my.wireframe.v2.md')).toBe('my.wireframe.v2.md');
  });

  it('handles Unicode filenames', () => {
    expect(basenameFromPath('/Users/tobias/仕様書.md')).toBe('仕様書.md');
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

  it('decodes %20-encoded spaces', () => {
    expect(parseFileHint('?file=%2FUsers%2Ftobias%2Fmy%20file.md')).toBe('/Users/tobias/my file.md');
  });

  it('decodes %2B as + and does NOT treat raw + as space', () => {
    // When built via buildFileHintUrl, + in a path is encoded as %2B
    expect(parseFileHint('?file=%2Fprojects%2Fc%2B%2B%2Ffile.md')).toBe('/projects/c++/file.md');
  });

  it('decodes %23-encoded # in a path segment', () => {
    expect(parseFileHint('?file=%2Fpath%2Fto%2Ffile%23v2.md')).toBe('/path/to/file#v2.md');
  });

  it('decodes %26-encoded & in a path segment', () => {
    expect(parseFileHint('?file=%2Fpath%2FR%26D%2Ffile.md')).toBe('/path/R&D/file.md');
  });

  it('decodes Unicode-encoded paths', () => {
    expect(parseFileHint('?file=%2FUsers%2Ftobias%2F%E4%BB%95%E6%A7%98%E6%9B%B8.md')).toBe('/Users/tobias/仕様書.md');
  });
});

// --- buildFileHintUrl ---

describe('buildFileHintUrl', () => {
  it('appends an encoded ?file= param to a base URL', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/Users/tobias/wireframe.md');
    expect(url).toContain('file=');
    expect(parseFileHint(new URL(url).search)).toBe('/Users/tobias/wireframe.md');
  });

  it('correctly encodes spaces in the path', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/Users/tobias/my wireframe.md');
    expect(parseFileHint(new URL(url).search)).toBe('/Users/tobias/my wireframe.md');
  });

  it('correctly encodes + so it is not decoded as a space', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/projects/c++/file.md');
    expect(parseFileHint(new URL(url).search)).toBe('/projects/c++/file.md');
  });

  it('correctly encodes # so it does not truncate the URL', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/path/to/file#v2.md');
    expect(new URL(url).hash).toBe('');
    expect(parseFileHint(new URL(url).search)).toBe('/path/to/file#v2.md');
  });

  it('correctly encodes & so it does not split into two params', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/path/R&D/file.md');
    expect(parseFileHint(new URL(url).search)).toBe('/path/R&D/file.md');
  });

  it('correctly encodes Unicode paths', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/', '/Users/tobias/仕様書.md');
    expect(parseFileHint(new URL(url).search)).toBe('/Users/tobias/仕様書.md');
  });

  it('preserves existing query params on the base URL', () => {
    const url = buildFileHintUrl('http://localhost:5175/wiremd/editor/?style=clean', '/path/file.md');
    const params = new URL(url).searchParams;
    expect(params.get('style')).toBe('clean');
    expect(params.get('file')).toBe('/path/file.md');
  });
});

// --- startInFromPath ---

describe('startInFromPath', () => {
  it('returns "desktop" for a file on the Desktop', () => {
    expect(startInFromPath('/Users/tobias/Desktop/wireframe.md')).toBe('desktop');
  });

  it('returns "desktop" case-insensitively', () => {
    expect(startInFromPath('/Users/tobias/desktop/wireframe.md')).toBe('desktop');
  });

  it('returns "documents" for a file in Documents', () => {
    expect(startInFromPath('/Users/tobias/Documents/spec.md')).toBe('documents');
  });

  it('returns "downloads" for a file in Downloads', () => {
    expect(startInFromPath('/Users/tobias/Downloads/draft.md')).toBe('downloads');
  });

  it('returns "pictures" for a file in Pictures', () => {
    expect(startInFromPath('/Users/tobias/Pictures/image.md')).toBe('pictures');
  });

  it('returns "music" for a file in Music', () => {
    expect(startInFromPath('/Users/tobias/Music/track.md')).toBe('music');
  });

  it('returns "videos" for a file in Videos', () => {
    expect(startInFromPath('/Users/tobias/Videos/clip.md')).toBe('videos');
  });

  it('returns undefined for an arbitrary project path', () => {
    expect(startInFromPath('/Users/tobias/projects/wiremd/wireframe.md')).toBeUndefined();
  });

  it('returns undefined for a bare filename', () => {
    expect(startInFromPath('wireframe.md')).toBeUndefined();
  });

  it('handles Windows Desktop paths', () => {
    expect(startInFromPath('C:\\Users\\tobias\\Desktop\\wireframe.md')).toBe('desktop');
  });

  it('handles Windows Documents paths', () => {
    expect(startInFromPath('C:\\Users\\tobias\\Documents\\spec.md')).toBe('documents');
  });
});

// --- stripFileHint ---

describe('stripFileHint', () => {
  it('removes ?file= when it is the only param', () => {
    expect(stripFileHint('?file=%2FUsers%2Ftobias%2Fwireframe.md')).toBe('');
  });

  it('removes file= when other params precede it', () => {
    expect(stripFileHint('?style=clean&file=%2Fpath%2Ffile.md')).toBe('?style=clean');
  });

  it('removes file= when other params follow it', () => {
    expect(stripFileHint('?file=%2Fpath%2Ffile.md&style=clean')).toBe('?style=clean');
  });

  it('leaves search unchanged when no file= param is present', () => {
    expect(stripFileHint('?style=clean')).toBe('?style=clean');
  });

  it('returns empty string for empty input', () => {
    expect(stripFileHint('')).toBe('');
  });

  it('handles search string without leading ?', () => {
    expect(stripFileHint('file=%2Fpath%2Ffile.md')).toBe('');
  });
});
