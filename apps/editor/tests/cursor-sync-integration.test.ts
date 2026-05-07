import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// ── types ─────────────────────────────────────────────────────────────────────

interface SyncCase {
  cursorLine: number;
  expectedAfterSourceLine: number | null;
  description: string;
}

interface ClickCase {
  clickSourceLine: number;
  expectedEditorLine: number;
  description: string;
}

// ── path ─────────────────────────────────────────────────────────────────────

const FIXTURE_ROOT = join(__dirname, '../../../packages/core/tests/fixtures/cursor-sync');

// ── fixture loader ────────────────────────────────────────────────────────────

function loadFixture(name: string) {
  const dir = join(FIXTURE_ROOT, name);
  const md = readFileSync(join(dir, 'input.md'), 'utf8');
  const syncCases = JSON.parse(readFileSync(join(dir, 'sync-cases.json'), 'utf8')) as SyncCase[];
  const clickCases = JSON.parse(readFileSync(join(dir, 'click-cases.json'), 'utf8')) as ClickCase[];
  return { md, syncCases, clickCases, name };
}

// ── per-test listener tracking ───────────────────────────────────────────────
// happy-dom does not remove event listeners between tests. We intercept both
// window and document addEventListener calls so we can clean up in afterEach.

type ListenerTuple = [string, EventListenerOrEventListenerObject, (boolean | AddEventListenerOptions)?];
interface TrackedListener { target: 'window' | 'document'; args: ListenerTuple }
let _trackedListeners: TrackedListener[] = [];
let _origWindowAdd: typeof window.addEventListener;
let _origWindowRemove: typeof window.removeEventListener;
let _origDocAdd: typeof document.addEventListener;
let _origDocRemove: typeof document.removeEventListener;

// ── iframe context builder ────────────────────────────────────────────────────
// Uses innerHTML assignment (not document.write) so happy-dom resets reliably.

function buildIframeContext(html: string) {
  // Populate DOM without document.write — inject body content only, skip the script tag
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = (bodyMatch ? bodyMatch[1] : '').replace(/<script>[\s\S]*?<\/script>/g, '');
  document.body.innerHTML = bodyContent;

  // Inject style so CSS queries work if needed
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    const style = document.createElement('style');
    style.textContent = styleMatch[1];
    document.head.appendChild(style);
  }

  const messages: unknown[] = [];
  const fakeParent = { postMessage: vi.fn((msg: unknown) => messages.push(msg)) };
  (window as any).parent = fakeParent;

  // The cursor sync script always contains 'wiremd-cursor'; other scripts (e.g.
  // tab-init) don't. Find the right one specifically.
  const allScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const cursorScriptMatch = allScripts.find((m) => m[1].includes('wiremd-cursor'));

  if (cursorScriptMatch) {
    // Intercept window.addEventListener so we can clean up after the test.
    // (document.addEventListener is intercepted in beforeEach for the full duration.)
    window.addEventListener = function (
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions,
    ) {
      _trackedListeners.push({ target: 'window', args: [type, handler, opts] });
      _origWindowAdd.call(window, type, handler as EventListener, opts);
    } as typeof window.addEventListener;

    // eslint-disable-next-line no-new-func
    new Function(cursorScriptMatch[1])();

    // Restore so the rest of the test framework is unaffected
    window.addEventListener = _origWindowAdd;
  }

  return { messages, parentPostMessage: fakeParent.postMessage };
}

// ── helpers ───────────────────────────────────────────────────────────────────

function sendMessage(data: unknown) {
  window.dispatchEvent(new MessageEvent('message', { data }));
}

function getIndicator(): HTMLElement | null {
  return document.querySelector('.wmd-cursor-indicator');
}

function getIndicatorPrecedingSibling(): Element | null {
  return getIndicator()?.previousElementSibling ?? null;
}

// ── render helpers ────────────────────────────────────────────────────────────

let renderToHTML: (ast: any, opts: any) => string;
let parse: (md: string) => any;

