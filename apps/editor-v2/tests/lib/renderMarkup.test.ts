import { describe, it, expect, vi } from 'vitest';
import { renderMarkup } from '../../src/lib/renderMarkup';

vi.mock('@eclectic-ai/wiremd', () => ({
  parse: vi.fn(() => ({ type: 'root', children: [] })),
  renderToHTML: vi.fn(() => '<div>mock</div>'),
  countCommentThreads: vi.fn(() => 0),
}));

describe('renderMarkup', () => {
  it('returns html and zero commentCount on success', () => {
    const result = renderMarkup('# Hello', 'clean');
    expect(result.error).toBeNull();
    if (result.error === null) {
      expect(result.html).toBe('<div>mock</div>');
      expect(result.commentCount).toBe(0);
    }
  });

  it('returns error string when parse throws', async () => {
    const { parse } = await import('@eclectic-ai/wiremd');
    vi.mocked(parse).mockImplementationOnce(() => { throw new Error('bad syntax'); });
    const result = renderMarkup('bad', 'clean');
    expect(result.error).toBe('bad syntax');
    expect(result.html).toBe('');
  });

  it('passes showComments=true by default', async () => {
    const { renderToHTML } = await import('@eclectic-ai/wiremd');
    renderMarkup('# test', 'sketch');
    expect(vi.mocked(renderToHTML)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ showComments: true }),
    );
  });

  it('passes showComments=false when specified', async () => {
    const { renderToHTML } = await import('@eclectic-ai/wiremd');
    renderMarkup('# test', 'sketch', false);
    expect(vi.mocked(renderToHTML)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ showComments: false }),
    );
  });
});
