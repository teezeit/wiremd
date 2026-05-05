import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSessionIdentity } from '../../src/hooks/useSessionIdentity';

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('useSessionIdentity', () => {
  it('returns a sessionId string', () => {
    const { result } = renderHook(() => useSessionIdentity());
    expect(typeof result.current.sessionId).toBe('string');
    expect(result.current.sessionId.length).toBeGreaterThan(0);
  });

  it('returns a name string', () => {
    const { result } = renderHook(() => useSessionIdentity());
    expect(typeof result.current.name).toBe('string');
    expect(result.current.name.length).toBeGreaterThan(0);
  });

  it('name looks like "Adjective Animal" (two words)', () => {
    const { result } = renderHook(() => useSessionIdentity());
    const words = result.current.name.split(' ');
    expect(words).toHaveLength(2);
  });

  it('persists the same identity across hook remounts', () => {
    const { result: r1 } = renderHook(() => useSessionIdentity());
    const { result: r2 } = renderHook(() => useSessionIdentity());
    expect(r1.current.sessionId).toBe(r2.current.sessionId);
    expect(r1.current.name).toBe(r2.current.name);
  });

  it('stores identity in localStorage', () => {
    renderHook(() => useSessionIdentity());
    expect(localStorage.getItem('wiremd-session-id')).not.toBeNull();
    expect(localStorage.getItem('wiremd-session-name')).not.toBeNull();
  });
});
