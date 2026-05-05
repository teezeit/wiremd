import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { wiremdLanguage } from '../lib/wiremdLanguage';
import { useDebounce } from '../hooks/useDebounce';

const wiremdTheme = EditorView.theme({
  '&': { height: '100%', fontSize: '13px', background: '#ffffff' },
  '.cm-content': { padding: '16px', caretColor: '#6366f1', lineHeight: '1.65' },
  '.cm-scroller': { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", overflow: 'auto' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#6366f1' },
  '&.cm-focused': { outline: 'none' },
  '.cm-gutters': {
    background: '#f8fafc',
    border: 'none',
    borderRight: '1px solid #e2e8f0',
    color: '#94a3b8',
    paddingRight: '8px',
    minWidth: '3ch',
  },
  '.cm-activeLineGutter': { background: 'rgba(99,102,241,0.05)' },
  '.cm-activeLine': { background: 'rgba(99,102,241,0.03)' },
  '.cm-selectionBackground': { background: 'rgba(99,102,241,0.12) !important' },
  '&.cm-focused .cm-selectionBackground': { background: 'rgba(99,102,241,0.15) !important' },
  '.cm-foldPlaceholder': { background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' },
  '.cm-tooltip': {
    background: '#fff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
    borderRadius: '6px',
  },
}, { dark: false });

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const debouncedOnChange = useDebounce(onChange, 200);

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown({ addKeymap: true }),
          wiremdLanguage,
          wiremdTheme,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              debouncedOnChange(update.state.doc.toString());
            }
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  return <div ref={containerRef} style={{ height: '100%' }} />;
}