beforeEach(async () => {
  _trackedListeners = [];
  _origWindowAdd = window.addEventListener.bind(window);
  _origWindowRemove = window.removeEventListener.bind(window);
  _origDocAdd = document.addEventListener.bind(document);
  _origDocRemove = document.removeEventListener.bind(document);

  // Intercept document.addEventListener for the full test duration.
  // The click handler is registered lazily (on wiremd-visual-mode message),
  // so it cannot be caught only during script init — we need it here.
  document.addEventListener = function (
    type: string,
    handler: EventListenerOrEventListenerObject,
    opts?: boolean | AddEventListenerOptions,
  ) {
    _trackedListeners.push({ target: 'document', args: [type, handler, opts] });
    _origDocAdd.call(document, type, handler as EventListener, opts);
  } as typeof document.addEventListener;

  const wiremd = await import('@eclectic-ai/wiremd');
  renderToHTML = wiremd.renderToHTML;
  parse = wiremd.parse;
});

afterEach(() => {
  // Restore before removing so remove calls reach the real implementation
  document.addEventListener = _origDocAdd;
  // Remove all listeners (window + document) added by the iframe script
  for (const { target, args: [type, handler, opts] } of _trackedListeners) {
    if (target === 'window') _origWindowRemove.call(window, type, handler as EventListener, opts);
    else _origDocRemove.call(document, type, handler as EventListener, opts);
  }
  _trackedListeners = [];
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  vi.restoreAllMocks();
});

// ── fixture-driven tests ──────────────────────────────────────────────────────

const fixtureNames = readdirSync(FIXTURE_ROOT);

describe('cursor sync — iframe JS (DOM integration)', () => {
  for (const fixtureName of fixtureNames) {
    describe(`fixture: ${fixtureName}`, () => {
      it('renders with data-source-line attributes when cursorSync:true', () => {
        const { md } = loadFixture(fixtureName);
        const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
        expect(html).toContain('data-source-line');
      });

      describe('editor → preview (wiremd-cursor)', () => {
        for (const c of loadFixture(fixtureName).syncCases) {
          it(c.description, () => {
            const { md } = loadFixture(fixtureName);
            const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
            buildIframeContext(html);
            sendMessage({ type: 'wiremd-cursor', line: c.cursorLine });

            if (c.expectedAfterSourceLine === null) {
              // No indicator expected (cursor before any block)
              expect(getIndicator()).toBeNull();
            } else if (c.expectedAfterSourceLine === 0) {
              // Opener fix: indicator is first child inside the container, no prev sibling
              expect(getIndicator()).not.toBeNull();
              expect(getIndicatorPrecedingSibling()).toBeNull();
            } else {
              expect(getIndicator()).not.toBeNull();
              expect(getIndicatorPrecedingSibling()?.getAttribute('data-source-line')).toBe(
                String(c.expectedAfterSourceLine),
              );
            }
          });
        }
      });

      it('wiremd-cursor-blur removes the indicator', () => {
        const { md, syncCases } = loadFixture(fixtureName);
        // Any case where indicator is expected (null = no indicator; 0 = opener; N = after element)
        const firstSync = syncCases.find((c) => c.expectedAfterSourceLine !== null);
        if (!firstSync) return;
        const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
        buildIframeContext(html);

        sendMessage({ type: 'wiremd-cursor', line: firstSync.cursorLine });
        expect(getIndicator()).not.toBeNull();

        sendMessage({ type: 'wiremd-cursor-blur' });
        expect(getIndicator()).toBeNull();
      });

      it('sending a new cursor line moves the indicator (no duplicates)', () => {
        const { md, syncCases } = loadFixture(fixtureName);
        const validCases = syncCases.filter((c) => c.expectedAfterSourceLine !== null);
        if (validCases.length < 2) return;
        const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
        buildIframeContext(html);

        sendMessage({ type: 'wiremd-cursor', line: validCases[0].cursorLine });
        sendMessage({ type: 'wiremd-cursor', line: validCases[1].cursorLine });

        expect(document.querySelectorAll('.wmd-cursor-indicator')).toHaveLength(1);
      });

      describe('preview → editor (wiremd-component-click)', () => {
        for (const c of loadFixture(fixtureName).clickCases) {
          it(c.description, () => {
            const { md } = loadFixture(fixtureName);
            const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
            const { parentPostMessage } = buildIframeContext(html);

            sendMessage({ type: 'wiremd-visual-mode', enabled: true });

            const target = document.querySelector(`[data-source-line="${c.clickSourceLine}"]`);
            expect(target).not.toBeNull();
            target!.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(parentPostMessage).toHaveBeenCalledWith(
              { type: 'wiremd-component-click', line: c.expectedEditorLine },
              '*',
            );
          });
        }

        it('click on child element without data-source-line walks up to ancestor', () => {
          const { md } = loadFixture(fixtureName);
          const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
          const { parentPostMessage } = buildIframeContext(html);
          sendMessage({ type: 'wiremd-visual-mode', enabled: true });

          // Find a [data-source-line] block that contains a descendant without that attribute
          let blockEl: Element | null = null;
          let childEl: Element | null = null;
          for (const el of document.querySelectorAll('[data-source-line]')) {
            const leaf = el.querySelector(':not([data-source-line])');
            if (leaf) { blockEl = el; childEl = leaf; break; }
          }
          if (!blockEl || !childEl) return; // fixture has no applicable structure

          const sourceLine = parseInt(blockEl.getAttribute('data-source-line')!, 10);
          childEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));

          expect(parentPostMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'wiremd-component-click', line: sourceLine }),
            '*',
          );
        });

        it('clicks are ignored when visual mode is off', () => {
          const { md } = loadFixture(fixtureName);
          const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
          const { parentPostMessage } = buildIframeContext(html);

          // do NOT enable visual mode
          const target = document.querySelector('[data-source-line]');
          if (!target) return;
          target.dispatchEvent(new MouseEvent('click', { bubbles: true }));

          expect(parentPostMessage).not.toHaveBeenCalledWith(
            expect.objectContaining({ type: 'wiremd-component-click' }),
            '*',
          );
        });

        it('disabling visual mode stops click emissions', () => {
          const { md } = loadFixture(fixtureName);
          const html = renderToHTML(parse(md), { style: 'clean', cursorSync: true });
          const { parentPostMessage } = buildIframeContext(html);

          sendMessage({ type: 'wiremd-visual-mode', enabled: true });
          sendMessage({ type: 'wiremd-visual-mode', enabled: false });

          const target = document.querySelector('[data-source-line]');
          if (!target) return;
          target.dispatchEvent(new MouseEvent('click', { bubbles: true }));

          expect(parentPostMessage).not.toHaveBeenCalledWith(
            expect.objectContaining({ type: 'wiremd-component-click' }),
            '*',
          );
        });
      });
    });
  }
});

