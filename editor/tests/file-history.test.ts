import { beforeEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import {
  addToHistory,
  getRecentFiles,
  removeFromHistory,
  _resetDbForTesting,
} from '../src/file-history.js';
import type { WireFileHandle } from '../src/local-file.js';

function makeHandle(name: string): WireFileHandle {
  return {
    name,
    getFile: async () => ({ text: async () => '', lastModified: 0 }),
    createWritable: async () => ({ write: async () => {}, close: async () => {} }),
  };
}

beforeEach(() => {
  vi.stubGlobal('indexedDB', new IDBFactory());
  _resetDbForTesting();
});

describe('getRecentFiles', () => {
  it('returns an empty array when no history exists', async () => {
    expect(await getRecentFiles()).toEqual([]);
  });
});

describe('addToHistory', () => {
  it('stores a file and getRecentFiles returns it', async () => {
    const handle = makeHandle('wireframe.md');
    await addToHistory(handle, '/Users/tobias/Desktop/wireframe.md');

    const entries = await getRecentFiles();
    expect(entries).toHaveLength(1);
    expect(entries[0].path).toBe('/Users/tobias/Desktop/wireframe.md');
    expect(entries[0].name).toBe('wireframe.md');
    expect(entries[0].handle).toBe(handle);
  });

  it('returns entries sorted most-recent first', async () => {
    await addToHistory(makeHandle('a.md'), '/path/a.md');
    await addToHistory(makeHandle('b.md'), '/path/b.md');
    await addToHistory(makeHandle('c.md'), '/path/c.md');

    const entries = await getRecentFiles();
    expect(entries.map((e) => e.name)).toEqual(['c.md', 'b.md', 'a.md']);
  });

  it('re-adding the same path moves it to the top', async () => {
    const handleA = makeHandle('a.md');
    await addToHistory(handleA, '/path/a.md');
    await addToHistory(makeHandle('b.md'), '/path/b.md');
    await addToHistory(handleA, '/path/a.md');

    const entries = await getRecentFiles();
    expect(entries[0].path).toBe('/path/a.md');
    expect(entries).toHaveLength(2);
  });

  it('caps the list at 5 entries, dropping the oldest', async () => {
    for (let i = 1; i <= 6; i++) {
      await addToHistory(makeHandle(`file${i}.md`), `/path/file${i}.md`);
    }

    const entries = await getRecentFiles();
    expect(entries).toHaveLength(5);
    expect(entries.map((e) => e.name)).not.toContain('file1.md');
    expect(entries[0].name).toBe('file6.md');
  });
});

describe('removeFromHistory', () => {
  it('removes the entry with the given path', async () => {
    await addToHistory(makeHandle('a.md'), '/path/a.md');
    await addToHistory(makeHandle('b.md'), '/path/b.md');

    await removeFromHistory('/path/a.md');

    const entries = await getRecentFiles();
    expect(entries).toHaveLength(1);
    expect(entries[0].path).toBe('/path/b.md');
  });

  it('is a no-op when the path does not exist', async () => {
    await addToHistory(makeHandle('a.md'), '/path/a.md');
    await removeFromHistory('/path/nonexistent.md');
    expect(await getRecentFiles()).toHaveLength(1);
  });
});
