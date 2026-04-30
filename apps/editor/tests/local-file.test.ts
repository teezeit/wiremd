import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isFileSystemAccessSupported,
  openLocalFile,
  saveAsLocalFile,
  watchFile,
  writeFile,
} from '../src/local-file.js';
import type { WireFileHandle } from '../src/local-file.js';

// --- isFileSystemAccessSupported ---

describe('isFileSystemAccessSupported', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true when both picker APIs are present', () => {
    vi.stubGlobal('window', { showOpenFilePicker: vi.fn(), showSaveFilePicker: vi.fn() });
    expect(isFileSystemAccessSupported()).toBe(true);
  });

  it('returns false when showOpenFilePicker is absent', () => {
    vi.stubGlobal('window', { showSaveFilePicker: vi.fn() });
    expect(isFileSystemAccessSupported()).toBe(false);
  });

  it('returns false when showSaveFilePicker is absent', () => {
    vi.stubGlobal('window', { showOpenFilePicker: vi.fn() });
    expect(isFileSystemAccessSupported()).toBe(false);
  });

  it('returns false when window has neither API (Firefox)', () => {
    vi.stubGlobal('window', {});
    expect(isFileSystemAccessSupported()).toBe(false);
  });
});

function makeFile(content: string, lastModified: number) {
  return { text: async () => content, lastModified };
}

function makeMutableHandle(initial: { content: string; lastModified: number }) {
  let state = { ...initial };
  const writeCalls: string[] = [];
  const closeCalls: number[] = [];

  const handle: WireFileHandle = {
    name: 'test.md',
    getFile: async () => makeFile(state.content, state.lastModified),
    createWritable: async () => ({
      write: async (c: string) => {
        writeCalls.push(c);
      },
      close: async () => {
        closeCalls.push(1);
      },
    }),
  };

  return {
    handle,
    update: (next: { content: string; lastModified: number }) => {
      state = { ...next };
    },
    writeCalls,
    closeCalls,
  };
}

// --- openLocalFile ---

describe('openLocalFile', () => {
  it('calls showOpenPicker with readwrite mode and .md type', async () => {
    const { handle } = makeMutableHandle({ content: '# Hi', lastModified: 1000 });
    const picker = vi.fn().mockResolvedValue([handle]);

    await openLocalFile(picker);

    expect(picker).toHaveBeenCalledWith({
      types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }],
      mode: 'readwrite',
    });
  });

  it('returns handle, content, and lastModified', async () => {
    const { handle } = makeMutableHandle({ content: '# Hi', lastModified: 1234 });
    const picker = vi.fn().mockResolvedValue([handle]);

    const result = await openLocalFile(picker);

    expect(result).toEqual({ handle, content: '# Hi', lastModified: 1234 });
  });

  it('returns null when user cancels (AbortError)', async () => {
    const err = Object.assign(new Error('User aborted'), { name: 'AbortError' });
    const picker = vi.fn().mockRejectedValue(err);

    expect(await openLocalFile(picker)).toBeNull();
  });

  it('rethrows unexpected errors', async () => {
    const picker = vi.fn().mockRejectedValue(new Error('Permission denied'));

    await expect(openLocalFile(picker)).rejects.toThrow('Permission denied');
  });
});

// --- saveAsLocalFile ---

describe('saveAsLocalFile', () => {
  it('calls showSavePicker with suggestedName and .md type', async () => {
    const { handle } = makeMutableHandle({ content: '', lastModified: 1000 });
    const picker = vi.fn().mockResolvedValue(handle);

    await saveAsLocalFile(picker, '# content');

    expect(picker).toHaveBeenCalledWith({
      suggestedName: 'wireframe.md',
      types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }],
    });
  });

  it('writes current editor content to the new file', async () => {
    const { handle, writeCalls } = makeMutableHandle({ content: '', lastModified: 1000 });
    const picker = vi.fn().mockResolvedValue(handle);

    await saveAsLocalFile(picker, '# My wireframe');

    expect(writeCalls).toEqual(['# My wireframe']);
  });

  it('returns handle, content, and lastModified', async () => {
    const { handle } = makeMutableHandle({ content: '', lastModified: 2000 });
    const picker = vi.fn().mockResolvedValue(handle);

    const result = await saveAsLocalFile(picker, '# content');

    expect(result).toEqual({ handle, content: '# content', lastModified: 2000 });
  });

  it('returns null when user cancels', async () => {
    const err = Object.assign(new Error(''), { name: 'AbortError' });
    const picker = vi.fn().mockRejectedValue(err);

    expect(await saveAsLocalFile(picker, '# hi')).toBeNull();
  });

  it('rethrows unexpected errors', async () => {
    const picker = vi.fn().mockRejectedValue(new Error('Disk full'));

    await expect(saveAsLocalFile(picker, '# x')).rejects.toThrow('Disk full');
  });
});

