import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConflictError, ProjectNotFoundError } from '../src/api-client.js';
import { createProjectController } from '../src/project-controller.js';

type ApiMock = {
  create: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};

function makeApi(): ApiMock {
  return {
    create: vi.fn(),
    get: vi.fn(),
    update: vi.fn(),
  };
}

function makeOpts(overrides: Partial<Parameters<typeof createProjectController>[0]> = {}) {
  const api = overrides.api ?? makeApi();
  return {
    api,
    location: { pathname: '/wiremd/editor/', search: '', hash: '' },
    pushUrl: vi.fn(),
    onStateChange: vi.fn(),
    ...overrides,
  };
}

describe('createProjectController — mode detection', () => {
  it('starts in hash mode when no ?p= is present', () => {
    const ctrl = createProjectController(makeOpts());
    expect(ctrl.getMode()).toBe('hash');
    expect(ctrl.getProjectId()).toBe(null);
  });

  it('starts in project mode when ?p=<id> is present', () => {
    const ctrl = createProjectController(
      makeOpts({ location: { pathname: '/editor/', search: '?p=abc123', hash: '' } }),
    );
    expect(ctrl.getMode()).toBe('project');
    expect(ctrl.getProjectId()).toBe('abc123');
  });
});

describe('createProjectController — loadInitialContent', () => {
  it('returns null in hash mode (caller falls back to existing flow)', async () => {
    const ctrl = createProjectController(makeOpts());
    const result = await ctrl.loadInitialContent();
    expect(result).toBeNull();
  });

  it('fetches project content in project mode', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: '# from server',
      updatedAt: '2026-05-01T00:00:00.000Z',
    });

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );

    const result = await ctrl.loadInitialContent();
    expect(result).toEqual({ kind: 'loaded', content: '# from server' });
    expect(api.get).toHaveBeenCalledWith('abc');
  });

  it('returns a notFound result when the project does not exist', async () => {
    const api = makeApi();
    api.get.mockRejectedValueOnce(new ProjectNotFoundError('missing'));

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=missing', hash: '' } }),
    );

    const result = await ctrl.loadInitialContent();
    expect(result).toEqual({ kind: 'notFound', projectId: 'missing' });
  });

  it('returns an error result on transient failures', async () => {
    const api = makeApi();
    api.get.mockRejectedValueOnce(new Error('Request failed (500)'));

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );

    const result = await ctrl.loadInitialContent();
    expect(result?.kind).toBe('error');
    if (result?.kind === 'error') {
      expect(result.error).toMatch(/500/);
    }
  });
});

describe('createProjectController — save', () => {
  let onStateChange: ReturnType<typeof vi.fn>;
  let api: ApiMock;
  let ctrl: ReturnType<typeof createProjectController>;

  beforeEach(() => {
    onStateChange = vi.fn();
    api = makeApi();
    ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onStateChange,
      }),
    );
  });

  it('PUTs to the api and reports saving → saved', async () => {
    api.update.mockResolvedValueOnce({ updatedAt: '2026-05-01T00:00:00.000Z' });

    await ctrl.save('# v2');

    expect(api.update).toHaveBeenCalledWith('abc', '# v2');
    expect(onStateChange).toHaveBeenCalledWith('saving');
    expect(onStateChange).toHaveBeenCalledWith('saved');
  });

  it('reports error state when the save fails', async () => {
    api.update.mockRejectedValueOnce(new Error('boom'));

    await expect(ctrl.save('# v2')).rejects.toThrow();

    expect(onStateChange).toHaveBeenCalledWith('saving');
    expect(onStateChange).toHaveBeenCalledWith('error');
  });

  it('throws when called in hash mode (caller misuse)', async () => {
    const hashCtrl = createProjectController(makeOpts({ api }));
    await expect(hashCtrl.save('# v2')).rejects.toThrow(/hash mode/i);
  });
});

