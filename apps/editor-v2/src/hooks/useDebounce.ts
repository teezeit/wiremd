import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<T>(callback: (value: T) => void, delayMs: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(
    (value: T) => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = undefined;
        callbackRef.current(value);
      }, delayMs);
    },
    [delayMs],
  );
}
