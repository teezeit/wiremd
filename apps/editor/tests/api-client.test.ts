import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ConflictError,
  ProjectNotFoundError,
  createProject,
  getProject,
  updateProject,
} from '../src/api-client.js';

const BASE = 'http://localhost:3030';

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('createProject', () => {
  it('POSTs JSON content to /api/projects and returns the id + updatedAt', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { id: 'V1StGXR8_Z5jdHi6B-myT', updatedAt: '2026-05-01T00:00:00.000Z' },
        201,
      ),
    );

    const result = await createProject(BASE, '# hello');

    expect(result).toEqual({
      id: 'V1StGXR8_Z5jdHi6B-myT',
      updatedAt: '2026-05-01T00:00:00.000Z',
    });
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/api/projects`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'content-type': 'application/json' }),
        body: JSON.stringify({ content: '# hello' }),
      }),
    );
  });

  it('throws on non-2xx', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }));
    await expect(createProject(BASE, '# x')).rejects.toThrow(/500/);
  });

  it('throws on validation failure (400)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'Validation error' }, 400));
    await expect(createProject(BASE, '')).rejects.toThrow();
  });

  it('throws on payload too large (413)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'Payload too large' }, 413));
    await expect(createProject(BASE, 'x'.repeat(10))).rejects.toThrow(/413/);
  });
});

describe('getProject', () => {
  it('GETs /api/projects/<id> and returns the project', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        id: 'abc',
        content: '# hello',
        updatedAt: '2026-05-01T00:00:00.000Z',
      }),
    );

    const result = await getProject(BASE, 'abc');

    expect(result).toEqual({
      id: 'abc',
      content: '# hello',
      updatedAt: '2026-05-01T00:00:00.000Z',
    });
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/api/projects/abc`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('throws ProjectNotFoundError on 404', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }));
    await expect(getProject(BASE, 'missing')).rejects.toBeInstanceOf(ProjectNotFoundError);
  });

  it('ProjectNotFoundError carries the requested id', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }));
    try {
      await getProject(BASE, 'missing');
      expect.fail('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ProjectNotFoundError);
      expect((err as ProjectNotFoundError).projectId).toBe('missing');
    }
  });

  it('throws on other non-2xx errors', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }));
    await expect(getProject(BASE, 'abc')).rejects.toThrow(/500/);
  });
});

describe('updateProject', () => {
  it('PUTs JSON content to /api/projects/<id> and returns updatedAt', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ updatedAt: '2026-05-01T01:02:03.000Z' }),
    );

    const result = await updateProject(BASE, 'abc', '# v2');

    expect(result).toEqual({ updatedAt: '2026-05-01T01:02:03.000Z' });
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/api/projects/abc`,
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({ 'content-type': 'application/json' }),
        body: JSON.stringify({ content: '# v2' }),
      }),
    );
  });

  it('passes baseUpdatedAt through when provided', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ updatedAt: 'X' }));

    await updateProject(BASE, 'abc', '# v2', '2026-05-01T00:00:00.000Z');

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/api/projects/abc`,
      expect.objectContaining({
        body: JSON.stringify({
          content: '# v2',
          baseUpdatedAt: '2026-05-01T00:00:00.000Z',
        }),
      }),
    );
  });

  it('throws ProjectNotFoundError on 404', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }));
    await expect(updateProject(BASE, 'missing', '# x')).rejects.toBeInstanceOf(
      ProjectNotFoundError,
    );
  });

  it('throws ConflictError on 409 with the remote content + updatedAt', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { content: '# remote', updatedAt: '2026-05-01T05:00:00.000Z' },
        409,
      ),
    );

    try {
      await updateProject(BASE, 'abc', '# mine', '2026-05-01T00:00:00.000Z');
      expect.fail('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ConflictError);
      expect((err as ConflictError).remoteContent).toBe('# remote');
      expect((err as ConflictError).remoteUpdatedAt).toBe('2026-05-01T05:00:00.000Z');
    }
  });

  it('throws on payload too large (413)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'Payload too large' }, 413));
    await expect(updateProject(BASE, 'abc', 'x')).rejects.toThrow(/413/);
  });
});

describe('base URL handling', () => {
  it('strips a trailing slash on the base URL so paths join cleanly', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'abc' }, 201));
    await createProject('http://localhost:3030/', '# x');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3030/api/projects',
      expect.anything(),
    );
  });

  it('works with an empty base URL (same-origin)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'abc' }, 201));
    await createProject('', '# x');
    expect(fetchMock).toHaveBeenCalledWith('/api/projects', expect.anything());
  });
});
