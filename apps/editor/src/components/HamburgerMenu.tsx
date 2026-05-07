import { useState, useEffect, useRef } from 'react';
import type { StyleName } from '../lib/renderMarkup';
import { IdentityTag } from './IdentityTag';

const STYLES: { value: StyleName; label: string }[] = [
  { value: 'sketch', label: 'Sketch' },
  { value: 'clean', label: 'Clean' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'material', label: 'Material' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'brutal', label: 'Brutal' },
  { value: 'none', label: 'None' },
];

interface Props {
  style: StyleName;
  onStyleChange: (s: StyleName) => void;
  onReset: () => void;
  onOpenFile: () => void;
  onSaveAs: () => void;
  fileSupported: boolean;
  name: string;
  onLiveCollab?: () => void;
  hasActiveSession?: boolean;
  isEditor?: boolean;
}

export function HamburgerMenu({ style, onStyleChange, onReset, onOpenFile, onSaveAs, fileSupported, name, onLiveCollab, hasActiveSession = false, isEditor = true }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        className="ed-btn ed-hamburger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="ed-menu" onClick={(e) => e.stopPropagation()}>
          {/* Actions */}
          <button
            className={`ed-menu__item${!isEditor ? ' ed-menu__item--disabled' : ''}`}
            disabled={!isEditor}
            title={!isEditor ? 'Take the edit lock to reset' : undefined}
            onClick={() => { onReset(); setOpen(false); }}
          >
            Reset
          </button>
          <button
            className={`ed-menu__item${!fileSupported ? ' ed-menu__item--disabled' : ''}`}
            disabled={!fileSupported}
            onClick={() => { onOpenFile(); setOpen(false); }}
            title={fileSupported ? undefined : 'Not supported in this browser'}
          >
            Open from file
            {!fileSupported && <span className="ed-menu__badge">unsupported</span>}
          </button>
          <button
            className={`ed-menu__item${!fileSupported ? ' ed-menu__item--disabled' : ''}`}
            disabled={!fileSupported}
            onClick={() => { onSaveAs(); setOpen(false); }}
            title={fileSupported ? undefined : 'Not supported in this browser'}
          >
            Save to…
            {!fileSupported && <span className="ed-menu__badge">unsupported</span>}
          </button>
          <button
            className={`ed-menu__item ed-menu__item--live${hasActiveSession ? ' ed-menu__item--live-active' : ''}`}
            onClick={() => { onLiveCollab?.(); setOpen(false); }}
          >
            {hasActiveSession ? (
              <>
                <svg data-testid="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Live Session
                <span className="ed-menu__live-dot" />
              </>
            ) : (
              'Live Collaboration'
            )}
          </button>

          <div className="ed-menu__divider" />

          {/* Style switcher */}
          <div className="ed-menu__section-label">Style</div>
          <div className="ed-menu__style-grid">
            {STYLES.map((s) => (
              <button
                key={s.value}
                className={`ed-menu__style-btn${style === s.value ? ' ed-menu__style-btn--active' : ''}`}
                onClick={() => onStyleChange(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="ed-menu__divider" />

          {/* Links */}
          <a
            className="ed-menu__item"
            href="https://github.com/teezeit/wiremd"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12, marginLeft: 'auto', opacity: 0.4 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            className="ed-menu__item"
            href={import.meta.env.DEV ? 'http://localhost:5173/wiremd/guide/overview.html' : '/wiremd/guide/overview.html'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12, marginLeft: 'auto', opacity: 0.4 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          <div className="ed-menu__divider" />

          <div className="ed-menu__identity">
            <IdentityTag name={name} />
          </div>
        </div>
      )}
    </div>
  );
}
