export interface WireFileInfo {
  text(): Promise<string>;
  lastModified: number;
}

export interface WireFileWritable {
  write(content: string): Promise<void>;
  close(): Promise<void>;
}

export interface WireFileHandle {
  name: string;
  getFile(): Promise<WireFileInfo>;
  createWritable(): Promise<WireFileWritable>;
}

export type ShowOpenPicker = (opts?: {
  types?: Array<{ description?: string; accept: Record<string, string[]> }>;
  mode?: string;
}) => Promise<WireFileHandle[]>;

export type ShowSavePicker = (opts?: {
  suggestedName?: string;
  types?: Array<{ description?: string; accept: Record<string, string[]> }>;
}) => Promise<WireFileHandle>;

export interface LocalFileResult {
  handle: WireFileHandle;
  content: string;
  lastModified: number;
}

const MD_TYPE = { types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }] };

export function isFileSystemAccessSupported(): boolean {
  const w = window as unknown as Record<string, unknown>;
  return typeof w.showOpenFilePicker === 'function' && typeof w.showSaveFilePicker === 'function';
}

function isAbort(e: unknown): boolean {
  return e instanceof Error && e.name === 'AbortError';
}

export async function openLocalFile(picker: ShowOpenPicker): Promise<LocalFileResult | null> {
  try {
    const [handle] = await picker({ ...MD_TYPE, mode: 'readwrite' });
    const file = await handle.getFile();
    return { handle, content: await file.text(), lastModified: file.lastModified };
  } catch (e) {
    if (isAbort(e)) return null;
    throw e;
  }
}

export async function saveAsLocalFile(
  picker: ShowSavePicker,
  content: string,
  suggestedName = 'wireframe.md',
): Promise<LocalFileResult | null> {
  try {
    const handle = await picker({ suggestedName, ...MD_TYPE });
    await writeFile(handle, content);
    const file = await handle.getFile();
    return { handle, content, lastModified: file.lastModified };
  } catch (e) {
    if (isAbort(e)) return null;
    throw e;
  }
}

export async function writeFile(handle: WireFileHandle, content: string): Promise<void> {
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}
