import { formatDistanceToNow } from 'date-fns';

interface Props {
  lockedByName: string;
  lastEditedAt: string | null;
  onSteal: () => void;
}

export function SidebarLockBanner({ lockedByName, lastEditedAt, onSteal }: Props) {
  const timeAgo = lastEditedAt
    ? formatDistanceToNow(new Date(lastEditedAt), { addSuffix: true })
    : null;

  return (
    <div className="ed-sidebar-lock-banner">
      <div className="ed-sidebar-lock-banner__info">
        <span className="ed-sidebar-lock-banner__name">{lockedByName}</span>
        <span className="ed-sidebar-lock-banner__sub">
          is editing{timeAgo ? ` · ${timeAgo}` : ''}
        </span>
      </div>
      <button className="ed-btn ed-btn--sm" onClick={onSteal}>
        Steal edit
      </button>
    </div>
  );
}
