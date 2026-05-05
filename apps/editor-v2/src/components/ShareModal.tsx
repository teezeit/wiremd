import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGetLink: () => string;
  onCopyLink: (url: string) => Promise<void>;
}

type LinkState = 'idle' | 'generating' | 'ready';

export function ShareModal({ isOpen, onClose, onGetLink, onCopyLink }: Props) {
  const [linkState, setLinkState] = useState<LinkState>('idle');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setLinkState('idle');
      setGeneratedUrl('');
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleExport() {
    setLinkState('generating');
    setCopied(false);
    setTimeout(() => {
      setGeneratedUrl(onGetLink());
      setLinkState('ready');
    }, 0);
  }

  async function handleCopy() {
    await onCopyLink(generatedUrl);
    setCopied(true);
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
        aria-label="Share"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ed-modal__header">
          <h2 className="ed-modal__title">Share</h2>
          <button className="ed-btn ed-btn--icon" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Shareable link */}
        <div className="ed-modal__section">
          <div className="ed-modal__section-title">Shareable link</div>
          <p className="ed-modal__section-desc">
            Generates a link with your current wireframe encoded in the URL.
            Changes made after sharing won't be reflected — this is a snapshot.
          </p>

          {linkState === 'idle' && (
            <button className="ed-btn ed-btn--primary ed-modal__action" onClick={handleExport}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Export to link
            </button>
          )}

          {linkState === 'generating' && (
            <span className="ed-modal__generating">Generating…</span>
          )}

          {linkState === 'ready' && (
            <div className="ed-modal__link-row">
              <input
                className="ed-modal__link-input"
                type="text"
                value={generatedUrl}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button className="ed-btn ed-btn--primary" onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  'Copy link'
                )}
              </button>
            </div>
          )}
        </div>

        <div className="ed-modal__divider" />

        {/* Live Collaboration */}
        <div className="ed-modal__section">
          <div className="ed-modal__section-title">
            Live Collaboration
            <span className="ed-modal__badge">saves to cloud</span>
          </div>
          <p className="ed-modal__section-desc">
            Start a session — URL becomes a shareable project ID. Multiple people can edit simultaneously.
          </p>
          <button className="ed-btn ed-modal__action" disabled>
            Start Live Session
            <span className="ed-modal__coming">— coming soon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
