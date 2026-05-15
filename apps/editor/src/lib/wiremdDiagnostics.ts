import type { Text } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';
import { lint } from '@eclectic-ai/wiremd';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function positionToOffset(doc: Text, line: number, column: number) {
  const lineInfo = doc.line(clamp(line, 1, doc.lines));
  return lineInfo.from + clamp(column - 1, 0, lineInfo.length);
}

export function getWiremdDiagnostics(doc: Text): Diagnostic[] {
  return lint(doc.toString()).map((diagnostic) => {
    const from = positionToOffset(
      doc,
      diagnostic.position.start.line,
      diagnostic.position.start.column,
    );
    const to = positionToOffset(
      doc,
      diagnostic.position.end.line,
      diagnostic.position.end.column,
    );

    return {
      from,
      to: Math.max(to, from + 1),
      severity: diagnostic.severity,
      message: diagnostic.message,
      source: 'wiremd',
    };
  });
}
