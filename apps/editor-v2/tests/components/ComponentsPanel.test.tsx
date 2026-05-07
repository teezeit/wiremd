import { fireEvent, render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ComponentsPanel } from '../../src/components/ComponentsPanel';
import { renderMarkup } from '../../src/lib/renderMarkup';
import type { Example } from '../../src/lib/examples';

vi.mock('../../src/lib/renderMarkup', () => ({
  renderMarkup: vi.fn(() => ({ html: '<main>Preview</main>', commentCount: 0, error: null })),
}));

const template: Example = {
  name: 'Landing Page',
  description: 'Marketing hero with features',
  code: '# Landing',
};
const component: Example = {
  name: 'Hero Section',
  description: 'Full-width hero block',
  code: '::: hero\n# Title\n:::',
};

function setup(overrides = {}) {
  const props = {
    templates: [template],
    components: [component],
    style: 'clean' as const,
    onAdd: vi.fn(),
    ...overrides,
  };
  render(<ComponentsPanel {...props} />);
  return props;
}

describe('ComponentsPanel — rendering', () => {
  it('shows template name and description', () => {
    setup();
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Marketing hero with features')).toBeInTheDocument();
  });

  it('shows component name and description', () => {
    setup();
    expect(screen.getByText('Hero Section')).toBeInTheDocument();
    expect(screen.getByText('Full-width hero block')).toBeInTheDocument();
  });

  it('shows Add button for templates', () => {
    setup({ components: [] });
    expect(screen.getByRole('button', { name: /^add$/i })).toBeInTheDocument();
  });

  it('shows Add button for components', () => {
    setup({ templates: [] });
    expect(screen.getByRole('button', { name: /^add$/i })).toBeInTheDocument();
  });

  it('shows Template Gallery and Component Library section labels', () => {
    setup();
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
    expect(screen.getByText('Component Library')).toBeInTheDocument();
  });
});

describe('ComponentsPanel — style prop', () => {
  it('renders with the provided style', () => {
    const noop = vi.fn();
    const { rerender } = render(
      <ComponentsPanel templates={[template]} components={[]} style="clean" onAdd={noop} />,
    );
    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'clean');

    rerender(
      <ComponentsPanel templates={[template]} components={[]} style="material" onAdd={noop} />,
    );
    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'material');
  });
});

describe('ComponentsPanel — actions', () => {
  it('calls onAdd with code and name when Add is clicked on a template', () => {
    const { onAdd } = setup({ components: [] });
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));
    expect(onAdd).toHaveBeenCalledWith('# Landing', 'Landing Page');
  });

  it('calls onAdd with code and name when Add is clicked on a component', () => {
    const { onAdd } = setup({ templates: [] });
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));
    expect(onAdd).toHaveBeenCalledWith('::: hero\n# Title\n:::', 'Hero Section');
  });

  it('disables Add buttons when disabled=true', () => {
    setup({ disabled: true });
    const addBtns = screen.getAllByRole('button', { name: /^add$/i });
    addBtns.forEach((btn) => expect(btn).toBeDisabled());
  });
});

describe('ComponentsPanel — copy', () => {
  const clipboardWriteText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: clipboardWriteText },
      configurable: true,
    });
    clipboardWriteText.mockClear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('copies template markdown when copy button is clicked', async () => {
    setup();
    const copyBtns = screen.getAllByTitle('Copy markdown');
    await act(async () => { fireEvent.click(copyBtns[0]!); });
    expect(clipboardWriteText).toHaveBeenCalledWith('# Landing');
  });

  it('shows ✓ feedback after copying', async () => {
    setup();
    await act(async () => { fireEvent.click(screen.getAllByTitle('Copy markdown')[0]!); });
    expect(screen.getAllByText('✓').length).toBeGreaterThan(0);
  });

  it('reverts copy button after timeout', async () => {
    setup();
    await act(async () => { fireEvent.click(screen.getAllByTitle('Copy markdown')[0]!); });
    act(() => { vi.advanceTimersByTime(1500); });
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });
});
