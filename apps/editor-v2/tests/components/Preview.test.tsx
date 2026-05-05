import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { Preview } from '../../src/components/Preview';
import * as renderMarkupModule from '../../src/lib/renderMarkup';

vi.mock('../../src/lib/renderMarkup', () => ({
  renderMarkup: vi.fn(() => ({ html: '<p>preview</p>', commentCount: 0, error: null })),
}));

describe('Preview', () => {
  it('renders an iframe in preview tab', () => {
    const { container } = render(
      <Preview markdown="# Hello" style="clean" activeTab="preview" showComments={true} />,
    );
    expect(container.querySelector('iframe')).toBeInTheDocument();
  });

  it('sets srcdoc on the iframe from rendered html', () => {
    const { container } = render(
      <Preview markdown="# Hello" style="clean" activeTab="preview" showComments={true} />,
    );
    expect(container.querySelector('iframe')?.getAttribute('srcdoc')).toBe('<p>preview</p>');
  });

  it('shows html output when activeTab is html', () => {
    const { container } = render(
      <Preview markdown="# Hello" style="clean" activeTab="html" showComments={true} />,
    );
    expect(container.querySelector('.ed-preview__html')).toBeInTheDocument();
  });

  it('shows error bar when renderMarkup returns an error', () => {
    vi.mocked(renderMarkupModule.renderMarkup).mockReturnValueOnce({ html: '', error: 'parse failed' });
    const { container } = render(
      <Preview markdown="bad" style="clean" activeTab="preview" showComments={true} />,
    );
    expect(container.querySelector('.ed-error--visible')).toBeInTheDocument();
  });

  it('posts restore-scroll message to iframe after srcdoc changes', async () => {
    const postMessage = vi.fn();
    const { container, rerender } = render(
      <Preview markdown="# Hello" style="clean" activeTab="preview" showComments={true} />,
    );
    const iframe = container.querySelector('iframe')!;
    // Simulate iframe having a contentWindow
    Object.defineProperty(iframe, 'contentWindow', { value: { postMessage }, configurable: true });

    // Simulate iframe reporting its scroll position before reload
    act(() => {
      window.dispatchEvent(new MessageEvent('message', {
        data: { type: 'wiremd-scroll', scrollY: 200 },
      }));
    });

    // Re-render with new content
    vi.mocked(renderMarkupModule.renderMarkup).mockReturnValueOnce({
      html: '<p>updated</p>', commentCount: 0, error: null,
    });
    rerender(
      <Preview markdown="# Updated" style="clean" activeTab="preview" showComments={true} />,
    );

    // After iframe load event, Preview should post the saved scroll back
    act(() => {
      iframe.dispatchEvent(new Event('load'));
    });

    expect(postMessage).toHaveBeenCalledWith({ type: 'wiremd-set-scroll', scrollY: 200 }, '*');
  });

  it('does not update srcdoc when rendered html is unchanged', () => {
    const { container, rerender } = render(
      <Preview markdown="# Hello" style="clean" activeTab="preview" showComments={true} />,
    );
    const iframe = container.querySelector('iframe')!;
    const initialSrcdoc = iframe.getAttribute('srcdoc');

    // Re-render with same markdown (renderMarkup returns same html)
    rerender(
      <Preview markdown="# Hello" style="clean" activeTab="preview" showComments={true} />,
    );

    expect(iframe.getAttribute('srcdoc')).toBe(initialSrcdoc);
  });
});
