import { describe, it, expect, vi } from 'vitest';
import { renderForFormat, filenameForFormat } from '../../src/lib/exportFormat';

vi.mock('@eclectic-ai/wiremd', () => ({
  parse: vi.fn(() => ({ type: 'root', children: [] })),
  renderToHTML: vi.fn(() => '<div>html</div>'),
  renderToReact: vi.fn(() => 'function App() {}'),
  renderToTailwind: vi.fn(() => '<div class="p-4">tailwind</div>'),
  renderToJSON: vi.fn(() => '{"type":"root"}'),
}));

describe('filenameForFormat', () => {
  it('returns .md for markdown', () => {
    expect(filenameForFormat('markdown')).toBe('wireframe.md');
  });
  it('returns .html for html', () => {
    expect(filenameForFormat('html')).toBe('wireframe.html');
  });
  it('returns .tsx for react', () => {
    expect(filenameForFormat('react')).toBe('wireframe.tsx');
  });
  it('returns .tailwind.html for tailwind', () => {
    expect(filenameForFormat('tailwind')).toBe('wireframe.tailwind.html');
  });
  it('returns .json for json', () => {
    expect(filenameForFormat('json')).toBe('wireframe.json');
  });
});

describe('renderForFormat', () => {
  const md = '# Hello';

  it('returns raw markdown for markdown format', async () => {
    expect(await renderForFormat(md, 'markdown', 'sketch')).toBe(md);
  });

  it('calls renderToHTML for html format', async () => {
    const { renderToHTML } = await import('@eclectic-ai/wiremd');
    await renderForFormat(md, 'html', 'clean');
    expect(vi.mocked(renderToHTML)).toHaveBeenCalled();
  });

  it('calls renderToReact for react format', async () => {
    const { renderToReact } = await import('@eclectic-ai/wiremd');
    await renderForFormat(md, 'react', 'sketch');
    expect(vi.mocked(renderToReact)).toHaveBeenCalled();
  });

  it('calls renderToTailwind for tailwind format', async () => {
    const { renderToTailwind } = await import('@eclectic-ai/wiremd');
    await renderForFormat(md, 'tailwind', 'sketch');
    expect(vi.mocked(renderToTailwind)).toHaveBeenCalled();
  });

  it('calls renderToJSON for json format', async () => {
    const { renderToJSON } = await import('@eclectic-ai/wiremd');
    await renderForFormat(md, 'json', 'sketch');
    expect(vi.mocked(renderToJSON)).toHaveBeenCalled();
  });
});
