interface Props {
  dividerRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
}

export function Splitter({ dividerRef, onPointerDown }: Props) {
  return (
    <div
      ref={dividerRef}
      className="ed-divider"
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation="vertical"
    />
  );
}
