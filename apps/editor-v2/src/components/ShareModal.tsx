import { useEffect, useState } from 'react';
import { IdentityTag } from './IdentityTag';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGetLink: () => string;
  onCopyLink: (url: string) => Promise<void>;
  onStartSession?: () => Promise<void>;
  sessionUrl?: string;
  onStopSession?: () => Promise<void>;
  myName?: string;
}

type LinkState = 'idle' | 'generating' | 'ready';

export function ShareModal({
  isOpen, onClose, onGetLink, onCopyLink,
  onStartSession, sessionUrl, onStopSession, myName,
}: Props) {
  const [linkState, setLinkState] = useState<LinkState>('idle');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [sessionCopied, setSessionCopied] = useState(false);
  const [starting, setStarting] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setLinkState('idle');
      setGeneratedUrl('');
      setCopied(false);
      setSessionCopied(false);
      setStarting(false);
      setSessionError(null);
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

  async function handleCopyGenerated() {
    await onCopyLink(generatedUrl);
    setCopied(true);
  }

  async function handleCopySession() {
    if (!sessionUrl) return;
    await onCopyLink(sessionUrl);
    setSessionCopied(true);
    setTimeout(() => setSessionCopied(false), 2000);
  }

  async function handleStartSession() {
    if (!onStartSession) return;
    setStarting(true);
    setSessionError(null);
    try {
      await onStartSession();
      // modal stays open — App will pass sessionUrl which triggers the active view
    } catch (err) {
      setSessionError(err instanceof Error ? err.message : 'Failed to start session');
    } finally {
      setStarting(false);
    }
  }

  const isActiveSession = !!sessionUrl;

  return (
    <div className="ed-modal-backdrop" data-testid="modal-backdrop" onClick={onClose}>
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

        {/* Shareable link — always shown */}
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
          {linkState === 'generating' && <span className="ed-modal__generating">Generating…</span>}
          {linkState === 'ready' && (
            <div className="ed-modal__link-row">
              <input
                className="ed-modal__link-input"
                type="text"
                value={generatedUrl}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button className="ed-btn ed-btn--primary" onClick={handleCopyGenerated}>
                {copied
                  ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
                  : 'Copy link'}
              </button>
            </div>
          )}
        </div>

        <div className="ed-modal__divider" />

        {/* Live Collaboration */}
        <div className="ed-modal__section">
          <div className="ed-modal__section-title">Live Collaboration</div>
          {!isActiveSession && (
            <span className="ed-modal__badge" data-testid="saves-to-cloud">saves to cloud and sync</span>
          )}
          {isActiveSession && (
            <div className="ed-modal__live-row">
              {myName && <IdentityTag name={myName} avatarSize={22} />}
            </div>
          )}

          {isActiveSession ? (
            <>
              <p className="ed-modal__section-desc">
                <span className="ed-modal__live-dot" data-testid="live-badge" />
                Active session — share this link with collaborators.
              </p>
              <div className="ed-modal__link-row" style={{ marginBottom: 10 }}>
                <input
                  className="ed-modal__link-input"
                  type="text"
                  value={sessionUrl}
                  readOnly
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button className="ed-btn ed-btn--primary" onClick={handleCopySession}>
                  {sessionCopied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
              <button
                className="ed-btn ed-modal__action"
                style={{ borderColor: 'var(--ed-error)', color: 'var(--ed-error)' }}
                onClick={onStopSession}
              >
                Stop Session
              </button>
            </>
          ) : (
            <>
              <p className="ed-modal__section-desc">
                Saves your wireframe to the cloud and generates a shareable URL.
                One person edits at a time — anyone with the link can view and take over the edit.
              </p>
              <button
                className="ed-btn ed-btn--primary ed-modal__action"
                disabled={!onStartSession || starting}
                onClick={handleStartSession}
              >
                <svg data-testid="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {starting ? 'Starting…' : 'Start Live Session'}
              </button>
              {sessionError && (
                <p className="ed-modal__error">Failed to start session — check your connection and try again.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
