import { formatDistanceToNow } from 'date-fns';
import { Avatar } from './Avatar';

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
      {/* Left: avatar + name + time */}
      <div className="ed-sidebar-lock-banner__user">
        <Avatar name={lockedByName} size={22} />
        <div className="ed-sidebar-lock-banner__info">
          <span className="ed-sidebar-lock-banner__name">{lockedByName}</span>
          <span className="ed-sidebar-lock-banner__sub">
            is already editing{timeAgo ? ` · ${timeAgo}` : ''}
          </span>
        </div>
      </div>

      {/* Center: lock icon */}
      <svg
        className="ed-sidebar-lock-banner__lock"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>

      {/* Right: steal button — primary, unlock icon */}
      <button className="ed-btn ed-btn--primary ed-btn--sm" onClick={onSteal}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
        Steal edit
      </button>
    </div>
  );
}
