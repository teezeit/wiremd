import { describe, expect, it } from 'vitest';
import { renderMarkup } from '../src/renderMarkup.js';

describe('editor renderMarkup', () => {
  it('renders full HTML for valid editor markup', () => {
    const result = renderMarkup('## Login Form\n\n[Sign In]*', 'sketch');

    expect(result.error).toBeNull();
    expect(result.html).toContain('<!DOCTYPE html>');
    expect(result.html).toContain('Login Form');
    expect(result.html).toContain('wmd-sketch');
  });

  it('renders the requested style', () => {
    const result = renderMarkup('[Continue]*', 'clean');

    expect(result.error).toBeNull();
    expect(result.html).toContain('wmd-clean');
  });

  it('returns commentCount of 0 when there are no comments', () => {
    const result = renderMarkup('[Sign In]*', 'sketch');
    expect(result.error).toBeNull();
    expect(result.commentCount).toBe(0);
  });

  it('returns commentCount matching the number of comment threads', () => {
    const result = renderMarkup('<!-- note a -->\n[Btn1]*\n\n<!-- note b -->\n[Btn2]*', 'sketch');
    expect(result.error).toBeNull();
    expect(result.commentCount).toBe(2);
  });

  it('consecutive comments count as one thread', () => {
    const result = renderMarkup('<!-- a -->\n<!-- b -->\n[Btn]*', 'sketch');
    expect(result.error).toBeNull();
    expect(result.commentCount).toBe(1);
  });
});