describe('cursor sync — standalone unit tests', () => {
  it('cursorSync:false emits no indicator CSS or script', () => {
    const html = renderToHTML(parse('# Hello'), { style: 'clean', cursorSync: false });
    expect(html).not.toContain('wmd-cursor-indicator');
    expect(html).not.toContain('wiremd-cursor');
  });

  it('cursorSync:true emits indicator CSS', () => {
    const html = renderToHTML(parse('# Hello'), { style: 'clean', cursorSync: true });
    expect(html).toContain('wmd-cursor-indicator');
  });

  it('cursorSync:true emits wiremd-visual-mode handler', () => {
    const html = renderToHTML(parse('# Hello'), { style: 'clean', cursorSync: true });
    expect(html).toContain('wiremd-visual-mode');
    expect(html).toContain('wiremd-component-click');
  });

  it('indicator has no data-source-line so it is never matched as a block', () => {
    const html = renderToHTML(parse('Hello.\n\nWorld.'), { style: 'clean', cursorSync: true });
    buildIframeContext(html);
    sendMessage({ type: 'wiremd-cursor', line: 1 });
    expect(getIndicator()).not.toBeNull();
    expect(getIndicator()!.hasAttribute('data-source-line')).toBe(false);
  });

  it('scroll events post wiremd-scroll to parent', async () => {
    const html = renderToHTML(parse('# Hello'), { style: 'clean', cursorSync: true });
    const { parentPostMessage } = buildIframeContext(html);
    window.dispatchEvent(new Event('scroll', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 150));
    expect(parentPostMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'wiremd-scroll' }),
      '*',
    );
  });
});
