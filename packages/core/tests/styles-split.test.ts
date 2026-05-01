/**
 * Styles split contract.
 *
 * The 3,900-line styles.ts was split into one file per theme under
 * src/renderer/styles/. These tests pin the assumptions the split
 * relies on:
 *
 *   1. Each theme exports a non-empty getter that respects the prefix.
 *   2. The structural CSS module is non-empty and prefix-aware.
 *   3. getStyleCSS = structural + theme (concat order matters; the
 *      structural block must come first so themes can override it).
 *   4. An unknown style name falls back to sketch (legacy behavior).
 */

import { describe, expect, it } from 'vitest';
import { getStyleCSS } from '../src/renderer/styles.js';
import { getStructuralCSS } from '../src/renderer/styles/_structural.js';
import {
  getSketchStyle,
  getCleanStyle,
  getWireframeStyle,
  getNoneStyle,
  getTailwindStyle,
  getMaterialStyle,
  getBrutalStyle,
} from '../src/renderer/styles/index.js';

const PREFIX = 'wmd-';

describe('styles split: per-theme modules', () => {
  it.each([
    ['sketch', getSketchStyle],
    ['clean', getCleanStyle],
    ['wireframe', getWireframeStyle],
    ['none', getNoneStyle],
    ['tailwind', getTailwindStyle],
    ['material', getMaterialStyle],
    ['brutal', getBrutalStyle],
  ])('%s: emits non-empty CSS that uses the prefix', (_name, fn) => {
    const css = fn(PREFIX);
    expect(css.length).toBeGreaterThan(50);
    expect(css).toContain(`.${PREFIX}`);
  });

  it('structural CSS is non-empty and prefix-aware', () => {
    const css = getStructuralCSS(PREFIX);
    expect(css.length).toBeGreaterThan(50);
    expect(css).toContain(`.${PREFIX}tab-headers`);
    expect(css).toContain(`.${PREFIX}row`);
    expect(css).toContain(`.${PREFIX}comment`);
  });

  it('per-theme getters are pure: same prefix → same output', () => {
    expect(getCleanStyle(PREFIX)).toBe(getCleanStyle(PREFIX));
  });

  it('the prefix actually parameterizes the output (not just appended)', () => {
    const a = getCleanStyle('a-');
    const b = getCleanStyle('b-');
    expect(a).not.toBe(b);
    expect(a).toContain('.a-');
    expect(b).toContain('.b-');
    expect(a).not.toContain('.b-');
  });
});

describe('styles split: getStyleCSS dispatcher', () => {
  it('returns structural + theme (in that order)', () => {
    const expected = getStructuralCSS(PREFIX) + getCleanStyle(PREFIX);
    expect(getStyleCSS('clean', PREFIX)).toBe(expected);
  });

  it.each(['sketch', 'clean', 'wireframe', 'none', 'tailwind', 'material', 'brutal'])(
    'routes %s correctly',
    (name) => {
      const out = getStyleCSS(name, PREFIX);
      // Must contain the structural block.
      expect(out).toContain(`.${PREFIX}tab-headers`);
      // Output non-trivially larger than structural alone.
      expect(out.length).toBeGreaterThan(getStructuralCSS(PREFIX).length);
    },
  );

  it('falls back to sketch for unknown style names (legacy behavior)', () => {
    const expected = getStructuralCSS(PREFIX) + getSketchStyle(PREFIX);
    expect(getStyleCSS('does-not-exist', PREFIX)).toBe(expected);
  });
});
