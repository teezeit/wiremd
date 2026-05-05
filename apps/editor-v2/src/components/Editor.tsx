import { memo, useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { wiremdLanguage } from '../lib/wiremdLanguage';
import { useDebounce } from '../hooks/useDebounce';

const wiremdTheme = EditorView.theme({
  '&': { height: '100%', fontSize: '13px', background: '#ffffff' },
  '.cm-content': { padding: '16px', caretColor: 'rgba(60,60,67,0.8)', lineHeight: '1.65' },
  '.cm-scroller': { fontFamily: "'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace", overflow: 'auto' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'rgba(60,60,67,0.7)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-gutters': {
    background: '#f6f6f7',
    border: 'none',
    borderRight: '1px solid rgba(60,60,67,0.1)',
    color: 'rgba(60,60,67,0.3)',
    paddingRight: '8px',
    minWidth: '3ch',
  },
  '.cm-activeLineGutter': { background: 'rgba(60,60,67,0.04)' },
  '.cm-activeLine': { background: 'rgba(60,60,67,0.03)' },
  '.cm-selectionBackground': { background: 'rgba(60,60,67,0.1) !important' },
  '&.cm-focused .cm-selectionBackground': { background: 'rgba(60,60,67,0.12) !important' },
  '.cm-foldPlaceholder': { background: '#f6f6f7', border: '1px solid rgba(60,60,67,0.12)', color: 'rgba(60,60,67,0.5)' },
  '.cm-tooltip': {
    background: '#fff',
    border: '1px solid rgba(60,60,67,0.12)',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
    borderRadius: '6px',
  },
}, { dark: false });

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = memo(function Editor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  // Tracks the last value emitted by CodeMirror so we can skip roundtrip dispatches
  const lastEmittedValue = useRef(value);
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
              const newValue = update.state.doc.toString();
              lastEmittedValue.current = newValue; // track synchronously
              debouncedOnChange(newValue);
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

  // Only push external value changes (file load, reset) into CodeMirror.
  // Skip if value is a roundtrip of what the editor just emitted.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (value === lastEmittedValue.current) return;
    if (view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  return <div ref={containerRef} style={{ height: '100%' }} />;
});
