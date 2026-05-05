import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEditorState } from '../../src/hooks/useEditorState';

describe('useEditorState', () => {
  it('initialises with provided markdown', () => {
    const { result } = renderHook(() => useEditorState('# Hello'));
    expect(result.current.markdown).toBe('# Hello');
  });

  it('updates markdown via setMarkdown', () => {
    const { result } = renderHook(() => useEditorState(''));
    act(() => { result.current.setMarkdown('# New'); });
    expect(result.current.markdown).toBe('# New');
  });

  it('defaults style to sketch', () => {
    const { result } = renderHook(() => useEditorState(''));
    expect(result.current.style).toBe('sketch');
  });

  it('updates style via setStyle', () => {
    const { result } = renderHook(() => useEditorState(''));
    act(() => { result.current.setStyle('clean'); });
    expect(result.current.style).toBe('clean');
  });

  it('defaults activeTab to preview', () => {
    const { result } = renderHook(() => useEditorState(''));
    expect(result.current.activeTab).toBe('preview');
  });

  it('toggles activeTab', () => {
    const { result } = renderHook(() => useEditorState(''));
    act(() => { result.current.setActiveTab('html'); });
    expect(result.current.activeTab).toBe('html');
  });

  it('defaults showComments to true', () => {
    const { result } = renderHook(() => useEditorState(''));
    expect(result.current.showComments).toBe(true);
  });

  it('toggles showComments', () => {
    const { result } = renderHook(() => useEditorState(''));
    act(() => { result.current.setShowComments(false); });
    expect(result.current.showComments).toBe(false);
  });
});
