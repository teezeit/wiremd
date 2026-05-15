import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Editor } from '../../src/components/Editor';

describe('Editor', () => {
  it('shows WireMD lint diagnostics in the CodeMirror gutter', async () => {
    const { container } = render(
      <Editor
        value={['# Form', '::: card', 'Content'].join('\n')}
        onChange={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(container.querySelector('.cm-lint-marker-warning')).toBeInTheDocument();
    });
  });

  it('marks the editor as read-only when requested', () => {
    const { container } = render(
      <Editor value="# Read-only" onChange={vi.fn()} readOnly={true} />,
    );

    expect(container.firstElementChild).toHaveAttribute('data-readonly', 'true');
  });
});
