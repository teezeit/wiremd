import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onLoadShared: () => void;
  onKeepLocal: () => void;
}

export function ConflictModal({ isOpen, onLoadShared, onKeepLocal }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onKeepLocal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onKeepLocal]);

  if (!isOpen) return null;

  return (
    <div className="ed-modal-backdrop" style={{ cursor: 'default' }}>
      <div
        className="ed-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Conflict"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ed-modal__header">
          <h2 className="ed-modal__title">Shared link opened</h2>
        </div>

        <div className="ed-modal__section">
          <p className="ed-modal__section-desc">
            You have locally saved work. Loading this shared link will replace it.
            Which would you like to keep?
          </p>
        </div>

        <div className="ed-modal__actions">
          <button className="ed-btn ed-btn--primary" onClick={onLoadShared}>
            Load shared link
          </button>
          <button className="ed-btn" onClick={onKeepLocal}>
            Keep my work
          </button>
        </div>
      </div>
    </div>
  );
}
