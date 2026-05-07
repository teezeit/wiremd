import { useEffect } from 'react';

export const AUTO_SAVE_KEY = 'wiremd-content';

export function useAutoSave(markdown: string, delayMs = 1000): void {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(AUTO_SAVE_KEY, markdown);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [markdown, delayMs]);
}
