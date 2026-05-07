/**
 * Unit tests for normalizeContainerDirectiveSpacing's lineMap output and
 * remapMdastPositions.
 *
 * These are the load-bearing pieces of the parser position fix: if the lineMap
 * is wrong every data-source-line attribute in rendered HTML is wrong.
 */
import { describe, it, expect } from 'vitest';
import {
  normalizeContainerDirectiveSpacing,
  remapMdastPositions,
} from '../../src/parser/remark-containers.js';

// ── helpers ───────────────────────────────────────────────────────────────────

/** Build a lineMap from a markdown string and return {text, lineMap} */
function norm(md: string) {
  return normalizeContainerDirectiveSpacing(md);
}

/** Assert that every non-zero lineMap entry has the expected original line. */
function realLines(lineMap: number[]): number[] {
  return lineMap.filter((n) => n !== 0);
}

// ── normalizeContainerDirectiveSpacing ────────────────────────────────────────

describe('normalizeContainerDirectiveSpacing — lineMap', () => {
  describe('no directives', () => {
    it('produces identity lineMap for plain markdown', () => {
      const { lineMap } = norm('# Hello\n\nWorld.\n');
      expect(realLines(lineMap)).toEqual([1, 2, 3, 4]);
    });

    it('produces identity lineMap for empty string', () => {
      const { lineMap } = norm('');
      expect(lineMap).toEqual([1]);
    });

    it('text only — lineMap length equals line count', () => {
      const md = 'a\nb\nc';
      const { text, lineMap } = norm(md);
      expect(lineMap).toHaveLength(text.split('\n').length);
      expect(realLines(lineMap)).toEqual([1, 2, 3]);
    });
  });

  describe('directive with non-blank content immediately after', () => {
    it('inserts one synthetic line after the opener', () => {
      // ::: hero\n# Title  →  ::: hero\n(blank)\n# Title
      const { lineMap } = norm('::: hero\n# Title\n:::');
      // normalized: "::: hero", "", "# Title", "", ":::"
      // lineMap:       [1,      0,    2,        0,   3]
      expect(lineMap[0]).toBe(1);   // ::: hero → original line 1
      expect(lineMap[1]).toBe(0);   // synthetic blank
      expect(lineMap[2]).toBe(2);   // # Title → original line 2
      expect(lineMap[3]).toBe(0);   // synthetic blank before :::
      expect(lineMap[4]).toBe(3);   // ::: → original line 3
    });

    it('does not insert a blank when content is already preceded by a blank', () => {
      const { lineMap } = norm('::: hero\n\n# Title\n\n:::');
      // No insertion needed — blank already present
      expect(lineMap.filter((n) => n === 0)).toHaveLength(0);
      expect(realLines(lineMap)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('directive with non-blank content immediately before', () => {
    it('inserts one synthetic line before the directive', () => {
      // # Title\n:::  →  # Title\n(blank)\n:::
      const { lineMap } = norm('# Title\n:::');
      expect(lineMap[0]).toBe(1);  // # Title → original 1
      expect(lineMap[1]).toBe(0);  // synthetic blank inserted before :::
      expect(lineMap[2]).toBe(2);  // ::: → original 2
    });
  });

  describe('nested directives', () => {
    it('inserts blanks at each nesting level', () => {
      const md = '::: columns\n::: column\nContent.\n:::\n:::';
      const { text, lineMap } = norm(md);
      const normalized = text.split('\n');
      // Every synthetic blank maps to 0, every real line maps to original line
      expect(lineMap).toHaveLength(normalized.length);
      // Original lines 1–5 must all appear in the lineMap
      for (let orig = 1; orig <= 5; orig++) {
        expect(lineMap).toContain(orig);
      }
    });

    it('preserves original line numbers after insertions', () => {
      const md = '::: card\n# Heading\n\nParagraph.\n:::';
      const { lineMap } = norm(md);
      // "# Heading" is original line 2, "Paragraph." is original line 4
      expect(lineMap).toContain(2);
      expect(lineMap).toContain(4);
    });
  });

  describe('code fences', () => {
    it('does not treat ::: inside a code fence as a directive', () => {
      const md = '```\n::: card\ncontent\n:::\n```';
      const { lineMap } = norm(md);
      // No synthetic blanks — ::: is inside the fence
      expect(lineMap.filter((n) => n === 0)).toHaveLength(0);
      expect(realLines(lineMap)).toEqual([1, 2, 3, 4, 5]);
    });

    it('resumes directive detection after fence closes', () => {
      const md = '```\n:::\n```\n::: card\nContent.\n:::';
      const { lineMap } = norm(md);
      // Lines 1-3 (fence) → no synthetics; ::: card at line 4 triggers inserts
      expect(lineMap[0]).toBe(1);
      expect(lineMap[1]).toBe(2);
      expect(lineMap[2]).toBe(3);
      // Line 4 is ::: card, line 5 is Content → blank inserted between them
      const cardIdx = lineMap.indexOf(4);
      expect(cardIdx).toBeGreaterThan(2);
      expect(lineMap[cardIdx + 1]).toBe(0); // synthetic after ::: card
    });

    it('handles tilde fences', () => {
      const md = '~~~\n::: card\n~~~';
      const { lineMap } = norm(md);
      expect(lineMap.filter((n) => n === 0)).toHaveLength(0);
    });
  });

  describe('consecutive directives', () => {
    it('handles multiple top-level containers', () => {
      const md = '::: card\nA.\n:::\n\n::: card\nB.\n:::';
      const { lineMap } = norm(md);
      // All original lines 1-7 must be represented
      for (let i = 1; i <= 7; i++) {
        expect(lineMap).toContain(i);
      }
    });
  });

  describe('text output', () => {
    it('text and lineMap have the same number of lines', () => {
      const inputs = [
        '::: card\nHello.\n:::',
        '# H\n::: col\nA\n:::\n# H2',
        'plain\nmarkdown\nno directives',
      ];
      for (const md of inputs) {
        const { text, lineMap } = norm(md);
        expect(text.split('\n')).toHaveLength(lineMap.length);
      }
    });
  });
});

// ── remapMdastPositions ───────────────────────────────────────────────────────

describe('remapMdastPositions', () => {
  const lineMap = [1, 0, 2, 0, 3]; // 5 normalized lines → real lines 1, 2, 3

  it('remaps start.line using lineMap', () => {
    const node: any = { position: { start: { line: 3, column: 1 }, end: { line: 3, column: 10 } }, children: [] };
    remapMdastPositions(node, lineMap);
    expect(node.position.start.line).toBe(2); // lineMap[2] = 2
    expect(node.position.end.line).toBe(2);
  });

  it('remaps end.line independently', () => {
    const node: any = { position: { start: { line: 1, column: 1 }, end: { line: 5, column: 1 } }, children: [] };
    remapMdastPositions(node, lineMap);
    expect(node.position.start.line).toBe(1); // lineMap[0] = 1
    expect(node.position.end.line).toBe(3);   // lineMap[4] = 3
  });

  it('remaps positions recursively through children', () => {
    const child: any = { position: { start: { line: 3, column: 1 }, end: { line: 3, column: 5 } }, children: [] };
    const parent: any = { position: { start: { line: 1, column: 1 }, end: { line: 5, column: 1 } }, children: [child] };
    remapMdastPositions(parent, lineMap);
    expect(parent.position.start.line).toBe(1);
    expect(child.position.start.line).toBe(2); // lineMap[2] = 2
  });

  it('handles nodes without position gracefully', () => {
    const node: any = { children: [{ children: [] }] };
    expect(() => remapMdastPositions(node, lineMap)).not.toThrow();
  });

  it('falls back to nearest real line for synthetic entries', () => {
    // lineMap[1] = 0 (synthetic) → should fall back to lineMap[0] = 1
    const node: any = { position: { start: { line: 2, column: 1 }, end: { line: 2, column: 1 } }, children: [] };
    remapMdastPositions(node, lineMap);
    // Falls back to nearest preceding real line (1)
    expect(node.position.start.line).toBe(1);
  });

  it('preserves column and offset values', () => {
    const node: any = {
      position: { start: { line: 1, column: 5, offset: 4 }, end: { line: 1, column: 10, offset: 9 } },
      children: [],
    };
    remapMdastPositions(node, lineMap);
    expect(node.position.start.column).toBe(5);
    expect(node.position.start.offset).toBe(4);
  });

  it('does not mutate the lineMap', () => {
    const map = [1, 0, 2];
    const original = [...map];
    const node: any = { position: { start: { line: 1 }, end: { line: 3 } }, children: [] };
    remapMdastPositions(node, map);
    expect(map).toEqual(original);
  });
});
