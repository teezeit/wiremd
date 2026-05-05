import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ComponentsPanel } from '../../src/components/ComponentsPanel';
import { renderMarkup } from '../../src/lib/renderMarkup';
import type { Example } from '../../src/lib/examples';

vi.mock('../../src/lib/renderMarkup', () => ({
  renderMarkup: vi.fn(() => ({ html: '<main>Preview</main>', commentCount: 0, error: null })),
}));

const example: Example = {
  name: 'Landing Page',
  description: 'Marketing hero with features',
  code: '# Landing',
};

describe('ComponentsPanel', () => {
  it('renders template previews with the active global style', () => {
    const { rerender } = render(
      <ComponentsPanel examples={[example]} style="clean" onLoad={vi.fn()} />,
    );

    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'clean');

    rerender(<ComponentsPanel examples={[example]} style="material" onLoad={vi.fn()} />);

    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'material');
  });
});
