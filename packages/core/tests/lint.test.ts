import { describe, expect, it } from 'vitest';
import { lint } from '../src/parser/index.js';

describe('wiremd lint', () => {
  it('accepts balanced nested container directives', () => {
    const diagnostics = lint([
      '::: card',
      'Outer',
      '::: row',
      '[Save]*',
      ':::',
      ':::',
    ].join('\n'));

    expect(diagnostics).toEqual([]);
  });

  it('reports each container opener left unclosed at EOF', () => {
    const diagnostics = lint([
      '# Form',
      '::: card',
      'Content',
      '::: row',
      '[Save]*',
    ].join('\n'));

    expect(diagnostics).toMatchObject([
      {
        code: 'UNCLOSED_CONTAINER_DIRECTIVE',
        severity: 'warning',
        message: 'Missing closing ::: for ::: card opened on line 2.',
        position: { start: { line: 2, column: 1 }, end: { line: 2, column: 9 } },
      },
      {
        code: 'UNCLOSED_CONTAINER_DIRECTIVE',
        severity: 'warning',
        message: 'Missing closing ::: for ::: row opened on line 4.',
        position: { start: { line: 4, column: 1 }, end: { line: 4, column: 8 } },
      },
    ]);
  });

  it('reports a closing directive without a matching opener', () => {
    const diagnostics = lint(['# Title', ':::', 'Body'].join('\n'));

    expect(diagnostics).toMatchObject([
      {
        code: 'UNEXPECTED_CONTAINER_CLOSER',
        severity: 'warning',
        message: 'Unexpected closing ::: without a matching container opener.',
        position: { start: { line: 2, column: 1 }, end: { line: 2, column: 4 } },
      },
    ]);
  });

  it('ignores container-looking directives inside fenced code blocks', () => {
    const diagnostics = lint([
      '```md',
      '::: card',
      ':::',
      '```',
      '~~~',
      '::: row',
      '~~~',
    ].join('\n'));

    expect(diagnostics).toEqual([]);
  });
});