// --- writeFile ---

describe('writeFile', () => {
  it('creates a writable, writes content, and closes', async () => {
    const { handle, writeCalls, closeCalls } = makeMutableHandle({ content: '', lastModified: 1000 });

    await writeFile(handle, 'new content');

    expect(writeCalls).toEqual(['new content']);
    expect(closeCalls).toHaveLength(1);
  });
});

// --- watchFile ---

describe('watchFile', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls onChange when lastModified changes', async () => {
    const { handle, update } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });
    update({ content: '# v2', lastModified: 2000 });
    await vi.advanceTimersByTimeAsync(500);

    expect(onChange).toHaveBeenCalledWith('# v2');
  });

  it('does not call onChange when lastModified is unchanged', async () => {
    const { handle } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });
    await vi.advanceTimersByTimeAsync(1500);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('stop() prevents further onChange calls', async () => {
    const { handle, update } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    const { stop } = watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });
    stop();

    update({ content: '# v2', lastModified: 2000 });
    await vi.advanceTimersByTimeAsync(1000);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not fire on first tick if initialLastModified matches', async () => {
    const { handle } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });
    await vi.advanceTimersByTimeAsync(499);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('picks up changes on subsequent ticks after no-change ticks', async () => {
    const { handle, update } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });

    await vi.advanceTimersByTimeAsync(500); // tick 1: no change
    expect(onChange).not.toHaveBeenCalled();

    update({ content: '# v2', lastModified: 2000 });
    await vi.advanceTimersByTimeAsync(500); // tick 2: change detected

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('# v2');
  });

  it('silently continues polling when getFile throws', async () => {
    let callCount = 0;
    const handle: WireFileHandle = {
      name: 'test.md',
      getFile: async () => {
        callCount++;
        if (callCount === 1) throw new Error('IO error');
        return makeFile('# recovered', 2000);
      },
      createWritable: async () => ({ write: async () => {}, close: async () => {} }),
    };
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });

    await vi.advanceTimersByTimeAsync(1000); // 2 ticks: first throws, second recovers

    expect(onChange).toHaveBeenCalledWith('# recovered');
  });

  it('setLastSeen() prevents a spurious re-fire after a write-back', async () => {
    const { handle, update } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    const watcher = watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });

    // Simulate: Claude edits file (lastModified 2000), watcher fires, editor writes back
    update({ content: '# v2', lastModified: 2000 });
    await vi.advanceTimersByTimeAsync(500); // onChange fires with '# v2'

    // Simulate write-back: editor writes, file gets new lastModified 2001
    update({ content: '# v2', lastModified: 2001 });
    watcher.setLastSeen(2001); // tell watcher to skip this timestamp

    await vi.advanceTimersByTimeAsync(500); // should NOT fire again

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('# v2');
  });

  it('calls onChange on every distinct lastModified change', async () => {
    const { handle, update } = makeMutableHandle({ content: '# v1', lastModified: 1000 });
    const onChange = vi.fn();

    watchFile(handle, onChange, { intervalMs: 500, initialLastModified: 1000 });

    update({ content: '# v2', lastModified: 2000 });
    await vi.advanceTimersByTimeAsync(500);

    update({ content: '# v3', lastModified: 3000 });
    await vi.advanceTimersByTimeAsync(500);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, '# v2');
    expect(onChange).toHaveBeenNthCalledWith(2, '# v3');
  });
});
