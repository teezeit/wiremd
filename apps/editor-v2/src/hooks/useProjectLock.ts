import { useCallback, useEffect, useRef, useState } from 'react';
import { getProjectLockInfo, lockProject, unlockProject } from '../lib/projectApi';

export type LockStatus = 'solo' | 'unlocked' | 'mine' | 'taken';

export interface LockState {
  status: LockStatus;
  lockedByName: string | null;
  lastEditorName: string | null;
  lastEditedAt: string | null;
}

interface Opts {
  projectId: string | null;
  sessionId: string;
  name: string;
  onStolen: (byName: string) => void;
}

const POLL_MS = 2000;

export function useProjectLock({ projectId, sessionId, name, onStolen }: Opts) {
  const [lockState, setLockState] = useState<LockState>({
    status: projectId ? 'unlocked' : 'solo',
    lockedByName: null,
    lastEditorName: null,
    lastEditedAt: null,
  });

  const prevStatusRef = useRef<LockStatus>(projectId ? 'unlocked' : 'solo');
  const onStolenRef = useRef(onStolen);
  onStolenRef.current = onStolen;

  const applyInfo = useCallback(
    (info: Awaited<ReturnType<typeof getProjectLockInfo>>) => {
      const status: LockStatus = !info.lockedBy
        ? 'unlocked'
        : info.lockedBy === sessionId
          ? 'mine'
          : 'taken';

      // Detect steal: was mine, now taken by someone else
      if (prevStatusRef.current === 'mine' && status === 'taken') {
        onStolenRef.current(info.lockedName ?? 'Someone');
      }
      prevStatusRef.current = status;

      setLockState({
        status,
        lockedByName: info.lockedName,
        lastEditorName: info.lastEditorName,
        lastEditedAt: info.updatedAt,
      });
    },
    [sessionId],
  );

  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;
    async function poll() {
      if (cancelled) return;
      try {
        const info = await getProjectLockInfo(projectId!);
        if (!cancelled) applyInfo(info);
      } catch { /* network error — skip */ }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [projectId, applyInfo]);

  const acquire = useCallback(async () => {
    if (!projectId) return;
    await lockProject(projectId, sessionId, name, false);
    const info = await getProjectLockInfo(projectId);
    applyInfo(info);
  }, [projectId, sessionId, name, applyInfo]);

  const release = useCallback(async () => {
    if (!projectId) return;
    await unlockProject(projectId, sessionId);
    const info = await getProjectLockInfo(projectId);
    applyInfo(info);
  }, [projectId, sessionId, applyInfo]);

  const steal = useCallback(async () => {
    if (!projectId) return;
    await lockProject(projectId, sessionId, name, true);
    const info = await getProjectLockInfo(projectId);
    applyInfo(info);
  }, [projectId, sessionId, name, applyInfo]);

  return { lockState, acquire, release, steal };
}
