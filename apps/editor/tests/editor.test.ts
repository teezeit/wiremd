import { beforeEach, describe, expect, it, vi } from "vitest";

const editorMocks = vi.hoisted(() => {
  const model = {
    fullRange: {
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 99,
      endColumn: 1,
    },
    lineCount: 10,
    lineMaxColumn: 80,
    getFullModelRange: vi.fn(function (this: typeof model) {
      return this.fullRange;
    }),
    getLineCount: vi.fn(function (this: typeof model) {
      return this.lineCount;
    }),
    getLineMaxColumn: vi.fn(function (this: typeof model) {
      return this.lineMaxColumn;
    }),
    pushEditOperations: vi.fn(
      (
        _selections: unknown,
        edits: Array<{ text: string }>,
        cursorComputer: (edits: unknown) => unknown,
      ) => {
        cursorComputer(edits);
      },
    ),
  };

  const state = {
    value: "",
    changeListener: undefined as undefined | (() => void),
    model,
    editor: {
      onDidChangeModelContent: vi.fn((listener: () => void) => {
        state.changeListener = listener;
      }),
      getValue: vi.fn(() => state.value),
      setValue: vi.fn((value: string) => {
        state.value = value;
      }),
      getModel: vi.fn(() => model),
      getSelections: vi.fn(() => [
        {
          selectionStartLineNumber: 3,
          selectionStartColumn: 5,
          positionLineNumber: 3,
          positionColumn: 5,
        },
      ]),
      layout: vi.fn(),
    },
    create: vi.fn(() => state.editor),
    getLanguages: vi.fn(() => [] as Array<{ id: string }>),
    register: vi.fn(),
    setMonarchTokensProvider: vi.fn(),
    ensureSetup: vi.fn(),
    getOptions: vi.fn(() => ({
      theme: "wiremd-dark",
      automaticLayout: true,
    })),
  };

  return state;
});

vi.mock("monaco-editor/esm/vs/editor/editor.api.js", () => ({
  editor: {
    create: editorMocks.create,
  },
  languages: {
    getLanguages: editorMocks.getLanguages,
    register: editorMocks.register,
    setMonarchTokensProvider: editorMocks.setMonarchTokensProvider,
  },
  Selection: class MockSelection {
    selectionStartLineNumber: number;
    selectionStartColumn: number;
    positionLineNumber: number;
    positionColumn: number;
    constructor(
      selectionStartLineNumber: number,
      selectionStartColumn: number,
      positionLineNumber: number,
      positionColumn: number,
    ) {
      this.selectionStartLineNumber = selectionStartLineNumber;
      this.selectionStartColumn = selectionStartColumn;
      this.positionLineNumber = positionLineNumber;
      this.positionColumn = positionColumn;
    }
  },
}));

vi.mock("../src/monaco.js", () => ({
  ensureEditorMonacoSetup: editorMocks.ensureSetup,
  getSharedMonacoOptions: editorMocks.getOptions,
}));