describe('createProjectController — save tracks lastKnownUpdatedAt', () => {
  it('sends baseUpdatedAt from the most recent successful load on subsequent saves', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: '# from server',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update.mockResolvedValueOnce({ updatedAt: '2026-05-01T10:00:01.000Z' });

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );
    await ctrl.loadInitialContent();

    await ctrl.save('# v2');

    expect(api.update).toHaveBeenCalledWith('abc', '# v2', '2026-05-01T10:00:00.000Z');
  });

  it('updates lastKnownUpdatedAt after a successful save', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: 'v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update
      .mockResolvedValueOnce({ updatedAt: '2026-05-01T10:00:01.000Z' })
      .mockResolvedValueOnce({ updatedAt: '2026-05-01T10:00:02.000Z' });

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );
    await ctrl.loadInitialContent();
    await ctrl.save('v1');
    await ctrl.save('v2');

    // The second save uses the updatedAt from the first save's response.
    expect(api.update).toHaveBeenNthCalledWith(2, 'abc', 'v2', '2026-05-01T10:00:01.000Z');
  });
});

describe('createProjectController — conflict on save', () => {
  it('fires onRemoteUpdate with the remote content + updatedAt', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: 'v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update.mockRejectedValueOnce(
      new ConflictError('# remote v1', '2026-05-01T10:00:30.000Z'),
    );

    const onRemoteUpdate = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate,
      }),
    );
    await ctrl.loadInitialContent();

    await expect(ctrl.save('# my v1')).resolves.toBeUndefined();

    expect(onRemoteUpdate).toHaveBeenCalledWith({
      content: '# remote v1',
      updatedAt: '2026-05-01T10:00:30.000Z',
      cause: 'conflict',
      attemptedContent: '# my v1',
    });
  });

  it('updates lastKnownUpdatedAt to the remote one after a conflict, so the next save is in sync', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: 'v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update
      .mockRejectedValueOnce(new ConflictError('remote', '2026-05-01T11:00:00.000Z'))
      .mockResolvedValueOnce({ updatedAt: '2026-05-01T11:00:01.000Z' });

    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate: vi.fn(),
      }),
    );
    await ctrl.loadInitialContent();
    await ctrl.save('mine');         // → conflict, controller adopts remote updatedAt
    await ctrl.save('next attempt'); // should send remote updatedAt as base

    expect(api.update).toHaveBeenNthCalledWith(2, 'abc', 'next attempt', '2026-05-01T11:00:00.000Z');
  });
});

describe('createProjectController — sync loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts polling at the given interval and fires onRemoteUpdate when remote is newer', async () => {
    const api = makeApi();
    api.get
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v0',
        updatedAt: '2026-05-01T10:00:00.000Z',
      })
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v1-remote',
        updatedAt: '2026-05-01T10:00:30.000Z',
      });

    const onRemoteUpdate = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate,
      }),
    );
    await ctrl.loadInitialContent();

    ctrl.startSyncLoop(10_000);
    await vi.advanceTimersByTimeAsync(10_000);

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(onRemoteUpdate).toHaveBeenCalledWith({
      content: 'v1-remote',
      updatedAt: '2026-05-01T10:00:30.000Z',
      cause: 'poll',
    });

    ctrl.stopSyncLoop();
  });

  it('does not fire onRemoteUpdate when remote updatedAt is unchanged', async () => {
    const api = makeApi();
    api.get
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v0',
        updatedAt: '2026-05-01T10:00:00.000Z',
      })
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v0',
        updatedAt: '2026-05-01T10:00:00.000Z',
      });

    const onRemoteUpdate = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate,
      }),
    );
    await ctrl.loadInitialContent();

    ctrl.startSyncLoop(10_000);
    await vi.advanceTimersByTimeAsync(10_000);

    expect(onRemoteUpdate).not.toHaveBeenCalled();
    ctrl.stopSyncLoop();
  });

  it('stops polling after stopSyncLoop()', async () => {
    const api = makeApi();
    api.get.mockResolvedValue({
      id: 'abc',
      content: 'v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });

    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate: vi.fn(),
      }),
    );
    await ctrl.loadInitialContent();

    ctrl.startSyncLoop(10_000);
    ctrl.stopSyncLoop();

    await vi.advanceTimersByTimeAsync(60_000);
    expect(api.get).toHaveBeenCalledTimes(1); // only the initial loadInitialContent
  });

  it('is a no-op in hash mode', () => {
    const api = makeApi();
    const ctrl = createProjectController(makeOpts({ api }));
    ctrl.startSyncLoop(10_000);
    // Should neither schedule nor poll. Advancing time does nothing.
    return vi.advanceTimersByTimeAsync(60_000).then(() => {
      expect(api.get).not.toHaveBeenCalled();
    });
  });
});

