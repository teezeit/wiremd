import { describe, it, expect } from 'vitest';
import { encodeShareHash, decodeShareHash, SHARE_HASH_KEY } from '../../src/lib/urlShare';

describe('encodeShareHash', () => {
  it('returns empty string for empty input', () => {
    expect(encodeShareHash('')).toBe('');
  });

  it('returns a hash string starting with #code=', () => {
    const hash = encodeShareHash('# Hello');
    expect(hash).toMatch(new RegExp(`^#${SHARE_HASH_KEY}=`));
  });
});

describe('decodeShareHash', () => {
  it('returns null for null/undefined/empty', () => {
    expect(decodeShareHash(null)).toBeNull();
    expect(decodeShareHash(undefined)).toBeNull();
    expect(decodeShareHash('')).toBeNull();
  });

  it('returns null for unrecognised hash', () => {
    expect(decodeShareHash('#something=else')).toBeNull();
  });

  it('round-trips encode → decode', () => {
    const original = '# Hello\n\n[Button]*';
    const hash = encodeShareHash(original);
    expect(decodeShareHash(hash)).toBe(original);
  });

  it('handles hash without leading #', () => {
    const original = 'some markdown';
    const hash = encodeShareHash(original).slice(1); // strip #
    expect(decodeShareHash(hash)).toBe(original);
  });
});
