import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProjectLock } from '../../src/hooks/useProjectLock';

vi.mock('../../src/lib/projectApi', () => ({
  getProjectLockInfo: vi.fn(),
  lockProject: vi.fn(),
  unlockProject: vi.fn(),
}));

import * as projectApi from '../../src/lib/projectApi';

function freeProject() {
  return { lockedBy: null, lockedName: null, lastEditorName: 'Blue Fox', updatedAt: '2026-01-01T00:00:00Z' };
}

function takenProject(by = 'xyz', name = 'Red Bear') {
  return { lockedBy: by, lockedName: name, lastEditorName: name, updatedAt: '2026-01-01T00:00:00Z' };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(freeProject());
  vi.mocked(projectApi.lockProject).mockResolvedValue(undefined);
  vi.mocked(projectApi.unlockProject).mockResolvedValue(undefined);
});

afterEach(() => vi.useRealTimers());

const BASE = { sessionId: 'me', name: 'Blue Fox', onStolen: vi.fn() };

describe('useProjectLock — solo (no projectId)', () => {
  it('returns solo status when projectId is null', () => {
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: null }));
    expect(result.current.lockState.status).toBe('solo');
  });
});

describe('useProjectLock — shared project', () => {
  it('returns unlocked when no one holds the lock', async () => {
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(result.current.lockState.status).toBe('unlocked');
  });

  it('returns taken when someone else holds the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject());
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(result.current.lockState.status).toBe('taken');
    expect(result.current.lockState.lockedByName).toBe('Red Bear');
  });

  it('returns mine when I hold the lock', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(result.current.lockState.status).toBe('mine');
  });

  it('acquire() calls lockProject and sets status to mine', async () => {
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    await act(async () => { await result.current.acquire(); });
    expect(projectApi.lockProject).toHaveBeenCalledWith('proj1', 'me', 'Blue Fox', false);
    expect(result.current.lockState.status).toBe('mine');
  });

  it('release() calls unlockProject and sets status to unlocked', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(freeProject());
    await act(async () => { await result.current.release(); });
    expect(projectApi.unlockProject).toHaveBeenCalledWith('proj1', 'me');
    expect(result.current.lockState.status).toBe('unlocked');
  });

  it('steal() calls lockProject with force:true', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject());
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    await act(async () => { await result.current.steal(); });
    expect(projectApi.lockProject).toHaveBeenCalledWith('proj1', 'me', 'Blue Fox', true);
    expect(result.current.lockState.status).toBe('mine');
  });

  it('polls every 2s', async () => {
    renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    const initialCalls = vi.mocked(projectApi.getProjectLockInfo).mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(vi.mocked(projectApi.getProjectLockInfo).mock.calls.length).toBeGreaterThan(initialCalls);
  });

  it('calls onStolen when my lock is taken by someone else', async () => {
    const onStolen = vi.fn();
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1', onStolen }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    // Lock stolen by Red Bear on next poll
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('xyz', 'Red Bear'));
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(onStolen).toHaveBeenCalledWith('Red Bear');
  });
});

describe('useProjectLock — session cleanup', () => {
  it('resets lockState to solo when projectId changes to null', async () => {
    vi.mocked(projectApi.getProjectLockInfo).mockResolvedValue(takenProject('me', 'Blue Fox'));
    const { result, rerender } = renderHook(
      ({ pid }: { pid: string | null }) => useProjectLock({ ...BASE, projectId: pid }),
      { initialProps: { pid: 'proj1' } },
    );
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(result.current.lockState.status).toBe('mine');

    // Stop session — set projectId to null
    rerender({ pid: null });
    expect(result.current.lockState.status).toBe('solo');
    expect(result.current.lockState.lockedByName).toBeNull();
  });

  it('stops polling when projectId becomes null', async () => {
    const { rerender } = renderHook(
      ({ pid }: { pid: string | null }) => useProjectLock({ ...BASE, projectId: pid }),
      { initialProps: { pid: 'proj1' } },
    );
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    const callsBefore = vi.mocked(projectApi.getProjectLockInfo).mock.calls.length;
    rerender({ pid: null });
    await act(async () => { await vi.advanceTimersByTimeAsync(4000); });
    expect(vi.mocked(projectApi.getProjectLockInfo).mock.calls.length).toBe(callsBefore);
  });
});

describe('useProjectLock — acquire conflict', () => {
  it('does not change status to mine when lockProject rejects (409)', async () => {
    vi.mocked(projectApi.lockProject).mockRejectedValueOnce(new Error('Locked by someone else'));
    const { result } = renderHook(() => useProjectLock({ ...BASE, projectId: 'proj1' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    try { await act(async () => { await result.current.acquire(); }); } catch {}
    expect(result.current.lockState.status).not.toBe('mine');
  });
});
