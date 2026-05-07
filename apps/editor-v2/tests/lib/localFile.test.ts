import { describe, it, expect, vi } from 'vitest';
import {
  isFileSystemAccessSupported,
  openLocalFile,
  saveAsLocalFile,
  writeFile,
} from '../../src/lib/localFile';
import type { WireFileHandle } from '../../src/lib/localFile';

function makeFakeHandle(content = 'hello', name = 'test.md'): WireFileHandle {
  const writable = {
    write: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
  };
  return {
    name,
    getFile: vi.fn().mockResolvedValue({ text: () => Promise.resolve(content), lastModified: 1000 }),
    createWritable: vi.fn().mockResolvedValue(writable),
  };
}

describe('isFileSystemAccessSupported', () => {
  it('returns true when both pickers are available', () => {
    const w = window as Record<string, unknown>;
    w.showOpenFilePicker = vi.fn();
    w.showSaveFilePicker = vi.fn();
    expect(isFileSystemAccessSupported()).toBe(true);
    delete w.showOpenFilePicker;
    delete w.showSaveFilePicker;
  });

  it('returns false when pickers are absent', () => {
    const w = window as Record<string, unknown>;
    delete w.showOpenFilePicker;
    delete w.showSaveFilePicker;
    expect(isFileSystemAccessSupported()).toBe(false);
  });
});

describe('openLocalFile', () => {
  it('returns file result on success', async () => {
    const handle = makeFakeHandle('# Hello', 'notes.md');
    const picker = vi.fn().mockResolvedValue([handle]);
    const result = await openLocalFile(picker);
    expect(result).not.toBeNull();
    expect(result!.content).toBe('# Hello');
    expect(result!.handle.name).toBe('notes.md');
  });

  it('returns null when user aborts', async () => {
    const picker = vi.fn().mockRejectedValue(Object.assign(new Error(), { name: 'AbortError' }));
    expect(await openLocalFile(picker)).toBeNull();
  });

  it('re-throws non-abort errors', async () => {
    const picker = vi.fn().mockRejectedValue(new Error('permission denied'));
    await expect(openLocalFile(picker)).rejects.toThrow('permission denied');
  });
});

describe('saveAsLocalFile', () => {
  it('returns file result with correct content', async () => {
    const handle = makeFakeHandle('saved', 'out.md');
    const picker = vi.fn().mockResolvedValue(handle);
    const result = await saveAsLocalFile(picker, 'saved');
    expect(result).not.toBeNull();
    expect(result!.content).toBe('saved');
  });

  it('returns null when user aborts', async () => {
    const picker = vi.fn().mockRejectedValue(Object.assign(new Error(), { name: 'AbortError' }));
    expect(await saveAsLocalFile(picker, 'content')).toBeNull();
  });
});

describe('writeFile', () => {
  it('calls write and close on the writable', async () => {
    const handle = makeFakeHandle();
    await writeFile(handle, 'new content');
    const writable = await (handle.createWritable as ReturnType<typeof vi.fn>).mock.results[0].value;
    expect(writable.write).toHaveBeenCalledWith('new content');
    expect(writable.close).toHaveBeenCalled();
  });
});
