/**
 * Owns the editor's "where does content live?" decision and the I/O around it.
 *
 * Mode is driven by URL shape (see ./mode.js): ?p=<id> → project; otherwise hash.
 * In project mode, content is fetched from the API and saves go back via PUT.
 * In hash mode, this controller stays out of the way — the existing
 * `url-share` flow keeps working unchanged.
 *
 * Concurrency: each save sends `lastKnownUpdatedAt` (the server's updatedAt
 * when we last loaded or saved). If the server has moved on, it returns 409
 * with the current state, which we surface via `onRemoteUpdate`. A polling
 * loop closes the gap for idle viewers — same callback fires on remote-newer.
 *
 * Debouncing of saves is intentionally NOT done here. The caller wraps `.save()`
 * with whatever debounce strategy fits the editor's onChange.
 */

import { ConflictError, ProjectNotFoundError } from './api-client.js';
import { buildProjectUrl, parseProjectId, type EditorMode } from './mode.js';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export type ControllerApi = {
  create(content: string): Promise<{ id: string; updatedAt: string }>;
  get(id: string): Promise<{ id: string; content: string; updatedAt: string }>;
  update(
    id: string,
    content: string,
    baseUpdatedAt?: string,
  ): Promise<{ updatedAt: string }>;
};

export type LocationLike = {
  pathname: string;
  search: string;
  hash: string;
};

export type RemoteUpdate = {
  content: string;
  updatedAt: string;
  cause: 'poll' | 'conflict';
  /** Local content the user tried to save but the server rejected. Only set when cause === 'conflict'. */
  attemptedContent?: string;
};

export type ProjectControllerOptions = {
  api: ControllerApi;
  location: LocationLike;
  pushUrl: (url: string) => void;
  onStateChange?: (state: SaveState) => void;
  onRemoteUpdate?: (remote: RemoteUpdate) => void;
};

export type LoadResult =
  | { kind: 'loaded'; content: string }
  | { kind: 'notFound'; projectId: string }
  | { kind: 'error'; error: string };

export type ProjectController = {
  getMode(): EditorMode;
  getProjectId(): string | null;
  loadInitialContent(): Promise<LoadResult | null>;
  save(content: string): Promise<void>;
  promote(content: string): Promise<string>;
  startSyncLoop(intervalMs: number): void;
  stopSyncLoop(): void;
};

export function createProjectController(opts: ProjectControllerOptions): ProjectController {
  let projectId = parseProjectId(opts.location.search);
  let mode: EditorMode = projectId ? 'project' : 'hash';
  // Server's view of (updatedAt, content) at our last sync point. Both are
  // updated together — keeping them paired avoids stale comparisons.
  let lastKnownUpdatedAt: string | null = null;
  let lastKnownContent: string | null = null;
  let syncTimer: ReturnType<typeof setInterval> | null = null;
  let inflightPoll = false;
  // While a save is in flight we hold its promise so a racing poll can wait
  // for it before checking updatedAt — otherwise the poll's GET sees the
  // post-save state but our local lastKnownUpdatedAt is still pre-save, and
  // we'd toast our own save as if it were a remote update.
  let inflightSave: Promise<unknown> | null = null;

  const setState = (state: SaveState) => opts.onStateChange?.(state);

  const pollOnce = async () => {
    if (mode !== 'project' || !projectId) return;
    if (inflightPoll) return;
    inflightPoll = true;
    try {
      const remote = await opts.api.get(projectId);
      // If a save was racing the poll, wait for it to land — otherwise the
      // poll's view of remote.updatedAt is "post-save" while
      // lastKnownUpdatedAt is "pre-save", and we'd misread our own save as
      // a remote update.
      if (inflightSave) {
        try {
          await inflightSave;
        } catch {
          /* save's caller handles its own errors */
        }
      }

      const updatedAtChanged = remote.updatedAt !== lastKnownUpdatedAt;
      const contentChanged = remote.content !== lastKnownContent;

      if (updatedAtChanged) {
        const wasBootstrap = lastKnownUpdatedAt === null;
        lastKnownUpdatedAt = remote.updatedAt;
        lastKnownContent = remote.content;
        // Don't fire if:
        //  - we're bootstrapping (just adopting the baseline)
        //  - the content didn't actually change (peer made an identical save,
        //    or this is our own save round-tripping back)
        if (!wasBootstrap && contentChanged) {
          opts.onRemoteUpdate?.({
            content: remote.content,
            updatedAt: remote.updatedAt,
            cause: 'poll',
          });
        }
      }
    } catch {
      // Transient errors are silent — next tick retries.
    } finally {
      inflightPoll = false;
    }
  };

  return {
    getMode: () => mode,
    getProjectId: () => projectId,

    async loadInitialContent(): Promise<LoadResult | null> {
      if (mode !== 'project' || !projectId) return null;

      try {
        const project = await opts.api.get(projectId);
        lastKnownUpdatedAt = project.updatedAt;
        lastKnownContent = project.content;
        return { kind: 'loaded', content: project.content };
      } catch (err) {
        if (err instanceof ProjectNotFoundError) {
          return { kind: 'notFound', projectId };
        }
        return { kind: 'error', error: err instanceof Error ? err.message : String(err) };
      }
    },

    async save(content: string): Promise<void> {
      if (mode !== 'project' || !projectId) {
        throw new Error('save() called in hash mode — caller should not do this');
      }
      // Don't bother the network if the editor's content is exactly what the
      // server has. This is the most important guard against the "phantom save
      // → phantom update notification" loop seen by other clients.
      if (content === lastKnownContent) {
        setState('saved');
        return;
      }
      const projectIdSnapshot = projectId;
      setState('saving');
      const work = (async () => {
        try {
          // Only pass baseUpdatedAt when we have one.
          const result = lastKnownUpdatedAt
            ? await opts.api.update(projectIdSnapshot, content, lastKnownUpdatedAt)
            : await opts.api.update(projectIdSnapshot, content);
          lastKnownUpdatedAt = result.updatedAt;
          lastKnownContent = content;
          setState('saved');
        } catch (err) {
          if (err instanceof ConflictError) {
            lastKnownUpdatedAt = err.remoteUpdatedAt;
            lastKnownContent = err.remoteContent;
            opts.onRemoteUpdate?.({
              content: err.remoteContent,
              updatedAt: err.remoteUpdatedAt,
              cause: 'conflict',
              attemptedContent: content,
            });
            setState('saved');
            return;
          }
          setState('error');
          throw err;
        }
      })();

      inflightSave = work;
      try {
        await work;
      } finally {
        if (inflightSave === work) inflightSave = null;
      }
    },

    async promote(content: string): Promise<string> {
      if (mode === 'project') {
        throw new Error('promote() called when already in project mode');
      }
      const { id, updatedAt } = await opts.api.create(content);
      projectId = id;
      mode = 'project';
      lastKnownUpdatedAt = updatedAt;
      lastKnownContent = content;
      opts.pushUrl(buildProjectUrl(opts.location.pathname, id));
      return id;
    },

    startSyncLoop(intervalMs: number): void {
      if (mode !== 'project' || !projectId) return;
      if (syncTimer) return;
      syncTimer = setInterval(() => {
        void pollOnce();
      }, intervalMs);
    },

    stopSyncLoop(): void {
      if (syncTimer) {
        clearInterval(syncTimer);
        syncTimer = null;
      }
    },
  };
}