describe('createProjectController — promote', () => {
  it('POSTs content, updates URL via pushUrl, switches to project mode', async () => {
    const api = makeApi();
    api.create.mockResolvedValueOnce({
      id: 'new123',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });

    const opts = makeOpts({
      api,
      location: { pathname: '/wiremd/editor/', search: '', hash: '#code=stale' },
    });
    const ctrl = createProjectController(opts);

    const id = await ctrl.promote('# my wireframe');

    expect(id).toBe('new123');
    expect(api.create).toHaveBeenCalledWith('# my wireframe');
    expect(opts.pushUrl).toHaveBeenCalledWith('/wiremd/editor/?p=new123');
    expect(ctrl.getMode()).toBe('project');
    expect(ctrl.getProjectId()).toBe('new123');
  });

  it('adopts the updatedAt from the POST response so the next save uses it as base', async () => {
    const api = makeApi();
    api.create.mockResolvedValueOnce({
      id: 'new123',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update.mockResolvedValueOnce({ updatedAt: '2026-05-01T10:00:01.000Z' });

    const ctrl = createProjectController(makeOpts({ api }));
    await ctrl.promote('# created');
    await ctrl.save('# next edit');

    expect(api.update).toHaveBeenCalledWith(
      'new123',
      '# next edit',
      '2026-05-01T10:00:00.000Z',
    );
  });

  it('the first poll after promote does NOT fire onRemoteUpdate when nothing has actually changed remotely', async () => {
    vi.useFakeTimers();
    try {
      const api = makeApi();
      api.create.mockResolvedValueOnce({
        id: 'new123',
        updatedAt: '2026-05-01T10:00:00.000Z',
      });
      api.get.mockResolvedValueOnce({
        id: 'new123',
        content: '# created',
        updatedAt: '2026-05-01T10:00:00.000Z',
      });

      const onRemoteUpdate = vi.fn();
      const ctrl = createProjectController(makeOpts({ api, onRemoteUpdate }));
      await ctrl.promote('# created');

      ctrl.startSyncLoop(10_000);
      await vi.advanceTimersByTimeAsync(10_000);

      expect(onRemoteUpdate).not.toHaveBeenCalled();
      ctrl.stopSyncLoop();
    } finally {
      vi.useRealTimers();
    }
  });

  it('refuses to promote when already in project mode', async () => {
    const api = makeApi();
    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );

    await expect(ctrl.promote('# x')).rejects.toThrow(/already/i);
    expect(api.create).not.toHaveBeenCalled();
  });
});

describe('createProjectController — save short-circuits when content is unchanged', () => {
  it('after loadInitialContent, save with the same content does not call api.update', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: '# unchanged',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });

    const onStateChange = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onStateChange,
      }),
    );
    await ctrl.loadInitialContent();

    await ctrl.save('# unchanged');

    expect(api.update).not.toHaveBeenCalled();
    // Should still report saved so the UI doesn't get stuck in "saving".
    expect(onStateChange).toHaveBeenCalledWith('saved');
  });

  it('after promote, save with the same content does not call api.update', async () => {
    const api = makeApi();
    api.create.mockResolvedValueOnce({
      id: 'new123',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });

    const ctrl = createProjectController(makeOpts({ api }));
    await ctrl.promote('# x');
    await ctrl.save('# x');

    expect(api.update).not.toHaveBeenCalled();
  });

  it('save with new content DOES call api.update', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: '# v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update.mockResolvedValueOnce({ updatedAt: '2026-05-01T10:00:01.000Z' });

    const ctrl = createProjectController(
      makeOpts({ api, location: { pathname: '/editor/', search: '?p=abc', hash: '' } }),
    );
    await ctrl.loadInitialContent();
    await ctrl.save('# v1');

    expect(api.update).toHaveBeenCalledWith('abc', '# v1', '2026-05-01T10:00:00.000Z');
  });
});

