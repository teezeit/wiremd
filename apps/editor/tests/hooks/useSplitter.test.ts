import { describe, it, expect } from 'vitest';
import {
  clampSplit,
  calculateSplitPercent,
  getEditorPanelStyle,
  MIN_SPLIT_PERCENT,
  MAX_SPLIT_PERCENT,
} from '../../src/hooks/useSplitter';

describe('clampSplit', () => {
  it('clamps below minimum', () => {
    expect(clampSplit(0)).toBe(MIN_SPLIT_PERCENT);
  });

  it('clamps above maximum', () => {
    expect(clampSplit(100)).toBe(MAX_SPLIT_PERCENT);
  });

  it('passes through valid value', () => {
    expect(clampSplit(50)).toBe(50);
  });
});

describe('calculateSplitPercent', () => {
  const bounds = { left: 0, top: 0, width: 1000, height: 600 };

  it('calculates horizontal split correctly', () => {
    const result = calculateSplitPercent('horizontal', { clientX: 400, clientY: 0 }, bounds, 50);
    expect(result).toBe(40);
  });

  it('calculates vertical split correctly', () => {
    const result = calculateSplitPercent('vertical', { clientX: 0, clientY: 300 }, bounds, 50);
    expect(result).toBe(50);
  });

  it('clamps result to valid range', () => {
    const result = calculateSplitPercent('horizontal', { clientX: 0, clientY: 0 }, bounds, 50);
    expect(result).toBe(MIN_SPLIT_PERCENT);
  });

  it('returns fallback when size is zero', () => {
    const zeroBounds = { left: 0, top: 0, width: 0, height: 0 };
    expect(calculateSplitPercent('horizontal', { clientX: 0, clientY: 0 }, zeroBounds, 42)).toBe(42);
  });
});

describe('getEditorPanelStyle', () => {
  it('returns width for horizontal layout', () => {
    const style = getEditorPanelStyle('horizontal', 40, 50);
    expect(style.width).toBe('40%');
    expect(style.height).toBe('');
  });

  it('returns inverted height for vertical layout (sidebar is at bottom)', () => {
    const style = getEditorPanelStyle('vertical', 40, 50);
    expect(style.width).toBe('100%');
    expect(style.height).toBe('50%'); // 100 - 50 = 50
  });

  it('inverts the vertical split so dragging down shrinks the sidebar', () => {
    const style = getEditorPanelStyle('vertical', 40, 70);
    expect(style.height).toBe('30%'); // 100 - 70 = 30
  });
});
