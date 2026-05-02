/**
 * Editor mode is determined by URL shape:
 *   ?p=<id>   → "project"  — content is server-backed, GET/PUT via API.
 *   anything else → "hash" — content lives in window.location.hash via lz-string.
 */

export type EditorMode = 'project' | 'hash';

const PROJECT_PARAM = 'p';

export function parseProjectId(input: string): string | null {
  // Accept full URLs, relative URLs, or just a search/hash string.
  let search: string;
  if (input.includes('?')) {
    search = input.slice(input.indexOf('?'));
  } else if (input.startsWith('?')) {
    search = input;
  } else {
    return null;
  }
  const params = new URLSearchParams(search.split('#')[0]);
  const id = params.get(PROJECT_PARAM);
  return id && id.length > 0 ? id : null;
}

export function resolveMode(input: string): EditorMode {
  return parseProjectId(input) ? 'project' : 'hash';
}

export function buildProjectUrl(pathname: string, projectId: string): string {
  return `${pathname}?${PROJECT_PARAM}=${encodeURIComponent(projectId)}`;
}
