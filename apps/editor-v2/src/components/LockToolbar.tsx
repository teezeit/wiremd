import { formatDistanceToNow } from 'date-fns';

export type LockState = 'unlocked' | 'mine' | 'taken';

interface Props {
  myName: string;
  lockState: LockState;
  lockedByName?: string;
  lastEditorName?: string;
  lastEditedAt?: string;
  onLock: () => void;
  onUnlock: () => void;
  onSteal: () => void;
}

function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
}

export function LockToolbar({
  myName,
  lockState,
  lockedByName,
  lastEditorName,
  lastEditedAt,
  onLock,
  onUnlock,
  onSteal,
}: Props) {
  if (lockState === 'mine') {
    return (
      <div className="ed-lock-toolbar ed-lock-toolbar--mine">
        <span className="ed-lock-toolbar__name">{myName} · editing</span>
        <button className="ed-btn ed-btn--sm" onClick={onUnlock}>Stop editing</button>
      </div>
    );
  }

  if (lockState === 'taken') {
    return (
      <div className="ed-lock-toolbar ed-lock-toolbar--taken">
        <span className="ed-lock-toolbar__name">
          {lockedByName ?? 'Someone'}
          {lastEditedAt ? ` · ${timeAgo(lastEditedAt)}` : ''}
        </span>
        <button className="ed-btn ed-btn--sm" onClick={onSteal}>Steal edit</button>
      </div>
    );
  }

  // unlocked
  return (
    <div className="ed-lock-toolbar">
      {lastEditorName && (
        <span className="ed-lock-toolbar__name ed-lock-toolbar__name--muted">
          {lastEditorName}
          {lastEditedAt ? ` · ${timeAgo(lastEditedAt)}` : ''}
        </span>
      )}
      <button className="ed-btn ed-btn--sm" onClick={onLock}>Edit</button>
    </div>
  );
}
