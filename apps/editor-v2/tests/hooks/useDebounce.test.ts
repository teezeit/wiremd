import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('useDebounce', () => {
  it('does not call callback before delay elapses', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useDebounce(cb, 200));
    act(() => { result.current('hello'); });
    expect(cb).not.toHaveBeenCalled();
  });

  it('calls callback after delay elapses', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useDebounce(cb, 200));
    act(() => { result.current('hello'); });
    act(() => { vi.advanceTimersByTime(200); });
    expect(cb).toHaveBeenCalledOnce();
    expect(cb).toHaveBeenCalledWith('hello');
  });

  it('debounces rapid calls — only last value fires', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useDebounce(cb, 200));
    act(() => {
      result.current('a');
      result.current('b');
      result.current('c');
    });
    act(() => { vi.advanceTimersByTime(200); });
    expect(cb).toHaveBeenCalledOnce();
    expect(cb).toHaveBeenCalledWith('c');
  });

  it('cancels pending call on unmount', () => {
    const cb = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(cb, 200));
    act(() => { result.current('hello'); });
    unmount();
    act(() => { vi.advanceTimersByTime(200); });
    expect(cb).not.toHaveBeenCalled();
  });
});
