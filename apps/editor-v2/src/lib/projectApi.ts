const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? '';

export interface ProjectLockInfo {
  lockedBy: string | null;
  lockedName: string | null;
  lastEditorName: string | null;
  updatedAt: string;
}

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getProjectLockInfo(id: string): Promise<ProjectLockInfo> {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return json<ProjectLockInfo>(res);
}

export async function lockProject(
  id: string,
  clientId: string,
  name: string,
  force = false,
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/projects/${id}/lock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId, name, force }),
  });
  await json(res);
}

export async function unlockProject(id: string, clientId: string): Promise<void> {
  await fetch(`${API_BASE}/api/projects/${id}/lock`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });
}
