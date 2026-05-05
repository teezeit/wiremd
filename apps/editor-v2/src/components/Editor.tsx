import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { wiremdLanguage } from '../lib/wiremdLanguage';
import { useDebounce } from '../hooks/useDebounce';

const wiremdTheme = EditorView.theme({
  '&': { height: '100%', fontSize: '13px' },
  '.cm-scroller': { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", overflow: 'auto' },
  '&.cm-focused': { outline: 'none' },
});

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
          oneDark,
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

  // Sync external value changes (template load etc.) without disturbing cursor
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  return <div ref={containerRef} className="ed-editor__body" style={{ height: '100%' }} />;
}