describe("editor editor", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    editorMocks.value = "";
    editorMocks.changeListener = undefined;
    editorMocks.create.mockClear();
    editorMocks.getLanguages.mockClear();
    editorMocks.register.mockClear();
    editorMocks.setMonarchTokensProvider.mockClear();
    editorMocks.ensureSetup.mockClear();
    editorMocks.getOptions.mockClear();
    editorMocks.editor.onDidChangeModelContent.mockClear();
    editorMocks.editor.getValue.mockClear();
    editorMocks.editor.setValue.mockClear();
    editorMocks.editor.getModel.mockClear();
    editorMocks.editor.getSelections.mockClear();
    editorMocks.editor.layout.mockClear();
    editorMocks.model.getFullModelRange.mockClear();
    editorMocks.model.getLineCount.mockClear();
    editorMocks.model.getLineMaxColumn.mockClear();
    editorMocks.model.pushEditOperations.mockClear();
    editorMocks.model.lineCount = 10;
    editorMocks.model.lineMaxColumn = 80;
  });

  it("initializes monaco with the wiremd language", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();
    const container = {} as HTMLElement;

    initEditor({
      container,
      onChange,
      initialValue: "Initial value",
    });

    expect(editorMocks.ensureSetup).toHaveBeenCalledTimes(1);
    expect(editorMocks.register).toHaveBeenCalledWith({ id: "wiremd" });
    expect(editorMocks.setMonarchTokensProvider).toHaveBeenCalledTimes(1);
    expect(editorMocks.create).toHaveBeenCalledWith(
      container,
      expect.objectContaining({
        value: "Initial value",
        language: "wiremd",
        fontSize: 13,
      }),
    );
  });

  it("debounces editor changes before notifying the preview", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    initEditor({
      container: {} as HTMLElement,
      onChange,
    });

    editorMocks.value = "Draft value";
    editorMocks.changeListener?.();

    vi.advanceTimersByTime(199);
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onChange).toHaveBeenCalledWith("Draft value");
  });

  it("setValue cancels pending debounced work and avoids duplicate change events", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    const editor = initEditor({
      container: {} as HTMLElement,
      onChange,
    });

    editorMocks.value = "Pending value";
    editorMocks.changeListener?.();

    editor.setValue("Manual update");
    editorMocks.changeListener?.();
    vi.advanceTimersByTime(200);

    expect(editorMocks.editor.setValue).toHaveBeenCalledWith("Manual update");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("Manual update");
  });

  it("setValuePreservingCursor uses pushEditOperations instead of setValue", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    const editor = initEditor({ container: {} as HTMLElement, onChange });

    editor.setValuePreservingCursor("Remote content");

    // Must NOT call the cursor-resetting setValue on the underlying monaco editor
    expect(editorMocks.editor.setValue).not.toHaveBeenCalled();
    // Must use pushEditOperations with the full-range replacement
    expect(editorMocks.model.pushEditOperations).toHaveBeenCalledTimes(1);
    const [, edits] = editorMocks.model.pushEditOperations.mock.calls[0] as [
      unknown,
      Array<{ range: unknown; text: string }>,
      unknown,
    ];
    expect(edits).toHaveLength(1);
    expect(edits[0].text).toBe("Remote content");
    // onChange must still fire
    expect(onChange).toHaveBeenCalledWith("Remote content");
  });

  it("setValuePreservingCursor clamps cursor to new content bounds", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    // Cursor was at line 8 col 12; remote update shrinks content to 5 lines
    editorMocks.editor.getSelections.mockReturnValue([
      {
        selectionStartLineNumber: 8,
        selectionStartColumn: 12,
        positionLineNumber: 8,
        positionColumn: 12,
      },
    ]);
    editorMocks.model.lineCount = 5;
    editorMocks.model.lineMaxColumn = 20;

    let capturedCursorComputer:
      | ((
          edits: unknown,
        ) => Array<{ positionLineNumber: number; positionColumn: number }>)
      | undefined;
    editorMocks.model.pushEditOperations.mockImplementation(
      (
        _sel: unknown,
        _edits: unknown,
        cursorComputer: typeof capturedCursorComputer,
      ) => {
        capturedCursorComputer = cursorComputer;
      },
    );

    const editor = initEditor({ container: {} as HTMLElement, onChange });
    editor.setValuePreservingCursor("Short\ncontent");

    const result = capturedCursorComputer!(null);
    expect(result).toHaveLength(1);
    // line 8 exceeds lineCount 5 → clamped to 5
    expect(result[0].positionLineNumber).toBe(5);
    // col 12 exceeds lineMaxColumn 20? No, 12 < 20 so stays 12
    expect(result[0].positionColumn).toBe(12);
  });

  it("setValuePreservingCursor falls back to setValue when model is null", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    editorMocks.editor.getModel.mockReturnValue(null);

    const editor = initEditor({ container: {} as HTMLElement, onChange });
    editor.setValuePreservingCursor("Fallback content");

    expect(editorMocks.editor.setValue).toHaveBeenCalledWith(
      "Fallback content",
    );
    expect(onChange).toHaveBeenCalledWith("Fallback content");
  });

  it("setValuePreservingCursor suppresses the model change event", async () => {
    const { initEditor } = await import("../src/editor.js");
    const onChange = vi.fn();

    const editor = initEditor({ container: {} as HTMLElement, onChange });
    editor.setValuePreservingCursor("Remote content");

    // Simulate Monaco firing onDidChangeModelContent after pushEditOperations
    editorMocks.value = "Remote content";
    editorMocks.changeListener?.();
    vi.advanceTimersByTime(200);

    // onChange should have been called exactly once (from setValuePreservingCursor itself)
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
