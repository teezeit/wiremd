import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCommentCount } from '../../src/hooks/useCommentCount';

describe('useCommentCount', () => {
  it('returns 0 for markdown with no comments', () => {
    const { result } = renderHook(() => useCommentCount('# Hello\n[Button]*'));
    expect(result.current).toBe(0);
  });

  it('returns 1 for markdown with one comment', () => {
    const { result } = renderHook(() => useCommentCount('# Hello\n<!-- a comment -->'));
    expect(result.current).toBe(1);
  });

  it('returns the correct count for multiple comments', () => {
    const md = '# Hello\n<!-- first -->\n[Button]*\n<!-- second -->';
    const { result } = renderHook(() => useCommentCount(md));
    expect(result.current).toBe(2);
  });

  it('returns 0 for empty string', () => {
    const { result } = renderHook(() => useCommentCount(''));
    expect(result.current).toBe(0);
  });
});
