/**
 * Thin fetch wrappers around the wiremd collab API.
 * Pure functions — no implicit state, no module-level base URL — so tests
 * can drive them with vi.stubGlobal('fetch', ...).
 */

export class ProjectNotFoundError extends Error {
  readonly projectId: string;
  constructor(projectId: string) {
    super(`Project not found: ${projectId}`);
    this.name = 'ProjectNotFoundError';
    this.projectId = projectId;
  }
}

export class ConflictError extends Error {
  readonly remoteContent: string;
  readonly remoteUpdatedAt: string;
  constructor(remoteContent: string, remoteUpdatedAt: string) {
    super('Project was updated by another editor');
    this.name = 'ConflictError';
    this.remoteContent = remoteContent;
    this.remoteUpdatedAt = remoteUpdatedAt;
  }
}

export type Project = {
  id: string;
  content: string;
  updatedAt: string;
};

export type CreateResult = { id: string; updatedAt: string };
export type UpdateResult = { updatedAt: string };

function joinUrl(baseUrl: string, path: string): string {
  if (!baseUrl) return path;
  return baseUrl.replace(/\/+$/, '') + path;
}

async function failOnNonOk(res: Response, projectId?: string): Promise<void> {
  if (res.ok) return;
  if (res.status === 404 && projectId) {
    throw new ProjectNotFoundError(projectId);
  }
  let detail = '';
  try {
    const body = (await res.json()) as { error?: string };
    if (body?.error) detail = ` — ${body.error}`;
  } catch {
    /* body wasn't JSON; ignore */
  }
  throw new Error(`Request failed (${res.status})${detail}`);
}

export async function createProject(
  baseUrl: string,
  content: string,
): Promise<CreateResult> {
  const res = await fetch(joinUrl(baseUrl, '/api/projects'), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  await failOnNonOk(res);
  return (await res.json()) as CreateResult;
}

export async function getProject(baseUrl: string, id: string): Promise<Project> {
  const res = await fetch(joinUrl(baseUrl, `/api/projects/${id}`), {
    method: 'GET',
  });
  await failOnNonOk(res, id);
  return (await res.json()) as Project;
}

export async function updateProject(
  baseUrl: string,
  id: string,
  content: string,
  baseUpdatedAt?: string,
): Promise<UpdateResult> {
  const body: Record<string, unknown> = { content };
  if (baseUpdatedAt) body.baseUpdatedAt = baseUpdatedAt;

  const res = await fetch(joinUrl(baseUrl, `/api/projects/${id}`), {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    const conflict = (await res.json()) as { content: string; updatedAt: string };
    throw new ConflictError(conflict.content, conflict.updatedAt);
  }
  await failOnNonOk(res, id);
  return (await res.json()) as UpdateResult;
}
