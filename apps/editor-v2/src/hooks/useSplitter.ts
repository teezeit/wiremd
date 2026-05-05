import { useState, useCallback, useEffect, useRef } from 'react';

export const MIN_SPLIT_PERCENT = 20;
export const MAX_SPLIT_PERCENT = 80;

export type SplitLayout = 'horizontal' | 'vertical';

export interface SplitBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface SplitPointerPosition {
  clientX: number;
  clientY: number;
}

export function clampSplit(percent: number): number {
  return Math.min(Math.max(percent, MIN_SPLIT_PERCENT), MAX_SPLIT_PERCENT);
}

export function getLayout(viewportWidth: number): SplitLayout {
  return viewportWidth <= 768 ? 'vertical' : 'horizontal';
}

export function calculateSplitPercent(
  layout: SplitLayout,
  pointer: SplitPointerPosition,
  bounds: SplitBounds,
  fallback: number,
): number {
  const size = layout === 'vertical' ? bounds.height : bounds.width;
  if (size <= 0) return fallback;
  const offset =
    layout === 'vertical' ? pointer.clientY - bounds.top : pointer.clientX - bounds.left;
  return clampSplit((offset / size) * 100);
}

export function getEditorPanelStyle(
  layout: SplitLayout,
  horizontalSplit: number,
  verticalSplit: number,
): { width: string; height: string } {
  if (layout === 'vertical') return { width: '100%', height: `${verticalSplit}%` };
  return { width: `${horizontalSplit}%`, height: '' };
}

export function useSplitter() {
  const [hSplit, setHSplit] = useState(50);
  const [vSplit, setVSplit] = useState(50);
  const dragging = useRef(false);
  const pointerId = useRef<number | null>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const layout = getLayout(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    pointerId.current = e.pointerId;
    dividerRef.current?.setPointerCapture(e.pointerId);
    document.body.style.userSelect = 'none';
    e.preventDefault();
  }, []);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current || e.pointerId !== pointerId.current) return;
      const parent = dividerRef.current?.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const l = getLayout(window.innerWidth);
      if (l === 'vertical') {
        setVSplit(calculateSplitPercent('vertical', e, rect, vSplit));
      } else {
        setHSplit(calculateSplitPercent('horizontal', e, rect, hSplit));
      }
    }

    function onUp() {
      dragging.current = false;
      document.body.style.userSelect = '';
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [hSplit, vSplit]);

  const panelStyle = getEditorPanelStyle(layout, hSplit, vSplit);

  return { dividerRef, onPointerDown, panelStyle, layout };
}
