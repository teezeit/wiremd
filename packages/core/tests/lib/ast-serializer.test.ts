import { describe, it, expect } from 'vitest';
import { serializeAST } from './ast-serializer.js';
import type { DocumentNode, WiremdNode } from '../../src/types.js';

function doc(...children: WiremdNode[]): DocumentNode {
  return {
    type: 'document',
    version: '0.1',
    meta: { version: '0.1', viewport: 'desktop', theme: 'sketch' },
    children,
  };
}

describe('serializeAST', () => {
  it('renders empty document with no children as just "Document"', () => {
    expect(serializeAST(doc())).toBe('Document\n');
  });

  it('omits parser-default meta from the header', () => {
    const out = serializeAST(doc());
    expect(out).not.toContain('viewport');
    expect(out).not.toContain('theme');
    expect(out).not.toContain('v0.1');
  });

  it('renders a single button with content as a leaf', () => {
    const ast = doc({
      type: 'button',
      content: 'Save',
      props: { variant: 'primary' },
    } as WiremdNode);
    expect(serializeAST(ast)).toBe(
      'Document\n  └─ button "Save" props={variant="primary"}\n'
    );
  });

  it('strips position info regardless of where it appears', () => {
    const ast = doc({
      type: 'button',
      content: 'Save',
      props: {},
      position: { start: { line: 1, column: 1 }, end: { line: 1, column: 7 } },
    } as WiremdNode);
    const out = serializeAST(ast);
    expect(out).not.toContain('position');
    expect(out).not.toContain('line');
    expect(out).not.toContain('offset');
  });

  it('renders nested children with tree connectors', () => {
    const ast = doc({
      type: 'container',
      containerType: 'card',
      props: {},
      children: [
        { type: 'heading', level: 1, content: 'Title', props: {} },
        { type: 'button', content: 'Click', props: {} },
      ],
    } as WiremdNode);
    expect(serializeAST(ast)).toBe(
      'Document\n' +
        '  └─ container[card]\n' +
        '     ├─ heading[1] "Title"\n' +
        '     └─ button "Click"\n'
    );
  });

  it('treats true discriminators as [tag] and others as plain attrs', () => {
    const ast = doc({
      type: 'list',
      ordered: false,
      props: {},
      children: [{ type: 'list-item', content: 'one', props: {} } as WiremdNode],
    } as WiremdNode);
    const out = serializeAST(ast);
    expect(out).toContain('list ordered=false'); // not a discriminator
    expect(out).not.toContain('list[false]');
  });

  it('uses [tag] form for grid columns', () => {
    const ast = doc({
      type: 'grid',
      columns: 3,
      props: {},
      children: [],
    } as WiremdNode);
    expect(serializeAST(ast)).toContain('grid[3]');
  });

  it('omits empty props objects', () => {
    const ast = doc({ type: 'paragraph', content: 'hello', props: {} } as WiremdNode);
    expect(serializeAST(ast)).not.toContain('props=');
  });

  it('renders multiple top-level siblings with correct connectors', () => {
    const ast = doc(
      { type: 'heading', level: 1, content: 'A', props: {} } as WiremdNode,
      { type: 'paragraph', content: 'B', props: {} } as WiremdNode,
      { type: 'paragraph', content: 'C', props: {} } as WiremdNode
    );
    const out = serializeAST(ast);
    expect(out).toContain('├─ heading[1]');
    expect(out).toContain('├─ paragraph "B"');
    expect(out).toContain('└─ paragraph "C"');
  });

  it('escapes embedded newlines in string content', () => {
    const ast = doc({
      type: 'paragraph',
      content: 'line one\nline two',
      props: {},
    } as WiremdNode);
    // JSON.stringify gives us the visible \n form — readable in a snapshot.
    expect(serializeAST(ast)).toContain('"line one\\nline two"');
  });
});
