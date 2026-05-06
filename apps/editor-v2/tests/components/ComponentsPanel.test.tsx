import { fireEvent, render, screen } from '@testing-library/react';
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
      <ComponentsPanel
        templates={[example]}
        components={[]}
        style="clean"
        onLoadTemplate={vi.fn()}
        onAddComponent={vi.fn()}
      />,
    );

    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'clean');

    rerender(
      <ComponentsPanel
        templates={[example]}
        components={[]}
        style="material"
        onLoadTemplate={vi.fn()}
        onAddComponent={vi.fn()}
      />,
    );

    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'material');
  });

  it('uses Load for templates and Add for components', () => {
    const onLoadTemplate = vi.fn();
    const onAddComponent = vi.fn();

    render(
      <ComponentsPanel
        templates={[example]}
        components={[{ ...example, name: 'Hero Section', code: '# Hero' }]}
        style="clean"
        onLoadTemplate={onLoadTemplate}
        onAddComponent={onAddComponent}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /^load$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));

    expect(onLoadTemplate).toHaveBeenCalledWith('# Landing', 'Landing Page');
    expect(onAddComponent).toHaveBeenCalledWith('# Hero', 'Hero Section');
  });
});
