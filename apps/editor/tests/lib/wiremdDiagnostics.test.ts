import { Text } from '@codemirror/state';
import { describe, expect, it } from 'vitest';
import { getWiremdDiagnostics } from '../../src/lib/wiremdDiagnostics';

describe('getWiremdDiagnostics', () => {
  it('maps unclosed container diagnostics to CodeMirror offsets', () => {
    const doc = Text.of([
      '# Form',
      '::: card',
      'Content',
    ]);

    expect(getWiremdDiagnostics(doc)).toMatchObject([
      {
        from: 7,
        to: 15,
        severity: 'warning',
        source: 'wiremd',
        message: 'Missing closing ::: for ::: card opened on line 2.',
      },
    ]);
  });

  it('maps unexpected closer diagnostics to CodeMirror offsets', () => {
    const doc = Text.of(['# Form', ':::', 'Content']);

    expect(getWiremdDiagnostics(doc)).toMatchObject([
      {
        from: 7,
        to: 10,
        severity: 'warning',
        source: 'wiremd',
        message: 'Unexpected closing ::: without a matching container opener.',
      },
    ]);
  });

  it('does not report balanced container directives', () => {
    const doc = Text.of([
      '::: card',
      'Content',
      ':::',
    ]);

    expect(getWiremdDiagnostics(doc)).toEqual([]);
  });
});
