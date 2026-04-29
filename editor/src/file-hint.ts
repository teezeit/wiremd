/** wiremd Editor - ?file= URL hint parsing */

export function basenameFromPath(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  return parts.filter(Boolean).pop() ?? filePath;
}

export function parseFileHint(search: string): string | null {
  if (!search) return null;
  try {
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    const value = params.get('file');
    return value || null;
  } catch {
    return null;
  }
}
