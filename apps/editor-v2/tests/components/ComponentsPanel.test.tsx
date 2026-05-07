import { fireEvent, render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ComponentsPanel } from '../../src/components/ComponentsPanel';
import { renderMarkup } from '../../src/lib/renderMarkup';
import type { Example, ComponentGroup } from '../../src/lib/examples';

beforeEach(() => localStorage.clear());

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
const group: ComponentGroup = { name: 'Display', items: [component] };

function setup(overrides: Record<string, unknown> = {}) {
  const props = {
    templates: [template],
    groups: [group],
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

  it('shows Template Gallery section header', () => {
    setup();
    expect(screen.getByRole('button', { name: /template gallery/i })).toBeInTheDocument();
  });

  it('shows group section header', () => {
    setup();
    expect(screen.getByTestId('group-Display')).toBeInTheDocument();
  });

  it('templates are expanded by default', () => {
    setup();
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });

  it('group items are collapsed by default', () => {
    setup();
    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument();
  });
});

describe('ComponentsPanel — collapsing', () => {
  it('collapses Template Gallery when header is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /template gallery/i }));
    expect(screen.queryByText('Landing Page')).not.toBeInTheDocument();
  });

  it('expands a group when its header is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('group-Display'));
    expect(screen.getByText('Hero Section')).toBeInTheDocument();
  });

  it('collapses a group again on second click', () => {
    setup();
    fireEvent.click(screen.getByTestId('group-Display'));
    expect(screen.getByText('Hero Section')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('group-Display'));
    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument();
  });

  it('groups are independent — expanding one does not affect others', () => {
    const group2: ComponentGroup = { name: 'Layout', items: [{ name: 'Row', description: 'A row', code: '::: row\n:::' }] };
    setup({ groups: [group, group2] });
    fireEvent.click(screen.getByTestId('group-Display'));
    expect(screen.getByText('Hero Section')).toBeInTheDocument();
    expect(screen.queryByText('Row')).not.toBeInTheDocument();
  });
});

describe('ComponentsPanel — style prop', () => {
  it('renders templates with the provided style', () => {
    const noop = vi.fn();
    const { rerender } = render(
      <ComponentsPanel templates={[template]} groups={[]} style="clean" onAdd={noop} />,
    );
    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'clean');

    rerender(
      <ComponentsPanel templates={[template]} groups={[]} style="material" onAdd={noop} />,
    );
    expect(renderMarkup).toHaveBeenLastCalledWith('# Landing', 'material');
  });
});

describe('ComponentsPanel — actions', () => {
  it('calls onAdd with code and name when Add is clicked on a template', () => {
    const { onAdd } = setup({ groups: [] });
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));
    expect(onAdd).toHaveBeenCalledWith('# Landing', 'Landing Page');
  });

  it('calls onAdd with code and name when Add is clicked on a component', () => {
    const { onAdd } = setup({ templates: [] });
    fireEvent.click(screen.getByTestId('group-Display'));
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));
    expect(onAdd).toHaveBeenCalledWith('::: hero\n# Title\n:::', 'Hero Section');
  });

  it('disables template Add button when disabled=true', () => {
    setup({ groups: [], disabled: true });
    expect(screen.getByRole('button', { name: /^add$/i })).toBeDisabled();
  });

  it('disables component Add button when disabled=true', () => {
    setup({ templates: [], disabled: true });
    fireEvent.click(screen.getByTestId('group-Display'));
    expect(screen.getByRole('button', { name: /^add$/i })).toBeDisabled();
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
