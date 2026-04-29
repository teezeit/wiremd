/** wiremd Editor - recent file history via IndexedDB */

import type { WireFileHandle } from './local-file.js';

export interface FileHistoryEntry {
  path: string;
  name: string;
  handle: WireFileHandle | null; // null when loaded from IDB after a page reload
  openedAt: number;
}

interface StoredEntry {
  path: string;
  name: string;
  openedAt: number;
}

const DB_NAME = 'wiremd-editor';
const STORE = 'file-history';
const MAX_ENTRIES = 5;

// Handles are not serializable by structuredClone in all environments, so we
// keep them in memory only. Cross-session entries have handle === null; the
// caller falls back to showing a file picker.
const handleCache = new Map<string, WireFileHandle>();

let dbPromise: Promise<IDBDatabase> | null = null;
let tick = 0;

export function _resetDbForTesting(): void {
  dbPromise = null;
  handleCache.clear();
  tick = 0;
}

function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const store = req.result.createObjectStore(STORE, { keyPath: 'path' });
        store.createIndex('openedAt', 'openedAt');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

function idbRequest<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getRecentFiles(): Promise<FileHistoryEntry[]> {
  const db = await getDb();
  const t = db.transaction(STORE, 'readonly');
  const all = await idbRequest<StoredEntry[]>(t.objectStore(STORE).index('openedAt').getAll());
  return all
    .sort((a, b) => b.openedAt - a.openedAt)
    .map((e) => ({ ...e, handle: handleCache.get(e.path) ?? null }));
}

export async function addToHistory(handle: WireFileHandle, path: string): Promise<void> {
  handleCache.set(path, handle);

  const db = await getDb();
  const entry: StoredEntry = { path, name: handle.name, openedAt: Date.now() + tick++ };

  await new Promise<void>((resolve, reject) => {
    const t = db.transaction(STORE, 'readwrite');
    t.objectStore(STORE).put(entry);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });

  const all = await getRecentFiles();
  if (all.length > MAX_ENTRIES) {
    const toDelete = all.slice(MAX_ENTRIES);
    await Promise.all(
      toDelete.map(
        (e) =>
          new Promise<void>((resolve, reject) => {
            const t = db.transaction(STORE, 'readwrite');
            t.objectStore(STORE).delete(e.path);
            t.oncomplete = () => resolve();
            t.onerror = () => reject(t.error);
          }),
      ),
    );
  }
}

export async function removeFromHistory(path: string): Promise<void> {
  handleCache.delete(path);
  const db = await getDb();
  await new Promise<void>((resolve, reject) => {
    const t = db.transaction(STORE, 'readwrite');
    t.objectStore(STORE).delete(path);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}
