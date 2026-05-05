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
      <svg
        className="ed-sidebar-lock-banner__icon"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
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
