/**
 * Fixture-driven snapshot suite.
 *
 * Two channels per fixture, deliberately separate:
 *
 *   1. SNAPSHOTS — record what the system currently produces. Caught by a
 *      human at first commit (the verification step). Lock in regressions.
 *      Not a correctness check — they pass even when output is wrong.
 *
 *   2. INVARIANTS — optional sidecar `<base>.invariants.ts` (or
 *      `<base>.expected-fail.invariants.ts`) declaring what MUST be true.
 *      The expected-fail variant is wired through vitest's `it.fails(...)`
 *      so a parser fix surfaces as "passed unexpectedly" — forcing the
 *      author to flip the file rename and update the snapshot deliberately.
 *
 * Update snapshots with: pnpm test -- -u
 */

import { describe, it, expect } from 'vitest';
import { pathToFileURL } from 'url';
import { parse } from '../src/parser/index.js';
import { renderToHTML, renderToReact, renderToTailwind } from '../src/renderer/index.js';
import { loadFixtures, type Fixture } from './lib/fixture-runner.js';
import { serializeAST } from './lib/ast-serializer.js';

const fixtures = loadFixtures();

/**
 * Strip line-number annotations from rendered HTML. The parser injects
 * `data-source-line="N"` for editor cursor sync; for snapshots they're pure
 * noise — they shift on any input edit and are unrelated to correctness.
 */
function stripPositionAttrs(html: string): string {
  return html.replace(/\s+data-source-line="\d+"/g, '');
}

interface InvariantsArgs {
  ast: ReturnType<typeof parse>;
  html: string;
  react: string;
  tailwind: string;
}

type InvariantsModule = { check: (args: InvariantsArgs) => void };

describe('Fixture corpus', () => {
  if (fixtures.length === 0) {
    it('discovers at least one fixture', () => {
      expect.fail('No fixtures discovered. Check tests/fixtures/regressions/ and DOC_SOURCES.');
    });
    return;
  }

  for (const fixture of fixtures) {
    describe(fixture.id, () => {
      const ast = parse(fixture.input);
      const html = stripPositionAttrs(
        renderToHTML(ast, { style: 'clean', inlineStyles: false })
      );
      const react = renderToReact(ast, { typescript: true });
      const tailwind = stripPositionAttrs(renderToTailwind(ast));

      it('HTML output matches snapshot', async () => {
        await expect(html).toMatchFileSnapshot(`${fixture.snapshotBase}.html`);
      });

      it('React output matches snapshot', async () => {
        await expect(react).toMatchFileSnapshot(`${fixture.snapshotBase}.react.tsx`);
      });

      it('Tailwind output matches snapshot', async () => {
        await expect(tailwind).toMatchFileSnapshot(`${fixture.snapshotBase}.tailwind.html`);
      });

      if (fixture.snapshotAst) {
        it('AST tree matches snapshot', async () => {
          await expect(serializeAST(ast)).toMatchFileSnapshot(
            `${fixture.snapshotBase}.tree.txt`
          );
        });
      }

      if (fixture.invariantsPath) {
        registerInvariants(fixture, { ast, html, react, tailwind });
      }
    });
  }
});

function registerInvariants(fixture: Fixture, args: InvariantsArgs) {
  const url = pathToFileURL(fixture.invariantsPath!).href;
  const itFn = fixture.expectedToFail ? it.fails : it;
  const label = fixture.expectedToFail
    ? 'invariants currently fail (documents a bug)'
    : 'invariants hold';

  itFn(label, async () => {
    const mod = (await import(/* @vite-ignore */ url)) as InvariantsModule;
    if (typeof mod.check !== 'function') {
      throw new Error(
        `Invariants file ${fixture.invariantsPath} must export a 'check' function`
      );
    }
    mod.check(args);
  });
}
