import { describe, expect, it } from 'vitest';
import { examples } from '../src/examples.js';
import { renderMarkup } from '../src/renderMarkup.js';

describe('editor examples', () => {
  it('renders every built-in example', () => {
    for (const example of examples) {
      const result = renderMarkup(example.code, 'sketch');

      expect(result.error, example.name).toBeNull();
      expect(result.html, example.name).toContain('<!DOCTYPE html>');
    }
  });
});
