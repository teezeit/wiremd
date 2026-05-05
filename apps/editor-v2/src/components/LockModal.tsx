import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from './Avatar';

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
            <Avatar name={lockedByName} size={24} />
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
