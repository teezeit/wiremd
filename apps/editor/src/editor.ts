/** wiremd Editor - Monaco Editor Panel */

import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import { createDebouncedChangeController } from "./debouncedChange.js";
import { ensureEditorMonacoSetup, getSharedMonacoOptions } from "./monaco.js";

/** Register a custom wiremd language for basic syntax highlighting */
function registerWiremdLanguage() {
  // Only register once
  if (monaco.languages.getLanguages().some((l) => l.id === "wiremd")) return;

  monaco.languages.register({ id: "wiremd" });

  monaco.languages.setMonarchTokensProvider("wiremd", {
    tokenizer: {
      root: [
        // Headings
        [/^#{1,6}\s.*$/, "keyword"],
        // Containers ::: name
        [/^:::.*$/, "type.identifier"],
        // Navigation bar [[ ... ]]
        [/\[\[.*?\]\]/, "string"],
        // Buttons [Text]* or [Text]
        [/\(\([^()\n]+\)\)(\{[^}]*\})?/, "tag"],
        [/\[.*?\]\*/, "keyword.control"],
        [/\[.*?\](\{[^}]*\})?/, "variable"],
        // Input fields with underscores or asterisks
        [/\[[\*_|]+\]/, "number"],
        // Attributes {key:value}
        [/\{[^}]*\}/, "annotation"],
        // Blockquotes
        [/^>.*$/, "comment"],
        // Table separators
        [/\|/, "delimiter"],
        // Checkbox / radio
        [/- \[[ x]\]/, "keyword"],
        [/- \([ x]\)/, "keyword"],
        // Horizontal rule
        [/^---+$/, "delimiter"],
        // Bold
        [/\*\*[^*]+\*\*/, "strong"],
        // Italic
        [/\*[^*]+\*/, "emphasis"],
        // Images
        [/!\[.*?\]/, "string"],
        // Icons
        [/:[a-z-]+:/, "tag"],
      ],
    },
  });
}

export interface EditorInstance {
  getValue: () => string;
  setValue: (v: string) => void;
  /** Replace content without moving the cursor (for remote/external updates). */
  setValuePreservingCursor: (v: string) => void;
  getEditor: () => monaco.editor.IStandaloneCodeEditor;
  layout: () => void;
  flushPendingChange: () => void;
}

export function initEditor(opts: {
  container: HTMLElement;
  onChange: (value: string) => void;
  onCursorChange?: (line: number, column: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  initialValue?: string;
}): EditorInstance {
  ensureEditorMonacoSetup();
  registerWiremdLanguage();

  const monacoEditor = monaco.editor.create(opts.container, {
    ...getSharedMonacoOptions(),
    value: opts.initialValue ?? "",
    language: "wiremd",
    fontSize: 13,
    lineHeight: 22,
    fontLigatures: true,
    renderLineHighlight: "line",
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    bracketPairColorization: { enabled: false },
    folding: false,
    tabSize: 2,
    insertSpaces: true,
  });

  const debouncedChange = createDebouncedChangeController({
    delayMs: 200,
    onChange: opts.onChange,
  });

  let suppressNextChange = false;
  monacoEditor.onDidChangeModelContent(() => {
    if (suppressNextChange) {
      suppressNextChange = false;
      return;
    }
    debouncedChange.schedule(monacoEditor.getValue());
  });

  if (opts.onCursorChange) {
    const notify = opts.onCursorChange;
    monacoEditor.onDidChangeCursorPosition((e) => {
      notify(e.position.lineNumber, e.position.column);
    });
  }

  if (opts.onFocus) monacoEditor.onDidFocusEditorText(opts.onFocus);
  if (opts.onBlur) monacoEditor.onDidBlurEditorText(opts.onBlur);

  return {
    getValue: () => monacoEditor.getValue(),
    setValue: (v: string) => {
      suppressNextChange = true;
      debouncedChange.cancel();
      monacoEditor.setValue(v);
      opts.onChange(v);
    },
    setValuePreservingCursor: (v: string) => {
      suppressNextChange = true;
      debouncedChange.cancel();
      const model = monacoEditor.getModel();
      if (model) {
        const savedSelections = monacoEditor.getSelections();
        const scrollTop = monacoEditor.getScrollTop();
        const scrollLeft = monacoEditor.getScrollLeft();
        const fullRange = model.getFullModelRange();
        model.pushEditOperations(
          savedSelections ?? [],
          [{ range: fullRange, text: v }],
          () => {
            if (!savedSelections?.length) return null;
            const lineCount = model.getLineCount();
            return savedSelections.map((sel) => {
              const sl = Math.min(sel.selectionStartLineNumber, lineCount);
              const el = Math.min(sel.positionLineNumber, lineCount);
              return new monaco.Selection(
                sl,
                Math.min(sel.selectionStartColumn, model.getLineMaxColumn(sl)),
                el,
                Math.min(sel.positionColumn, model.getLineMaxColumn(el)),
              );
            });
          },
        );
        // pushEditOperations may scroll to the new cursor position; restore the viewport.
        monacoEditor.setScrollTop(scrollTop);
        monacoEditor.setScrollLeft(scrollLeft);
      } else {
        monacoEditor.setValue(v);
      }
      opts.onChange(v);
    },
    getEditor: () => monacoEditor,
    layout: () => monacoEditor.layout(),
    flushPendingChange: () => {
      debouncedChange.flush();
    },
  };
}
