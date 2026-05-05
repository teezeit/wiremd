import { useEffect, useState } from 'react';
import type { SaveFormat } from '../lib/exportFormat';

const FORMATS: { value: SaveFormat; label: string }[] = [
  { value: 'markdown', label: 'Markdown (.md)' },
  { value: 'html',     label: 'HTML (.html)' },
  { value: 'react',    label: 'React (.tsx)' },
  { value: 'tailwind', label: 'Tailwind (.html)' },
  { value: 'json',     label: 'JSON (.json)' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (format: SaveFormat) => Promise<void>;
}

export function SaveModal({ isOpen, onClose, onSave }: Props) {
  const [format, setFormat] = useState<SaveFormat>('markdown');

  useEffect(() => {
    if (!isOpen) { setFormat('markdown'); return; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSave() {
    await onSave(format);
    onClose();
  }

  return (
    <div
      className="ed-modal-backdrop"
      data-testid="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="ed-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Save as"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ed-modal__header">
          <h2 className="ed-modal__title">Save as</h2>
        </div>

        <div className="ed-modal__section">
          <div className="ed-modal__section-title">Format</div>
          <select
            className="ed-select ed-modal__select"
            value={format}
            onChange={(e) => setFormat(e.target.value as SaveFormat)}
          >
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        <div className="ed-modal__actions">
          <button className="ed-btn ed-btn--primary" onClick={handleSave}>Save</button>
          <button className="ed-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
