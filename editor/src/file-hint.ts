/** wiremd Editor - ?file= URL hint parsing and construction */

type WellKnownDir = 'desktop' | 'documents' | 'downloads' | 'pictures' | 'music' | 'videos';

const WELL_KNOWN: WellKnownDir[] = ['desktop', 'documents', 'downloads', 'pictures', 'music', 'videos'];

export function startInFromPath(filePath: string): WellKnownDir | undefined {
  const parts = filePath.split(/[/\\]/);
  for (const part of parts) {
    const lower = part.toLowerCase() as WellKnownDir;
    if (WELL_KNOWN.includes(lower)) return lower;
  }
  return undefined;
}

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

/**
 * Builds a wiremd editor URL with the local file path safely encoded.
 * Uses URLSearchParams.set() which calls encodeURIComponent internally,
 * correctly handling spaces, +, #, &, Unicode, and all other special chars.
 */
export function buildFileHintUrl(baseUrl: string, filePath: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set('file', filePath);
  return url.toString();
}