describe('createProjectController — does not fire onRemoteUpdate due to its own save (race)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('a poll that fires while our save is in flight waits for the save before deciding', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: 'v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });

    // Save resolves slowly; while it's in flight a poll will land.
    let resolveUpdate: (v: { updatedAt: string }) => void = () => {};
    api.update.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveUpdate = resolve;
      }),
    );

    // The "remote" the poll sees is the result of our own save mid-flight.
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: 'v1-mine',
      updatedAt: '2026-05-01T10:00:01.000Z',
    });

    const onRemoteUpdate = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate,
      }),
    );
    await ctrl.loadInitialContent();

    // Kick off the save (does not await — leave it in flight).
    const savePromise = ctrl.save('v1-mine');

    // Now the poll fires.
    ctrl.startSyncLoop(10_000);
    await vi.advanceTimersByTimeAsync(10_000);

    // Resolve the save with the same updatedAt the poll saw.
    resolveUpdate({ updatedAt: '2026-05-01T10:00:01.000Z' });
    await savePromise;
    await Promise.resolve(); // flush microtasks

    expect(onRemoteUpdate).not.toHaveBeenCalled();
    ctrl.stopSyncLoop();
  });

  it('does not fire when remote content is identical to what we already have', async () => {
    const api = makeApi();
    api.get
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v0',
        updatedAt: '2026-05-01T10:00:00.000Z',
      })
      // Server bumped updatedAt (e.g. peer made an identical save) but content is unchanged.
      .mockResolvedValueOnce({
        id: 'abc',
        content: 'v0',
        updatedAt: '2026-05-01T10:00:30.000Z',
      });

    const onRemoteUpdate = vi.fn();
    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate,
      }),
    );
    await ctrl.loadInitialContent();

    ctrl.startSyncLoop(10_000);
    await vi.advanceTimersByTimeAsync(10_000);

    expect(onRemoteUpdate).not.toHaveBeenCalled();
    ctrl.stopSyncLoop();
  });
});

describe('createProjectController — lastKnownContent stays in sync after remote updates', () => {
  it('after a poll-applied remote update, save matching the new remote content is a no-op', async () => {
    vi.useFakeTimers();
    try {
      const api = makeApi();
      api.get
        .mockResolvedValueOnce({
          id: 'abc',
          content: '# v0',
          updatedAt: '2026-05-01T10:00:00.000Z',
        })
        .mockResolvedValueOnce({
          id: 'abc',
          content: '# v1-remote',
          updatedAt: '2026-05-01T10:00:30.000Z',
        });

      const ctrl = createProjectController(
        makeOpts({
          api,
          location: { pathname: '/editor/', search: '?p=abc', hash: '' },
          onRemoteUpdate: vi.fn(),
        }),
      );
      await ctrl.loadInitialContent();

      ctrl.startSyncLoop(10_000);
      await vi.advanceTimersByTimeAsync(10_000);
      ctrl.stopSyncLoop();

      // Now lastKnownContent should be '# v1-remote'. Saving the same content → no-op.
      await ctrl.save('# v1-remote');
      expect(api.update).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('after a conflict resolution, save matching the resolved remote content is a no-op', async () => {
    const api = makeApi();
    api.get.mockResolvedValueOnce({
      id: 'abc',
      content: '# v0',
      updatedAt: '2026-05-01T10:00:00.000Z',
    });
    api.update.mockRejectedValueOnce(
      new ConflictError('# remote', '2026-05-01T11:00:00.000Z'),
    );

    const ctrl = createProjectController(
      makeOpts({
        api,
        location: { pathname: '/editor/', search: '?p=abc', hash: '' },
        onRemoteUpdate: vi.fn(),
      }),
    );
    await ctrl.loadInitialContent();
    await ctrl.save('# my v1'); // conflict → controller adopts '# remote' as lastKnownContent

    await ctrl.save('# remote');
    // Only the first save attempt called update. The second was suppressed by the
    // unchanged-content short-circuit because lastKnownContent was set to '# remote'.
    expect(api.update).toHaveBeenCalledTimes(1);
  });
});
