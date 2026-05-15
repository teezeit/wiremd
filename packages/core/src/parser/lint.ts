import type { WiremdDiagnostic } from '../types.js';

interface OpenContainerDirective {
  line: number;
  column: number;
  text: string;
  containerType: string;
}

interface FenceState {
  marker: '`' | '~';
  length: number;
}

function getFence(line: string): FenceState | null {
  const match = line.trim().match(/^(`{3,}|~{3,})/);
  if (!match) return null;

  return {
    marker: match[1][0] as '`' | '~',
    length: match[1].length,
  };
}

function closesFence(line: string, fence: FenceState): boolean {
  const trimmed = line.trim();
  const pattern = fence.marker === '`' ? /^`{3,}/ : /^~{3,}/;
  const match = trimmed.match(pattern);
  return Boolean(match && match[0].length >= fence.length);
}

function isContainerCloser(trimmed: string): boolean {
  return trimmed === ':::';
}

function parseContainerOpener(trimmed: string): { containerType: string; text: string } | null {
  if (!trimmed.startsWith(':::') || trimmed.startsWith('::::')) return null;
  if (trimmed === ':::') return null;

  const afterMarker = trimmed.slice(3);
  const match = afterMarker.match(/^\s*(\S+)/);
  if (!match) return null;

  return {
    containerType: match[1],
    text: trimmed,
  };
}

function rangeForLine(line: number, column: number, width: number) {
  return {
    start: { line, column },
    end: { line, column: column + width },
  };
}

export function lint(markdown: string): WiremdDiagnostic[] {
  const diagnostics: WiremdDiagnostic[] = [];
  const stack: OpenContainerDirective[] = [];
  const lines = markdown.split(/\r?\n/);
  let fence: FenceState | null = null;

  for (let index = 0; index < lines.length; index++) {
    const rawLine = lines[index];
    const lineNumber = index + 1;
    const trimmed = rawLine.trim();

    if (fence) {
      if (closesFence(rawLine, fence)) fence = null;
      continue;
    }

    const openingFence = getFence(rawLine);
    if (openingFence) {
      fence = openingFence;
      continue;
    }

    const column = rawLine.search(/\S/) + 1;
    if (column <= 0) continue;

    if (isContainerCloser(trimmed)) {
      if (stack.length === 0) {
        diagnostics.push({
          code: 'UNEXPECTED_CONTAINER_CLOSER',
          severity: 'warning',
          message: 'Unexpected closing ::: without a matching container opener.',
          position: rangeForLine(lineNumber, column, 3),
        });
      } else {
        stack.pop();
      }
      continue;
    }

    const opener = parseContainerOpener(trimmed);
    if (opener) {
      stack.push({
        line: lineNumber,
        column,
        text: opener.text,
        containerType: opener.containerType,
      });
    }
  }

  for (const opener of stack) {
    diagnostics.push({
      code: 'UNCLOSED_CONTAINER_DIRECTIVE',
      severity: 'warning',
      message: `Missing closing ::: for ::: ${opener.containerType} opened on line ${opener.line}.`,
      position: rangeForLine(opener.line, opener.column, opener.text.length),
    });
  }

  return diagnostics;
}
