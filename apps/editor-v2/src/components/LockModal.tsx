import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  isOpen: boolean;
  lockedByName: string;
  lastEditorName: string | null;
  lastEditedAt: string | null;
  onSteal: () => Promise<void>;
  onClose: () => void;
}

export function LockModal({ isOpen, lockedByName, lastEditorName, lastEditedAt, onSteal, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSteal() {
    await onSteal();
    onClose();
  }

  const timeAgo = lastEditedAt
    ? formatDistanceToNow(new Date(lastEditedAt), { addSuffix: true })
    : null;

  return (
    <div className="ed-modal-backdrop" onClick={onClose}>
      <div
        className="ed-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Lock"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ed-modal__header">
          <h2 className="ed-modal__title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16, marginRight: 6 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {lockedByName} is editing
          </h2>
        </div>

        <div className="ed-modal__section">
          {(lastEditorName || timeAgo) && (
            <p className="ed-modal__section-desc">
              {lastEditorName && <>Last saved by <strong>{lastEditorName}</strong></>}
              {timeAgo && <> · {timeAgo}</>}
            </p>
          )}
          <p className="ed-modal__section-desc" style={{ marginTop: 4 }}>
            You can steal the edit or continue viewing without editing.
          </p>
        </div>

        <div className="ed-modal__actions">
          <button className="ed-btn ed-btn--primary" onClick={handleSteal}>
            Steal edit
          </button>
          <button className="ed-btn" onClick={onClose}>
            View only
          </button>
        </div>
      </div>
    </div>
  );
}
