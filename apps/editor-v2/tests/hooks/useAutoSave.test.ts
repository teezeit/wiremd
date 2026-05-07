import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutoSave } from '../../src/hooks/useAutoSave';

const STORAGE_KEY = 'wiremd-content';

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

describe('useAutoSave', () => {
  it('saves to localStorage after debounce delay', async () => {
    renderHook(() => useAutoSave('# Hello'));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('# Hello');
  });

  it('debounces — only saves the latest value after rapid changes', async () => {
    const { rerender } = renderHook(({ v }) => useAutoSave(v), {
      initialProps: { v: 'a' },
    });
    rerender({ v: 'b' });
    rerender({ v: 'c' });
    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('c');
  });

  it('does not save before the delay elapses', () => {
    renderHook(() => useAutoSave('# Hello'));
    vi.advanceTimersByTime(500);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('updates localStorage when value changes', async () => {
    const { rerender } = renderHook(({ v }) => useAutoSave(v), {
      initialProps: { v: 'first' },
    });
    await act(async () => { vi.advanceTimersByTime(1000); });
    rerender({ v: 'second' });
    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('second');
  });

  it('cancels pending save on unmount', async () => {
    const { unmount } = renderHook(() => useAutoSave('# Hello'));
    unmount();
    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
