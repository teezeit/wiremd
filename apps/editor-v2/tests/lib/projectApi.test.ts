import { describe, it, expect, vi, beforeEach } from 'vitest';

// Test that projectApi wraps the fetch calls correctly
// We test the shape/contract, not the network — that's tested in the API package

vi.stubGlobal('fetch', vi.fn());

import { getProjectLockInfo, lockProject, unlockProject, createProject } from '../../src/lib/projectApi';

const mockFetch = vi.mocked(fetch);

function ok(body: unknown) {
  return Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));
}

beforeEach(() => mockFetch.mockReset());

describe('getProjectLockInfo', () => {
  it('fetches GET /api/projects/:id and returns lock fields', async () => {
    mockFetch.mockResolvedValueOnce(ok({
      id: 'abc', content: '# Hi', updatedAt: '2026-01-01T00:00:00Z',
      lockedBy: 'xyz', lockedName: 'Red Bear', lastEditorName: 'Red Bear',
    }));
    const info = await getProjectLockInfo('abc');
    expect(info.lockedBy).toBe('xyz');
    expect(info.lockedName).toBe('Red Bear');
    expect(info.lastEditorName).toBe('Red Bear');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/projects/abc'), expect.anything());
  });
});

describe('lockProject', () => {
  it('posts to /api/projects/:id/lock with clientId and name', async () => {
    mockFetch.mockResolvedValueOnce(ok({ lockedBy: 'me', lockedName: 'Blue Fox' }));
    await lockProject('abc', 'me', 'Blue Fox');
    const [url, init] = mockFetch.mock.calls[0]!;
    expect(String(url)).toContain('/api/projects/abc/lock');
    expect((init as RequestInit).method).toBe('POST');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.clientId).toBe('me');
    expect(body.name).toBe('Blue Fox');
    expect(body.force).toBe(false);
  });

  it('sends force:true when stealing', async () => {
    mockFetch.mockResolvedValueOnce(ok({ lockedBy: 'me', lockedName: 'Blue Fox' }));
    await lockProject('abc', 'me', 'Blue Fox', true);
    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.force).toBe(true);
  });

  it('throws when server returns 409', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Locked' }), { status: 409 }));
    await expect(lockProject('abc', 'me', 'Blue Fox')).rejects.toThrow();
  });
});

describe('unlockProject', () => {
  it('sends DELETE to /api/projects/:id/lock', async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }));
    await unlockProject('abc', 'me');
    const [url, init] = mockFetch.mock.calls[0]!;
    expect(String(url)).toContain('/api/projects/abc/lock');
    expect((init as RequestInit).method).toBe('DELETE');
  });
});

describe('createProject', () => {
  it('posts to /api/projects with content', async () => {
    mockFetch.mockResolvedValueOnce(ok({ id: 'proj1', updatedAt: '2026-01-01T00:00:00Z' }));
    const result = await createProject('# Hello');
    const [url, init] = mockFetch.mock.calls[0]!;
    expect(String(url)).toContain('/api/projects');
    expect((init as RequestInit).method).toBe('POST');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.content).toBe('# Hello');
    expect(result.id).toBe('proj1');
  });
});
