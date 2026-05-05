import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
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
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('srcdoc')).toBe('<p>preview</p>');
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
});
