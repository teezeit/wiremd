import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentButton } from '../../src/components/CommentButton';

function setup(props: Partial<React.ComponentProps<typeof CommentButton>> = {}) {
  const defaults = { commentCount: 0, active: false, onClick: vi.fn() };
  const merged = { ...defaults, ...props };
  render(<CommentButton {...merged} />);
  return merged;
}

describe('CommentButton', () => {
  describe('when commentCount is 0', () => {
    it('shows a badge with "0"', () => {
      setup({ commentCount: 0 });
      expect(screen.getByTestId('comment-badge')).toHaveTextContent('0');
    });

    it('badge has grey modifier class', () => {
      setup({ commentCount: 0 });
      expect(screen.getByTestId('comment-badge')).toHaveClass('ed-comment-badge--grey');
    });

    it('badge does not have yellow modifier class', () => {
      setup({ commentCount: 0 });
      expect(screen.getByTestId('comment-badge')).not.toHaveClass('ed-comment-badge--yellow');
    });

    it('button is disabled', () => {
      setup({ commentCount: 0 });
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('button has tooltip "No comments yet"', () => {
      setup({ commentCount: 0 });
      expect(screen.getByRole('button')).toHaveAttribute('title', 'No comments yet');
    });

    it('does not call onClick when clicked', () => {
      const onClick = vi.fn();
      setup({ commentCount: 0, onClick });
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when commentCount > 0', () => {
    it('shows a badge with the count', () => {
      setup({ commentCount: 3 });
      expect(screen.getByTestId('comment-badge')).toHaveTextContent('3');
    });

    it('badge has yellow modifier class', () => {
      setup({ commentCount: 3 });
      expect(screen.getByTestId('comment-badge')).toHaveClass('ed-comment-badge--yellow');
    });

    it('badge does not have grey modifier class', () => {
      setup({ commentCount: 3 });
      expect(screen.getByTestId('comment-badge')).not.toHaveClass('ed-comment-badge--grey');
    });

    it('button is enabled', () => {
      setup({ commentCount: 3 });
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      setup({ commentCount: 3, onClick });
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('active state', () => {
    it('has active class when active=true', () => {
      setup({ commentCount: 2, active: true });
      expect(screen.getByRole('button')).toHaveClass('ed-btn--icon-active');
    });

    it('does not have active class when active=false', () => {
      setup({ commentCount: 2, active: false });
      expect(screen.getByRole('button')).not.toHaveClass('ed-btn--icon-active');
    });

    it('title is "Hide comments" when active', () => {
      setup({ commentCount: 1, active: true });
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Hide comments');
    });

    it('title is "Show comments" when inactive with count > 0', () => {
      setup({ commentCount: 1, active: false });
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Show comments');
    });
  });
});
