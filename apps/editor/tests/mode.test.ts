import { describe, expect, it } from 'vitest';
import { buildProjectUrl, parseProjectId, resolveMode } from '../src/mode.js';

describe('parseProjectId', () => {
  it('returns the projectId from ?p=<id>', () => {
    expect(parseProjectId('?p=V1StGXR8_Z5jdHi6B-myT')).toBe('V1StGXR8_Z5jdHi6B-myT');
  });

  it('returns the projectId from a full URL', () => {
    expect(parseProjectId('https://x.com/wiremd/editor/?p=abc123')).toBe('abc123');
  });

  it('returns the projectId from a relative URL', () => {
    expect(parseProjectId('/wiremd/editor/?p=abc')).toBe('abc');
  });

  it('returns null when no ?p= is present', () => {
    expect(parseProjectId('')).toBe(null);
    expect(parseProjectId('?file=foo.md')).toBe(null);
    expect(parseProjectId('https://x.com/editor/')).toBe(null);
  });

  it('returns null when ?p= has no value', () => {
    expect(parseProjectId('?p=')).toBe(null);
  });

  it('ignores the URL hash', () => {
    expect(parseProjectId('?p=abc#code=xyz')).toBe('abc');
    expect(parseProjectId('#code=xyz')).toBe(null);
  });

  it('preserves coexisting query params', () => {
    expect(parseProjectId('?file=x.md&p=abc')).toBe('abc');
    expect(parseProjectId('?p=abc&file=x.md')).toBe('abc');
  });
});

describe('resolveMode', () => {
  it('returns "project" when ?p= is present', () => {
    expect(resolveMode('?p=abc')).toBe('project');
  });

  it('returns "hash" when no ?p= is present', () => {
    expect(resolveMode('')).toBe('hash');
    expect(resolveMode('?file=x.md')).toBe('hash');
    expect(resolveMode('#code=xyz')).toBe('hash');
  });
});

describe('buildProjectUrl', () => {
  it('builds pathname + ?p=<id>', () => {
    expect(buildProjectUrl('/wiremd/editor/', 'abc123')).toBe('/wiremd/editor/?p=abc123');
  });

  it('does not include a hash even when one was present', () => {
    expect(buildProjectUrl('/wiremd/editor/', 'abc')).not.toContain('#');
  });

  it('encodes ids that contain url-unsafe characters defensively', () => {
    // Real ids only use [A-Za-z0-9_-], but encode anyway so callers are safe.
    expect(buildProjectUrl('/editor/', 'a b')).toBe('/editor/?p=a%20b');
  });
});
