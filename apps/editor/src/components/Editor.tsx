import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { lintGutter, linter } from '@codemirror/lint';
import { wiremdLanguage } from '../lib/wiremdLanguage';
import { getWiremdDiagnostics } from '../lib/wiremdDiagnostics';
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
  '.cm-lintRange-warning': {
    backgroundColor: 'rgba(245, 158, 11, 0.16)',
    backgroundImage: 'none',
    textDecoration: 'underline wavy #b45309',
    textDecorationThickness: '1.5px',
    textUnderlineOffset: '3px',
  },
  '.cm-lint-marker-warning': {
    width: '11px',
    height: '11px',
    margin: '3px auto 0',
    borderRadius: '999px',
    background: '#f59e0b',
    boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.22)',
  },
  '.cm-tooltip': {
    background: '#fff',
    border: '1px solid rgba(60,60,67,0.12)',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
    borderRadius: '6px',
  },
}, { dark: false });

export interface EditorHandle {
  moveCursorToLine: (line: number) => void;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelectionChange?: (range: { from: number; to: number }) => void;
  onCursorLineChange?: (line: number) => void;
  onBlur?: () => void;
  readOnly?: boolean;
}

const readOnlyCompartment = new Compartment();

export const Editor = memo(forwardRef<EditorHandle, Props>(function Editor(
  { value, onChange, onSelectionChange, onCursorLineChange, onBlur, readOnly = false },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const lastEmittedValue = useRef(value);
  const debouncedOnChange = useDebounce(onChange, 200);

  useImperativeHandle(ref, () => ({
    moveCursorToLine(line: number) {
      const view = viewRef.current;
      if (!view) return;
      const doc = view.state.doc;
      if (line < 1 || line > doc.lines) return;
      const lineInfo = doc.line(line);
      view.dispatch({
        selection: { anchor: lineInfo.from },
        scrollIntoView: true,
        userEvent: 'select',
      });
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown({ addKeymap: true }),
          wiremdLanguage,
          lintGutter(),
          linter((view) => getWiremdDiagnostics(view.state.doc)),
          wiremdTheme,
          readOnlyCompartment.of(EditorState.readOnly.of(readOnly)),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newValue = update.state.doc.toString();
              lastEmittedValue.current = newValue;
              debouncedOnChange(newValue);
            }
            if (update.selectionSet) {
              const range = update.state.selection.main;
              onSelectionChange?.({ from: range.from, to: range.to });
              onCursorLineChange?.(update.state.doc.lineAt(range.from).number);
            }
          }),
          EditorView.domEventHandlers({
            blur: () => { onBlur?.(); return false; },
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    const range = view.state.selection.main;
    onSelectionChange?.({ from: range.from, to: range.to });
    onCursorLineChange?.(view.state.doc.lineAt(range.from).number);
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only push external value changes (file load, reset) into CodeMirror.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (value === lastEmittedValue.current) return;
    if (view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  // Sync readOnly changes without remounting
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(readOnly)) });
  }, [readOnly]);

  return <div ref={containerRef} style={{ height: '100%' }} data-readonly={readOnly || undefined} />;
}));
